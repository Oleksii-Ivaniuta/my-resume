import { Project } from "@/types/apiTypes";
import css from "./ProjectBox.module.css";
import Link from "next/link";
import Image from "next/image";
import EditProjectPanel from "../AdminPanels/ProjectEditPanel/ProjectEditPanel";

interface ProjectBoxParams {
    isAuth: boolean;
project: Project
}

export default function ProjectBox({ project, isAuth }: ProjectBoxParams) {
    if (!project) {
        return null
    }
    return <div className={css.wrapper}>
        <Link href="/portfolio/projectId" className={css.link}>
            <div className={css.pic_thumb}>
                {project.photoUrl && <Image className={css.pic} src={project.photoUrl} alt="project photo" width="1024" height="768"/>}
            </div>
            <h3 className={css.name}>{project.name}</h3>
        </Link>
                    {isAuth && <EditProjectPanel projectId={project._id} projectOrder={project.order}/>}
    </div>
}