import React from "react";
import ProjectListItem, { Project } from "./projectListItem";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps): JSX.Element {
  return (
    <>
      {projects.map((project: Project) => (
        <ProjectListItem
          key={project.id}
          name={project.name}
          itemCount={project.itemCount}
          lastSuccessTime={project.lastSuccessTime}
          lastFailureTime={project.lastFailureTime}
        />
      ))}
    </>
  );
}
