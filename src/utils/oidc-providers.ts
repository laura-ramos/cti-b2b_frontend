import { Global } from './Global'
import jwt_decode from 'jwt-decode'
import { sleep } from './helpers'

/**
 * Send information to backend API
 */ 
export const authLogin = (login: string, password: string) => {
  return new Promise(async (res, rej) => {
    try {
      let getUserInfo = {
        "login": login,
        "password": password
      }

      // Send info to backend and find user in DB
      const requestAPI = await fetch(Global.url + "/api/restful/user/login", {
        method: "POST",
        body: JSON.stringify(getUserInfo),
        headers: {"Content-type":"application/json"}
      })

      // Save data retrieved inside browser
      const fetchData = await requestAPI.json();
      
      if ( fetchData.error ) {
        return rej({ message: fetchData.error.message })
      } else {
        let userInfo = jwt_decode(fetchData.token);

        // Persist received data inside the browser
        localStorage.setItem("token", fetchData.token);
        localStorage.setItem("user", JSON.stringify(userInfo));
        return res({ profile: { login: login } })
      } 
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        return rej({ message: "Server conection failed. Please try again in a few minutes" })
      } else {
        return rej({ message: error.message })
      }
    }
  })
}

export const getAuthStatus = () => {
  return new Promise(async (res, rej) => {
    await sleep(500);
    try {
      let authentication = localStorage.getItem('user');
      if (authentication) {
        authentication = JSON.parse(authentication);
        return res(authentication);
      }
      return res(undefined);
    } catch (error) {
      return res(undefined);
    }
  });
};
