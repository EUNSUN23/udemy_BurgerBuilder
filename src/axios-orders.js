import axios from "axios";

const instance = axios.create({
  //firebase 주소
  baseURL: "https://burgerbuilder-react-redux.firebaseio.com",
});

export default instance;
