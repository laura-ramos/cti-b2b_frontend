import { Form, Card, InputGroup } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { setWindowClass } from '../../utils/helpers'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const RecoverPassword = () => {
  const {t, i18n} = useTranslation()
  // For first time accesss, set the user prefered language
  useEffect(() => {
    var userLang = navigator.language
    userLang = userLang.slice(0, 2)
    i18n.changeLanguage(userLang)
  }, [])

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, t<string>('login.validation.minPass'))
        .max(30, t<string>('login.validation.maxPass'))
        .required(t<string>('globalMessages.input.required')),
      confirm_password: Yup.string()
        .min(5, t<string>('login.validation.minPass'))
        .max(30, t<string>('login.validation.maxPass'))
        .required(t<string>('globalMessages.input.required'))
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  });
  // Add AdminLTE CSS classes to Body tag
  setWindowClass('hold-transition login-page');
  
  return (
    <>
      <div className="lockscreen-wrapper">
        <div className="lockscreen-logo">
        <Link to="/"><b>B2B</b>&nbsp;Admin</Link>
        </div>
        <Card>
          <Card.Body>
            <p className="text-center">
              {t<string>('recover.oneStepAway')}
            </p>
            <form className='lockscreen-credentials' onSubmit={handleSubmit}>
              <InputGroup className="mb-1">
                <InputGroup.Text className=""><i className="fas fa-envelope" /></InputGroup.Text>
                <Form.Control 
                  id="password"
                  name="password"
                  type="password" 
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                  autoFocus
                />
                <div className="input-group-append">
                  <button type="button" className="btn">
                    <i className="fas fa-arrow-right text-white" />
                  </button>
                </div>
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (null)}
              </InputGroup>
              <InputGroup className="">
                <InputGroup.Text className=""><i className="fas fa-envelope" /></InputGroup.Text>
                <Form.Control 
                  id="confirm_password"
                  name="confirm_password"
                  type="password" 
                  placeholder="Confirm password"
                  onChange={handleChange}
                  value={values.confirm_password}
                  isValid={touched.confirm_password && !errors.confirm_password}
                  isInvalid={touched.confirm_password && !!errors.confirm_password}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn">
                    <i className="fas fa-arrow-right text-muted" />
                  </button>
                </div>
                {touched.confirm_password && errors.confirm_password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm_password}
                  </Form.Control.Feedback>
                ) : (null)}

              </InputGroup>
            </form>
          </Card.Body>
        </Card>

        {/* /.lockscreen-item */}
        
        <div className="text-center">
          <NavLink to="/login" className="text-danger">Back to login</NavLink>
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
      </div>

    </>
  )
}

export default RecoverPassword;
