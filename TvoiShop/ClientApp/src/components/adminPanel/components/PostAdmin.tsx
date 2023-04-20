import React, { useEffect } from "react";
import { clearPropertiesFromObjectDeep, keys } from "../../../services/object.service";
import Item from "./objectEditBuilders/Item";
import contextBuilderService from "../../../services/context.service";
import { defaultProduct } from "../data/defaults";
import { IArrayRule, IRule } from "../helpers/rules";
import toastrService from "../../../services/toastr.service";
import { AxiosResponse } from "axios";

import '../AdminPanel.css';
import { actionsContextKey } from "./GetAllAdmin";

export const contextKeyWord = "PostProductAdminContext";

export const except = [
  "id"
];

const buildRules = (product: IProduct): IRule[] => {
  return [{
    objectRefference: product.images,
    check(array) {
      if (array.length > 0 && array.length <= 4) return true;
      return false;
    }
  } as IArrayRule, {
    objectRefference: product.colors,
    check(array) {
      if (array.length > 0) return true;
      return false;
    }
  } as IArrayRule, {
    objectRefference: product.sizes,
    check(array) {
      if (array.length > 0) return true;
      return false;
    }
  } as IArrayRule]
}

interface IProps {
  label: string;
  onOk: (product: IProduct) => Promise<AxiosResponse<unknown, any>>;
  obj?: IProduct;
}

export const PostAdmin = (props: IProps) => {
  const [objToPost, setObjToPost] = React.useState<IProduct>(JSON.parse(JSON.stringify(props.obj?props.obj:defaultProduct)));
  const [rules, setRules] = React.useState<IRule[]>([]);

  useEffect(() => {
    contextBuilderService.createOrOverrideContext(contextKeyWord, objToPost, setObjToPost);

    setRules(buildRules(objToPost));
  }, [objToPost]);

  useEffect(() => {
    if (!props.obj && contextBuilderService.getContextOrUndefined(actionsContextKey)) {
      const data = contextBuilderService.getContextOrUndefined<IProduct>(actionsContextKey)!.data;
      data.colors = clearPropertiesFromObjectDeep(data.colors, except);
      data.sizes = clearPropertiesFromObjectDeep(data.sizes, except);
      data.images = clearPropertiesFromObjectDeep(data.images, except);
      setObjToPost(data);
    }

    return () => {
      contextBuilderService.removeContextIfExists(contextKeyWord);
    }
  }, []);

  const getKeys = (obj: any) => {
    return keys(obj).filter(o => !except.includes(o));
  }

  const post = () => {
    props.onOk(objToPost)
    .then(_ => toastrService.callToastr("Successfuly added product"))
    .catch(e => {
      toastrService.callToastr("Error on Add product", "error");
      console.error(e);
    });
  }
  
  return(
    <div className="cardElementPanel">
      <div className="headerCardElement">{props.label}</div>
      <form className="columnStyle form">
        <Item 
          obj={objToPost} 
          getKeys={getKeys} 
          contextKeyWord={contextKeyWord}
          rules={rules}
        />
      </form>
      <div onClick={post} className="headerCardElement">Ok</div>
    </div>
  );
}