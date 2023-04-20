import React from 'react';
import { useLocation } from 'react-router-dom';
import translationService from '../../services/translation.service';
import './styles.css';

export default function SelectLanguage() {
    const [openOptions, setOpenOptions] = React.useState(false);
    const location = useLocation();

    const onLangSelect = (value: string) => {
        var additional = location.pathname.indexOf("/", 1) !== -1 ? location.pathname.substring(location.pathname.indexOf("/", 1)) : "";
        var newLocation = `/${value}${additional}`;
        
        window.location.href = newLocation;
    }

    return (
        <div>
            {openOptions && <div>
                {
                    translationService.languages.map(l => 
                        translationService.lang !== l && <div className='clickable langOption' onClick={() => onLangSelect(l)}>{l}</div>
                    )
                }
            </div>}
            <div onClick={() => setOpenOptions(!openOptions)} className='clickable'>{translationService.lang}</div>
        </div>
    );
}