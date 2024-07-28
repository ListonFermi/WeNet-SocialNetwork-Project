"use client";
import React, {
  useState,
  createRef,
  ChangeEvent,
  FormEvent,
} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import Image from "next/image";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { USER_SERVICE_URL } from "@/utils/constants";

type ReactCropperElement = HTMLDivElement & {
  cropper: Cropper;
};

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

const AddImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const cropperRef = createRef<ReactCropperElement| any>();
  const [cropData, setCropData] = useState<string>("/");

  const router = useRouter();

  function imageHandler(e: ChangeEvent<HTMLInputElement> | DragEvent) {
    e.preventDefault();
    let files: FileList | null = null;
    if ("dataTransfer" in e && e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if ("target" in e && e.target) {
      files = (e.target as HTMLInputElement).files;
    }
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  }

  async function dataURLtoBlob(dataURL: string): Promise<Blob> {
    const res = await fetch(dataURL);
    const blob = await res.blob();
    return blob;
  }

  async function uploadImage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedDataURL = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();
      const croppedBlob = await dataURLtoBlob(croppedDataURL);

      const formData = new FormData();
      formData.append("image", croppedBlob, "croppedImage.png");

      const userServiceUrl = USER_SERVICE_URL;

      try {
        await toast.promise(
          axios.post(
            `${userServiceUrl}/profile/userData/image/profilePic`,
            formData,
            {
              withCredentials: true,
            }
          ),
          {
            pending: "Uploading image",
            success: "Image uploaded successfully",
            error: "Failed to upload",
          },
          toastOptions
        );
        router.replace("/");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload image");
      }
    }
  }

  return (
    <form
      onSubmit={uploadImage}
      className="h-full"
      encType="multipart/form-data"
    >
      <ToastContainer />
      {cropData && (
        <Image
          width={100}
          height={100}
          alt="galleryPic"
          src={cropData}
          className="hidden"
        />
      )}

      <div className="h-full w-full bg-secColor">
        <div className="h-[15%] flex items-center justify-center">
          <h1 className="text-white font-bold text-2xl">Add profile pic</h1>
        </div>
        <div className="h-[55%] flex flex-col items-center justify-center">
          {image ? (
            <div>
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
                aspectRatio={1 / 1}
              />
            </div>
          ) : (
            <div className="p-5">
              <Image
                width={100}
                height={100}
                alt="galleryPic"
                src={"/icons/gallery.svg"}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center p-5">
          <input
            type="file"
            name="image"
            onChange={imageHandler}
            accept="image/*"
            className="bg-rootBg hover:bg-green-700 text-white font-bold p-2 rounded-lg focus:outline-none focus-shadow-outline"
          />
        </div>
        {image && (
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-rootBg hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default AddImage;
