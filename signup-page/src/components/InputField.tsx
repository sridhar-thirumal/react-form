type MyPropsField = {
  id: "string";
  name: "string";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: "string";
  valid: "boolean";
  message: "string"
};

function InputField(props: MyPropsField) {
    return(
        <div className='flex flex-col gap-y-1 sm:grid sm:grid-cols-[10rem_12rem_2rem]'>
          <label htmlFor={props.id}>{props.name}: </label>
          <input type='text' id={props.id} className='border-1 border-black max-w-[12rem]' required
          onChange={props.onChange} value={props.value}/>
          {!props.valid && <p className='text-[#fc0303] text-sm sm:col-start-2'>{props.message}</p>}
        </div>
    );
}

export default InputField;