interface InputProps {
  placeholder: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type = "text",
  disabled,
  onChange,
}) => {
  return (
    <div className="w-full relative">
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder=" "
        className="
        peer
        w-full px-2.5 pb-1.5 pt-5 z-10
        border border-gray-200 focus:border-sky-500
        focus:ring-1 focus:ring-sky-500
        rounded outline-none
        disabled:bg-gray-50 disabled:cursor-not-allowed
        placeholder:text-sm placeholder:text-gray-400
        "
      />
      <label
        className="
          absolute top-3.5 left-[0.7rem] 
          transform origin-[0]
          -translate-y-3.5 scale-75
          text-zinc-500 duration-300
          peer-focus:text-sky-500
          peer-focus:scale-75
          peer-focus:-translate-y-3.5
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0  
        "
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
