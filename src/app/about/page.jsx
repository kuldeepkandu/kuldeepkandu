import { getSkillsAndCategories } from "../../services/skillsCategory";
import AboutClient from "./AboutClient";

// Fetch skills at build time — fully static, no runtime API needed for visitors.
export default async function AboutPage() {
  let initialTech = [];
  try {
    const data = await getSkillsAndCategories();
    initialTech = data?.skills || [];
  } catch {
    initialTech = [];
  }

  return <AboutClient initialTech={initialTech} />;
}