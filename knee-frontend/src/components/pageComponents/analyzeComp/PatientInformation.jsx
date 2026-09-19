import {
  UserRound,
  CalendarDays,
  CreditCard,
  FileText,
  RotateCcw
} from "lucide-react";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const PatientInformation = ({ patientData, onChange, onClear, errors = {} }) => {
  return (
    <div className="w-full flex flex-col h-full justify-between gap-6">
      <div>
        <div className="mb-5 flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e2f2ef] text-[#075344]">
              <UserRound size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#075344]">
                Patient Information
              </h2>
              <p className="text-xs text-slate-500">
                Enter demographic details for AI analysis report
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <FormInput
              label="Full Name *"
              placeholder="e.g. Ghazanfar Ali"
              value={patientData.fullName}
              onChange={(value) => onChange("fullName", value)}
              icon={UserRound}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <FormInput
              label="Age (Years) *"
              type="number"
              placeholder="e.g. 76"
              value={patientData.age}
              onChange={(value) => onChange("age", value)}
              icon={CalendarDays}
            />
            {errors.age && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.age}</p>
            )}
          </div>

          {/* Gender */}
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

          {/* Patient ID */}
          <div>
            <FormInput
              label="Patient ID (Optional)"
              placeholder="e.g. 456677"
              value={patientData.patientId}
              onChange={(value) => onChange("patientId", value)}
              icon={CreditCard}
            />
          </div>

          {/* Clinical Notes / Symptoms */}
          <div className="sm:col-span-2">
            <FormInput
              label="Reported Symptoms / Clinical Notes (Optional)"
              placeholder="e.g. Joint pain, morning stiffness, swelling"
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
          className="inline-flex items-center gap-2 rounded-xl border border-[#dceae6] bg-white px-4 py-2 text-xs font-semibold text-[#075344] transition hover:bg-[#e2f2ef] hover:border-[#075344]/30 shadow-xs cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reset Fields</span>
        </button>
      </div>
    </div>
  );
};

export default PatientInformation;
