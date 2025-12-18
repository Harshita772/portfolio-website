import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Rocket } from "lucide-react";

const strengths = [
  {
    icon: Target,
    title: "Problem Solving",
    description: "I love breaking down complex problems into manageable pieces and finding solutions.",
  },
  {
    icon: Lightbulb,
    title: "Adaptability",
    description: "Quick to learn and adapt to changing requirements.",
  },
  {
    icon: Rocket,
    title: "Avid Learner",
    description: "Passionate about continuous learning and staying updated with emerging trends.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle">
            Get to know me a little better
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* EDIT YOUR BIO HERE */}
            <p className="text-foreground/90 leading-relaxed text-lg">
              I’m a passionate developer who loves turning ideas into real-world applications. I spend my time writing code,
               breaking it, fixing it, and occasionally wondering why it worked. Currently exploring Machine Learning and Blockchain.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me listening to music, or going down random internet rabbit holes that 
              somehow still teach me something new. I enjoy taking breaks to reset, explore new ideas, and come back with a
              fresh perspective (and hopefully fewer bugs).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I'm always eager to take on new challenges and collaborate on exciting projects. 
              Let's build something amazing together!
            </p>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {strengths.map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <strength.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {strength.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {strength.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
