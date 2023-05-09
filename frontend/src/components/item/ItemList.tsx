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
        projectDetail.map((item) => (
          <ItemListElement key={item.idx} projectIdx={projectIdx} item={item} />
        ))}
    </>
  );
}
