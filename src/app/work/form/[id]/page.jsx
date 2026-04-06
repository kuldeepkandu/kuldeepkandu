import { getProjects } from "../../../../services/projects.api";
import EditProjectClient from "./EditProjectClient";

// Pre-build a static shell for every known project edit page at build time.
// The actual data is fetched client-side by EditProjectClient via useEffect.
export async function generateStaticParams() {
  try {
    const data = await getProjects();
    const projects = data?.projects || [];
    return projects.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

export default function EditProjectPage() {
  return <EditProjectClient />;
}
