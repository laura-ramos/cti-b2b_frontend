import { useState } from 'react'
import { User } from 'src/types';

interface FormState {
  inputValues: User
}

// This hook collect information of user Login and Forgot Password forms
export const useForm = (initalObj: FormState["inputValues"]) => {
  const [ form, setForm ] = useState(initalObj);

  const userInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = target;
    setForm ({
      ...form,
      [ name ]: value
    });

  }; 

  return {
    form,
    userInput
  };
}
