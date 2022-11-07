import React, { ChangeEvent } from "react";
import { BackButton } from "./buttons/BackButton";

interface IProps {
  sort: (querry: string) => void;
}

export const SearchBar = (props: IProps) => {

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    props.sort(event.target.value);
  };
  
  return(
    <div className="sticky">
        <form role="search">
            <input 
            className="searchBar" 
            type="search" 
            aria-label="Search"
            placeholder = "Search..."
            onChange={handleSearch}
            />
        </form>
        <BackButton/>
    </div>
 
  );
}
