import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardProducts } from '../components/productsView/CardProduct';
import { SearchBar } from '../components/SearchBar';

interface IProps {
    products: IProduct[];
    handleClick: (item: IProduct) => void;
}

export const SearchPage = (props: IProps) => {

    return(
        <div>
            <br/>
            <br/>
            <div className='simItemPos'>
                Search
            </div>

            <div className='productView'> 
                <CardProducts products = {props.products} handleClick={props.handleClick}/>
            </div>
        </div>
        
    );
}
