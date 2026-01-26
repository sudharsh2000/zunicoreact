import React, { useEffect, useState } from "react";

function FileUploader({tempimage, onFileselect, fileref, resettrigger }) {
  const [previews, setPreviews] = useState([]);
const [imageselect,setselected]=useState(false)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // multiple files
    if (files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviews(urls);
      onFileselect(files); // send all files to parent
      setselected(true)
    }
  };

 useEffect(() => {
 

  // RESET
  if (resettrigger) {
   if(!tempimage){ setPreviews([]);
    if (fileref?.current) fileref.current.value = null;
    setselected(false);
    return;
   }
  }

  // EDIT MODE (show backend images)
  if (tempimage && !imageselect) {
    setPreviews(tempimage);
  }
 

  // ❌ DO NOT clear previews here
}, [tempimage, resettrigger]);


  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label
        htmlFor="fileUpload"
        className="cursor-pointer border-2 border-dashed border-gray-400 rounded-xl p-6 text-center hover:bg-gray-100 transition"
      >
        
        {previews[0]&&previews.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {previews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="h-8 lg:w-18 lg:h-14 object-cover rounded-lg"
              />
            ))}
          </div>
        ) : (
          <>
            <p className="text-gray-600 font-semibold">
              Click or drag to upload images
            </p>
            <p className="text-sm text-gray-400">
              Supported formats: jpg, png, webp (multiple allowed)
            </p>
          </>
        )}
      </label>

      <input
        id="fileUpload"
        type="file"
        multiple
        ref={fileref}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default FileUploader;
