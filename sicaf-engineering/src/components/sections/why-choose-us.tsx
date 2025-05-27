"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Target,
  Zap
} from "lucide-react";

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const reasons = [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Recognized expertise",
      description: "Our team brings proven expertise in industrial engineering, acknowledged by clients across multiple sectors.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Customized approach",
      description: "We develop solutions tailored to your specific needs and challenges, ensuring results that align with your objectives.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Long-term value",
      description: "Our focus is on creating sustainable improvements that continue to deliver value long after our engagement ends.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Experienced team",
      description: "Our consultants and trainers bring decades of combined experience across various industrial disciplines.",
    },
  ];

  const stats = [
    { value: "50+", label: "Completed Projects" },
    { value: "8+", label: "Years of Experience" },
    { value: "30%", label: "Avg. Efficiency Improvement" },
    { value: "95%", label: "Client Satisfaction" },
  ];

  return (
    <section id="why-choose-us" ref={ref} className="py-24 bg-slate-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-gray-600 max-w-3xl mx-auto">
            Partnering with SICAF Engineering gives you access to industry-leading expertise and a proven
            track record of delivering transformative results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-primary rounded-2xl p-10 text-white"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Our Impact By The Numbers</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-primary mb-6">
              <svg className="h-12 w-12 mx-auto opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="text-xl md:text-2xl font-medium text-gray-700 mb-8">
              "SICAF Engineering's expertise transformed our manufacturing processes,
              resulting in significant efficiency gains and cost savings. Their team's
              commitment to excellence made them the ideal partner for our transformation journey."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-secondary font-bold text-lg">AB</span>
              </div>
              <div className="text-left">
                <div className="font-semibold">Ahmed Ben Salem</div>
                <div className="text-gray-500 text-sm">Operations Director, Manufacturing Company</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center text-primary font-semibold cursor-pointer group">
            <span>Start your transformation journey today</span>
            <Zap className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
