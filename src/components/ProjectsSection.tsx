import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";

// EDIT YOUR PROJECTS HERE - Update with your actual projects
const projects = [
  {
    title: "Image Retreival",
    description: "Developed an image retrieval system using ML techniques to classify and retrieve similar images from CIFAR-10 dataset.",
    techStack: ["Python", "Torch", "Torchvision", "Streamlit"],
    github: "https://github.com/Harshita772/Image-Retrieval_PRML",
    
    featured: true,
  },
  {
    title: "Typing Speed Test Game",
    description: "Developed an interactive typing speed test web application allowing users to practice typing and measure their performance in real time.",
    techStack: ["HTML", "CSS", "Javascript"],
    github: "https://github.com/Harshita772/TypingSpeedTest.github.io",
    live: "https://harshita772.github.io/TypingSpeedTest.github.io/",
    featured: true,
  },
  {
    title: "MIPS Simulator",
    description: "Designed a MIPS processor simulator in Logisim implementing a single-cycle datapath with core components like ALU, register file, control unit, program counter and memory.",
    techStack: ["Logisim", "MIPS"],
    github: "https://github.com/Harshita772/MIPS-Simulator",
    featured: false,
  },
  {
    title: "Maze Escape Game",
    description: "Designed a console based maze game that implements path-finding and backtracking to show optimal navigation paths.",
    techStack: ["C", "DFS Algorithm"],
    github: "https://github.com/Harshita772/ICS_Major_Maze_Game",
    featured: false,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="glass-card group overflow-hidden hover:border-primary/30 transition-all duration-500"
    >
      {/* Project Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Folder size={24} />
          </div>

          <div className="flex items-center gap-3">
            {/* GitHub link – show only if available */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View GitHub repository"
              >
                <Github size={20} />
              </a>
            )}

            {/* Live link – show only if available */}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View live demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500" />
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            Some things I've built
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
