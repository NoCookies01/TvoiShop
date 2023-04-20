import IItem from "./item";

interface IProps {
    item: IItem;
    onSelect: (value: IItem[]) => void;
}

export default function SingleItem(props: IProps) {

    const select = () => {
        var value = [props.item];
        if (props.item.Path) {
          value = [{Title: props.item.Title, Value: props.item.Path}, {Title: props.item.Title, Value: props.item.Value}];
        }
        props.onSelect([...value]);
    }

    return (
        <div className="multiItem itemSelect" onClick={() => select()}>
            {props.item.Title}
        </div>
    )
}