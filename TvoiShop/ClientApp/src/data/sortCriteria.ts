import IItem from "../components/nestedSelect/item";
import translationService from "../services/translation.service";

export enum SortOrder {
    Unknown,
    Ascending,
    Descending
}

interface ISortItem extends IItem {
    SortOrder: SortOrder;
}

const getSortCriteria = (): ISortItem[] => [{
    Title: translationService.translate("sort price Up|A"),
    Value: "price" && "salePrice",
    SortOrder: SortOrder.Descending
},
{
    Title: translationService.translate("sort price Down|A"),
    Value: "price" && "salePrice",
    SortOrder: SortOrder.Ascending
},
{
    Title: translationService.translate("sort popularity|A"),
    Value: "popularity",
    SortOrder: SortOrder.Ascending
}];

export default getSortCriteria;