import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  //감싸고 있는 컴포넌트의 통신에러를 global하게 처리함.
  return class extends Component {
    state = {
      error: null,
    };

    // componentWillMount() {
    //   //class에서는 this만 붙여서 아래처럼 바로 새 변수를 만들 수 있음(?).
    //   this.reqInterceptor = axios.interceptors.request.use((req) => {
    //     this.setState({ error: null }); //whenever I send a request. I want to clear any errors/
    //     return req;
    //   });

    //   this.resInterceptor = axios.interceptors.response.use(
    //     (res) => res,
    //     (error) => {
    //       this.setState({ error: error });
    //     }
    //   );
    // }

    // componentWillUnmount() {
    //   axios.interceptors.request.eject(this.reqInterceptor);
    //   axios.interceptors.request.eject(this.resInterceptor);
    // }

    errorComfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorComfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
