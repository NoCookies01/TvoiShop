import React, { SyntheticEvent } from "react";
import getSortCriteria, { SortOrder } from "../data/sortCriteria";
import translationService from "../services/translation.service";
import IItem from "./nestedSelect/item";
import NestedSelect from "./nestedSelect/NestedSelect";

interface IProps {
  sortBy: (property: string, sortOrder: SortOrder) => void;
  filterBy: (value: string, property: string) => void;
  filterCriteria: IItem[];
  resetFilter: () => void;
}

export const InstrumentPanel = (props:IProps) => {

  const filterBy = (values: IItem[]) => {
    const value = values[values.length - 1].Value;
    const property = values.slice(0, values.length - 1).map(c => c.Value).reduce((p, c) => {
      p += `.${c}`;

      return p;
    });
    
    props.filterBy(value, property);
  };

  const onSort = (values: IItem[]) => {
    const value = values[0];
    const criteria = getSortCriteria().find(c => c.Value === value.Value && c.Title === value.Title);

    props.sortBy(value.Value, criteria!.SortOrder);
  }

  return(
    <div className="instrPanel">
      <div className="column">
        <NestedSelect 
          onSelect={filterBy} 
          defaultText={translationService.translate("filter by|A")}
          items={props.filterCriteria}
          reset={props.resetFilter}
        />
      </div>
      <div className="column"> 
        <NestedSelect 
          onSelect={onSort}
          defaultText={translationService.translate("sort by|A")}
          items={getSortCriteria()}
          reset={props.resetFilter}
        />
      </div>
    </div>
  );
}
