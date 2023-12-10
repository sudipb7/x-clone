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
  type,
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
          absolute top-1.5 left-2.5 
          text-gray-400 text-xs 
          peer-focus:text-sky-500
        "
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
