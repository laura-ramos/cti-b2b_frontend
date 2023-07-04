import { Form, Card, InputGroup } from 'react-bootstrap'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { setWindowClass } from '../../utils/helpers'
import { Link, NavLink } from 'react-router-dom'
import { DateTime } from "luxon"
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const ResetPassword = () => {
  const {t, i18n} = useTranslation()
  // For first time accesss, set the user prefered language
  useEffect(() => {
    var userLang = navigator.language
    userLang = userLang.slice(0, 2)
    i18n.changeLanguage(userLang)
  }, [])

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required(t<string>('globalMessages.input.required')),
    }),
    onSubmit: (values) => {
      //send email
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
              {t<string>('recover.forgotYourPassword')}
            </p>
            <form className='lockscreen-credentials' onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text className=""><i className="fas fa-envelope" /></InputGroup.Text>
                <Form.Control 
                  id="email"
                  type="email" 
                  name="email"
                  placeholder={t<string>('recover.email')}
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                  autoFocus
                />
                <div className="input-group-append">
                  <button type="submit" className="btn">
                    <i className="fas fa-arrow-right text-muted" />
                  </button>
                </div>
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : (null)}
              </InputGroup>
            </form>
          </Card.Body>
        </Card>

        {/* /.lockscreen-item */}
        
        <div className="text-center">
          <NavLink to="/login" className="text-danger">{t<string>('recover.backToLogin')}</NavLink>
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

export default ResetPassword;
