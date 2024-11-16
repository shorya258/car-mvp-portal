import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";

const MAX_IMAGES = 10;

const MultiImageUpload = (props) => {
  const [images, setImages] = useState([]);
  console.log(props, "props")
  // Handle image selection
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    if (images.length + files.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    props.handleSelectedImages(newImages);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Remove an image from the preview list
  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <>
      <div className="sm:col-span-4">
        <label
          htmlFor="productName"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Cover Photos
        </label>

        <div className="mt-2">
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleImageChange}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
            disabled={images.length >= MAX_IMAGES}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              disabled={images.length >= MAX_IMAGES}
            >
              {images.length >= MAX_IMAGES ? "Limit Reached" : "Upload Images"}
            </Button>
          </label>
          <div className="flex flex-wrap rounded-md shadow-sm  max-w-lg mt-2 gap-6">
            { props.existingImages?.map((img, index) => (
              <div key={index} className="relative ">
                <img
                  src={img?.imgUrl}
                  alt={`Preview ${index}`}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <IconButton
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "red",
                    color: "secondary",
                    fontSize: 8,
                  }}
                  color="default"
                  onClick={() => props.handleRemoveExistingImage(img._id)}
                >
                  ✖
                </IconButton>
              </div>
            ))}
            {images.map((img, index) => (
              <div key={index} className="relative ">
                <img
                  src={img.preview}
                  alt={`Preview ${index}`}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <IconButton
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "red",
                    color: "secondary",
                    fontSize: 8,
                  }}
                  color="default"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✖
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiImageUpload;
