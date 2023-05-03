import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { itemListInfo } from "@/types/item";
import ItemListElement from "./ItemListElement";

import { fetchProjectDetail } from "@/api/projectApi";
import { projectDetailInfo } from "@/types/project";

const ItemList = () => {
  const { idx } = useParams<{ idx: string }>();
  const projectIdx = parseInt(idx as string, 10);
  const [projectDetail, setProjectDetail] = useState<projectDetailInfo[]>([]);

  useEffect(() => {
    async function fetchItems(projectIdx: number) {
      try {
        const {
          data: { result },
        } = await fetchProjectDetail(projectIdx);
        setProjectDetail(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchItems(projectIdx);
  }, [projectIdx]);

  return (
    <>
      {projectDetail.map((item) => (
        //수정 필요
        <ItemListElement key={item.idx} item={item} />
      ))}
    </>
  );
};

export default ItemList;
