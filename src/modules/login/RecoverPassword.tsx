import { Form, Card, InputGroup } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { setWindowClass } from '../../utils/helpers'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { DateTime } from 'luxon'

const RecoverPassword = () => {

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, 'password.validation.min')
        .max(15, 'password.validation.max')
        .required('globalMessages.input.required'),
      confirm_password: Yup.string()
        .min(5, 'password.validation.min')
        .max(15, 'password.validation.max')
        .required('globalMessages.input.required'),
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
            You are only one step a way from your new password, recover your password now.
            </p>
            <form className='lockscreen-credentials' onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
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
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (null)}
              </InputGroup>
              <InputGroup className="mb-3">
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
                {touched.confirm_password && errors.confirm_password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm_password}
                  </Form.Control.Feedback>
                ) : (null)}
                <div className="input-group-append">
                  <button type="submit" className="btn">
                    <i className="fas fa-arrow-right text-muted" />
                  </button>
                </div>
              </InputGroup>
            </form>
          
          </Card.Body>
        </Card>

        {/* /.lockscreen-item */}
        
        <div className="help-block text-center">
          To start working, please log in
        </div>
        <div className="text-center">
          <NavLink to="/login" className="text-danger">Login</NavLink>
        </div>
        <div className="help-block text-center">
          <br />
          <small>
            If you reached this website by mistake, here you can consult the
            <a href="#" className="text-danger"> official site</a> of COATI Technologies
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
