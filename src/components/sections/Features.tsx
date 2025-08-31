"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Shield, Rocket, Layers, Globe, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Engine",
      description:
        "Advanced machine learning algorithms that adapt to your needs and optimize performance in real-time.",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Military-grade encryption and security protocols to protect your data and ensure compliance.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Blazing Performance",
      description:
        "Optimized for speed with sub-second load times and seamless user experiences.",
      color: "from-lime-400 to-green-500",
    },
    {
      icon: Layers,
      title: "Modular Architecture",
      description:
        "Flexible, scalable components that grow with your business and adapt to changing requirements.",
      color: "from-orange-400 to-red-500",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Worldwide CDN network ensuring your application is fast and accessible from anywhere.",
      color: "from-indigo-400 to-purple-500",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description:
        "Live synchronization and instant updates across all devices and platforms.",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <section id="features" className="py-32 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the next generation of technology with features designed
            to accelerate your workflow and amplify your success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <GlassCard className="p-8 h-full group hover:bg-white/5 transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-0.5 mb-6`}
                >
                  <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
