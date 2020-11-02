import axios from "axios";

const instance = axios.create({
  //firebase 주소
  baseURL: "https://react-burger-builder2-2386c.firebaseio.com/",
});

export default instance;
