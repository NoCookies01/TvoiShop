import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InstrumentPanel } from '../components/InstrumentPanel';
import IItem from '../components/nestedSelect/item';
import { CardProducts } from '../components/productsView/CardProduct';
import { SearchBar } from '../components/SearchBar';

interface IProps {
    products: IProduct[];
    handleClick: (item: IProduct) => void;
    sortBy: (property: string) => void;
    filterBy: (value: any, property: string) => void;
    filterCriteria: IItem[];
    resetFilter: () => void;
}

export const SearchPage = (props: IProps) => {

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
                <CardProducts products = {props.products} handleClick={props.handleClick}/>
            </div>
        </div>
        
    );
}
