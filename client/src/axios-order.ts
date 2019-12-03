import axios from "axios";

const instance = axios.create({
  baseURL: "https://dollyp-ecommerce-api-tsc.herokuapp.com/",
});

// const instance = axios.create({
//   baseURL: "http://localhost:6000",
// });

export default instance;
