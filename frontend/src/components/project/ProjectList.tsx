import React from "react";

import ProjectListItem from "./ProjectListItem";
import { ProjectListItemProps } from "../../../types/projectlist";

//더미데이터
const projects: ProjectListItemProps[] = [
  {
    id: 1,
    projectName: "DeployZ",
    itemCnt: 3,
    lastSuccessDate: "3days 11hr",
    lastFailedDate: "4days 2hr",
    itemName: "#FE",
    isIng: "",
  },
  {
    id: 2,
    projectName: "Actopus",
    itemCnt: 4,
    lastSuccessDate: "1days 11hr",
    lastFailedDate: "2days 5hr",
    itemName: "#BE",
    isIng: "true",
  },
  {},
];

export default function ProjectList(): JSX.Element {
  return (
    <>
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </>
  );
}
