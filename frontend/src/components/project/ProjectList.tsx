import React from "react";
import ProjectListItem, { ProjectListItemProps } from "./ProjectListItem";

export interface ProjectListProps {
  projects: ProjectListItemProps[];
}

export default function ProjectList({ projects }: ProjectListProps): JSX.Element {
  return (
    <>
      {projects.map((project: ProjectListItemProps) => (
        <ProjectListItem
          id={project.id}
          name={project.name}
          itemCount={project.itemCount}
          lastSuccessTime={project.lastSuccessTime}
          lastFailureTime={project.lastFailureTime}
          containerName={project.containerName}
        />
      ))}
    </>
  );
}
