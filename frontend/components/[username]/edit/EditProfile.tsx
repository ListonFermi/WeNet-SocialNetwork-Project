"use client";
import { saveUser } from "@/redux/userSlice";
import { IUser } from "@/types/types";
import userService from "@/utils/apiCalls/userService";
import { validateDateOfBirthEdit } from "@/utils/validateDOB";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  _id?: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  dateOfBirth: string;
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

function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
        const userData = await userService.getCurrUserData()
        setUserData(userData);
        dispatch(saveUser({ userData }));
      } catch (err: any) {
        setError(err.response?.data || "Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  if (loading) {
    toast("loading", toastOptions);
    return <div className="text-white">Loading...</div>;
  }
  if (error) {
    toast(error, toastOptions);
    return <div className="text-white">{error}</div>;
  }

  // Destructure and format userData
  const {
    firstName,
    lastName,
    username,
    bio = "",
    profilePicUrl = "/img/DefaultProfilePicMale.png",
    coverPicUrl = "",
  } = userData || {};

  const dateOfBirth = userData?.dateOfBirth
    ? new Date(userData?.dateOfBirth + "").toISOString().split("T")[0]
    : null;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
      data._id = userData?._id;
      await toast.promise(
        axios.patch(`${userServiceUrl}/profile/userData`, data, {
          withCredentials: true,
        }),
        {
          pending: "Saving changes",
          success: "Profile edited successfully",
          error: "Failed to edit profile",
        },
        toastOptions
      );
      router.replace(`/profile/${userData?.username}`);
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to edit profile";
      toast.error(errorMessage, toastOptions);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-96 w-full shadow-md bg-secColor">
          {/* Cover Pic */}
          <div className="h-1/2 relative">
            {coverPicUrl && (
              <Image
                src={coverPicUrl}
                alt="Cover Pic"
                width={400}
                height={300}
                className="w-full h-full border-2 border-rootBg object-cover"
              />
            )}
            <div className="absolute inset-0 flex justify-center items-center cursor-pointer">
              <Image
                src="/icons/camera.svg"
                alt="upload pic symbol"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex flex-col h-1/2 w-full">
            {/* Profile Details- Upper portion: Username, button */}
            <div className="h-1/2 flex flex-row">
              {/* Profile Pic */}
              <div className="relative w-[30%] left-0 ml-4 -top-20">
                <Image
                  src={profilePicUrl}
                  alt="Profile Pic"
                  width={40}
                  height={40}
                  className="w-40 h-40 border-2 border-rootBg object-cover rounded-full cursor-pointer hover:border-4"
                />
                <div className="left-0 absolute inset-0 flex justify-center items-center cursor-pointer">
                  <Image
                    src="/icons/camera.svg"
                    alt="upload pic symbol"
                    width={10}
                    height={10}
                    className="h-10 w-10"
                    onClick={() =>
                      router.push(`/profile/${username}/edit/image`)
                    }
                  />
                </div>
              </div>
              {/* Full name & username */}
              <div className="flex flex-col w-[50%] align-middle">
                <div className="w-full flex">
                  <div className="w-1/2">
                    <label htmlFor="firstName" className="text-white">
                      First Name:
                      <input
                        type="text"
                        id="firstName"
                        defaultValue={firstName}
                        {...register("firstName", {
                          required: "First Name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message:
                              "Please use valid characters only. [Alphabets A to Z, a to z]",
                          },
                          minLength: {
                            value: 3,
                            message: "Enter at least 3 characters",
                          },
                          maxLength: {
                            value: 10,
                            message:
                              "First name should be less than 10 characters",
                          },
                        })}
                        className="text-xl w-[80%] lg:text-2xl md:text-xl sm:text-lg font-bold text-black px-3 sm:px-2"
                      />
                    </label>
                    {errors.firstName && (
                      <div className="text-red-500 text-xs">
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="lastName" className="text-white">
                      Last Name:
                      <input
                        type="text"
                        id="lastName"
                        defaultValue={lastName}
                        {...register("lastName", {
                          required: "Last Name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message:
                              "Please use valid characters only. [Alphabets A to Z, a to z]",
                          },
                          minLength: {
                            value: 3,
                            message: "Enter at least 3 characters",
                          },
                        })}
                        className="text-xl w-[80%] lg:text-2xl md:text-xl sm:text-lg font-bold text-black px-3 sm:px-2"
                      />
                    </label>
                    {errors.lastName && (
                      <div className="text-red-500 text-xs">
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h1 className="text-xs lg:text-xs md:text-xs sm:text-xs font-bold text-white py-2 px-4 sm:py-1 sm:px-2">
                    {`@${username}`}
                  </h1>
                </div>
              </div>

              {/* Edit / follow button */}
              <div className="w-[20%] flex items-center justify-center align-middle">
                <button
                  type="submit"
                  className="bg-rootBg hover:bg-green-700 text-white text-xs md:text-sm font-bold p-1 rounded focus:outline-none focus-shadow-outline"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Profile Details- Bottom portion: Bio, location */}
            <div className="h-1/2">
              {/* Bio */}
              <div className="h-2/3 flex w-full items-center justify-center">
                <label htmlFor="bio" className="text-white w-full p-2">
                  Bio:
                  <input
                    type="text"
                    id="bio"
                    defaultValue={bio}
                    {...register("bio", {
                      pattern: {
                        value: /^[A-Za-z0-9 .,!?'"\-]+$/i,
                        message:
                          "Please use valid characters only. [Alphabets A to Z, a to z, numbers 0-9, spaces, and punctuation marks . , ! ? ' \" -]",
                      },
                      maxLength: {
                        value: 50,
                        message: "Be within 50 characters",
                      },
                    })}
                    className="font-semibold text-black w-full text-xs lg:text-base"
                  />
                </label>
                {errors.bio && (
                  <div className="text-red-500 text-xs">
                    {errors.bio.message}
                  </div>
                )}
              </div>

              {/* Dob, place */}
              <div className="flex flex-row">
                <div className="w-1/2 flex items-center justify-center align-middle">
                  <Image
                    src="/icons/location.svg"
                    alt="location icon"
                    width={6}
                    height={6}
                    className="w-6 h-6"
                  />
                  <label htmlFor="location" className="text-white px-2">
                    From:
                    <input
                      type="text"
                      id="icon"
                      defaultValue={userData?.location || ""}
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className="font-semibold px-2 w-2/3 text-black text-sm"
                    />
                  </label>
                  {errors.location && (
                    <div className="text-red-500 text-xs">
                      {errors.location.message}
                    </div>
                  )}
                </div>
                <div className="w-1/2 flex items-center justify-center align-middle">
                  <Image
                    src="/icons/dob.svg"
                    alt="dob icon"
                    width={6}
                    height={6}
                    className="w-6 h-6"
                  />
                  <label htmlFor="dateOfBirth" className="text-white px-2">
                    {"Born: "}
                    <input
                      type="date"
                      id="dateOfBirth"
                      defaultValue={dateOfBirth + ""}
                      {...register("dateOfBirth", {
                        required: "Date of birth is required",
                        validate: validateDateOfBirthEdit,
                      })}
                      className="font-semibold px-2 w-2/3 text-black text-sm"
                    />
                  </label>
                  {errors.dateOfBirth && (
                    <div className="text-red-500 text-xs">
                      {errors.dateOfBirth.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditProfile;
