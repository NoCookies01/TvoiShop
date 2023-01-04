import IItem from "../components/nestedSelect/item";
import translationService from "../services/translation.service";

const getSortCriteria = (): IItem[] => [{
    Title: translationService.translate("sort price|A"),
    Value: translationService.translate("sort price|A")
},{
    Title: translationService.translate("sort popularity|A"),
    Value: translationService.translate("sort popularity|A")
}];

export default getSortCriteria;