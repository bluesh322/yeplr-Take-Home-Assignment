import axios from "axios";




const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class YeplrApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${YeplrApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response
      throw Array.isArray(message) ? message : [message];
    }
  }

  /**
   * Get Users from Yeplr
   * 
   * Returns: {userinfo}
   * 
   */

  static async getUsers() {
      let res = await this.request(`users`);
      return res;
  }

  static async getUserById(id) {
    let res = await this.request(`users/${id}`);
    return res;
  }

  /**
   * Add a user to data store for Yeplr
   * 
   * returns: {userinfo}
   */

  static async register(registerData) {
    let res = await this.request(`users`, registerData, "post");
    return res;
  }

  /**
   * Admin Login for Yeplr
   * 
   * returns a token when user "test", and password "test" entered.
   */

  static async adminLogin(loginData) {
    //typically this would be checked against what is stored in a database 
    //but since I only have 1
    //admin, we can just do it all here.
    //this is not safe, just a demonstration
    //NOTE webpack is not happy with a dependency in bcrypt or jsonwebtokens
    //I have no idea where this issue could be created
    //and I don't have the time to research this issue.
    if(loginData.username !== "test") {
      console.error("Login Error")
      throw Error("Login Failed");
    }
    //const hashedPassword = await bcrypt.hash("test", 12);
    //    if(bcrypt.compare(hashedPassword, loginData.password)) 
    if(loginData.password === "test"){
      delete loginData.password;
    } else {
      console.error("Login Error:");
      throw Error("Login Failed");
    }
    const token = loginData.username;
    return token;
  }
}

export default YeplrApi;