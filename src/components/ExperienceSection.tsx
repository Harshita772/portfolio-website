import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Award, GraduationCap } from "lucide-react";

// EDIT YOUR EXPERIENCE/ACHIEVEMENTS HERE
const experiences = [
  
  {
    type: "experience",
    icon: Briefcase,
    title: "Upcoming Technical Intern",
    organization: "Tech Mahindra",
    period: "Summer 2026",
    description: "",
  },
  {
    type: "achievement",
    icon: Award,
    title: "Intenship Representative",
    organization: "Carrer and Development Cell, IIT Jodhpur",
    period: "2025-26",
    description: "Reached out to companies and firms to bring placement and internship opportunities for students.",
  },
  {
    type: "education",
    icon: GraduationCap,
    title: "Bachelor's of Technology in Electrical Engineering",
    organization: "Indian Institute of Technology, Jodhpur",
    period: "2023 - Present",
    description: "",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative bg-secondary/30">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Experience & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="section-subtitle">
            My journey and accomplishments so far
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.25,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className={`glass-card p-6 inline-block ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}>
                    <span className="text-primary text-sm font-medium">{exp.period}</span>
                    <h3 className="font-display font-semibold text-lg text-foreground mt-1">
                      {exp.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{exp.organization}</p>
                    <p className="text-muted-foreground/80 text-sm mt-3 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                    <exp.icon size={16} className="text-primary" />
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
