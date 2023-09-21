import { Global } from "../utils/Global";
import { FormUser } from "../interfaces";
import { useEffect, useState } from "react";

export const getAllUsers = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, requestOptions);
        const json = await res.json();
        setData(json);
        setLoading(false);
        console.log(res)
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, error, loading };
};


export const getUser =  () => {
  
}



export const createUser = async (user: FormUser) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    const response = await fetch(Global.url + '/api/restful/user/register', requestOptions);
    if(response.status === 201) {
      return {status: 'success', message: 'Registro exitoso'}
    }
    const res_json = await response.json();
    if ( res_json.validationError ) {
      return {status: 'error', validationError: res_json.validationError}
    } else {
      return {status: 'success', message: res_json}
    }
  } catch (error: any) {
    if (error.message === "Failed to fetch") {
      return { status: 'error', message: 'Server conection failed. Please try again in a few minutes' }
    } else {
      return { status: 'error', message: error.message }
    }
  }
}

export const updateUsers = () => {
  return []
}

export const deleteUsers = () => {
  return []
}