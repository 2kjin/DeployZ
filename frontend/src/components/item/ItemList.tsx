import React from "react";
import { ItemInfo } from "../../../types/itemlist";
import ItemListElement from "./ItemListElement";

const itemList: ItemInfo[] = [
  {
    idx: 1,
    itemName: "FE",
    frameworkType: "react",
    portNumber1: 3000,
    portNumber2: 3001,
    itemStates: "true",
    lastSuccessDate: "3days 2hr",
    lastFailedDate: "3days 5hr",
  },
  {
    idx: 2,
    itemName: "BE",
    frameworkType: "springBoot",
    portNumber1: 8000,
    portNumber2: 8001,
    itemStates: "false",
    lastSuccessDate: "3days 2hr",
    lastFailedDate: "3days 5hr",
  },
  {
    idx: 3,
    itemName: "DJANGO",
    frameworkType: "django",
    portNumber1: 9000,
    portNumber2: 9001,
    itemStates: "",
    lastSuccessDate: "3days 2hr",
    lastFailedDate: "3days 5hr",
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
