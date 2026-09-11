import { CheckCircle2 } from 'lucide-react'
import completexrayImg from '../../../assets/images/features/complete_xray.png'
import upload from '../../../assets/images/features/upload.png'
import xrayInput from '../../../assets/images/features/x_ray_input.png'
import xgradImg from '../../../assets/images/features/xgrad_cam.png'
import x_rayVideo from '../../../assets/videos/feature_xray.mp4'
import ReportStep from '../../common/ReportStep'

import { useEffect, useRef } from 'react'

const steps = [
  {
    id: 1,
    title: 'Upload a Knee X-ray',
    description:
      'Upload an AP or weight-bearing knee radiograph to start a secure, research-oriented assessment.'
  },
  {
    id: 2,
    title: 'Deep-learning Preprocessing',
    description:
      'The model normalizes the image and focuses on clinically relevant joint structures before inference.'
  },
  {
    id: 3,
    title: 'AI Analysis & KL Grade Prediction',
    description:
      'Our deep model predicts the Kellgren-Lawrence grade and highlights confidence for each result.'
  },
  {
    id: 4,
    title: 'Review KL Grade & Confidence',
    description:
      'Review detected OA grade with calibrated confidence to support clinical decision-making.'
  },
  {
    id: 5,
    title: 'Validate with XGrad-CAM Heatmap',
    description:
      'Inspect heatmap explanations to understand where the model focused before reporting.'
  },
  {
    id: 6,
    title: 'Generate Detailed Report',
    description:
      'Download findings, confidence, and key visual insights in a report suitable for records.'
  }
]

const FeatureSection = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  return (
    <section className='mx-auto w-full max-w-screen-2xl px-4p-4 sm:px-6 lg:px-8'>
      <div className='rounded-[28px]   md:p-8'>
        <div className='mx-auto max-w-3xl text-center '>
          <span className="mb-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-1.5 text-md font-medium text-gray-700">
            <span className="h-2 w-2 rounded-full bg-[#2d8264]" />
            Features
          </span>

          <h1 className='mx-auto max-w-2xl text-center font-["Outfit"] text-3xl font-extrabold text-[#071A33] sm:text-4xl'>
            Complete AI Diagnosis Workflow for Doctors and Patients
          </h1>

          <p className='mx-auto mt-4 max-w-2xl text-center font-["Outfit"] text-base font-semibold text-[#357B62] sm:text-xl'>
            From Upload Image to Clinical Report in Single Click
          </p>
        </div>
        <div className='mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 '>
          <ReportStep
            step={steps[0].id}
            title={steps[0].title}
            description={steps[0].description}
          >
            <div className='grid gap-3 sm:grid-cols-[1fr_120px]'>
              <div className='rounded-lg border border-dashed border-[#b9d8ca] bg-white p-3 text-sm text-[#1f6a50]'>
                <img
                  src={upload}
                  alt='Uploaded X-ray preview'
                  className='h-25 w-full rounded-lg object-contain'
                />
              </div>
              <img
                src={xrayInput}
                alt='Uploaded X-ray preview'
                className='h-30 w-full rounded-lg object-cover'
              />
            </div>
          </ReportStep>
          <ReportStep
            step={steps[1].id}
            title={steps[1].title}
            description={steps[1].description}
          >
            <div className='grid grid-cols-3 gap-2'>
              <video
                src={x_rayVideo}
                autoPlay
                loop
                muted
                playsInline
                className='col-span-3 h-40 w-full rounded-lg object-cover'
              />
            </div>
          </ReportStep>

          <ReportStep
            step={steps[2].id}
            title={steps[2].title}
            description={steps[2].description}
          >
            <div className='grid grid-cols-[120px_1fr] items-center gap-3'>
              <img
                src={completexrayImg}
                alt='AI analysis X-ray'
                className='h-30.5 w-full rounded-lg object-cover'
              />
              <div className='rounded-lg border border-[#d7ebe3] bg-white p-3'>
                <p className='text-xs text-[#4f5f74]'>Confidence</p>
                <p className='text-2xl font-semibold text-[#0d7c5a]'>92%</p>
                <div className='mt-2 h-2 w-full rounded-full bg-[#ebf5f1]'>
                  <div className='h-2 w-[92%] rounded-full bg-[#0d7c5a]' />
                </div>
              </div>
            </div>
          </ReportStep>

          <ReportStep
            step={steps[3].id}
            title={steps[3].title}
            description={steps[3].description}
          >
            <div className='rounded-lg border border-[#d7ebe3] bg-white p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm text-[#4f5f74]'>
                  Prediction Summary
                </span>
                <span className='rounded-md bg-[#e8f7f1] px-2 py-1 text-sm font-semibold text-[#0d7c5a]'>
                  Grade 2
                </span>
              </div>
              <div className='h-2 w-full rounded-full bg-[#ebf5f1]'>
                <div className='h-2 w-[92%] rounded-full bg-[#0d7c5a]' />
              </div>
            </div>
          </ReportStep>

          <ReportStep
            step={steps[4].id}
            title={steps[4].title}
            description={steps[4].description}
          >
            <div className='grid grid-cols-[140px_1fr] gap-3'>
              <img
                src={xgradImg}
                alt='XGrad-CAM heatmap'
                className='h-30 w-full rounded-lg object-cover'
              />
              <ul className='space-y-2 text-xs text-[#4f5f74]'>
                <li className='flex items-center gap-2'>
                  <span className='h-2 w-2 rounded-full bg-[#ef4444]' /> High
                  influence
                </li>
                <li className='flex items-center gap-2'>
                  <span className='h-2 w-2 rounded-full bg-[#f59e0b]' /> Medium
                  influence
                </li>
                <li className='flex items-center gap-2'>
                  <span className='h-2 w-2 rounded-full bg-[#22c55e]' /> Low
                  influence
                </li>
              </ul>
            </div>
          </ReportStep>

          <ReportStep
            step={steps[5].id}
            title={steps[5].title}
            description={steps[5].description}
          >
            <div className='rounded-lg border border-[#d7ebe3] bg-white p-3'>
              <p className='mb-2 text-xs font-medium text-[#4f5f74]'>
                Key Findings
              </p>
              <ul className='space-y-2 text-xs text-[#24624d]'>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 size={14} /> Joint space narrowing
                </li>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 size={14} /> Osteophyte formation
                </li>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 size={14} /> Subchondral sclerosis
                </li>
              </ul>
            </div>
          </ReportStep>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection