import React from "react";
import { ItemInfo } from "../../../types/itemlist";
import ItemListElement from "./ItemListElement";

const itemList: ItemInfo[] = [
  {
    idx: 1,
    itemName: "FE",
    itemPort: [3000, 3001],
    lastSuccessDate: "3days 2hr",
    lastFailedDate: "3days 5hr",
    isIng: "true",
  },
  {
    idx: 2,
    itemName: "BE",
    itemPort: [8000, 8001],
    lastSuccessDate: "3days 2hr",
    lastFailedDate: "3days 5hr",
    isIng: "false",
  },
  {
    idx: 3,
    itemName: "DJANGO",
    itemPort: [9000, 9001],
    lastSuccessDate: "3days 2hr",
    lastFailedDate: "3days 5hr",
    isIng: "",
  },
];

export default function ItemList() {
  return (
    <>
      {itemList.map((item) => (
        <ItemListElement key={item.idx} item={item} />
      ))}
    </>
  );
}
