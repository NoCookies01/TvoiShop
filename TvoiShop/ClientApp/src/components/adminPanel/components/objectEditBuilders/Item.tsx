import React from "react";
import { isPrimitive } from "../../../../services/object.service";
import { IRule } from "../../helpers/rules";
import ArrayPrimitive from "./ArrayPrimitive";
import Primitive from "./Primitive";

interface IProps {
    obj: any;
    getKeys: (obj: any) => any[];
    contextKeyWord: string;
    rules: IRule[];
}

function Item({obj, getKeys, contextKeyWord, rules}: IProps) {
    return (
        <>
            {
                getKeys(obj).map((k, id) => 
                isPrimitive(obj[k]) ? (
                    <Primitive 
                        key={id} 
                        obj={k} 
                        parent={obj}
                        value={obj[k]}
                        contextKeyWord={contextKeyWord}
                        rules={rules}
                    />
                ) : Array.isArray(obj[k]) ? (
                    <div key={id}>
                        <hr />
                        <h4>{k}</h4>
                        <ArrayPrimitive 
                            obj={obj[k]} 
                            getKeys={getKeys} 
                            contextKeyWord={contextKeyWord}
                            rules={rules}
                        />
                        <hr />
                    </div>
                ) : (
                    <Item 
                        key={id} 
                        obj={obj[k]} 
                        getKeys={getKeys} 
                        contextKeyWord={contextKeyWord}
                        rules={rules}
                    />
                ))
            }
        </>
    );
}

export default Item;