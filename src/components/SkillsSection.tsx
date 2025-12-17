import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiReact, SiHtml5, SiCss3, SiTailwindcss,
  SiNextdotjs, SiNodedotjs, SiGit, SiDocker, SiGooglecloud, SiMongodb, SiMysql, SiPostman,
  SiC, SiExpress, SiArduino, SiFigma, SiPytorch, SiOpencv, SiPandas, SiNumpy, SiScikitlearn,
} from "react-icons/si";

// ================== SKILLS DATA ==================
const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "C++", icon: SiCplusplus },
      { name: "C", icon: SiC },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Next.js", icon: SiNextdotjs },
    ],
  },
  {
    title: "Backend & Tools",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "Postman", icon: SiPostman },
      { name: "Arduino", icon: SiArduino },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    title: "Libraries",
    skills: [
      { name: "PyTorch", icon: SiPytorch },
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "OpenCV", icon: SiOpencv },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "GCP", icon: SiGooglecloud },
      { name: "Git", icon: SiGit },
    ],
  },
];

// ================== SKILL ICON ==================
const SkillIcon = ({ name, Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.2, delay }}
    whileHover={{ scale: 1.08 }}
    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition"
  >
    <Icon className="text-3xl text-primary" />
    <span className="text-sm text-muted-foreground">{name}</span>
  </motion.div>
);

// ================== MAIN SECTION ==================
const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative bg-secondary/30">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I have worked with
          </p>
        </motion.div>

        {/* ================= TOP 3 CARDS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {skillCategories.slice(0, 3).map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass-card p-6 h-full"
            >
              <h3 className="font-display font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category.title}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillIcon
                    key={skill.name}
                    name={skill.name}
                    Icon={skill.icon}
                    delay={0.2 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= BOTTOM 2 (CENTERED TOGETHER) ================= */}
        <div className="mt-12 flex justify-center">
          <div className="grid sm:grid-cols-2 gap-10 max-w-3xl w-full">
            {skillCategories.slice(3).map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="glass-card p-6 h-full"
              >
                <h3 className="font-display font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category.title}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillIcon
                      key={skill.name}
                      name={skill.name}
                      Icon={skill.icon}
                      delay={0.2 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
