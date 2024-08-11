/** @format */

import axios from "axios";

class HttpService {
  handleError(error) {
    console.log(error);
  }
  static create(url, body) {
    try {
      const response = axios.post(url, body);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static read(url, query) {
    try {
      const resaponse = axios.get(url, query);
      return resaponse.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static update(url, body) {
    try {
      const response = axios.patch(url, body);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static delete(url, body) {
    try {
      const response = axios.patch(url, body);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default HttpService;
