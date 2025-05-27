"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Workflow,
  BadgeCheck,
  Lightbulb,
  Award,
  Users,
  Briefcase,
  UserCheck,
  BarChart,
} from "lucide-react";

export default function Values() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const values = [
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "Réactivité",
      description: "Adaptability to market changes and client needs.",
    },
    {
      icon: <BadgeCheck className="h-8 w-8" />,
      title: "Intégrité & Respect",
      description: "Honesty, ethics, and cultural sensitivity.",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation & Création de Valeur",
      description: "Focus on R&D to drive productivity and process optimization.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Commitment to superior service quality.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration",
      description: "Partnership-based approach with clients.",
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Expertise",
      description: "Leveraging the skills of experienced consultants.",
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Orientation Client",
      description: "Prioritizing client satisfaction.",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Amélioration Continue",
      description: "Continuous improvement of processes.",
    },
  ];

  return (
    <section id="values" ref={ref} className="py-24 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our core values guide everything we do at SICAF Engineering, shaping our approach
            to client relationships and service delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At SICAF Engineering, we're committed to living our values in every interaction,
            delivering excellence through integrity, innovation, and a deep understanding of our clients' needs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
