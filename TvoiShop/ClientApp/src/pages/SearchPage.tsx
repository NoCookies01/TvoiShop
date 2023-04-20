import React, { useEffect } from 'react';
import { FooterPanel } from '../components/FooterPanel';
import { InstrumentPanel } from '../components/InstrumentPanel';
import IItem from '../components/nestedSelect/item';
import { CardProducts } from '../components/productsView/CardProduct';
import { SortOrder } from '../data/sortCriteria';
import { Helmet } from 'react-helmet';

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
            <Helmet>
                <title>Каталог: стильні ювелірні вироби, елегантні недорогі годинники, дешеві | TVOI</title>
            </Helmet>
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
            <CardProducts products = {props.products} />
            <FooterPanel/>
        </div>
        
    );
}
