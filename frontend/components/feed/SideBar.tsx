import getUserData from "@/utils/getUserData";
import Image from "next/image";

function SideBar() {
  let userData;
  try {
    const decoded: any = getUserData();
    userData = decoded.userData;
  } catch (error: any) {
    console.log(error);
  }

  const profilePicUrl =
    userData?.profilePicUrl || "/img/DefaultProfilePicMale.png";

  return (
    <div className="w-full h-full max-w-full overflow-hidden bg-secColor">
      <a href={`/profile/${userData?.username}`}>
        {" "}
        <div className="h-[30%] flex items-center justify-center">
          <Image
            src={profilePicUrl}
            alt="Profile Pic"
            width={500}
            height={500}
            className="w-28 h-28 border-2 border-rootBg object-cover rounded-full cursor-pointer hover:border-4"
          />
        </div>
      </a>
      <div className="h-[50%] flex flex-col">
        <div className="flex items-center mt-[3%] mx-[10%] rounded-lg cursor-pointer hover:bg-secColorH">
          <Image
            src="/icons/home.svg"
            alt="Home Logo"
            width={50}
            height={50}
            className="h-10 w-10"
          />
          <p className="pl-5 text-xl text-white font-bold">Home</p>
        </div>
        <a href="/notifications">
          <div className="flex items-center mt-[3%] mx-[10%] rounded-lg  cursor-pointer hover:bg-secColorH">
            <Image
              src="/icons/notification.svg"
              alt="Home Logo"
              width={50}
              height={50}
              className="h-10 w-10"
            />
            <p className="pl-5 text-xl text-white font-bold">Notifications</p>
          </div>
        </a>
        <div className="flex items-center mt-[3%] mx-[10%] rounded-lg  cursor-pointer hover:bg-secColorH">
          <Image
            src="/icons/message.svg"
            alt="Home Logo"
            width={50}
            height={50}
            className="h-10 w-10"
          />
          <p className="pl-5 text-xl text-white font-bold">Messages</p>
        </div>
        <a href={`/profile/${userData?.username}/bookmarks`}>
          <div className="flex items-center mt-[3%] mx-[10%] rounded-lg  cursor-pointer hover:bg-secColorH">
            <Image
              src="/icons/bookmark.svg"
              alt="Home Logo"
              width={50}
              height={50}
              className="h-10 w-10"
            />
            <p className="pl-5 text-xl text-white font-bold">Bookmarks</p>
          </div>
          <div className="flex items-center mt-[3%] mx-[10%] rounded-lg  cursor-pointer hover:bg-secColorH">
            <Image
              src="/icons/search.svg"
              alt="Home Logo"
              width={50}
              height={50}
              className="h-10 w-10"
            />
            <p className="pl-5 text-xl text-white font-bold">Search</p>
          </div>
        </a>
      </div>
      <div className="h-[20%]">
        <a href="/createPost">
          <div className="flex items-center mt-[3%] mx-[10%] rounded-lg cursor-pointer hover:bg-secColorH">
            <Image
              src="/icons/createPost.svg"
              alt="Home Logo"
              width={50}
              height={50}
              className="h-10 w-10"
            />
            <p className="pl-5 text-xl text-white font-bold">Create Post</p>
          </div>
        </a>
        <a href="/settings">
          <div className="flex items-center mt-[3%] mx-[10%] rounded-lg cursor-pointer hover:bg-secColorH">
            <Image
              src="/icons/menu2.svg"
              alt="Home Logo"
              width={50}
              height={50}
              className="h-10 w-10"
            />
            <p className="pl-5 text-xl text-white font-bold">More</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default SideBar;
