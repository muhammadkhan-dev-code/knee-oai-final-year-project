export default function Input({
  label,
  type = "text",
  placeholder,
  icon,
  rightIcon,
  name,
  value,
  onChange,
  onBlur,
  disabled,
}) {
  return (
    <div className="mb-4">
      {/* Label */}
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

     
      <div className="flex h-12 items-center rounded-xl border border-slate-300 bg-white px-4 transition-all duration-200 focus-within:border-[#357B62] focus-within:ring-2 focus-within:ring-[#357B62]/20">

        {icon && (
          <span className="mr-3 text-base text-[#357B62]">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none disabled:cursor-not-allowed"
        />

        {rightIcon && (
          <span className="ml-3 cursor-pointer text-[#357B62]">
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
}
