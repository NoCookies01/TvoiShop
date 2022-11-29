import React from 'react'
import { useNavigate } from 'react-router-dom';

interface IProps {
    products: IProduct[];
    
    handleClick: (item: IProduct) => void;
}

export const Categories = (props: IProps) => {
    const navigate = useNavigate();

  return (
    <div className='categoriesStylePos'> 
        <div className='logoCategory txtCategory' onClick={() => {navigate(`/watches`)}}> 
            watches
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/bracelets`)}}> 
            bracelet
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/necklaces`)}}> 
            necklace
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/earrings`)}}> 
            earrings
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/rings`)}}> 
            rings
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/charms`)}}> 
            charm
        </div>

    </div>
  )
}