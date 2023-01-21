import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getRoute } from '../../services/routes.service';
import translationService from '../../services/translation.service';

interface IProps {
    products: IProduct[];
    
    handleClick: (item: IProduct) => void;
}

export const Categories = (props: IProps) => {
    const navigate = useNavigate();

  return (
    <div className='categoriesStylePos'> 
        <div className='logoCategory txtCategory' onClick={() => {navigate(getRoute(`watches`))}}> 
            {translationService.translate("category watches|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(getRoute(`bracelets`))}}> 
            {translationService.translate("category bracelet|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(getRoute(`necklaces`))}}> 
            {translationService.translate("category necklace|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(getRoute(`earrings`))}}> 
            {translationService.translate("category earrings|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(getRoute(`rings`))}}> 
            {translationService.translate("category rings|A")}
        </div>

        <div className='logoCategory txtCategory' onClick={() => {navigate(getRoute(`charms`))}}> 
            {translationService.translate("category charm|A")}
        </div>

    </div>
  )
}