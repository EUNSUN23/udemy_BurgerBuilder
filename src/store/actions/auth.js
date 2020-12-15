import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  //authenticate 시작하면 loading 메세지 띄우는 action creator.
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  //1시간 지나서 토큰이 expire되면 로그아웃되었다는 ui창 띄우기
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  /*isSignup : 회원가입 vs 로그인*/
  return (dispatch) => {
    //... authenticate user
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    /*회원가입: (구글검색)firebase auth rest api > API KEY 부분에 
      내 firebase 설정>프로젝트설정>일반 에서 API KEY 복사해서 붙이면 됨. */
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBepqx1s3T66CIUQd4MOChfSUqKx1S0r6A";

    if (!isSignup) {
      /*로그인: (구글검색)firebase api reference > REST > authentication & user management >
  Sign in with email / password 섹션의 endpoint*/
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBepqx1s3T66CIUQd4MOChfSUqKx1S0r6A";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        //토큰 받은 당시 시간 + 토큰 유효 시간
        /*response.data)
        expiresIn : token이 valid한 기간(초단위). 이 시간이 지나면 다시 로그인 해야함. 
        idToken : 토큰
        refreshToken : 새로운 idToken 받을 수 있는 token.   
        */
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        debugger;
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      //what we retrieve from the localStorage is string, but with new Date(),
      //we can covert it into a date object.

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
        //Of course we could also simply store it(token) in localStorage and that wouldn't be wrong.
        //but you can however also send the request to the firebase auth API to get from there. (여기서는 그냥 local에 저장하는게 더 simple)
      } else {
        dispatch(logout());
      }
    }
  };
};
