import { useRef, useState } from "react";
import {
  Upload,
  X,
  FileImage,
  CheckCircle2,
  Lock,
} from "lucide-react";

const XRayUpload = ({
  file,
  onFileSelect,
  onRemove,
  error
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e2f2ef]">
            <FileImage size={16} className="text-[#0d4239]" />
          </div>
          <h2 className="text-base font-bold text-[#075344]">
            Upload Knee X-Ray Study
          </h2>
        </div>

        {!file ? (
          <div>
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={handleBrowse}
              className={`
                flex
                flex-col
                min-h-[280px]
                cursor-pointer
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                p-6
                text-center
                transition-all
                ${error
                  ? "border-red-300 bg-red-50/50"
                  : isDragging
                  ? "border-[#0d4239] bg-[#e2f2ef]"
                  : "border-[#b8e2d8] bg-[#f4faf7] hover:bg-[#edf7f3] hover:border-[#19745f]"
                }
              `}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.dcm,image/jpeg,image/png,application/dicom"
                onChange={handleInputChange}
                className="hidden"
              />

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e2f2ef] text-[#0d4239] mb-3">
                <Upload size={28} strokeWidth={2} />
              </div>

              <h3 className="text-sm font-bold text-slate-800 mb-1">
                Drag &amp; Drop Your Knee X-Ray
              </h3>

              <p className="text-xs font-medium text-slate-500 mb-4">
                Supports DICOM, JPEG, PNG (max 25 MB)
              </p>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleBrowse();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075344] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0d4239] cursor-pointer shadow-sm"
              >
                <Upload size={16} strokeWidth={2.2} />
                <span>Select Imaging File</span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
                <Lock size={12} className="text-[#19745f]" />
                <span>Encrypted &amp; Secure Upload</span>
              </div>
            </div>
            {error && (
              <p className="mt-2 text-xs text-red-600 font-medium text-center">{error}</p>
            )}
          </div>
        ) : (
          <div className="relative flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-[#b8e2d8] bg-[#f4faf7] p-6 text-center">
            <button
              type="button"
              onClick={onRemove}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition hover:bg-red-50 hover:text-red-500 cursor-pointer border border-slate-100"
            >
              <X size={16} />
            </button>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e2f2ef] mb-3">
              <FileImage size={32} className="text-[#0d4239]" />
            </div>

            <CheckCircle2 size={22} className="text-[#19745f] mb-2" />

            <h3 className="max-w-[90%] truncate text-sm font-bold text-slate-900">
              {file.name}
            </h3>

            <p className="text-xs text-slate-400 mt-1 font-medium">
              {formatFileSize(file.size)}
            </p>

            <button
              type="button"
              onClick={handleBrowse}
              className="mt-4 text-xs font-bold text-[#19745f] hover:text-[#0d4239] hover:underline cursor-pointer transition"
            >
              Choose another file
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default XRayUpload;
