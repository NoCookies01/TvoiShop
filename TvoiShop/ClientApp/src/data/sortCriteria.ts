import IItem from "../components/nestedSelect/item";
import translationService from "../services/translation.service";

const getSortCriteria = (): IItem[] => [{
    Title: translationService.translate("sort price|A"),
    Value: "price"
},{
    Title: translationService.translate("sort popularity|A"),
    Value: "popularity"
}];

export default getSortCriteria;