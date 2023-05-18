import { useEffect } from "react";
import { useRecoilState } from "recoil";

import ItemListElement from "./ItemListElement";
import { projectDetailInfo } from "@/types/project";

//import recoil
import { itemCountState } from "@/recoil/project";

export default function ItemList({
  projectDetail,
}: {
  projectDetail: projectDetailInfo[] | undefined;
}) {
  //프로젝트가 가지고 있는 아이템의 개수 저장해두기
  //아이템 디테일에서 페이지 이동 시 사용
  const projectDetailLength = projectDetail?.length ?? 0;
  const [itemCount, setItemCount] = useRecoilState(itemCountState);

  useEffect(() => {
    setItemCount(projectDetailLength);
  }, [projectDetailLength]);

  return (
    <>
      {projectDetail &&
        projectDetail.map((item) => (
          <ItemListElement key={item.idx} item={item} />
        ))}
    </>
  );
}
