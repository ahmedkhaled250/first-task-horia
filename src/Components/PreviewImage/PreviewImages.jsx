import { useState, useEffect } from "react";

function PreviewImages({ files }) {
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    if (files && files.length) {
      const loadImagePromises = [];

      // Loop through the files and read them
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Create a new FileReader instance for each file
        const reader = new FileReader();

        // Create a promise that resolves with the result of the reader
        const promise = new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result); // Resolve with the base64 URL of the image
          };

          reader.readAsDataURL(file);
        });

        // Push the promise to the array
        loadImagePromises.push(promise);
      }

      // Wait for all images to load, then update the state
      Promise.all(loadImagePromises).then((images) => {
        setPreview(images); // Set all loaded images in state
      });
    }
  }, [files]); // Re-run the effect when `files` changes

  return (
    <div className="flex items-center gap-2">
      {preview?.length
        ? preview.map((file, index) => (
            <div className="w-8">
              <img
                key={index}
                src={file}
                className="w-full"
                alt={`Preview ${index}`}
              />
            </div>
          ))
        : ""}
    </div>
  );
}

export default PreviewImages;
