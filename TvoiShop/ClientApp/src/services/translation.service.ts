import enJsonTranlation from '../translations/en.json'; 
import deJsonTranlation from '../translations/de.json';
import uaJsonTranlation from '../translations/ua.json';

class TranslationService {
    private _tanslations: {[key: string]: string} = {};
    private _availableLangulages = ["ua", "de", "en"];
    private _langCode: string = "ua";

    constructor() {
        this.load();
    }

    public load() {
        switch(this._langCode) {
            case "en":
                this._tanslations = enJsonTranlation;
                break;
            case "ua":   
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
        if (this._availableLangulages.findIndex(al => al === langCode.toLocaleLowerCase()) === -1) this._langCode = langCode.toLocaleLowerCase();
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
}

const translationService = new TranslationService();

export default translationService;