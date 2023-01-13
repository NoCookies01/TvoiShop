import IItem from "./item";

interface IProps {
    item: IItem;
    onSelect: (value: string[]) => void;
}

export default function SingleItem(props: IProps) {

    const select = () => {
        var value = [props.item.Value];
        if (props.item.Path) {
          value = [props.item.Path, props.item.Value];
        }
        props.onSelect([...value]);
      }

    return (
        <div className="multiItem" onClick={() => select()}>
            {props.item.Title}
        </div>
    )
}