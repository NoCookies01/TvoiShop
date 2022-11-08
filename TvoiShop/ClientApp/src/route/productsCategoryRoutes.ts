export interface IProductCategoryRoute {
    title: string;
    category: string;
    path: string;
}

export const productCategoryRoutes: IProductCategoryRoute[] = [{
    title: "Bracelets",
    category: "Bracelet",
    path: "/bracelet"
},{
    title: "Watches",
    category: "Watch",
    path: "/watches"
},{
    title: "Necklaces",
    category: "Necklace",
    path: "/necklace"
},{
    title: "Earrings",
    category: "Earrings",
    path: "/earrings"
},{
    title: "Rings",
    category: "Rings",
    path: "/rings"
},{
    title: "Charms",
    category: "Charm",
    path: "/charm"
}];