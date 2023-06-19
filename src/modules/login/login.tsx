import React, { useState, useReducer } from "react"
import jwt_decode from 'jwt-decode'
import { DateTime } from "luxon";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import * as Yup from 'yup';
import { Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useForm } from "../../hooks/useForm"
import { setWindowClass } from '../../utils/helpers'
//import useAuth from "../../hooks/useAuth"
import { Global } from '../../utils/Global'
//import { User } from "src/types"

const Login = () => {
  // Collect user input
  //const { formData, userInput } = useForm(INITIAL_STATE);

  // Stores data received by endpoint response
  //const [ logged, setLogged ] = useState("not_sended");
  const [isAuthLoading, setAuthLoading] = useState(false);
  const [ message, setMessage ] = useState("");

  {/* Send information to backend API */}
  const login = async(login: string, password: string) => {
    try {
      let getUserInfo = "login: " + login + "password: " + password //formData;  
          // Send info to backend and find user in DB
          console.log(getUserInfo)
      const requestAPI = await fetch(Global.url + "/api/restful/user/login", {
        method: "POST",
        body: JSON.stringify(getUserInfo),
        headers: {"Content-type":"application/json"}
      });

      // Save data retrieved inside browser
      const fetchData = await requestAPI.json();

      if ( fetchData.error ) {
        //setLogged("error");
        //setMessage(fetchData.error.message);
        console.log(message);
      } else {
        //setLogged("loginOK");
        let userInfo = jwt_decode(fetchData.token);

        // Persist received data inside the browser
        localStorage.setItem("token", fetchData.token);
        localStorage.setItem("user", JSON.stringify(userInfo));

        // Set received data in auth hook
        //setAuth(userInfo);

        // Always redirect after successful login
        //window.location.assign("/dashboard");

      } 
    } catch (error: any) {
      setAuthLoading(false);
      if (error.message === "Failed to fetch") {
        var displayMessage = "Server conection failed. Please try again in a few minutes"
      } else {
        displayMessage = error.message
      }

      // Show error message using React-toastify. Ref.: https://fkhadra.github.io/react-toastify
      toast.error(displayMessage || 'Failed');
      
    }
  };

  // Controls Form visualization using FORMIK. Ref.: https://formik.org/
  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(12, 'Must be 12 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      login(values.login, values.password);
    },
  });

  // Add AdminLTE CSS classes to Body tag
  setWindowClass('hold-transition login-page');

  return (
    <>
      {/* Automatic element centering */}
      <div className="lockscreen-wrapper">
        <div className="lockscreen-logo">
        <Link to="/"><b>B2B</b>&nbsp;Admin</Link>
        </div>
        {/* User name */}
        <div className="lockscreen-name text-center">COATI Technologies</div>

        {/* START LOCK SCREEN ITEM */}
        <div className="lockscreen-item">
          {/* lockscreen image */}
          <div className="lockscreen-image">
            <img src="../../dist/img/user1-128x128.jpg" alt="User Image" />
          </div>
          {/* /.lockscreen-image */}

          {/* lockscreen credentials (contains the form) */}
          <form className="lockscreen-credentials" onSubmit={handleSubmit}>
            <div className="input-group">
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fas fa-user" />
                </InputGroup.Text>
                <Form.Control
                  id="cti-login"
                  name="login"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  value={values.login}
                  isValid={touched.login && !errors.login}
                  isInvalid={touched.login && !!errors.login}
                />
                {touched.login && errors.login ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.login}
                  </Form.Control.Feedback>
                ) : (null)}
                
              </InputGroup>
            </div>
            <div className="input-group">
              <InputGroup className="mb-3">
                <InputGroup.Text>
                    <i className="fas fa-lock" />
                </InputGroup.Text>
                <Form.Control
                  id="cti-password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (null)}
                <div className="input-group-append">
                  <button type="submit" className="btn">
                    <i className="fas fa-arrow-right text-muted" />
                  </button>
                </div>
              </InputGroup>
              
            </div>
            
       
          </form>
          {/* /.lockscreen credentials */}

        </div>
        {/* /.lockscreen-item */}
        
        <div className="help-block text-center">
          Enter your password to retrieve your session
        </div>
        <div className="text-center">
          <a href="login.html">Or sign in as a different user</a>
        </div>
        <div className="lockscreen-footer text-center">
          Copyright © 2014-2021 <b><a href="https://adminlte.io" className="text-warning">AdminLTE.io</a></b>
          <br/>&nbsp;2018-{DateTime.now().toFormat("y")} 
          <b><a href="#" className="text-warning">&nbsp;COATI Technologies</a></b><br/>
          All rights reserved
        </div>
        
        
        <br />
      </div>
      
      {/* /.center */}
    </>
  )
}

export default Login;