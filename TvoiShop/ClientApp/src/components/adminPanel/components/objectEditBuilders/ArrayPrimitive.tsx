import React, { useEffect } from "react";
import { clearPropertiesFromObject, clearPropertiesFromObjectDeep } from "../../../../services/object.service";
import { IArrayRule, IRule } from "../../helpers/rules";
import { except } from "../PostAdmin";
import Item from "./Item";

interface IProps {
  obj: any[];
  getKeys: (obj: any) => any[];
  contextKeyWord: string;
  rules: IRule[];
}


function ArrayPrimitive({obj, getKeys, contextKeyWord, rules}: IProps) {
  const [rule, setRule] = React.useState<IArrayRule | undefined>(undefined);
  const [rerenderObj, rerender] = React.useState(true);
  const Rerender = () => {
    rerender(!rerenderObj);
  }

  useEffect(() => {
    rules.find(r => r.objectRefference === obj);
    setRule(rules.find(r => r.objectRefference === obj));
  }, [rules])

  const addItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (rule) {
      const copy = [...obj];
      copy.push(clearPropertiesFromObjectDeep(copy[obj.length - 1], except));
      
      if (!rule.check(copy)) {
        return;
      }
    }

    obj.push(JSON.parse(JSON.stringify(obj[obj.length - 1])));

    Rerender();
  }

  const removeItem = (index: number) => {
    if (rule) {
      const copy = [...obj];
      copy.splice(index, 1);

      if (!rule.check(copy)) {
        return;
      }
    }

    obj.splice(index, 1);
    Rerender();
  }

  return (
    <div className="rowStyle">
      {
        obj.map((o: any, id: number) => (
          <div key={id}>
            <div className="rowStyle">
              <Item 
                obj={o} 
                getKeys={getKeys} 
                contextKeyWord={contextKeyWord}
                rules={rules}
              />
              <div onClick={() => removeItem(id)}>X</div>
            </div>
          </div>
        ))
      }
      <button onClick={addItem}>+</button>
    </div>
  );
};

export default React.memo(ArrayPrimitive, (prevProps, nextProps) => {
  return prevProps === nextProps;
});
