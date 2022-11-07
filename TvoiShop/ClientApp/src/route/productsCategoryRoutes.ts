export interface IProductCategoryRoute {
    title: string;
    category: string;
    path: string;
}

export const productCategoryRoutes: IProductCategoryRoute[] = [{
    title: "bracelets",
    category: "Bracelet",
    path: "/bracelet"
},{
    title: "watches",
    category: "Watch",
    path: "/watches"
},{
    title: "necklaces",
    category: "Necklace",
    path: "/necklace"
},{
    title: "Earrings",
    category: "Earrings",
    path: "/earrings"
},{
    title: "rings",
    category: "Rings",
    path: "/rings"
},{
    title: "charms",
    category: "Charm",
    path: "/charm"
}];