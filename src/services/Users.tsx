import { Global } from "../utils/Global";
import { FormUser } from "../interfaces";
import { useEffect, useState } from "react";


/** Specify default headers to use. */
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token')
};

// Get data all users
export const getAllUsers = (url: string) => {
  
};

// Create new users
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

// Get data user by id
export const getUser =  async (id: number) => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: defaultHeaders
    };
    const response = await fetch(Global.url + '/api/restful/user/profile?id='+id, requestOptions);
    const res_json = await response.json();
    // return data user
    return {status: 'success', data: res_json}
  } catch (error: any) {
    if (error.message === "Failed to fetch") {
      return { status: 'error', message: 'Server conection failed. Please try again in a few minutes' }
    } else {
      return { status: 'error', message: error.message }
    }
  }
}

// Update user
export const updateUser = () => {
  return []
}

// Disable user
export const deleteUser = () => {
  return []
}