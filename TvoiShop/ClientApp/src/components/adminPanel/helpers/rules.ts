export interface IRule {
    objectRefference: any;
    check: (...args: any[]) => boolean;
}

export interface IArrayRule extends IRule {
    check: (array: any[]) => boolean;
}