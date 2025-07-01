type InputFieldProps = {
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  valid: boolean;
  message: string;
};

function InputField({id, name, onChange, valid, value, message}: InputFieldProps) {
    return(
        <div className='field-base'>
          <label htmlFor={id}>{name}: </label>
          <input type='text' id={id} className="input-base" required
          onChange={onChange} value={value}/>
          {!valid && <p className='message-base'>{message}</p>}
        </div>
    );
}

export default InputField;