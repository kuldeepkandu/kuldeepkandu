'use client'
import Footer from '../../components/footer/Footer'
import AboutLanding from "../../components/aboutSection/aboutLanding";
import Expertise from "../../components/aboutSection/Expertise";
import TechnologyArsenal from "../../components/aboutSection/TechnologyArsenal";
import MessageCard from "../../components/aboutSection/MessageCard";
import { useEffect, useState } from 'react';
import { getSkillsAndCategories } from '../../services/skillsCategory';

export default function About() {
    const [tech, setTech] = useState([]);

    const handleDeleteSkillCategory = (id) => {
      setTech((prev) => prev.filter((group) => Number(group.id) !== Number(id)));
    };

    const fetchSkillsAndCategories = async() => {
      try {
        const data = await getSkillsAndCategories();
        console.log("Fetched skills and categories: ", data);
        setTech(data.skills);
      } catch (error) {
        console.error("Error fetching skills and categories: ", error);

      }
    }
    
    useEffect(() => {
      fetchSkillsAndCategories();
    }, []);

  return (
    <div className="">
      {/* <CosmosExact /> */}
      <AboutLanding />
        {/* <AboutMe /> */}
        <Expertise />
        <TechnologyArsenal tech={tech} onDeleteSuccess={handleDeleteSkillCategory} />
        <MessageCard />
        {/* <Biography/>
        <CircularAbout />
        <YearsAbout /> */}
      <Footer />
    </div>
  );
}