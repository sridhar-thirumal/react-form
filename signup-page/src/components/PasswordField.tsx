type PasswordFieldProps = {
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggle: () => void;
  value: string;
  type: "text" | "password";
  valid: boolean;
  message: string;
};

function PasswordField({id, name, type, onChange, value, toggle, valid, message}: PasswordFieldProps) {
    return (
        <div className='flex flex-col gap-y-1 sm:grid sm:grid-cols-[10rem_12rem_2rem]'>
          <label htmlFor={id}>{name}: </label>
          <div className='flex flex-row'>
            <input id={id} type={type} className='border-1 border-black max-w-[12rem]' required
            onChange={onChange} value={value}/>
            <button type="button" onClick={toggle} className='ml-2 sm:ml-2'>
              {type === "password" ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off">
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
                <path d="m2 2 20 20"/></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-icon lucide-eye">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                <circle cx="12" cy="12" r="3"/></svg>}
            </button>
            </div>
          {!valid && <p className='text-[#fc0303] text-sm sm:col-start-2'>{message}</p>}
        </div>
    );
}

export default PasswordField;