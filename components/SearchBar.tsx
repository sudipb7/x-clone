import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { LuLoader2 } from "react-icons/lu";

import useDebounce from "@/hooks/useDebounce";
import useSearch from "@/hooks/useSearch";

import UserCard from "./UserCard";

const SearchBar = () => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value);
  const { data: fetchedUsers = [], isLoading } = useSearch(debouncedValue);

  const divStyle = fetchedUsers && debouncedValue ? { display: "flex" } : { display: "none" };

  return (
    <div className="w-full relative">
      <input
        type="text"
        name="search"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Search"
        className="
          peer placeholder:text-zinc-500
          p-3 pl-12 w-full rounded-full 
          outline-none focus:outline-none
          bg-gray-100 focus:bg-white
          focus:ring-1 focus:ring-sky-500
        "
      />
      <BsSearch
        size={18}
        className="
          peer-focus:text-sky-500
          absolute top-3.5 left-5
        "
      />
      {!debouncedValue || !fetchedUsers ? (
        <p
          className="
            absolute top-[115%] left-0 
            w-full rounded-xl shadow-md
            hidden peer-focus:block bg-white
            text-sm font-light text-justify
            p-6 pb-10 z-10 border
          "
        >
          Try searching for people, lists, or keywords
        </p>
      ) : null}
      <div
        className="
          absolute top-[115%] left-0 
          w-full rounded-xl shadow-md p-3 
          flex flex-col
          items-center justify-center 
          gap-3 bg-white z-10 border
        "
        style={divStyle}
      >
        {isLoading && (
          <div className="w-full px-3 py-5">
            <LuLoader2
              size={24}
              color="blue"
              className="animate-spin mx-auto"
            />
          </div>
        )}
        {fetchedUsers &&
          fetchedUsers.map((user: Record<string, any>) => (
            <UserCard
              key={user.id}
              name={user.name}
              id={user.id}
              username={user.username}
              verified={user.verified}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
