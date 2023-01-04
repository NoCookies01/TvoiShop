import IItem from "../components/nestedSelect/item";
import translationService from "./translation.service";

export function getFilterCriteriaBasedOnProducts(products: IProduct[]): IItem[] {
    const metalItems: IItem = {Title: translationService.translate("metal|A"), Value: translationService.translate("metal|A"), Items: []};
    const colorItems: IItem = {Title: translationService.translate("color|A"), Value: translationService.translate("color|A"), Items: []};
    const brandItems: IItem = {Title: translationService.translate("brand|A"), Value: translationService.translate("brand|A"), Items: []};

    products.forEach(p => {
        if (metalItems.Items!.findIndex(i => i.Title === p.metal) === -1) {
            metalItems.Items?.push({Title: p.metal, Value: p.metal});
        }
        p.colors.forEach(c => {
            if (colorItems.Items!.findIndex(i => i.Title === c.name) === -1) {
                colorItems.Items?.push({Title: c.name, Value: c.name});
            }
        });
        if (brandItems.Items!.findIndex(i => i.Title === p.brand) === -1) {
            brandItems.Items?.push({Title: p.brand, Value: p.brand});
        }
    });

    return [brandItems, metalItems, colorItems];
}