import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapset", displayValue: "Cheapest" },
          ],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    //firebase로 order데이터, forㅡ데이터(주문자 정보) submit하기
    event.preventDefault();
    console.log(this.props);

    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      // production-ready 모드에서는 서버에서 total을 계산해야한다.
    }; // 사용자들이 가격을 manipulate 하지 못하게 보통 서버쪽에 저장해두기때문에.

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ loading: false }));
  };

  checkValidity(value, rules) {
    let isValid = true; //true인 상태로 시작, 조건문 훑으면서 false/true 결정
    if (!rules) {
      //validation이 false면(selectbox등 validation이 필요없는경우) 바로 true반환
      return true;
    }
    if (rules.required) {
      //칸이 채워졌으면(required)
      isValid = value.trim() !== "" && isValid;
      //isValid should be equal to value
      //if it(value) is not equal to an empry string
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      //isValid 계속 붙이는 이유는 위의 조건 하나라도 fail하면 안돼기 때문에.
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    //input에 onChange할 때 입력값 value로 만들어주기. (nested object에 접근해서 바꿔야함)
    //state원형 직접적으로 변형시키지 않기 위해서(안그러면 react가 변화인지 모르고 렌더링하지 않음)
    //깊은복사로 복사본 만들어주고, 이를 setState로 바꿔줌.
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    //checkValidity 리턴값은 true나 false임.
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    //setState로 업데이트하기전에 valid true인지 검사.
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => {
              this.inputChangedHandler(event, formElement.id);
            }}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);
