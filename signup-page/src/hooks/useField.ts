import { useState } from 'react';

type FieldState = {
  value: string;
  valid: boolean;
  message: string;
  type?: 'text' | 'password';
};

type validatorFn = (value: string, passw?: string) => Partial<FieldState>;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validators: Record<string, validatorFn> = {
  fname: (val) => {
    if (!val) return { valid: false, message: '!Required' };
    else if (val.length > 25)
      return { valid: false, message: '!Name too long' };
    else return { valid: true, message: '' };
  },
  lname: (val) => {
    if (!val) return { valid: false, message: '!Required' };
    else if (val.length > 25)
      return { valid: false, message: '!Name too long' };
    else return { valid: true, message: '' };
  },
  email: (val) => {
    if (!val) return { valid: false, message: '!Required' };
    else if (emailRegex.test(val)) return { valid: true, message: '' };
    else return { valid: false, message: '!Invalid Email' };
  },
  age: (val) => {
    if (!val) return { valid: false, message: '!Required' };
    const a = parseInt(val);
    if (isNaN(a)) return { valid: false, message: '!Enter number' };
    else if (a < 18) return { valid: false, message: '!Atleast 18 required' };
    else return { valid: true, message: '' };
  },
  passw: (val) => {
    if (!val) return { valid: false, message: '!Required' };
    else if (val.length >= 8 || /[A-Z]/.test(val))
      return { valid: true, message: '' };
    else return { valid: false, message: '!Invalid Password' };
  },
};

function useField(name: string, inititalType?: 'password' | 'text') {
  const [field, setField] = useState({
    value: '',
    valid: true,
    message: '',
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
    if (!field.type) return;
    setField({
      ...field,
      type: field.type === 'password' ? 'text' : 'password',
    });
  };

  return { ...field, onChange, toggleType, setField };
}

export default useField;
