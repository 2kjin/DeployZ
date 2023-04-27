import React, { useState, useEffect } from "react";

import { ItemInfo } from "../../../types/itemlist";

//import components
import ItemListElement from "./ItemListElement";

const items: ItemInfo[] = [
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
    isIng: "",
  },
  {
    idx: 3,
    itemName: "DJANGO",
    itemPort: [9000, 9001],
    lastSuccessDate: "3days 2hr",
    lastFailedDate: "3days 5hr",
    isIng: "true",
  },
];

export default function ItemList(): JSX.Element {
  return (
    <>
      {items.map((item) => (
        <ItemListElement key={item.idx} item={item} />
      ))}
    </>
  );
}
