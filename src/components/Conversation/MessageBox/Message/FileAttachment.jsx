import { FileText } from "lucide-react";

const FileAttachment = ({ fileData }) => {
  const fileTypes = {
    image: /^image\/(jpeg|jpg|png|gif|webp)$/,
    video: /^video\/(mp4|webm|ogg)$/,
  };

  const renderDocument = () => (
    <div className="flex items-center gap-3 bg-blue-500 rounded-xl p-3">
      <FileText className="w-6 h-6 text-white" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {fileData.name}
        </p>
        <p className="text-xs text-white">
          {(fileData.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      </div>
      <a
        href={fileData.url}
        download={fileData.name}
        className="p-1.5 bg-blue-400 rounded-full"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </a>
    </div>
  );

  const renderMedia = () => (
    <div className="overflow-hidden rounded-xl">
      {fileTypes.image.test(fileData.type) ? (
        <img
          src={fileData.url}
          alt={fileData.name}
          className="w-full h-auto object-cover"
        />
      ) : (
        <video controls className="w-full h-auto">
          <source src={fileData.url} type={fileData.type} />
          Your browser does not support the video element.
        </video>
      )}
    </div>
  );

  return (
    <div className="max-w-sm">
      {fileTypes.image.test(fileData.type) ||
      fileTypes.video.test(fileData.type)
        ? renderMedia()
        : renderDocument()}
    </div>
  );
};

export default FileAttachment;
