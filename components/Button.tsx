interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "destructive";
  size?: "small" | "default" | "large";
  fullWidth?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "default",
  rounded,
  disabled,
  fullWidth,
  onClick,
}) => {
  const styles = {
    primary: "bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800",
    secondary: "bg-gray-100 border-gray-100 text-zinc-800 hover:bg-opacity-[0.85]",
    outline: "bg-transparent text-zinc-800 hover:bg-gray-100",
    destructive: "bg-red-500 border-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    small: "px-3.5 py-1 text-xs",
    default: "px-4 py-2 text-sm",
    large: "px-5 py-2.5",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        font-medium border transition
        ${styles[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : "w-fit"}
        ${rounded ? "rounded-full" : "rounded-md"}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
