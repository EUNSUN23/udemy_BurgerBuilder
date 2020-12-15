import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

// 리액트 컴포넌트 쓸 일이 없기 때문에 enzyme 필요없음.
describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-userId",
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-userId",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
