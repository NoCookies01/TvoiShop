import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import translationService from '../services/translation.service';


export default function ServiceLayer() {
    let {lang} = useParams<any>();
    
    if (lang) {
        translationService.setLanguage(lang);
        translationService.load();
    }

    return <><Outlet /></>;
}