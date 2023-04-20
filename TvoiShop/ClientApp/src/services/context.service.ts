export class Context<T = any> {
    constructor(private _data: T, private _setData: (data: T) => void) {

    }

    public get data(): T {
        return this._data
    }

    public setData = (data: T) => {
        this._setData(data);
    }
}

class ContextBuilder {
    private _contextsDictionary: { [key: string]: Context; } = {};

    public createOrOverrideContext<T>(keyWord: string, data: T, setData: (data: T) => void) {
        const newContext = new Context(data, setData);
        this._contextsDictionary[keyWord] = newContext;

        return newContext;
    }

    public getContextOrUndefined<T>(keyWord: string): Context<T> | undefined {
        return this._contextsDictionary[keyWord];
    }

    public removeContextIfExists(keyWord: string) {
        delete this._contextsDictionary[keyWord];
    }
}

const contextBuilderService = new ContextBuilder();

export default contextBuilderService;