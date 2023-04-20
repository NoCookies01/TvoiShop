export function isPrimitive(test: any) {
    return test !== Object(test);
}

export function keys(obj: any){
    return Object.keys(obj);
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

export function deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function clearPropertiesFromObject(object: any, properties: string[]) {
    const copy = deepClone(object);

    properties.forEach(p => {
        delete copy[p];
    });

    return copy
}

export function clearPropertiesFromObjectDeep(object: any, properties: string[]) {
    const copy = deepClone(object);
    const clearStack: any[] = [copy];

    while(clearStack.length > 0) {
        const element = clearStack[clearStack.length-1];
        clearStack.pop();

        keys(element).forEach(k => {
            if (properties.includes(k)) {
                delete element[k];
            }
            else if (!isPrimitive(element[k])) {
                clearStack.push(element[k]);
            }
        });
    }

    return copy
}