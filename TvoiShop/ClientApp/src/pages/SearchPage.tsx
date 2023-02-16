import React, { useEffect } from 'react';
import { InstrumentPanel } from '../components/InstrumentPanel';
import IItem from '../components/nestedSelect/item';
import { CardProducts } from '../components/productsView/CardProduct';
import { SortOrder } from '../data/sortCriteria';

interface IProps {
    products: IProduct[];
    sortBy: (property: string, sortOrder: SortOrder) => void;
    filterBy: (value: any, property: string) => void;
    filterCriteria: IItem[];
    resetFilter: () => void;
}

export const SearchPage = (props: IProps) => {
    useEffect(() =>{ return () => { props.resetFilter(); }}, [])
    return(
        <div>
            <br/>
            <br/>
            <div className="simItemPos">
                <InstrumentPanel 
                  resetFilter={props.resetFilter} 
                  sortBy={props.sortBy} 
                  filterBy={props.filterBy} 
                  filterCriteria={props.filterCriteria}
                />
            </div>

            <div className='productView'> 
                <CardProducts products = {props.products} />
            </div>
        </div>
        
    );
}
