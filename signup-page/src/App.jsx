import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router';

function App() {
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
    <div>
      <form className='flex flex-col bg-white absolute top-1/2 
      left-1/2 -translate-x-1/2 -translate-y-1/2 gap-y-2 p-5 pt-7' onSubmit={submitHandle}>
        <div className='flex flex-col gap-y-1 sm:grid sm:grid-cols-[10rem_12rem_2rem]'>
          <label htmlFor='fname'>First Name: </label>
          <input type='text' id='fname' className='border-1 border-black max-w-[12rem]' required
          onChange={fnameValid} value={fname.value}/>
          {!fname.valid && <p className='text-[#fc0303] text-sm sm:col-start-2'>{fname.message}</p>}
        </div>
        <div className='flex flex-col gap-y-1 sm:grid sm:grid-cols-[10rem_12rem_2rem]'>
          <label htmlFor='lname'>Last Name: </label>
          <input type='text' id='lname' className='border-1 border-black max-w-[12rem]' required
          onChange={lnameValid} value={lname.value}/>
          {!lname.valid && <p className='text-[#fc0303] text-sm sm:col-start-2'>{lname.message}</p>}
        </div>
        <div className='flex flex-col gap-y-1 sm:grid sm:grid-cols-[10rem_12rem_2rem]'>
          <label htmlFor='age'>Age: </label>
          <input type='text' id='age' className='border-1 border-black max-w-[12rem]' required
          onChange={ageValid} value={age.value}/>
          {!age.valid && <p className='text-[#fc0303] text-sm sm:col-start-2'>{age.message}</p>}
        </div>
        <div className='flex flex-col gap-y-1 sm:grid sm:grid-cols-[10rem_12rem_2rem]'>
          <label htmlFor='email'>E-mail: </label>
          <input id='email' type='text' 
          value={email.value} onChange={emailValid} 
          className='border-1 border-black max-w-[12rem]' required/>
          {!email.valid && <p className='text-[#fc0303] text-sm sm:col-start-2'>{email.message}</p>}
        </div>
        <div className='flex flex-col gap-y-1 sm:grid sm:grid-cols-[10rem_12rem_2rem]'>
          <label htmlFor='passw'>Password: </label>
          <div className='flex flex-row'>
            <input id='passw' type={passw.type} className='border-1 border-black max-w-[12rem]' required
            onChange={passwValid} value={passw.value}/>
            <button onClick={togglePassw} className='ml-2 sm:ml-2'>
              {passw.type === "password" ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off">
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
                <path d="m2 2 20 20"/></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-icon lucide-eye">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>}
            </button>
            </div>
          {!passw.valid && <p className='text-[#fc0303] text-sm sm:col-start-2'>{passw.message}</p>}
        </div>
        <div className='flex flex-col gap-y-1 sm:grid sm:grid-cols-[10rem_12rem_2rem]'>
          <label htmlFor="cpassw">Confirm Password: </label>
          <div className='flex flex-row'>
            <input id='cpassw' type={cpassw.type} className='border-1 border-black max-w-[12rem]' required
            value={cpassw.value} onChange={cpasswValid}/>
            <button onClick={toggleCpassw} className='ml-2 sm:ml-2'>
              {cpassw.type === "password" ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off">
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
                <path d="m2 2 20 20"/></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-icon lucide-eye">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>}
          </button>
          </div>
          {!cpassw.valid && <p className='text-[#fc0303] text-sm sm:col-start-2'>{cpassw.message}</p>}
        </div>
        <div className='flex flex-row justify-center pb-2'>
          <input type='submit' value="Sign-up" className='bg-[#f280d0] text-white p-3 rounded-full'/>
        </div>
      </form>
    </div>
  );
}

export default App
