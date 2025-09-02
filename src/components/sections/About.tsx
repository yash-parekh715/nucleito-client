"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "50ms", label: "Response Time" },
    { value: "1M+", label: "Users Served" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section id="about" className="py-32 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y, opacity }} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Built for the Future
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Our platform combines cutting-edge technology with intuitive
                design to deliver experiences that exceed expectations. From
                startups to enterprise, we power the digital transformation of
                tomorrow.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                With a focus on performance, security, and scalability,
                we&apos;ve created a solution that grows with your business and
                adapts to your evolving needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <GlassCard className="p-6 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 mt-2">{stat.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-lime-500/10" />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-6 text-white">
                  Experience Excellence
                </h3>
                <div className="space-y-4">
                  {[
                    "Cutting-edge performance optimization",
                    "Seamless user experience design",
                    "Advanced security protocols",
                    "Scalable architecture solutions",
                    "24/7 monitoring and support",
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
