import axios from "axios";
import { AxiosResponse } from "../app/models/AxiosResponse";
import { ACCESS_TOKEN, BASE_URL } from "../constants";

let config = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "access-control-allow-methods":"GET, POST, DELETE, PUT, OPTIONS, PATCH, HEAD",
    "Authorization": `Bearer ${ACCESS_TOKEN}`
  }
}

export const axiosPost = async (url: string, postBody: any): Promise<AxiosResponse> => {
  let result = {} as AxiosResponse;

  await axios.post(`${BASE_URL}${url}`, postBody, config)
  .then(function (response) {
    // handle success
    result.data = response.data;
  })
  .catch(function (error) {
    // handle error
    result.hasErrors = true;
    result.errorMessage = error;
  })
  .then(function () {
    // always executed
  });
  return result;
}
