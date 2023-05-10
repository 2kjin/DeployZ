import ItemListElement from "./ItemListElement";
import { projectDetailInfo } from "@/types/project";

export default function ItemList({
  projectDetail,
}: {
  projectDetail: projectDetailInfo[] | undefined;
}) {
  return (
    <>
      {projectDetail &&
        projectDetail.map((item) => (
          <ItemListElement key={item.idx} item={item} />
        ))}
    </>
  );
}
