"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Github, Linkedin, Sparkles } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-3 transform -translate-x-1/2 z-50 left-1/2"
    >
      <motion.div
        animate={{
          width: isScrolled ? "auto" : "auto",
          padding: isScrolled ? "12px 24px" : "16px 32px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
        style={{
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex items-center gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-6 h-6 border border-purple-500/30 rounded-full"
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Nucleito
            </span>
          </motion.div>

          {/* Separator */}
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
                }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId={`social-glow-${social.label}`}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
