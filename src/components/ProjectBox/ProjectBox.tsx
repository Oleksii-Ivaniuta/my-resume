import { Project } from "@/types/apiTypes";
import css from "./ProjectBox.module.css";
import Link from "next/link";
import Image from "next/image";
import EditProjectPanel from "../AdminPanels/ProjectEditPanel/ProjectEditPanel";

interface ProjectBoxParams {
  isAuth: boolean;
  project: Project;
}

export default function ProjectBox({ project, isAuth }: ProjectBoxParams) {
  if (!project) {
    return null;
  }
  return (
    <div className={css.wrapper}>
      <Link href="/portfolio/projectId" className={css.link}>

          {project.photoUrl && (
            <div className={css.pic_thumb}>
              <Image
                className={css.pic}
                src={project.photoUrl}
                alt="project photo"
                width="1024"
                height="768"
              />{" "}
     <p className={css.pic_overlay}>{project.descriptionEn}</p>
            </div>
          )}

        <h3 className={css.name}>{project.name}</h3>
      </Link>
      {isAuth && (
        <EditProjectPanel
          projectId={project._id}
          projectOrder={project.order}
        />
      )}
    </div>
  );
}

{
  /* <div class="portf-img-container">
                            <picture>
                                <source srcset="./images/banking-app.jpg 1x, ./images/banking-app@2x.jpg 2x"
                                    media="(min-width: 1158px)" />
                                <source srcset="./images/banking-app-tab.jpg 1x, ./images/banking-app-tab@2x.jpg 2x"
                                    media="(min-width: 768px)" />
                                <source srcset="./images/banking-app-mob.jpg 1x, ./images/banking-app-mob@2x.jpg 2x"
                                    media="(max-width: 767px)" />
                                <img src="./images/banking-app-mob.jpg" alt="Banking App" />
                            </picture>
                            <p class="portf-overlay">14 Stylish and User-Friendly App Design Concepts · Task Manager
                                App ·
                                Calorie Tracker App · Exotic Fruit Ecommerce App ·
                                Cloud Storage App</p>
                        </div> */
}
