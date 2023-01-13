class LocalstorageService {
    public static readonly PRODUCT_KEY = "PRODUCT";
    public static readonly SAVE = "SAVE";

    public addObject<T>(obj: T, key: string, prefix?: string) {
        var itemKey = key;
        if (prefix) itemKey = prefix + itemKey;
        localStorage.setItem(itemKey, JSON.stringify(obj));
    }

    public getItem(key: string, prefix: string | null = null) {
        var itemKey = key;
        if (prefix) itemKey = prefix + itemKey;
        return localStorage.getItem(itemKey);
    }

    public getObject<T>(key: string, prefix: string | null = null, defaultObj: T | null = null): T | null {
        var itemKey = key;
        if (prefix) itemKey = prefix + itemKey;

        var item = localStorage.getItem(itemKey);

        if (!item) return defaultObj;

        try {
            return JSON.parse(item);
        }
        catch(e) {
            return defaultObj;
        }
    }

    public removeItem<T>(key: string, prefix: string | null = null) {
        var itemKey = key;
        if (prefix) itemKey = prefix + itemKey;

        localStorage.removeItem(itemKey);
    }

    public setSaveProducts(products: IProduct[]) {
        this.removeItem(LocalstorageService.SAVE, LocalstorageService.PRODUCT_KEY);
        this.addObject(products, LocalstorageService.SAVE, LocalstorageService.PRODUCT_KEY);
    }

    public getSaveProducts() {
        return this.getObject<IProductCart[]>(LocalstorageService.SAVE, LocalstorageService.PRODUCT_KEY, [])!;
    }
}

const localstorageService = new LocalstorageService();

export default localstorageService;