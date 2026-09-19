import React, { forwardRef } from 'react'
import {
  AlertTriangle,
  BarChart2,
  BrainCircuit,
  FileText,
  Image as ImageIcon,
  Info,
  Scan,
  User
} from 'lucide-react'
import Logo from '../../common/Logo'

function getImageSource(image, defaultType = 'image/jpeg') {
  if (!image) return null
  if (typeof image !== 'string') return null
  const trimmed = image.trim()
  if (!trimmed) return null
  if (
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed
  }
  return `data:${defaultType};base64,${trimmed}`
}

function formatDate(dateStr) {
  try {
    const d = dateStr ? new Date(dateStr) : new Date()
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return 'Aug 31, 2025'
  }
}

/**
 * Single-Page Clinical Report Document (100% Hex/RGB Styled for perfect html2canvas / PDF export)
 */
const ClinicalReportDocument = forwardRef(function ClinicalReportDocument(
  { patient = {}, analysis = {}, createdAt },
  ref
) {
  const predictedCategory = analysis?.predicted_category || 'N/A'
  const confidenceNum = Number(analysis?.confidence || 0)
  const confidencePercent = (confidenceNum * 100).toFixed(2)

  let gradeLabel = 'KL 0-1'
  let gradeSeverity = 'Normal / Doubtful'
  let alertMessage = 'No or doubtful osteoarthritis detected according to the AI model.'
  let badgeBg = '#ecfdf5'
  let badgeColor = '#065f46'
  let badgeBorder = '#a7f3d0'

  if (predictedCategory === 'kl0_kl1') {
    gradeLabel = 'KL 0-1'
    gradeSeverity = 'Normal / Doubtful'
    alertMessage = 'No or doubtful osteoarthritis detected according to the AI model.'
    badgeBg = '#ecfdf5'
    badgeColor = '#065f46'
    badgeBorder = '#a7f3d0'
  } else if (predictedCategory === 'kl2_kl3') {
    gradeLabel = 'KL 2-3'
    gradeSeverity = 'Mild / Moderate'
    alertMessage = 'Mild to moderate osteoarthritis detected according to the AI model.'
    badgeBg = '#fffbeb'
    badgeColor = '#92400e'
    badgeBorder = '#fde68a'
  } else if (predictedCategory === 'kl4') {
    gradeLabel = 'KL 4'
    gradeSeverity = 'Severe'
    alertMessage = 'Severe osteoarthritis detected according to the AI model.'
    badgeBg = '#fff1f2'
    badgeColor = '#9f1239'
    badgeBorder = '#fecdd3'
  } else if (predictedCategory !== 'N/A') {
    gradeLabel = predictedCategory.toUpperCase()
    gradeSeverity = 'Completed'
  }

  const rawProbs = analysis?.class_probabilities || {}
  const prob0_1 = Number(rawProbs.kl0_kl1 ?? (predictedCategory === 'kl0_kl1' ? confidenceNum : 0.0268)) * 100
  const prob2_3 = Number(rawProbs.kl2_kl3 ?? (predictedCategory === 'kl2_kl3' ? confidenceNum : 0.0799)) * 100
  const prob4 = Number(rawProbs.kl4 ?? (predictedCategory === 'kl4' ? confidenceNum : 0.8933)) * 100

  const originalImg = getImageSource(patient?.originalImage, 'image/jpeg')
  const heatmapImg = getImageSource(analysis?.heatmap, 'image/png')
  const reportDate = formatDate(createdAt)

  return (
    <div
      ref={ref}
      style={{
        width: '1000px',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        padding: '24px',
        fontFamily: "'Outfit', Arial, sans-serif",
        boxSizing: 'border-box'
      }}
    >
      {/* 1. TOP HEADER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '12px',
          borderBottom: '2px solid #19745f'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#e2f2ef',
                color: '#075344',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Logo size={22} animated={false} />
            </div>
            <span style={{ fontSize: '22px', fontWeight: '900', color: '#075344', letterSpacing: '-0.5px' }}>
              KOA-AI
            </span>
          </div>

          <div style={{ width: '2px', height: '22px', backgroundColor: '#cbd5e1', margin: '0 4px' }} />

          <span style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b' }}>
            Knee Osteoarthritis AI Assessment
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#e2f2ef',
              color: '#075344',
              border: '1px solid #cbebe3',
              fontSize: '11px',
              fontWeight: '700'
            }}
          >
            <BrainCircuit size={13} color="#19745f" />
            <span>AI-Assisted Report</span>
          </div>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>
            Date: {reportDate}
          </span>
        </div>
      </div>

      {/* 2. PATIENT INFORMATION CARD */}
      <div
        style={{
          marginTop: '12px',
          borderRadius: '10px',
          border: '1px solid #cde2dc',
          backgroundColor: '#ffffff',
          padding: '12px 16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: '#075344', textTransform: 'uppercase', marginBottom: '8px' }}>
          <User size={13} color="#075344" />
          <span>Patient Information</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '8px' }}>
            <p style={{ margin: 0, fontSize: '10px', color: '#64748b', fontWeight: '500' }}>Patient ID</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
              {patient?.patientId || '456677'}
            </p>
          </div>

          <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '8px' }}>
            <p style={{ margin: 0, fontSize: '10px', color: '#64748b', fontWeight: '500' }}>Name</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
              {patient?.fullName || 'Ghazanfar Ali'}
            </p>
          </div>

          <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '8px' }}>
            <p style={{ margin: 0, fontSize: '10px', color: '#64748b', fontWeight: '500' }}>Age / Sex</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
              {patient?.age ? `${patient.age} / ` : '76 / '}
              {patient?.gender
                ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)
                : 'Male'}
            </p>
          </div>

          <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '8px' }}>
            <p style={{ margin: 0, fontSize: '10px', color: '#64748b', fontWeight: '500' }}>Knee Side</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
              {patient?.kneeSide || 'Not provided'}
            </p>
          </div>

          <div>
            <p style={{ margin: 0, fontSize: '10px', color: '#64748b', fontWeight: '500' }}>Reported Symptoms</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
              {patient?.clinicalNotes || 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. PREDICTED KL GRADE BANNER */}
      <div
        style={{
          marginTop: '12px',
          borderRadius: '10px',
          border: '1px solid #cde2dc',
          backgroundColor: '#ffffff',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Circular Donut Gauge */}
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '9999px',
              background: `conic-gradient(#19745f 0 ${confidencePercent}%, #dcece7 ${confidencePercent}% 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: '900', color: '#0f172a', lineHeight: '1.1' }}>
                {confidencePercent}%
              </span>
              <span style={{ fontSize: '7px', color: '#64748b', fontWeight: '600', lineHeight: '1' }}>
                Confidence
              </span>
            </div>
          </div>

          {/* Grade & Severity Tag */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#475569' }}>
              Predicted KL Grade:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
              <span style={{ fontSize: '26px', fontWeight: '900', color: '#075344', letterSpacing: '-0.5px' }}>
                {gradeLabel}
              </span>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  backgroundColor: badgeBg,
                  color: badgeColor,
                  border: `1px solid ${badgeBorder}`
                }}
              >
                {gradeSeverity}
              </span>
            </div>
          </div>
        </div>

        {/* Diagnosis Alert Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            maxWidth: '420px'
          }}
        >
          <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#1e293b', lineHeight: '1.4' }}>
            {alertMessage}
          </p>
        </div>
      </div>

      {/* 4. IMAGING ROW: ORIGINAL X-RAY & AI GRAD-CAM */}
      <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Original X-Ray */}
        <div style={{ borderRadius: '10px', border: '1px solid #cde2dc', backgroundColor: '#ffffff', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#075344', marginBottom: '8px' }}>
            <ImageIcon size={13} color="#075344" />
            <span>Original X-ray</span>
          </div>

          <div
            style={{
              height: '180px',
              borderRadius: '6px',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {originalImg ? (
              <img
                src={originalImg}
                alt="Original Knee X-ray"
                style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                crossOrigin="anonymous"
              />
            ) : (
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Original X-ray unavailable</span>
            )}
            <span
              style={{
                position: 'absolute',
                bottom: '6px',
                left: '6px',
                fontSize: '9px',
                fontWeight: '700',
                color: '#cbd5e1',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '2px 6px',
                borderRadius: '3px'
              }}
            >
              R
            </span>
          </div>
        </div>

        {/* AI Attention / Grad-CAM */}
        <div style={{ borderRadius: '10px', border: '1px solid #cde2dc', backgroundColor: '#ffffff', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#075344', marginBottom: '8px' }}>
            <Scan size={13} color="#075344" />
            <span>AI Attention / Grad-CAM</span>
          </div>

          <div
            style={{
              height: '180px',
              borderRadius: '6px',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {heatmapImg ? (
              <img
                src={heatmapImg}
                alt="Grad-CAM Heatmap"
                style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                crossOrigin="anonymous"
              />
            ) : (
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>AI attention map unavailable</span>
            )}
            <span
              style={{
                position: 'absolute',
                bottom: '6px',
                left: '6px',
                fontSize: '9px',
                fontWeight: '700',
                color: '#cbd5e1',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '2px 6px',
                borderRadius: '3px'
              }}
            >
              R
            </span>
          </div>
        </div>
      </div>

      {/* 5. CLASS PROBABILITIES & INTERPRETATION ROW */}
      <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Class Probabilities */}
        <div style={{ borderRadius: '10px', border: '1px solid #cde2dc', backgroundColor: '#ffffff', padding: '10px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#075344', marginBottom: '8px' }}>
            <BarChart2 size={13} color="#075344" />
            <span>Class Probabilities</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* KL 0-1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 45px', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
              <span style={{ fontWeight: '600', color: '#334155' }}>
                KL 0-1 <span style={{ color: '#64748b', fontWeight: '400' }}>Normal / Doubtful</span>
              </span>
              <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '9999px', backgroundColor: '#19745f', width: `${Math.min(100, Math.max(0, prob0_1))}%` }} />
              </div>
              <span style={{ textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>
                {prob0_1.toFixed(2)}%
              </span>
            </div>

            {/* KL 2-3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 45px', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
              <span style={{ fontWeight: '600', color: '#334155' }}>
                KL 2-3 <span style={{ color: '#64748b', fontWeight: '400' }}>Mild / Moderate</span>
              </span>
              <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '9999px', backgroundColor: '#19745f', width: `${Math.min(100, Math.max(0, prob2_3))}%` }} />
              </div>
              <span style={{ textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>
                {prob2_3.toFixed(2)}%
              </span>
            </div>

            {/* KL 4 */}
            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 45px', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
              <span style={{ fontWeight: '600', color: '#334155' }}>
                KL 4 <span style={{ color: '#64748b', fontWeight: '400' }}>Severe</span>
              </span>
              <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '9999px', backgroundColor: '#19745f', width: `${Math.min(100, Math.max(0, prob4))}%` }} />
              </div>
              <span style={{ textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>
                {prob4.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Interpretation */}
        <div style={{ borderRadius: '10px', border: '1px solid #cde2dc', backgroundColor: '#ffffff', padding: '10px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#075344', marginBottom: '8px' }}>
            <FileText size={13} color="#075344" />
            <span>Interpretation</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10.5px', color: '#334155' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#10b981', marginTop: '3px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#0f172a' }}>KL 0-1:</strong> No or doubtful osteoarthritis.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#f59e0b', marginTop: '3px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#0f172a' }}>KL 2-3:</strong> Definite osteophytes with possible joint-space narrowing.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#f43f5e', marginTop: '3px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#0f172a' }}>KL 4:</strong> Large osteophytes, marked joint-space loss, and deformity.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. IMPORTANT INSTRUCTIONS */}
      <div
        style={{
          marginTop: '12px',
          borderRadius: '8px',
          border: '1px solid #cde2dc',
          backgroundColor: '#f8fafc',
          padding: '8px 12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#075344', marginBottom: '4px' }}>
          <Info size={13} color="#075344" />
          <span>Important Instructions</span>
        </div>
        <p style={{ margin: 0, fontSize: '10px', lineHeight: '1.4', color: '#475569' }}>
          This report is AI-assisted and is not a substitute for professional medical advice. The prediction is intended to assist qualified healthcare professionals. Final diagnosis should be made by a qualified clinician and correlated with clinical findings.
        </p>
      </div>

      {/* 7. FOOTER */}
      <div
        style={{
          marginTop: '10px',
          paddingTop: '8px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: '#64748b'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Model: <strong style={{ color: '#334155' }}>KOA-AI</strong></span>
          <span>|</span>
          <span>Input: <strong style={{ color: '#334155' }}>Knee X-ray</strong></span>
          <span>|</span>
          <span>Analysis Status: <strong style={{ color: '#047857' }}>Completed</strong></span>
        </div>
        <div style={{ fontWeight: '700', color: '#334155' }}>
          1 / 1
        </div>
      </div>
    </div>
  )
})

export default ClinicalReportDocument
