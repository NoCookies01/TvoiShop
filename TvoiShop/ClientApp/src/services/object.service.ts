export function isPrimitive(test: any) {
    return test !== Object(test);
}

export function getPropertyFromObject(object: any, path: string): any {
    var pathList = path.split(".");
    var pObject = object;
    
    for(let i = 0; i < pathList.length; i++) {
        if (Array.isArray(pObject)) {
            pObject = pObject.map((o: any) => o[pathList[i]]);
        }
        else {
            pObject = pObject[pathList[i]];
        }

        if (pObject == null && pObject == undefined) {
            return undefined;
        }
    }
    
    return pObject;
}