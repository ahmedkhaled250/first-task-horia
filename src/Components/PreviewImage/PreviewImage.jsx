import { useState } from "react";

function PreviewImage({ file }) {
  const [preview, setPreview] = useState({});
  
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <div className="w-full">
      <img src={preview} className="w-full" alt="" />
    </div>
  );
}

export default PreviewImage;
