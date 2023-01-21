export default interface IItem {
    Title: string;
    Value: string;
    Path?: string;
    Items?: IItem[];
}