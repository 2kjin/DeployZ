import { itemListInfo } from "../../../types/item";
import ItemListElement from "./ItemListElement";

const ItemList = ({ itemList }: { itemList: itemListInfo[] }) => {
  return (
    <>
      {itemList.map((item) => (
        <ItemListElement key={item.idx} item={item} />
      ))}
    </>
  );
};

export default ItemList;
