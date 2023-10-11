import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as Yup from "yup";
import { createUser, getUser } from '../../services/Users';
import { toast } from 'react-toastify';
import { FormUser } from "../../interfaces";
import { useEffect, useState } from 'react';

interface Props {
  isAddMode: boolean;
  idUser: number;
}

export const FormRegister = ({isAddMode, idUser} : Props) => {
  const [userForm, setUserForm] = useState<FormUser>({
    name: '', 
    surname: '', 
    email: '', 
    login: '', 
    photo: '', 
    password: '', 
    confirm_password: '', 
    rol: ''
  });

  const validateUser = Yup.object().shape({
    name: Yup.string().required('Required').min(2, "The name field must be minimum 2 char"),
    surname: Yup.string().required('Required').min(2, 'The surname field must be minimum 2 char'),
    email: Yup.string().email('Invalid email').required('Required').min(4, 'The email field must be minimum 4 char'),
    login: Yup.string().required('Required').min(4, 'The login field must be minimum 4 char'),
    password: Yup.string().min(12, "The password field must be minimum 12 char"),
    confirm_password: Yup.string().min(12, "The password field must be minimum 12 char"),
    rol: Yup.string().required('Required'),
  });

  const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
    initialValues: userForm,
    validationSchema: validateUser,
    onSubmit: async (values, actions) => {
      const res = await createUser(values)
      if(res.status == 'success') {
        toast.success(res.message)
        actions.resetForm()
      } else {
        actions.setErrors(res.validationError ?? [])
        toast.error(res.message)
      }
    },
    enableReinitialize: true,
  });

  // get data user by id
  const fetchData = async () => {
    const res = await getUser(idUser)
    if(res.status == 'success') {
      setUserForm(res.data)
    } else {
      toast.error(res.message)
    }
  };

  useEffect(() => {
    if (!isAddMode) {
      fetchData();
    }
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="InputName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={values.name} 
            onChange={handleChange} 
            isValid={touched.name && !errors.name}
            isInvalid={touched.name && !!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="InputLast">
          <Form.Label>Last name</Form.Label>
          <Form.Control 
            type="text" 
            name="surname" 
            value={values.surname} 
            onChange={handleChange}
            isValid={touched.surname && !errors.surname}
            isInvalid={touched.surname && !!errors.surname}
          />
          <Form.Control.Feedback type="invalid">
            {errors.surname}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="InputEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={values.email} 
            onChange={handleChange}
            isValid={touched.email && !errors.email}
            isInvalid={touched.email && !!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="InputLogin">
          <Form.Label>User name</Form.Label>
          <Form.Control 
            type="text" 
            name="login" 
            value={values.login} 
            onChange={handleChange}
            isValid={touched.login && !errors.login}
            isInvalid={touched.login && !!errors.login}
          />
          <Form.Control.Feedback type="invalid">
            {errors.login}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="InputPass">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={values.password} 
            onChange={handleChange}
            isValid={touched.password && !errors.password}
            isInvalid={touched.password && !!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="InputPassConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            name="confirm_password" 
            value={values.confirm_password} 
            onChange={handleChange}
            isValid={touched.confirm_password && !errors.confirm_password}
            isInvalid={touched.confirm_password && !!errors.confirm_password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirm_password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="InputRol">
          <Form.Label>Rol</Form.Label>
          <Form.Select 
            className='form-control'
            name="rol" 
            value={values.rol} 
            onChange={handleChange}
            isValid={touched.rol && !errors.rol}
            isInvalid={touched.rol && !!errors.rol}
          >
            <option>Select rol</option>
            <option value="1">Administrador</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.rol}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="border-top pt-3">
          <Button variant="primary" type="submit" disabled={isSubmitting}>
             {isAddMode ? 'Save' : 'Save changes'}
          </Button>
        </div>
      </Form>
    </>
  )
}