//What 'test.js' does mean? : it is automatically picked up by create-react-app
//once we run a special command and will be included in the testing and therefore will be tested.
//test uses 'jest' by default and jest on the other hand gives us a couple of methods
//to define the test. (describe, )

import React from "react"; //shallow안에 jsx문법쓰기 때문에.
import { configure, shallow } from "enzyme"; //named export임.
import Adapter from "enzyme-adapter-react-16";
//Adapter : enzyme configure 하고 을 현재 react version과 connect함. default export이므로 이름은 상관없음.
import NavigationItems from "../NavigationItems";
import NavigationItem from "./NavigationItem";
//important : 'NavigationItem' is not a jsx element. It's normal exported
//from the 'NavigationItem.js'.

configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  //It's the function which will automatically be executed before each of your test.
  //You also have 'afterEach' function which you need after all your tests for clean-up
  //after all your tests if you need do.
  //It takes a function as an argument and this is the function which will get executed
  //before each test.

  it("should render two <NavigationItem/> elements if not authenticated", () => {
    // //the name is up to you, but 'wrapper' is often used.
    // const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
    //it doesn't have any props so it is not authenticated.
  });

  it("should render three <NavigationItem/> elements if authenticated", () => {
    // wrapper = shallow(<NavigationItems isAuthenticated/>)
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should be an exact logout button", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});

/*describe */
//첫번째 인자 : description of the test bundle that this file holds / This is
// only what you'll see later in the console output. So it should be something
// which allows you to identify which kind of tests we'll run here.
//두번째 인자 : testing function /
//It's a normal javascript function. In here, you're going to write your actual tests.
//Now to do that, you have to write 'it' which describes or allows you to write one
//individual test.

/*It */
//'It' 함수 : 첫번째 인자 - a description which appears in a console. and it usually complete
//the sentence. It should just be something meaningful you recognize in a console because
//if the test fails, you want to know which test failed.
// 두번째 인자 - testing function.

/*expect */
//inside expect, we define the thing we check. here we want to check if 'wrapper' contains
//certain element. and on the 'wrapper' we can use a utility function('find') provided by
//enzyme defined method which allows us to look into the wrapper and see if it contains
//a certain content.
//You could also expect you'll find it(the element) only once or twice or
//that you don't find it. (by using 'toHaveLength' method).

/*Enzyme*/
//we want to create an instance of this component (<Navigation/>) as it would be rendered
//to the dom, to the real dom through react and then have a look into the rendered component
//and see what was rendered for the case that the 'isAuthenticated' prop is false.

//Enzyme allows us to just render this <NavigationItem/> standalone, independent of the
//entire other react application. That's the whole idea behind the enzyme package, that
//we can really write unit tests, isolated tests, tests where we don't need to
//render the complete react app.

/*Shallow*/
//It is the most popular or the best way of rendering react components in many circumstances.
//enzyme offers two alternatives but shallow is the one you should use as often as possible
//because it renders the component with all its content but the content isn't deeply rendered.
//So the <NavigationItems/> has <NavigationItem/>s but these are only rendered as placeholders.
//the content of them isn't rendered. That of course, is important for creating isolated tests
//where we don't then render a whole sub tree of components.
//We just want to render <NavigationItem/> and know what's inside of it without rendering
//everything which is nested inside its included components.

/*test 시 console */
//Test Suits : describe함수건수
//Tests : It 함수건수
