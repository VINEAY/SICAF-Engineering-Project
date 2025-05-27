"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Clock, Users, BarChart3 } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const companyInfo = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Founded",
      description: "2015",
    },
    {
      icon: <Building2 className="h-6 w-6 text-primary" />,
      title: "Location",
      description: "58 Av Habib Bourguiba, Bloc G, Megrine 2033, Ben Arous, Tunis, Tunisia",
    },
  ];

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-slate-50"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <SplitText text="About Us" effect="slide" as="span" />
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto my-6">
            <SplitText text="_" effect="slide" as="span" className="invisible" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              {companyInfo.map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={variants}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                "To provide industrial organizations with expertise and tools to achieve
                their full potential through optimized operational efficiency, improved workforce skills,
                and sustainable growth."
              </p>

              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                "To position SICAF Engineering as the go-to partner for transforming and
                continuously improving the performance of industrial organizations, leveraging
                innovative engineering, consulting, and training solutions."
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Team Expertise
            </h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="border-l-2 border-primary pl-4"
              >
                <p className="text-gray-600">
                  Experienced consultants and experts with proven track records in industrial
                  engineering.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="border-l-2 border-primary pl-4"
              >
                <p className="text-gray-600">
                  Multidisciplinary team of university teachers, engineers, and technicians.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-8 p-6 bg-primary/5 rounded-xl"
            >
              <h4 className="font-medium mb-4 flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                Key Performance Indicators
              </h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Successful projects across multiple industries</li>
                <li>Expertise in lean manufacturing and TPM</li>
                <li>Track record of delivering measurable results</li>
                <li>Commitment to continuous improvement</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
