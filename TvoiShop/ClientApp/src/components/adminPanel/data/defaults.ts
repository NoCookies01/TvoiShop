const defaultImage: IImage = {
    id: "",
    url: ""
}

const defaultColor: IColor = {
    id: "",
    name: ""
}

const defaultSize: ISize = {
    id: "",
    value: ""
}

export const defaultProduct: IProduct = {
    id: "",
    count:  0,
    collection: "",
    category: "",
    labelName: "",
    brand: "",
    price: 0,
    salePrice: 0,
    images: [defaultImage, defaultImage, defaultImage, defaultImage],
    weight: 0,
    colors: [defaultColor],
    metal: "",
    sizes: [defaultSize],
    description: "",
    popularity: 0,
    customPopularity: 0,
    packaging: ""
}