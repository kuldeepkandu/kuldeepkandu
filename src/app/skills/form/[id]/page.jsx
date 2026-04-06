import { getSkillsAndCategories } from "../../../../services/skillsCategory";
import EditSkillClient from "./EditSkillClient";

// Pre-build a static shell for every known skill edit page at build time.
export async function generateStaticParams() {
  try {
    const data = await getSkillsAndCategories();
    const skills = data?.skillsAndCategories || data?.skills || [];
    return skills.map((s) => ({ id: String(s.id) }));
  } catch {
    return [];
  }
}

export default function EditSkillPage() {
  return <EditSkillClient />;
}