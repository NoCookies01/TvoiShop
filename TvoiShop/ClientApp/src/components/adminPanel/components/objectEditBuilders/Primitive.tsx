import React from "react";
import contextBuilderService from "../../../../services/context.service";
import { IRule } from "../../helpers/rules";

interface IProps {
    obj: string;
    parent: any;
    value: any;
    contextKeyWord: string;
    rules: IRule[];
}

function Primitive({obj, value, parent, contextKeyWord}: IProps) {
    const setData = (data: any) => {
        const context = contextBuilderService.getContextOrUndefined<IProduct>(contextKeyWord);
        
        parent[obj] = data;
        if (context) {
            context.setData({...context.data});
        }
    }

    return (
        <label className="columnStyle">
            <div>{obj}</div>
            <input 
                type="text" 
                onChange={e => setData(e.target.value)} 
                placeholder={obj} 
                value={value??undefined}
                className="inputStyleAdmin"
            />
        </label>
    );
};

export default Primitive;