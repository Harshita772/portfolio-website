import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

// EDIT YOUR SOCIAL LINKS HERE
const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/Harshita772",
    label: "GitHub Profile",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/harshita-vachhani-86340a2a0/",
    label: "LinkedIn Profile",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:harshitavachhani336@gmail.com",
    label: "Send Email",
  },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-6"
        >
          {/* Brand */}
          <a
            href="#"
            className="font-display text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Let’s connect!
          </a>

          {/* Social Links BELOW text */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 pt-6 border-t border-border/30 text-center text-sm text-muted-foreground"
        >
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
