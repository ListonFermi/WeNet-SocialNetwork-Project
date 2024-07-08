"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserSearch from "./UserSearch";
import PostsSearch from "./PostsSearch";
import userService from "@/utils/apiCalls/userService";

function Search() {
  const [isUserSearch, setIsUserSearch] = useState(true);

  const [keyword, setKeyword] = useState("");

  const [results, setResults] = useState();
  

  async function handleSearch() {
    try {
      if (isUserSearch) {
        const results = await userService.searchUsers(keyword);
        setKeyword("");
        setResults(results);
        console.log({ results });
      } else {
        const results = await userService.searchUsers(keyword);
        setKeyword("");
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  function handleSearchChange() {
    setIsUserSearch(!isUserSearch);
  }

  return (
    <div className=" h-full w-full">
      <div className="h-[10%] w-full flex items-center justify-center">
        <input
          type="text"
          className="bg-black p-2 rounded-lg text-white"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button onClick={handleSearch}>
          <Image
            src="/icons/search.svg"
            alt="Home Logo"
            width={50}
            height={50}
            className="h-10 w-10"
          />
        </button>
      </div>
      <div>
        {/* <div className="h-10 w-full flex bg-secColor">
          <div
            className={`shadow-inner rounded-sm ${
              isUserSearch && "shadow-rootBg"
            }  w-1/2 flex items-center justify-center cursor-pointer`}
            onClick={handleSearchChange}
          >
            <h1 className="text-white font-bold cursor-pointer">Users</h1>
          </div>
          <div
            className={`shadow-inner rounded-sm ${
              !isUserSearch && "shadow-rootBg"
            }  w-1/2 flex items-center justify-center cursor-pointer`}
            onClick={handleSearchChange}
          >
            <h1 className="text-white font-bold cursor-pointer">Posts</h1>
          </div>
        </div> */}
        <div className="w-full flex flex-col items-center justify-center">
          {isUserSearch && results ? (
            <UserSearch results={results} />
          ) : (
            results &&   <PostsSearch />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
