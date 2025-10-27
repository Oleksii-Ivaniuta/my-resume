import css from "./ProjectBox.module.css";
import Link from "next/link";
import Image from "next/image";
import EditProjectPanel from "../AdminPanels/ProjectEditPanel/ProjectEditPanel";
import { Project } from "@/types/apiTypes";

interface ProjectBoxParams {
  isAuth: boolean;
  project: Project;
  projectDescription: string,
}

export default function ProjectBox({ project, isAuth, projectDescription }: ProjectBoxParams) {
  return (
    <div className={css.wrapper}>
      <Link href={`/portfolio/${project._id}`} className={css.link}>

          {project.photoUrl && (
            <div className={css.pic_thumb}>
              <Image
                className={css.pic}
                src={project.photoUrl}
                alt="project photo"
                width="1024"
                height="768"
              />{" "}
     <p className={css.pic_overlay}>{projectDescription}</p>
            </div>
          )}

        <h3 className={css.name}>{project.name}</h3>
      </Link>
      {isAuth && (
        <EditProjectPanel
project={project}
        />
      )}
    </div>
  );
}