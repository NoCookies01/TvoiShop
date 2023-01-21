export interface IProductCategoryRoute {
    title: string;
    category: string;
    path: string;
}

export const productCategoryRoutes: IProductCategoryRoute[] = [{
    title: "Bracelets",
    category: "bracelets",
    path: "bracelets"
},{
    title: "Watches",
    category: "watches",
    path: "watches"
},{
    title: "Necklaces",
    category: "necklaces",
    path: "necklaces"
},{
    title: "Earrings",
    category: "earrings",
    path: "earrings"
},{
    title: "Rings",
    category: "rings",
    path: "rings"
},{
    title: "Charms",
    category: "charms",
    path: "charms"
}];