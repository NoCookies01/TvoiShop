import enJsonTranlation from '../translations/en.json'; 
import deJsonTranlation from '../translations/de.json';
import uaJsonTranlation from '../translations/ua.json';

class TranslationService {
    private _tanslations: {[key: string]: string} = {};
    private _availableLangulages = ["uk", "de", "en"];
    private _langCode: string = "uk";

    public get lang() { 
        return this._langCode; 
    }

    public get languages() {
        return [...this._availableLangulages];
    }

    constructor() {
        this.load();
    }

    public load() {
        switch(this._langCode) {
            case "en":
                this._tanslations = enJsonTranlation;
                break;
            case "uk":   
                this._tanslations = uaJsonTranlation;
                break;
            case "de":
                this._tanslations = deJsonTranlation;
                break;
            default:
                break;
        }
    }

    public setLanguage(langCode: string) {
        if (this._availableLangulages.findIndex(al => al === langCode.toLocaleLowerCase()) !== -1) this._langCode = langCode.toLocaleLowerCase();
    }

    public getText(key: string, defaultText: string) {
        var text = this._tanslations[key];
        if (text) return text;
        return defaultText;
    }

    public translate(key: string, defaultText: string = ""): string {
        var text = this.getText(key, defaultText);
        if (text === "") text = key.substring(0, key.length - 2);
        return text;
    }

    public getPrefferedLanguageOrDefault(defaultLang: string) {
        var language = navigator.language || (navigator as any).userLanguage; 

        if (!language) {
            return defaultLang;
        }

        var langChars = language.slice(0,2);
        var position = this._availableLangulages.indexOf(langChars);
        if (position > -1) {
            return this._availableLangulages[position];
        }

        return defaultLang;
    }
}

const translationService = new TranslationService();

export default translationService;