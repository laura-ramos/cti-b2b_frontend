export interface User {
  id: number,
  name: string,
  surname: string,
  email: string,
  login: string,
  photo: string,
  rol: string,
  status: boolean,
}

export interface FormUser {
  name: string,
  surname: string,
  email: string,
  login: string,
  photo: string,
  password: string,
  confirm_password: string
  rol?: string,
}

export interface Actions {
  
}