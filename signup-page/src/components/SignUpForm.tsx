import { useNavigate } from 'react-router';
import InputField from './InputField';
import PasswordField from './PasswordField';
import useField from '../hooks/useField';

function SignUpForm() {
  const nav = useNavigate();

  const fields = {
    fname: useField('fname'),
    lname: useField('lname'),
    age: useField('age'),
    email: useField('email'),
    passw: useField('passw', 'password'),
    cpassw: useField('cpassw', 'password'),
  };

  function cpasswOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    let val: string = e.target.value;
    if (!val)
      fields.cpassw.setField({
        ...fields.cpassw,
        value: val,
        valid: false,
        message: '!Required',
      });
    else if (val === fields.passw.value)
      fields.cpassw.setField({
        ...fields.cpassw,
        value: val,
        valid: true,
        message: '',
      });
    else
      fields.cpassw.setField({
        ...fields.cpassw,
        value: val,
        valid: false,
        message: '!Passwords dont match',
      });
  }

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      fields.email.valid &&
      fields.fname.valid &&
      fields.lname.valid &&
      fields.age.valid &&
      fields.passw.valid &&
      fields.cpassw.valid
    )
      nav('/success');
  };

  return (
    <form className="form-base" onSubmit={submitHandle}>
      <InputField
        id="fname"
        onChange={fields.fname.onChange}
        value={fields.fname.value}
        valid={fields.fname.valid}
        message={fields.fname.message}
        name="First Name"
      />
      <InputField
        id="lname"
        onChange={fields.lname.onChange}
        value={fields.lname.value}
        valid={fields.lname.valid}
        message={fields.lname.message}
        name="Last Name"
      />
      <InputField
        id="age"
        onChange={fields.age.onChange}
        value={fields.age.value}
        valid={fields.age.valid}
        message={fields.age.message}
        name="Age"
      />
      <InputField
        id="email"
        onChange={fields.email.onChange}
        value={fields.email.value}
        valid={fields.email.valid}
        message={fields.email.message}
        name="Email"
      />
      <PasswordField
        id="passw"
        onChange={fields.passw.onChange}
        value={fields.passw.value}
        valid={fields.passw.valid}
        message={fields.passw.message}
        toggle={fields.passw.toggleType}
        type={fields.passw.type}
        name="Password"
      />
      <PasswordField
        id="cpassw"
        onChange={cpasswOnchange}
        value={fields.cpassw.value}
        valid={fields.cpassw.valid}
        message={fields.cpassw.message}
        toggle={fields.cpassw.toggleType}
        type={fields.cpassw.type}
        name="Confirm Password"
      />
      <div className="flex flex-row justify-center pb-2">
        <input
          type="submit"
          value="Sign-up"
          className="bg-[#f280d0] text-white p-3 rounded-full"
        />
      </div>
    </form>
  );
}

export default SignUpForm;
