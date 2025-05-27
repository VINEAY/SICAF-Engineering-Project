"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";

export default function Training() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState("soft-skills");

  const trainingCategories = [
    {
      id: "soft-skills",
      title: "Soft Skills",
      icon: <Users className="w-5 h-5" />,
      programs: [
        "Management",
        "Leadership",
        "Negotiation",
        "Team Building",
        "Communication Skills",
      ],
    },
    {
      id: "quality",
      title: "Quality Management",
      icon: <CheckCircle2 className="w-5 h-5" />,
      programs: [
        "Methods & Tools",
        "Risk Management",
        "Quality Auditing",
        "Six Sigma",
        "ISO Standards",
      ],
    },
    {
      id: "maintenance",
      title: "Maintenance Management",
      icon: <BookOpen className="w-5 h-5" />,
      programs: [
        "Performance Improvement",
        "Predictive Maintenance",
        "Equipment Reliability",
        "Maintenance Planning",
      ],
    },
    {
      id: "project",
      title: "Project Management",
      icon: <Lightbulb className="w-5 h-5" />,
      programs: [
        "Tools & Techniques",
        "Project Planning",
        "Risk Management",
        "Agile Methodologies",
      ],
    },
  ];

  const trainingApproach = [
    {
      title: "Needs analysis and context evaluation",
      description: "We begin by thoroughly assessing your organization's specific training requirements and understanding the context in which the training will take place.",
    },
    {
      title: "Design and implementation of tailored training programs",
      description: "Based on our analysis, we develop customized training programs that address your organization's specific goals and challenges.",
    },
    {
      title: "Evaluation of training effectiveness",
      description: "After training completion, we measure its impact and effectiveness to ensure that the training objectives have been met and provide recommendations for further development.",
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="training"
      ref={ref}
      className="py-24 bg-slate-50"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Training</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-gray-600 max-w-3xl mx-auto">
            Enhance your team's capabilities with our specialized training programs designed to
            develop the skills needed for operational excellence and continuous improvement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Training Categories */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-6">Training Programs</h3>

              <div className="space-y-3">
                {trainingCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 flex items-center ${
                      activeCategory === category.id
                        ? "bg-primary text-white"
                        : "bg-slate-100 hover:bg-slate-200"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <div className={`${
                      activeCategory === category.id ? "text-white" : "text-primary"
                    }`}>
                      {category.icon}
                    </div>
                    <span className="ml-3 font-medium">{category.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Training Programs */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6 h-full"
            >
              {trainingCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${activeCategory === category.id ? "block" : "hidden"}`}
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="text-primary mr-2">{category.icon}</span>
                    {category.title} Programs
                  </h3>

                  <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {category.programs.map((program) => (
                      <motion.li
                        key={program}
                        variants={itemVariants}
                        className="flex items-start"
                      >
                        <Check className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{program}</span>
                          <p className="text-gray-600 text-sm mt-1">
                            Comprehensive training on {program.toLowerCase()} techniques and best practices.
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Training Approach */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold mb-8">Our Training Approach</h3>

          <Accordion type="single" collapsible className="w-full">
            {trainingApproach.map((approach, index) => (
              <AccordionItem key={approach.title} value={`approach-${index}`} className="bg-white mb-4 rounded-lg border overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 font-medium text-left">
                  {approach.title}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-600">
                  {approach.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
