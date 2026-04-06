
import { getProjects } from "../../services/projects.api";
import WorkClient from "./WorkClient";


export default async function WorkPage() {
    const projects = await getProjects();
    // console.log("SERVER projects:", projects);
    return (
        <WorkClient project={projects} />
    )
}