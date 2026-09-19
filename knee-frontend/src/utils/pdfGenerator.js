import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Converts any image src or blob URL to an inline Base64 data URL.
 */
async function toDataURL(src) {
  if (!src) return null
  if (src.startsWith('data:image/')) return src

  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth || img.width || 400
        canvas.height = img.naturalHeight || img.height || 400
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/jpeg', 0.95))
      } catch {
        resolve(src)
      }
    }
    img.onerror = () => resolve(src)
    img.src = src
  })
}

/**
 * Sanitizes any elements inside cloned document to replace oklch colors with RGB equivalents.
 */
function sanitizeClonedColors(container) {
  const allElements = [container, ...Array.from(container.querySelectorAll('*'))]
  const colorCanvas = document.createElement('canvas')
  colorCanvas.width = 1
  colorCanvas.height = 1
  const ctx = colorCanvas.getContext('2d')

  for (const el of allElements) {
    if (!el.style) continue
    const computed = window.getComputedStyle(el)

    // Properties that might hold oklch
    const props = ['color', 'backgroundColor', 'borderColor', 'outlineColor']
    for (const prop of props) {
      const val = computed[prop]
      if (val && val.includes('oklch')) {
        try {
          ctx.fillStyle = val
          ctx.fillRect(0, 0, 1, 1)
          const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
          el.style[prop] = `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(2)})`
        } catch {
          // Fallback
          if (prop === 'backgroundColor') el.style.backgroundColor = '#ffffff'
          if (prop === 'color') el.style.color = '#1e293b'
          if (prop === 'borderColor') el.style.borderColor = '#cbd5e1'
        }
      }
    }
  }
}

/**
 * Generates and downloads a clean single-page clinical PDF report.
 * @param {HTMLElement} element - The DOM element containing the clinical report template.
 * @param {string} fileName - The desired name of the downloaded file.
 */
export async function downloadReportPdf(element, fileName = 'KOA-AI_Assessment_Report.pdf') {
  if (!element) {
    throw new Error('Report template element not found')
  }

  // 1. Wait for document fonts
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready
    }
  } catch (e) {
    console.warn('Font loading check skipped:', e)
  }

  // 2. Clone the element and mount offscreen with fixed coordinates
  const clone = element.cloneNode(true)
  clone.id = 'koa-report-pdf-clone'
  clone.style.position = 'fixed'
  clone.style.top = '0px'
  clone.style.left = '0px'
  clone.style.width = '1000px'
  clone.style.zIndex = '-99999'
  clone.style.visibility = 'visible'
  clone.style.opacity = '1'
  clone.style.pointerEvents = 'none'
  clone.style.display = 'block'
  clone.style.margin = '0'
  clone.style.padding = '0'
  clone.style.boxSizing = 'border-box'

  document.body.appendChild(clone)

  try {
    // 3. Convert all images in clone to base64
    const images = Array.from(clone.querySelectorAll('img'))
    for (const img of images) {
      if (img.src && !img.src.startsWith('data:image/')) {
        const dataUrl = await toDataURL(img.src)
        if (dataUrl) img.src = dataUrl
      }
    }

    // 4. Sanitize oklch colors from computed styles
    sanitizeClonedColors(clone)

    // Brief paint delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    // 5. Capture with html2canvas
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 1000,
      windowWidth: 1000,
      onclone: (clonedDoc) => {
        // Strip problematic modern stylesheet rules if any remain in cloned document
        const clonedTarget = clonedDoc.getElementById('koa-report-pdf-clone')
        if (clonedTarget) {
          sanitizeClonedColors(clonedTarget)
        }
      }
    })

    const imgData = canvas.toDataURL('image/jpeg', 0.98)

    // 6. Output to single-page A4 Landscape PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true
    })

    const pdfWidth = pdf.internal.pageSize.getWidth() // 297 mm
    const pdfHeight = pdf.internal.pageSize.getHeight() // 210 mm

    const margin = 5 // 5mm margin
    const usableWidth = pdfWidth - (margin * 2)
    const usableHeight = pdfHeight - (margin * 2)

    let finalWidth = usableWidth
    let finalHeight = (canvas.height * usableWidth) / canvas.width

    if (finalHeight > usableHeight) {
      finalHeight = usableHeight
      finalWidth = (canvas.width * usableHeight) / canvas.height
    }

    const xOffset = margin + (usableWidth - finalWidth) / 2
    const yOffset = margin + (usableHeight - finalHeight) / 2

    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, finalWidth, finalHeight, undefined, 'FAST')
    pdf.save(fileName)

    return true
  } finally {
    if (clone && clone.parentNode) {
      clone.parentNode.removeChild(clone)
    }
  }
}
