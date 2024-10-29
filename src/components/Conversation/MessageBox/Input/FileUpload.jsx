import { forwardRef } from "react";
import { storage } from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FileUpload = forwardRef(({ onFileUpload }, fileInputRef) => {
  const allowedTypes = {
    image: ["image/jpeg", "image/png", "image/gif"],
    video: ["video/mp4", "video/webm"],
    document: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    archive: ["application/zip", "application/x-rar-compressed"],
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidType = Object.values(allowedTypes).flat().includes(file.type);

    if (!isValidType) {
      alert("File type not supported");
      return;
    }

    try {
      // Tạo reference đến storage
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);

      // Bắt đầu upload
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Theo dõi tiến trình upload
      uploadTask.on(
        "state_changed",
        // Progress
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        // Error
        (error) => {
          console.error("Upload error:", error);
          alert("Error uploading file");
        },
        // Complete
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Gửi thông tin file về parent component
          onFileUpload({
            name: file.name,
            type: file.type,
            size: file.size,
            url: downloadURL,
          });

          // Reset input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file");
    }
  };

  return (
    <input
      ref={fileInputRef}
      type="file"
      onChange={handleFileSelect}
      className="hidden"
      accept={Object.values(allowedTypes).flat().join(",")}
    />
  );
});

FileUpload.displayName = "FileUpload";

export default FileUpload;
