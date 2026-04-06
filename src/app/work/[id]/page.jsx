import { getProjectById } from "../../../services/projects.api";
import WorkDetails from "./WorkDetails";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await getProjectById(id);
  const project = data?.projects;
  const otherProject = data?.otherProjects;
  console.log(`project by ${id}: ${project.id}`);

  return <WorkDetails project={project} otherProject={otherProject} />;
};
export default page;
