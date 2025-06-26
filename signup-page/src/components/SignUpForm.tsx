import { use, useState } from 'react'
import { useNavigate } from 'react-router';
import InputField from './InputField';
import PasswordField from './PasswordField';

function SignUpForm() {
  type fieldState = {
    value: string;
    valid: boolean;
    message: string;
    type?: "text" | "password";
  };
  type validatorFn = (value: string, allFields?: Record<string, fieldState>) => Partial<fieldState>;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nav = useNavigate();

  const validators: Record<string, validatorFn> = {
    fname: (val) => {
      if(!val)
        return {valid: false, message: "!Required"};
      else if(val.length > 25)
        return {valid: false, message: "!Name too long"};
      else
        return {valid: true, message: ""};
    },
    lname: (val) => {
      if(!val)
        return {valid: false, message: "!Required"};
      else if(val.length > 25)
        return {valid: false, message: "!Name too long"};
      else
        return {valid: true, message: ""};
    },
    email: (val) => {
      if(!val)
        return {valid: false, message: "!Required"};
      else if(emailRegex.test(val))
        return {valid: true, message: ""};
      else
        return {valid: false, message: "!Invalid Email"};
    },
    age: (val) => {
      if(!val)
        return {valid: false, message: "!Required"};
      const a = parseInt(val);
      if(isNaN(a))
        return {valid: false, message: "!Enter number"};
      else if(a < 18)
        return {valid: false, message: "!Atleast 18 required"};
      else
        return {valid: true, message: ""};
    },
    passw: (val) => {
      if(!val)
        return {valid: false, message: "!Required"};
      else if(val.length >= 8 || /[A-Z]/.test(val))
        return {valid: true, message: ""};
      else
        return {valid: false, message: "!Invalid Password"};
    },
    cpassw: (val) => {
      if(!val)
        return {valid: false, message: "!Required"};
      else if(val === fields.passw.value)
        return {valid: true, message: ""};
      else
        return {valid: false, message: "!Passwords dont match"};
    },
  };

  //in useField custom hook
  function useField(name: string, inititalType?: "password" | "text") {
    const [field, setField] = useState({
      value: "",
      valid: true,
      message: "",
      type: inititalType,
    });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value;
      const validator = validators[name];
      const result = validator(newVal);
      setField({
        ...field,
        value: newVal,
        ...result,
      });
    };

    const toggleType = () => {
      if(!field.type) return;
      setField({
        ...field,
        type: field.type === "password" ? "type": "password",
      });
    };
    return {...field, onChange, toggleType};
  }

  const fields = {
    fname: useField("fname"),
    lname: useField("lname"),
    age: useField("age"),
    email: useField("email"),
    passw: useField("passw", "password"),
    cpassw: useField("cpassw", "password"),
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(fields.email.valid && fields.fname.valid && fields.lname.valid && fields.age.valid && fields.passw.valid && fields.cpassw.valid)
      nav("/success");
  };

  return (
    <form className='flex flex-col bg-white absolute top-1/2 
    left-1/2 -translate-x-1/2 -translate-y-1/2 gap-y-2 p-5 pt-7' onSubmit={submitHandle}>
        <InputField id="fname" onChange={fields.fname.onChange} value={fields.fname.value}
        valid={fields.fname.valid} message={fields.fname.message} name="First Name"/>
        <InputField id="lname" onChange={fields.lname.onChange} value={fields.lname.value}
        valid={fields.lname.valid} message={fields.lname.message} name="Last Name"/>
        <InputField id="age" onChange={fields.age.onChange} value={fields.age.value}
        valid={fields.age.valid} message={fields.age.message} name="Age"/>
        <InputField id="email" onChange={fields.email.onChange} value={fields.email.value}
        valid={fields.email.valid} message={fields.email.message} name="Email"/>
        <PasswordField id="passw" onChange={fields.passw.onChange} value={fields.passw.value}
        valid={fields.passw.valid} message={fields.passw.message} toggle={fields.passw.toggleType}
        type={fields.passw.type} name="Password"/>
        <PasswordField id="cpassw" onChange={fields.cpassw.onChange} value={fields.cpassw.value}
        valid={fields.cpassw.valid} message={fields.cpassw.message} toggle={fields.cpassw.toggleType}
        type={fields.cpassw.type} name="Confirm Password"/>
        <div className='flex flex-row justify-center pb-2'>
            <input type='submit' value="Sign-up" className='bg-[#f280d0] text-white p-3 rounded-full'/>
        </div>
    </form>
  );
}

export default SignUpForm;