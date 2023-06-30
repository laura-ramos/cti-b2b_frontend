import { useEffect } from "react"
import { DateTime } from "luxon"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Form, InputGroup } from 'react-bootstrap'
import { toast } from 'react-toastify';

import { setWindowClass } from '../../utils/helpers'
import { setAuthentication } from '../../store/reducers/auth'
import { authLogin } from '../../utils/oidc-providers';
//import useAuth from "../../hooks/useAuth"

//import { User } from "src/types"
const Login = () => {
  const {t, i18n} = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // For first time accesss, set the user prefered language
  useEffect(() => {
    var userLang = navigator.language
    userLang = userLang.slice(0, 2)
    i18n.changeLanguage(userLang)
  }, [])

  const login = async(login: string, password: string) => {
    try {
      const response = await authLogin(login, password)
      dispatch(setAuthentication(response as any))
      // Show messages using React-toastify. Ref.: https://fkhadra.github.io/react-toastify
      toast.success('Login is succeed!')
      navigate('/')
    } catch (error: any) {
      toast.error(error.message || 'Failed');
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
        .min(5, t<string>('login.validation.min'))
        .max(15, t<string>('login.validation.max'))
        .required(t<string>('globalMessages.input.required')),
      password: Yup.string()
        .min(12, t<string>('login.validation.minPass'))
        .max(30, t<string>('login.validation.maxPass'))
        .required(t<string>('globalMessages.input.required')),
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
            <img src="/img/user.png" alt="User Image" />
          </div>
          {/* /.lockscreen-image */}

          {/* lockscreen credentials (contains the form) */}
          <form className="lockscreen-credentials" onSubmit={handleSubmit}>
            <div className="input-group">
              <InputGroup className="mb-1">
                <InputGroup.Text>
                  <i className="fas fa-user" />
                </InputGroup.Text>
                <Form.Control
                  id="cti-login"
                  name="login"
                  type="text"
                  placeholder={t<string>('login.placeholder.username')}
                  onChange={handleChange}
                  value={values.login}
                  isValid={touched.login && !errors.login}
                  isInvalid={touched.login && !!errors.login}
                />
                <div className="input-group-append">
                  <button type="button" className="btn">
                    <i className="fas fa-arrow-right text-white" />
                  </button>
                </div>
                {touched.login && errors.login ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.login}
                  </Form.Control.Feedback>
                ) : (null)}
                
              </InputGroup>
            </div>
            <div className="input-group">
              <InputGroup className="">
                <InputGroup.Text>
                    <i className="fas fa-lock" />
                </InputGroup.Text>
                <Form.Control
                  id="cti-password"
                  name="password"
                  type="password"
                  placeholder={t<string>('login.placeholder.password')}
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn">
                    <i className="fas fa-arrow-right text-muted" />
                  </button>
                </div>
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (null)}
              </InputGroup>
              
            </div>
            
       
          </form>
          {/* /.lockscreen credentials */}

        </div>
        {/* /.lockscreen-item */}
        
        <div className="help-block text-center">
         {t<string>('login.label.helpText')}
        </div>
        <div className="text-center">
          <NavLink to="/password/reset" className="text-danger">{t<string>('login.label.forgotPassword')}</NavLink>
        </div>
        <div className="help-block text-center">
          <br />
          <small>
          {t<string>('login.label.reachedMistake')}
            <a href="#" className="text-danger"> {t<string>('login.label.site')}</a> {t<string>('login.label.coati')}
          </small>
        </div>
        <div className="lockscreen-footer text-center">
          Copyright © 2014-2021 <a href="https://adminlte.io" className="text-warning">AdminLTE.io</a>
          <br/>&nbsp;2018-{DateTime.now().toFormat("y")} 
          <a href="#" className="text-warning">&nbsp;COATI Technologies</a><br/>
          All rights reserved
        </div>
        
        
        <br />
      </div>
      
      {/* /.center */}
    </>
  )
}

export default Login;
