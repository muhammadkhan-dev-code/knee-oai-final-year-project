import {
  FileImage,
  Pencil,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ReportPatientCard({ patient = {} }) {
  const navigate = useNavigate()

  const rows = [
    ['Patient ID', patient.patientId || '456677'],
    ['Full Name', patient.fullName || 'Not provided'],
    [
      'Age / Sex',
      `${patient.age ? `${patient.age} yrs` : 'N/A'} / ${
        patient.gender
          ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)
          : 'Not specified'
      }`,
    ],
    ['Knee Side', patient.kneeSide || 'Not provided'],
    [
      'Symptoms / Notes',
      patient.clinicalNotes || 'No reported symptoms or clinical notes.',
    ],
  ]

  return (
    <aside className="space-y-4 w-full">
      {/* =========================
          PATIENT SUMMARY
      ========================= */}
      <section className="rounded-2xl border border-[#dceae6] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <UserRound size={16} className="text-[#19745f]" />
            Patient Summary
          </h2>

          <button
            type="button"
            onClick={() => navigate('/analyze')}
            className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#19745f] hover:text-[#075344] transition"
          >
            <Pencil size={12} />
            Edit
          </button>
        </div>

        <dl className="mt-4 space-y-2.5 text-xs">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-1 sm:grid-cols-[105px_1fr] gap-1 sm:gap-2 py-1 border-b border-slate-50 last:border-0"
            >
              <dt className="font-semibold text-slate-500">
                {label}
              </dt>
              <dd className="font-medium text-slate-900 break-words">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* =========================
          UPLOADED X-RAY
      ========================= */}
      <section className="rounded-2xl border border-[#dceae6] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <FileImage size={16} className="text-[#19745f]" />
            Radiograph File
          </h2>
        </div>

        <div className="mt-4 flex h-44 sm:h-48 items-center justify-center overflow-hidden rounded-xl bg-slate-950 border border-slate-900">
          {patient.originalImage ? (
            <img
              src={patient.originalImage}
              alt="Uploaded knee X-ray"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="text-center text-xs text-slate-400 p-4">
              X-ray preview unavailable
            </div>
          )}
        </div>

        <div className="mt-4 space-y-1.5 text-xs">
          <div className="flex justify-between items-center text-slate-600">
            <span className="font-medium">File Name:</span>
            <span className="font-semibold text-slate-800 truncate max-w-[150px]">
              {patient.fileName || 'Knee_Study.jpg'}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span className="font-medium">Status:</span>
            <span className="font-semibold text-emerald-700">
              Analysis Completed
            </span>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#eef8f4] p-3 text-[11px] leading-relaxed text-[#075344] border border-[#d6ede5]">
          <ShieldCheck size={16} className="shrink-0 text-[#19745f] mt-0.5" />
          <span>
            AI-assisted assessment. Intended to support qualified healthcare professionals.
          </span>
        </div>
      </section>
    </aside>
  )
}
