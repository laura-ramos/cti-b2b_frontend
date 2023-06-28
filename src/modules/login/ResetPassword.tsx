import { Form, Card, InputGroup } from 'react-bootstrap'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { setWindowClass } from '../../utils/helpers'
import { Link, NavLink } from 'react-router-dom'
import { DateTime } from "luxon"

const ResetPassword = () => {

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('globalMessages.input.required'),
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
            You forgot your password? Here you can easily retrieve a new password.
            </p>
            <form className='lockscreen-credentials' onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text className=""><i className="fas fa-envelope" /></InputGroup.Text>
                <Form.Control 
                  id="email"
                  type="email" 
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
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

export default ResetPassword;
