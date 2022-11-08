import React from "react";

interface IProps {
    products: IProduct[];
  }

export const InstrumentPanel = (props:IProps) => {

    const [product, setProduct] = React.useState<(IProduct)[]>([]);

    const sortOnClickUp = () => {
        setProduct([...product].sort((a, b) => b.price - a.price));
    }
      const sortOnClickDown = () => {
        setProduct([...product].sort((a, b) => a.price - b.price));
    }
  
  return(
    <div className="instrPanel">
        <div className="filterByStyle">
            <select className="filterByStyle">
                <option value="" className="filterByItemStyle">Filter By</option>
                <option value="Brand" className="filterByItemStyle">Brand</option>
                <option value="Price" className="filterByItemStyle">Price</option>
                <option value="Metal" className="filterByItemStyle">Metal</option>
                <option value="Size" className="filterByItemStyle">Size</option>
                <option value="Color" className="filterByItemStyle">Color</option>
            </select>
        </div>

        <div className="filterByStyle">
            <select className="filterByStyle">
                <option value="" className="filterByItemStyle">Sort by</option>
                <option value="PriceUp" className="filterByItemStyle" onChange={sortOnClickUp}>Price</option>
                <option value="PopularityUp" className="filterByItemStyle">Popularity</option>
            </select>
        </div>
    </div>
  );
}
