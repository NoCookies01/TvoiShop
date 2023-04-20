import React from 'react';
import { FooterPanel } from '../components/FooterPanel';
import '../styles/infoPage.css'

export const InfoPage = () => {
    return(
        <div className='container'>
            <div className='largeText'>Про нас</div>

            <div className='blockInfoPage'>
                <div className='mediumText'>
                    Ми - маркетплейс, на якому представлені відомі світові ювелірні бренди. 
                    Ми співпрацюємо напряму з виробниками, без посередників, тому наші ціни нижче ринкових.
                </div>
            </div>

            <div className='largeText'>Чому Ми</div>
            <div className='rowStyle centered' >
            <div className='blockSmallInfoPage'>
                <div className='largeText'>Зручність</div>
                <div className='mediumText'>
                    Все працює просто, швидко та зрозуміло.
                    Оформляй замовлення у три кліки - і ми доставимо його у лічені дні
                </div>
            </div>

            <div className='blockSmallInfoPage'>
                <div className='largeText'>Безпека</div>
                <div className='mediumText'>
                    Ми не просимо дані кредитних карт, рахунків чи онлайн-кошильків.
                    Ви оплачуєте товар на пошті, безпосередньо при його отриманні
                </div>
            </div>

            <div className='blockSmallInfoPage'>
                <div className='largeText'>Сервіс</div>
                <div className='mediumText'>
                    У нас є обмін та/або повернення товару, протягом 14 днів з моменту його отримання
                </div>
            </div>
            </div>
            <FooterPanel/>
        </div>
    );
}
