import React from "react"; //shallow안에 jsx문법쓰기 때문에.
import { configure, shallow } from "enzyme"; //named export임.
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    //componentDidMount할때 redux props인 onInit~ 불러오는것 흉내내기
  });

  it("should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    //{ings:null}이면 test fail
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
