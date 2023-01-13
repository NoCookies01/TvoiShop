export function isPrimitive(test: any) {
    return test !== Object(test);
}

export function getPropertyFromObject(object: object, path: string): any {
    var pathList = path.split(".");
    var pObject = object;

    for(let i = 0; i < pathList.length; i++) {
        pObject = object[pathList[i]];
        if (pObject == null && pObject == undefined) {
            return undefined;
        }
    }

    return pObject;
}