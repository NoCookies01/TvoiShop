import IItem from "../components/nestedSelect/item";
import { getPropertyFromObject } from "./object.service";
import translationService from "./translation.service";

export function getFilterCriteriaBasedOnProducts(products: IProduct[]): IItem[] {
    const metalItems: IItem = {Title: translationService.translate("metal|A"), Value: "metal", Items: []};
    const colorItems: IItem = {Title: translationService.translate("color|A"), Value: "colors", Items: []};
    const brandItems: IItem = {Title: translationService.translate("brand|A"), Value: "brand", Items: []};

    products.forEach(p => {
        if (metalItems.Items!.findIndex(i => i.Title === p.metal) === -1) {
            metalItems.Items?.push({Title: p.metal, Value: p.metal});
        }
        p.colors.forEach(c => {
            if (colorItems.Items!.findIndex(i => i.Title === c.name) === -1) {
                colorItems.Items?.push({Title: c.name, Value: c.name, Path: "name"});
            }
        });
        if (brandItems.Items!.findIndex(i => i.Title === p.brand) === -1) {
            brandItems.Items?.push({Title: p.brand, Value: p.brand});
        }
    });

    return [brandItems, metalItems, colorItems];
}

export function comparePorductsPropertyToValue(product: IProduct, value: any, propertyPath: string) {
    var property = getPropertyFromObject(product, propertyPath);
    console.log(propertyPath,property,value)
    if (Array.isArray(property)) {
        return property.some(p => p === value);
    }

    return property === value;
}