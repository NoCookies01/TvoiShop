import React from 'react'
import { useNavigate } from 'react-router-dom';
import translationService from '../../services/translation.service';

interface IProps {
    products: IProduct[];
    
    handleClick: (item: IProduct) => void;
}

export const Categories = (props: IProps) => {
    const navigate = useNavigate();

  return (
    <div className='categoriesStylePos'> 
        <div className='logoCategory txtCategory' onClick={() => {navigate(`/watches`)}}> 
            {translationService.translate("category watches|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/bracelets`)}}> 
            {translationService.translate("category bracelet|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/necklaces`)}}> 
            {translationService.translate("category necklace|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/earrings`)}}> 
            {translationService.translate("category earrings|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/rings`)}}> 
            {translationService.translate("category rings|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(`/charms`)}}> 
            {translationService.translate("category charm|A")}
        </div>

    </div>
  )
}