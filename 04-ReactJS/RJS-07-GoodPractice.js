


// on error for the image 
import React, { useState } from "react";

const ImageWithFallback = () => {
  const [imgSrc, setImgSrc] = useState("https://example.com/non-existing-image.jpg");

  const handleError = () => {
    setImgSrc("https://via.placeholder.com/150"); // Fallback image
  };

  return (
    <div>
      <h2>Image Load Example</h2>
      <img src={imgSrc} alt="Example" onError={handleError} width={200} />
    </div>
  );
};

export default ImageWithFallback;
