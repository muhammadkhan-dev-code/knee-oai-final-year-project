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
    ['Patient ID', patient.patientId || 'Not provided'],

    ['Name', patient.fullName || 'Not provided'],

    [
      'Age / Sex',
      `${patient.age || 'N/A'} / ${
        patient.gender
          ? patient.gender.charAt(0).toUpperCase() +
            patient.gender.slice(1)
          : 'N/A'
      }`,
    ],

    ['Knee Side', patient.kneeSide || 'Not provided'],

    [
      'Reported Symptoms',
      patient.clinicalNotes || 'No clinical notes provided.',
    ],
  ]

  return (
    <aside className="space-y-4">

      {/* =========================
          PATIENT SUMMARY
      ========================= */}

      <section className="rounded-xl border border-[#dceae6] bg-white p-5 shadow-sm shadow-[#1a5a49]/5">

        <div className="flex items-center justify-between">

          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <UserRound
              size={16}
              className="text-[#19745f]"
            />

            Patient Summary
          </h2>

          <button
            type="button"
            onClick={() => navigate('/analyze')}
            className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#19745f] hover:text-[#104c3d]"
          >
            <Pencil size={13} />
            Edit
          </button>

        </div>

        <dl className="mt-5 space-y-3 text-xs">

          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[112px_1fr] gap-2"
            >

              <dt className="font-semibold text-slate-900">
                {label}
              </dt>

              <dd className="leading-relaxed text-slate-700 break-words">
                {value}
              </dd>

            </div>
          ))}

        </dl>

      </section>


      {/* =========================
          UPLOADED X-RAY
      ========================= */}

      <section className="rounded-xl border border-[#dceae6] bg-white p-4 shadow-sm shadow-[#1a5a49]/5">

        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">

          <FileImage
            size={16}
            className="text-[#19745f]"
          />

          Uploaded X-ray

        </h2>


        <div className="mt-3 flex h-52 items-center justify-center overflow-hidden rounded-lg bg-slate-950">

          {patient.originalImage ? (

            <img
              src={patient.originalImage}
              alt="Uploaded knee X-ray"
              className="h-full w-full object-contain"
            />

          ) : (

            <div className="text-center text-xs text-slate-400">
              X-ray preview unavailable
            </div>

          )}

        </div>


        <div className="mt-4 grid grid-cols-[88px_1fr] gap-y-2 text-xs">

          <span className="font-semibold text-slate-900">
            File Name
          </span>

          <span className="break-words text-slate-700">
            {patient.fileName || 'Not available'}
          </span>


          <span className="font-semibold text-slate-900">
            Status
          </span>

          <span className="font-medium text-[#19745f]">
            AI Analysis Completed
          </span>

        </div>


        {/* =========================
            DISCLAIMER
        ========================= */}

        <div className="mt-4 flex gap-2 rounded-lg bg-[#e7f5ef] p-3 text-xs leading-relaxed text-[#245548]">

          <ShieldCheck
            size={18}
            className="shrink-0 text-[#19745f]"
          />

          <span>
            This analysis is AI-assisted and is not a substitute
            for professional medical advice.
          </span>

        </div>

      </section>

    </aside>
  )
}

