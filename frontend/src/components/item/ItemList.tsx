import ItemListElement from "./ItemListElement";
import { projectDetailInfo } from "@/types/project";

export default function ItemList({
  projectIdx,
  projectDetail,
}: {
  projectIdx: number;
  projectDetail: projectDetailInfo[] | undefined;
}) {
  return (
    <>
      {projectDetail &&
        projectDetail
          .filter((item) => item.idx === projectIdx)
          .map((item) => <ItemListElement key={item.idx} item={item} />)}
    </>
  );
}
