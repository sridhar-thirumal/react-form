import { useState } from 'react'
import { useNavigate } from 'react-router';
import InputField from './InputField';
import PasswordField from './PasswordField';

function SignUpForm() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nav = useNavigate();

  const [email, setEmail] = useState({
    value: "",
    valid: true,
    message: "",
  });

  const [fname, setFname] = useState({
    value: "",
    valid: true,
    message: "",
  });

  const [lname, setLname] = useState({
    value: "",
    valid: true,
    message: "",
  });

  const [age, setAge] = useState({
    value: "",
    valid: true,
    message: "",
  });

  const [passw, setPassw] = useState({
    value: "",
    valid: true,
    type: "password",
    message: "",
  });

  const [cpassw, setCpassw] = useState({
    value: "",
    valid: true,
    type: "password",
    message: "",
  });

  const emailValid = (e) => {
    if(e.target.value.length === 0) {
      setEmail({
        value: e.target.value,
        valid: false,
        message: "!Required"
      })
    }
    else if(emailRegex.test(e.target.value)) {
      setEmail({
        value: e.target.value,
        valid: true,
        message: "",
      });
    }
    else {
      setEmail({
        value: e.target.value,
        valid: false,
        message: "!Invalid Email"
      });
    }
  };

  const fnameValid = (e) => {
    if(e.target.value.length === 0) {
      setFname({
        value: e.target.value,
        valid: false,
        message: "!Required",
      });
    }
    else if(e.target.value.length > 25) {
      setFname({
        value: e.target.value,
        valid: false,
        message: "!Too long"
      });
    }
    else {
      setFname({
        value: e.target.value,
        valid: true,
        message: "",
      });
    }
  };

  const lnameValid = (e) => {
    if(e.target.value.length === 0) {
      setLname({
        value: e.target.value,
        valid: false,
        message: "!Required"
      });
    }
    else if(e.target.value.length > 25) {
      setLname({
      value: e.target.value,
      valid: false,
      message: "!Too long",
      });
    }
    else {
      setLname({
        value: e.target.value,
        valid: true,
        message: "",
      });
    }
  }

  const ageValid = (e) => {
    const age = parseInt(e.target.value);
    if(e.target.value.length === 0) {
      setAge({
        value: e.target.value,
        valid: false,
        message: "!Required",
      });
    }
    else if(!isNaN(age)) {
      if(age < 18) {
        setAge({
          value: e.target.value,
          valid: false,
          message: "!Atleast 18 required"
        });
      }
      else {
        setAge({
          value: e.target.value,
          valid: true,
          message: "",
        });
      }
    }
    else {
      setAge({
        value: e.target.value,
        valid: false,
        message: "!Enter number"
      });
    }
  };

  const passwValid = (e) => {
    if(e.target.value.length === 0) {
      setPassw({
        ...passw,
        value: e.target.value,
        valid: false,
        message: "!Required",
      });
    }
    else if(e.target.value.length >= 8 || /[A-Z]/.test(e.target.value)) {
      setPassw({
        ...passw,
        value: e.target.value,
        valid: true,
        message: "",
      });
    }
    else {
      setPassw({
        ...passw,
        value: e.target.value,
        valid: false,
        message: "!Invalid password"
      });
    }
  };

  const cpasswValid = (e) => {
    if(e.target.value.length === 0) {
      setCpassw({
        ...cpassw,
        value: e.target.value,
        valid: false,
        message: "!Required",
      });
    }
    else if(e.target.value === passw.value) {
      setCpassw({
        ...cpassw,
        value: e.target.value,
        valid: true,
        message: "",
      });
    }
    else {
      setCpassw({
        ...cpassw,
        value: e.target.value,
        valid: false,
        message: "!Passwords don't match",
      });
    }
  };

  const togglePassw = () => {
    if(passw.type === "password") {
      setPassw({
        ...passw,
        type: "text",
      });
    }
    else{
      setPassw({
        ...cpassw,
        type: "password"
      });
    }
  };

  const toggleCpassw = () => {
    if(cpassw.type === "password"){
      setCpassw({
        ...cpassw,
        type: "text",
      });
    }
    else {
      setCpassw({
        ...cpassw,
        type: "password",
      });
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if(email.valid && fname.valid && lname.valid && age.valid && passw.valid && cpassw.valid)
      nav("/success");
  };

  return (
    <form className='flex flex-col bg-white absolute top-1/2 
    left-1/2 -translate-x-1/2 -translate-y-1/2 gap-y-2 p-5 pt-7' onSubmit={submitHandle}>
        <InputField id="fname" onChange={fnameValid} value={fname.value}
        valid={fname.valid} message={fname.message} name="First Name"/>
        <InputField id="lname" onChange={lnameValid} value={lname.value}
        valid={lname.valid} message={lname.message} name="Last Name"/>
        <InputField id="age" onChange={ageValid} value={age.value}
        valid={age.valid} message={age.message} name="Age"/>
        <InputField id="email" onChange={emailValid} value={email.value}
        valid={email.valid} message={email.message} name="Email"/>
        <PasswordField id="passw" onChange={passwValid} value={passw.value}
        valid={passw.valid} message={passw.message} toggle={togglePassw}
        type={passw.type} name="Password"/>
        <PasswordField id="cpassw" onChange={cpasswValid} value={cpassw.value}
        valid={cpassw.valid} message={cpassw.message} toggle={toggleCpassw}
        type={cpassw.type} name="Confirm Password"/>
        <div className='flex flex-row justify-center pb-2'>
            <input type='submit' value="Sign-up" className='bg-[#f280d0] text-white p-3 rounded-full'/>
        </div>
    </form>
  );
}

export default SignUpForm;