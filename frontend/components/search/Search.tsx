"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import UserSearch from "./UserSearch";
import userService from "@/utils/apiCalls/userService";
import PostsSearch from "./PostsSearch";

function Search() {
  const [isUserSearch, setIsUserSearch] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const debounceTimeoutRef: any = useRef(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (keyword.trim()) {
        handleSearch();
      } else {
        setResults([]); 
      }
    }, 300); 

    return () => {
      clearTimeout(debounceTimeoutRef.current);
    };
  }, [keyword, handleSearch]);

  async function handleSearch() {
    try {
      if (isUserSearch) {
        const results = await userService.searchUsers(keyword);
        setResults(results);
        console.log({ results });
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  function handleSearchChange() {
    setIsUserSearch(!isUserSearch);
  }

  return (
    <div className="h-full w-full">
      <div className="h-[10%] w-full flex items-center justify-center">
        <input
          type="text"
          className="bg-black p-2 rounded-lg text-white"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>
      <div>
        <div className="w-full flex flex-col items-center justify-center">
          {isUserSearch && results.length > 0 ? (
            <UserSearch results={results} />
          ) : (
            results.length > 0 && <PostsSearch />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
