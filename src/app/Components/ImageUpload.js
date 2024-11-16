import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "../../../firebaseConfig";

const MAX_IMAGES = 10;

const MultiImageUpload = (props) => {
  const [images, setImages] = useState([]);
  const [uploadedFileLinks, setUploadedFileLinks] = useState([]);

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

  const processArrayConcurrently = async () => {
    const downloadURLs = [];
    for (const file of images) {
      const url = await uploadImage(file);
      downloadURLs.push(url)
    }
    props.handleUploadedImages(downloadURLs);
  };
  const uploadImage = async (image) => {
    return new Promise((resolve, reject) => {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `images/${image.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        // Upload completed
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(`Upload completed for , URL: ${downloadURL}`);
        resolve(downloadURL);
      }
    );
    })
  };

  return (
    <>
      <div className="sm:col-span-4">
        <Button variant="contained" component="span" onClick={processArrayConcurrently}>
          Submit
        </Button>
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
