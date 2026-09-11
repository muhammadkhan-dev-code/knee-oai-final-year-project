import { ChevronDown } from "lucide-react";

const FormSelect = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-[45px]
            w-full
            appearance-none
            rounded-xl
            border
            border-[#dceae6]
            bg-white
            px-4
            pr-10
            text-sm
            text-slate-700
            outline-none
            transition-all
            focus:border-[#19745f]
            focus:ring-2
            focus:ring-[#19745f]/10
            shadow-sm
          "
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          strokeWidth={1.8}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
};

export default FormSelect;
