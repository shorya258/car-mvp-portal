"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiImageUpload from "../Components/ImageUpload";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
const CarsForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState(searchParams.get("requestId"));
  const [userId, setUserId] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productDescription: "",
    tags: [],
    images: [],
  });
  const fetchSingleProduct = async (productId) => {
    const response = await fetch("api/fetchSingleProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const json = await response.json();
    if (response.status === 201) {
      setProductDetails(json.singleProduct);
      setExistingImages(json.singleProduct.images);
    } else {
      console.log(json.message);
    }
  };
  const createSingleProduct = async (imagesData) => {
    const response = await fetch("api/createProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productDetails,
        productImages: imagesData,
      }),
    });
    const json = await response.json();
    if (response.status === 201) {
      console.log(json.message);
      // toast.success(json.message);
    } else {
      console.log(json.message);
      // toast.error(json.message);
    }
  };
  const updateSingleProduct = async (uploadedImages) => {
    const response = await fetch("api/updateProduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productDetails,
        retainedImages: existingImages,
        newImages: uploadedImages,
      }),
    });
    const json = await response.json();
    if (response.status === 201) {
      console.log(json.message);
      // toast.success(json.message);
    } else {
      console.log(json.message);
      // toast.error(json.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImages = await uploadImagesToFirebase();
    if (!productId) {
      createSingleProduct(uploadedImages);
      console.log("created");
    } else {
      updateSingleProduct(uploadedImages);
      console.log("updated");
    }
    // console.log("changes saved");
    router.push("/dashboard");
  };
  const onChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim().length === 0) {
      console.log("a tag can't be empty");
      // toast.error("a tag can't be empty");
      return;
    }
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      tags: [...prevDetails.tags, { tagName: tagInput.trim() }],
    }));
    setTagInput("");
  };
  const handleRemoveTag = (tagToRemove) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      tags: prevDetails.tags.filter((tag) => tag.tagName !== tagToRemove),
    }));
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authStorageToken");
      if (authToken) {
        const storedData = jwtDecode(authToken);
        setUserId(storedData.userId);
      }
    }
    if (productId) {
      fetchSingleProduct(productId);
    }
  }, []);
  const handleSelectedImages = (newImages) => {
    setSelectedImages([...selectedImages, ...newImages]);
  };
  const uploadImagesToFirebase = async () => {
    const uploadedImages = [];

    for (const file of selectedImages) {
      const uploadedImage = await uploadImage(file);
      uploadedImages.push(uploadedImage);
    }
    return uploadedImages;
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
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          // Upload completed
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const uploadedImage = {
            imgName: image.file.name,
            imgUrl: downloadURL,
          };
          resolve(uploadedImage);
        }
      );
    });
  };
  const handleRemoveExistingImage = (deletedId) => {
    let updatedOldImageList = existingImages.filter(
      (image) => image._id !== deletedId
    );
    setExistingImages(updatedOldImageList);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div>
      {/* <ToastContainer/> */}
      <div className="flex flex-col p-5 items-center bg-gray-300">
      <form className="bg-white px-10 py-5 shadow-lg rounded-lg shadow-gray-600 min-w-[50%] ">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Create a car profile
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Enter the details of your car
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="productName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Model Name
                </label>
                <div className="mt-2">
                  <div className="flex ">
                    <input
                      id="productName"
                      name="productName"
                      type="text"
                      placeholder="Model Name"
                      autoComplete="productName"
                      value={productDetails.productName}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 p-1.5   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 text-black sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="productDescription"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="productDescription"
                    name="productDescription"
                    value={productDetails.productDescription}
                    onChange={onChange}
                    rows={3}
                    className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about the model.
                </p>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="tagname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Tag Name
                </label>
                {productDetails.tags.length === 5 ? (
                  <div className="text-red-500 ">You are at the limit!</div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Enter tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="inline rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                    <button
                      onClick={handleAddTag}
                      className={`inline m-2 p-1.5 ${
                        tagInput != ""
                          ? "rounded-md border-0 text-white bg-gray-800 "
                          : "border-none"
                      }`}
                    >
                      Add Tag
                    </button>
                  </>
                )}
                <div className="flex gap-3">
                  {productDetails.tags.length !== 0 &&
                    productDetails.tags.map((singleTag, key) => {
                      return (
                        <div
                          key={key}
                          className="rounded-md bg-gray-200 text-gray-700 p-2"
                        >
                          {singleTag.tagName}{" "}
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="text-gray-700"
                            onClick={() => handleRemoveTag(singleTag.tagName)}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              <MultiImageUpload
                handleRemoveExistingImage={handleRemoveExistingImage}
                existingImages={existingImages}
                handleSelectedImages={handleSelectedImages}
              />
            </div>
            <div className="flex justify-evenly p-3">
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg  font-semibold leading-6 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out "
              >
                Save changes
              </button>
              <button
                className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg font-semibold leading-6 shadow-sm hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarsForm />
    </Suspense>
  );
}
