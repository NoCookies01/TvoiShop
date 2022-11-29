import React, { SyntheticEvent } from "react";
import NestedSelect from "./nestedSelect/NestedSelect";

interface IProps {
  sortBy: (property: string) => void;
  filterBy: (value: string, property: string) => void;
}

export const InstrumentPanel = (props:IProps) => {
  return(
    <div className="instrPanel">
      <div>
        {/*<select className="filterByStyle">
          <option value="" className="filterByItemStyle">Filter By</option>
          <option value="brand" className="filterByItemStyle">Brand</option>
          <option value="metal" className="filterByItemStyle">Metal</option>
          <option value="size" className="filterByItemStyle">Size</option>
          <option value="color" className="filterByItemStyle">Color</option>
  </select>*/}
    {<NestedSelect onSelect={(v) => console.log(v)} items={[{Title: "Brand"},{Title:"Metal", Items:[{Title: "Gold", Items:[{Title: "Gold", Items:[{Title: "Gold", Items:[{Title: "Gold", Items:[{Title: "Gold", Items:[{Title: "Gold", Items:[{Title: "Gold"}, {Title: "Silver"}]}, {Title: "Silver"}]}, {Title: "Silver"}]}, {Title: "Silver"}]}, {Title: "Silver"}]}, {Title: "Silver"}]}, {Title: "Silver"}]}]}/>}
      </div>
      <div>
        <select onChange={(e: SyntheticEvent<HTMLSelectElement, Event>) => props.sortBy(e.currentTarget.value)} className="filterByStyle">
          <option value="" className="filterByItemStyle">Sort by</option>
          <option value="price" className="filterByItemStyle">Price</option>
          <option value="popularity" className="filterByItemStyle">Popularity</option>
        </select>
      </div>
    </div>
  );
}
