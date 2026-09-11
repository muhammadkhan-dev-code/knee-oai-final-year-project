import {
  UserRound,
  CalendarDays,
  CreditCard,
  Phone,
  Mail,
  FileText,
  RotateCcw,
} from "lucide-react";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const PatientInformation = ({ patientData, onChange, onClear, errors = {} }) => {
  return (
    <div className="w-full flex flex-col h-full gap-5">
      <div>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e2f2ef]">
            <UserRound size={16} className="text-[#0d4239]" />
          </div>
          <h2 className="text-base font-bold text-[#075344]">
            Patient Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div>
            <FormInput
              label="Full Name *"
              placeholder="Enter patient full name"
              value={patientData.fullName}
              onChange={(value) => onChange("fullName", value)}
              icon={UserRound}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
            )}
          </div>

          <div>
            <FormInput
              label="Age (Years) *"
              type="number"
              placeholder="Enter age"
              value={patientData.age}
              onChange={(value) => onChange("age", value)}
              icon={CalendarDays}
            />
            {errors.age && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.age}</p>
            )}
          </div>

          <div>
            <FormSelect
              label="Gender *"
              value={patientData.gender}
              onChange={(value) => onChange("gender", value)}
              options={[
                { label: "Select gender", value: "" },
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
            {errors.gender && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.gender}</p>
            )}
          </div>

          <div>
            <FormInput
              label="Patient ID (Optional)"
              placeholder="Enter patient ID"
              value={patientData.patientId}
              onChange={(value) => onChange("patientId", value)}
              icon={CreditCard}
            />
          </div>

          <div>
            <FormInput
              label="Contact Number (Optional)"
              type="tel"
              placeholder="Enter contact number"
              value={patientData.contactNumber}
              onChange={(value) => onChange("contactNumber", value)}
              icon={Phone}
            />
          </div>

          <div>
            <FormInput
              label="Email (Optional)"
              type="email"
              placeholder="Enter email address"
              value={patientData.email}
              onChange={(value) => onChange("email", value)}
              icon={Mail}
            />
          </div>

          <div className="sm:col-span-2">
            <FormInput
              label="Clinical Notes (Optional)"
              placeholder="Any relevant clinical notes or history"
              value={patientData.clinicalNotes}
              onChange={(value) => onChange("clinicalNotes", value)}
              icon={FileText}
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-lg border border-[#dceae6] bg-white px-5 py-2 text-sm font-semibold text-[#0d4239] transition hover:bg-[#e2f2ef] hover:border-[#0d4239]/30 shadow-sm cursor-pointer"
        >
          <RotateCcw size={14} />
          Clear Form
        </button>
      </div>
    </div>
  );
};


export default PatientInformation;
