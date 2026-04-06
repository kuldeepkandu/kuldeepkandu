"use client";

import Footer from "../../components/footer/Footer";
import AboutLanding from "../../components/aboutSection/aboutLanding";
import Expertise from "../../components/aboutSection/Expertise";
import TechnologyArsenal from "../../components/aboutSection/TechnologyArsenal";
import MessageCard from "../../components/aboutSection/MessageCard";
import { useState } from "react";

export default function AboutClient({ initialTech = [] }) {
  const [tech, setTech] = useState(initialTech);

  const handleDeleteSkillCategory = (id) => {
    setTech((prev) => prev.filter((group) => Number(group.id) !== Number(id)));
  };

  return (
    <div className="">
      <AboutLanding />
      <Expertise />
      <TechnologyArsenal tech={tech} onDeleteSuccess={handleDeleteSkillCategory} />
      <MessageCard />
      <Footer />
    </div>
  );
}
