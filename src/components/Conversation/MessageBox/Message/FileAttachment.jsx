import { useState, useRef, useEffect } from "react";
import { Download, Eye, XCircle } from "lucide-react";

const FileAttachment = ({ fileData }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (previewRef.current && !previewRef.current.contains(event.target)) {
        setIsPreviewOpen(false);
      }
    };

    if (isPreviewOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPreviewOpen]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = () => {
    if (fileData.type.startsWith("image/")) {
      return (
        <img
          src={fileData.url}
          alt="preview"
          className="w-10 h-10 object-cover rounded-lg"
        />
      );
    }
    // Return default icon based on file type
    return (
      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
        <span className="text-blue-500 text-xs uppercase">
          {fileData.type.split("/")[1]}
        </span>
      </div>
    );
  };

  const renderPreview = () => {
    if (!isPreviewOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div
          ref={previewRef}
          className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
        >
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
          >
            <XCircle className="w-6 h-6" />
          </button>

          {fileData.type.startsWith("image/") ? (
            <img
              src={fileData.url}
              alt={fileData.name}
              className="max-w-full h-auto"
            />
          ) : fileData.type.startsWith("video/") ? (
            <video controls className="max-w-full">
              <source src={fileData.url} type={fileData.type} />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* File Card */}
      <div className="bg-[#4284ed] text-white rounded-xl overflow-hidden">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {getFileIcon()}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fileData.name}</p>
              <p className="text-xs text-blue-100">
                {formatFileSize(fileData.size)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(fileData.type.startsWith("image/") ||
              fileData.type.startsWith("video/")) && (
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="p-1 hover:bg-blue-600 rounded-full transition-colors"
                title="Preview"
              >
                <Eye className="w-4 h-4 text-white" />
              </button>
            )}
            <a
              href={fileData.url}
              download={fileData.name}
              className="p-1 hover:bg-blue-600 rounded-full transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
      {renderPreview()}
    </div>
  );
};

export default FileAttachment;
