import css from "./ProjectBox.module.css";
import Link from "next/link";
import Image from "next/image";
import EditProjectPanel from "../AdminPanels/ProjectEditPanel/ProjectEditPanel";

interface ProjectBoxParams {
  isAuth: boolean;
    projectId: string;
    projectName: string;
    projectDecription: string;
    projectPhotoUrl: string | undefined;
    projectOrder: number;
}

export default function ProjectBox({ projectId, projectDecription, projectName, projectPhotoUrl, isAuth, projectOrder }: ProjectBoxParams) {
  return (
    <div className={css.wrapper}>
      <Link href="/portfolio/projectId" className={css.link}>

          {projectPhotoUrl && (
            <div className={css.pic_thumb}>
              <Image
                className={css.pic}
                src={projectPhotoUrl}
                alt="project photo"
                width="1024"
                height="768"
              />{" "}
     <p className={css.pic_overlay}>{projectDecription}</p>
            </div>
          )}

        <h3 className={css.name}>{projectName}</h3>
      </Link>
      {isAuth && (
        <EditProjectPanel
          projectId={projectId}
          projectOrder={projectOrder}
        />
      )}
    </div>
  );
}