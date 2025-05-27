"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Settings,
  BarChart3,
  Briefcase,
  Activity,
  Database,
  Layers
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { isMobile } from "react-device-detect"; // Commented out for SSR

function ServiceCard({ service }: { service: {
  icon: React.ReactNode; title: string; description: string; tools: string[]
} }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  // Replace any usage of isMobile with false (never mobile)
  const isTouch = typeof window !== "undefined" && ("ontouchstart" in window); // SSR safe

  // Mouse movement => tilt (limited on touch)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 14; // left/right
    const rotateX = ((y / rect.height) - 0.5) * -14; // up/down
    setTilt({ x: rotateX, y: rotateY});
  }, [isTouch]);
  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);
  const handleMouseEnter = useCallback(() => setHovered(true), []);

  return (
    <motion.div
      className="h-full"
      whileHover={{ z: 1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="service-card h-full flex flex-col bg-white transition-all duration-300 overflow-hidden group hover:border-primary shadow group"
        style={{
          transform: hovered && !isTouch
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
            : "scale(1)"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        tabIndex={0}
      >
        {/* Overlay shine */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 0.13 : 0, background: hovered ? "linear-gradient(120deg, #00778D 60%, #003847 100%)" : "transparent" }}
          transition={{ duration: 0.23 }}
        />
        <CardHeader>
          <motion.div
            className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 relative"
            whileHover={{ scale: 1.14 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-hidden
          >
            {service.icon}
          </motion.div>
          <CardTitle className="text-xl">{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-gray-600 mb-4">
            {service.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-4">
            {service.tools.map((tool) => (
              <span
                key={tool}
                className="inline-block px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md"
              >
                {tool}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-2 px-4 pb-5">
          <motion.button
            type="button"
            className="text-primary hover:text-primary hover:bg-primary/10 ml-0 flex items-center font-semibold rounded-full px-4 py-2 focus:outline-none transition group relative border-none bg-transparent"
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Learn more about ${service.title}`}
            tabIndex={0}
          >
            Learn more
            <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </CardFooter>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const services = [
    {
      icon: <Settings />,
      title: "Lean Management/Manufacturing",
      description: "Increase revenue, reduce costs, and develop employees using Lean tools like VSM, PDCA, DMAIC, KAIZEN, SMED, 5S, and KANBAN.",
      tools: ["VSM", "PDCA", "DMAIC", "KAIZEN", "SMED", "5S", "KANBAN"],
    },
    {
      icon: <Activity />,
      title: "Total Productive Maintenance (TPM)",
      description: "Improve maintenance processes and reduce downtime with tools like Master Plans, Autonomous Maintenance, and AMDEC.",
      tools: ["Master Plans", "Autonomous Maintenance", "AMDEC"],
    },
    {
      icon: <BarChart3 />,
      title: "Strategic & Operational Performance Management",
      description: "Define strategic orientations and implement performance dashboards to track and improve business objectives.",
      tools: ["KPI Development", "Balanced Scorecard", "Strategy Maps"],
    },
    {
      icon: <Briefcase />,
      title: "Organization & Process Reengineering",
      description: "Evaluate and improve organizational structures and develop comprehensive job descriptions for optimal performance.",
      tools: ["Process Mapping", "Job Analysis", "Workflow Optimization"],
    },
    {
      icon: <Layers />,
      title: "Industrie 4.0 & Performance 4.0",
      description: "Optimize production processes, reduce costs, and improve quality using IoT, Data Analytics, and Real-Time Monitoring.",
      tools: ["IoT", "Data Analytics", "Real-Time Monitoring"],
    },
    {
      icon: <Database />,
      title: "Information Systems (GPAO, GMAO, ERP)",
      description: "Manage activities, ensure data reliability, and improve process coverage through integrated information systems.",
      tools: ["GPAO", "GMAO", "ERP"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="services" ref={ref} className="py-24 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive engineering and consulting solutions to transform your industrial operations
            and drive sustainable performance improvements.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
