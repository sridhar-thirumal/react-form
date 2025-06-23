import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router';

function App() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nav = useNavigate();

  const [email, setEmail] = useState({
    value: "",
    valid: true,
  });

  const [fname, setFname] = useState({
    value: "",
    valid: true,
  });

  const [lname, setLname] = useState({
    value: "",
    valid: true,
  });

  const [age, setAge] = useState({
    value: "",
    valid: true,
  });

  const [passw, setPassw] = useState({
    value: "",
    valid: true,
    type: "password",
  });

  const [cpassw, setCpassw] = useState({
    value: "",
    valid: true,
    type: "password",
  });

  const emailValid = (e) => {
    if(emailRegex.test(e.target.value)) {
      setEmail({
        value: e.target.value,
        valid: true,
      });
    }
    else {
      setEmail({
        value: e.target.value,
        valid: false,
      });
    }
  };

  const fnameValid = (e) => {
    if(e.target.value.length > 25) {
      setFname({
        value: e.target.value,
        valid: false,
      });
    }
    else {
      setFname({
        value: e.target.value,
        valid: true,
      });
    }
  };

  const lnameValid = (e) => {
    if(e.target.value.length > 25) {
      setLname({
      value: e.target.value,
      valid: false,
      });
    }
    else {
      setLname({
        value: e.target.value,
        valid: true,
      });
    }
  }

  const ageValid = (e) => {
    const age = parseInt(e.target.value);
    if(!isNaN(age)) {
      if(age < 18) {
        setAge({
          value: e.target.value,
          valid: false,
        });
      }
      else {
        setAge({
          value: e.target.value,
          valid: true,
        });
      }
    }
    else {
      setAge({
        value: e.target.value,
        valid: false,
      });
    }
  };

  const passwValid = (e) => {
    if(e.target.value.length >= 8 || /[A-Z]/.test(e.target.value)) {
      setPassw({
        ...passw,
        value: e.target.value,
        valid: true,
      });
    }
    else {
      setPassw({
        ...passw,
        value: e.target.value,
        valid: false,
      });
    }
  };

  const cpasswValid = (e) => {
    if(e.target.value === passw.value) {
      setCpassw({
        ...cpassw,
        value: e.target.value,
        valid: true,
      });
    }
    else {
      setCpassw({
        ...cpassw,
        value: e.target.value,
        valid: false,
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
      <form className='flex flex-col items-center bg-white absolute top-1/2 
      left-1/2 -translate-x-1/2 -translate-y-1/2' onSubmit={submitHandle}>
        <div className='flex flex-row'>
          <label htmlFor='fname'>First Name: </label>
          <input type='text' id='fname' className='border-1 border-black' required
          onChange={fnameValid} value={fname.value}/>
        </div>
        {!fname.valid && <p>!Firstname too long</p>}
        <div className='flex flex-row'>
          <label htmlFor='lname'>Last Name: </label>
          <input type='text' id='lname' className='border-1 border-black' required
          onChange={lnameValid} value={lname.value}/>
        </div>
        {!lname.valid && <p>!Lastname too long</p>}
        <div className='flex flex-row'>
          <label htmlFor='age'>Age: </label>
          <input type='text' id='age' className='border-1 border-black' required
          onChange={ageValid} value={age.value}/>
        </div>
        {!age.valid && <p>!Input num greater than 17</p>}
        <div className='flex flex-row'>
          <label htmlFor='email'>E-mail: </label>
          <input id='email' type='text' 
          value={email.value} onChange={emailValid} 
          className='border-1 border-black' required/>
        </div>
        {!email.valid && <p>! Invalid Email</p>}
        <div className='flex flex-row'>
          <label htmlFor='passw'>Password: </label>
          <input id='passw' type={passw.type} className='border-1 border-black' required
          onChange={passwValid} value={passw.value}/>
          <button onClick={togglePassw}>
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
        {!passw.valid && <p>!Invalid Password</p>}
        <div className='flex flex-row'>
          <label htmlFor="cpassw">Confirm Password: </label>
          <input id='cpassw' type={cpassw.type} className='border-1 border-black' required
          value={cpassw.value} onChange={cpasswValid}/>
          <button onClick={toggleCpassw}>
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
        {!cpassw.valid && <p>Passwords do not match</p>}
        <input type='submit' value="Sign-up" className='bg-[#f280d0] text-white'/>
      </form>
    </div>
  );
}

export default App
