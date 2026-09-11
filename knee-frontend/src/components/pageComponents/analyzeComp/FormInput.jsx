const FormInput = ({
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  type = "text",
}) => {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-[45px]
            w-full
            rounded-xl
            pl-11
            pr-4
            text-sm
            border
            border-[#dceae6]
            text-slate-900
            bg-white
            placeholder:text-slate-400
            outline-none
            transition-all
            focus:border-[#19745f]
            focus:ring-2
            focus:ring-[#19745f]/10
            shadow-sm
          "
        />

        {Icon && (
          <Icon
            size={18}
            strokeWidth={1.8}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#278263]"
          />
        )}
      </div>
    </div>
  );
};

export default FormInput;