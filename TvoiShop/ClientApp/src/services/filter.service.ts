import IItem from "../components/nestedSelect/item";

export function getFilterCriteriaBasedOnProducts(products: IProduct[]): IItem[] {
    const metalItems: IItem = {Title: "metal", Items: []};
    const colorItems: IItem = {Title: "color", Items: []};
    const brandItems: IItem = {Title: "brand", Items: []};

    products.forEach(p => {
        if (metalItems.Items!.findIndex(i => i.Title === p.metal) === -1) {
            metalItems.Items?.push({Title: p.metal});
        }
        if (colorItems.Items!.findIndex(i => i.Title === p.color) === -1) {
            colorItems.Items?.push({Title: p.color});
        }
        if (brandItems.Items!.findIndex(i => i.Title === p.brand) === -1) {
            brandItems.Items?.push({Title: p.brand});
        }
    });

    return [brandItems, metalItems, colorItems];
}