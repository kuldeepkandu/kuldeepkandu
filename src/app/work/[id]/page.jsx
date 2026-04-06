import { getProjects, getProjectById } from "../../../services/projects.api";
import WorkDetails from "./WorkDetails";

/**
 * Pre-build a static page for every project at build time.
 * Requires the backend to be reachable when running `next build`.
 */
export async function generateStaticParams() {
  try {
    const data = await getProjects();
    const projects = data?.projects || [];
    return projects.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

const page = async ({ params }) => {
  const { id } = await params;
  const data = await getProjectById(id);
  const project = data?.projects;
  const otherProject = data?.otherProjects;

  return <WorkDetails project={project} otherProject={otherProject} />;
};
export default page;
