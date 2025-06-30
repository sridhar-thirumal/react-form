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
        <div className='flex flex-col gap-y-1 sm:grid sm:grid-cols-[10rem_12rem_2rem]'>
          <label htmlFor={id}>{name}: </label>
          <input type='text' id={id} className='border-1 border-black max-w-[12rem]' required
          onChange={onChange} value={value}/>
          {!valid && <p className='text-[#fc0303] text-sm sm:col-start-2'>{message}</p>}
        </div>
    );
}

export default InputField;