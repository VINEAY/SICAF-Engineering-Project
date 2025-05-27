"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { LineChart, ArrowRight, TrendingUp, Timer, CheckCircle, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionRevealCaseStudy from "@/components/ui/SectionRevealCaseStudy"; // Added import

// Case study component with parallax effect
const CaseStudy = ({
  title,
  industry,
  challenge,
  solution,
  results,
  image,
  isReversed = false,
  index = 0
}: {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: Array<{ label: string; value: string; icon: React.ReactNode }>;
  image: string;
  isReversed?: boolean;
  index?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Create parallax effect values with different speeds based on index
  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -50 : 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.5, 1, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 ${isReversed ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <div className={`space-y-6 ${isReversed ? 'md:order-2' : 'md:order-1'}`}>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {industry}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <span className="bg-red-100 text-red-600 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-xs">
                01
              </span>
              Challenge
            </h4>
            <p className="text-gray-600 ml-8">{challenge}</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-xs">
                02
              </span>
              Solution
            </h4>
            <p className="text-gray-600 ml-8">{solution}</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <span className="bg-green-100 text-green-600 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-xs">
                03
              </span>
              Results
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-8 mt-4">
              {results.map((result, idx) => (
                <motion.div
                  key={result.label}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                >
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-primary">
                    {result.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{result.value}</div>
                    <div className="text-sm text-gray-600">{result.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Button className="mt-4 group">
          <span>View Full Case Study</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <motion.div
        className={`relative h-80 md:h-[450px] rounded-xl overflow-hidden ${isReversed ? 'md:order-1' : 'md:order-2'}`}
        style={{ y, opacity }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNc3Pr/PwAGtQKRVpFQmwAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>
    </motion.div>
  );
};

// Testimonial component
const Testimonial = ({ quote, author, company, image }: { quote: string; author: string; company: string; image: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg p-8 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -top-5 -left-5 text-6xl text-primary opacity-30">"</div>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={author}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 mb-4 italic">{quote}</p>
          <div className="flex items-center">
            <div>
              <div className="font-semibold">{author}</div>
              <div className="text-sm text-gray-500">{company}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const caseStudies = [
    {
      title: "Optimizing Production Processes for a Leading Automotive Manufacturer",
      industry: "Automotive",
      challenge: "A major automotive parts manufacturer was facing high production costs, excessive waste, and inefficiencies in their assembly process. Their production line had a defect rate of 5.2% and frequent bottlenecks causing delays.",
      solution: "We implemented comprehensive Lean Manufacturing principles, including a complete VSM analysis, SMED techniques for quick changeovers, and 5S methodology to reorganize the workspace. A Kanban system was introduced to optimize inventory management.",
      results: [
        {
          label: "Production cost reduction",
          value: "20%",
          icon: <LineChart className="h-5 w-5" />
        },
        {
          label: "Output increase",
          value: "15%",
          icon: <TrendingUp className="h-5 w-5" />
        },
        {
          label: "Defect rate reduction",
          value: "3.1%",
          icon: <BadgePercent className="h-5 w-5" />
        },
        {
          label: "Changeover time improved",
          value: "40%",
          icon: <Timer className="h-5 w-5" />
        }
      ],
      image: "/case-study-automotive.jpg"
    },
    {
      title: "Transforming Maintenance Operations with TPM Implementation",
      industry: "Equipment Manufacturing",
      challenge: "A heavy equipment manufacturer was experiencing frequent unplanned downtime, with machines breaking down 2-3 times per week. Maintenance costs were escalating, and production schedules were frequently disrupted.",
      solution: "We developed and implemented a comprehensive TPM (Total Productive Maintenance) strategy with focus on preventive maintenance. This included detailed master plans, autonomous maintenance protocols, and AMDEC methodology for failure mode analysis.",
      results: [
        {
          label: "Downtime reduction",
          value: "30%",
          icon: <Timer className="h-5 w-5" />
        },
        {
          label: "Maintenance cost savings",
          value: "25%",
          icon: <LineChart className="h-5 w-5" />
        },
        {
          label: "Equipment effectiveness",
          value: "+18%",
          icon: <TrendingUp className="h-5 w-5" />
        },
        {
          label: "Implemented improvements",
          value: "45+",
          icon: <CheckCircle className="h-5 w-5" />
        }
      ],
      image: "/case-study-manufacturing.jpg"
    }
  ];

  const testimonials = [
    {
      quote: "SICAF Engineering helped us streamline our production processes, resulting in significant cost savings and improved product quality. Their team's expertise in Lean Manufacturing transformed our factory floor.",
      author: "Ahmed Ben Salem",
      company: "Operations Director, AutoParts Manufacturing",
      image: "/testimonial1.jpg"
    },
    {
      quote: "The TPM implementation led by SICAF Engineering has revolutionized our maintenance operations. We're seeing fewer breakdowns, lower costs, and better overall equipment effectiveness.",
      author: "Sarra Mansour",
      company: "Plant Manager, TechEquip Industries",
      image: "/testimonial2.jpg"
    },
    {
      quote: "Their strategic performance management approach helped us align our operational metrics with business objectives. The customized dashboards they created give us unprecedented visibility into our operations.",
      author: "Karim Gharbi",
      company: "CEO, MediTech Solutions",
      image: "/testimonial3.jpg"
    }
  ];

  return (
    <section id="case-studies" ref={sectionRef} className="py-24 bg-slate-50 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Success Stories</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover how SICAF Engineering has helped organizations across industries
            achieve operational excellence and drive sustainable improvements.
          </p>
        </motion.div>

        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <SectionRevealCaseStudy key={study.title} delay={0.07 * index}> {/* Wrapped in SectionRevealCaseStudy */}
              <CaseStudy {...study} index={index} />
            </SectionRevealCaseStudy>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center mb-12">What Our Clients Say</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Testimonial
                key={testimonial.author}
                {...testimonial}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
