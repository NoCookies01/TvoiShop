import IItem from "./item";

interface IProps {
    item: IItem;
    onSelect: (value: string[]) => void;
}

export default function SingleItem(props: IProps) {

    return (
        <div className="multiItem" onClick={() => props.onSelect([props.item.Title])}>
            {props.item.Title}
        </div>
    )
}