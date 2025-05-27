"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import Logo from "@/components/logo";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Training", href: "#training" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    { label: "Lean Management", href: "#services" },
    { label: "Total Productive Maintenance", href: "#services" },
    { label: "Performance Management", href: "#services" },
    { label: "Process Reengineering", href: "#services" },
    { label: "Industrie 4.0", href: "#services" },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Logo isInverted={true} />
            </Link>
            <p className="text-slate-300 mb-6 max-w-xs">
              Providing industrial organizations with expertise and tools to achieve their full potential
              through optimized operational efficiency.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="h-1 w-0 bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-slate-300 hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="h-1 w-0 bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4 text-slate-300">
              <p>58 Av Habib Bourguiba, Bloc G, Megrine 2033, Ben Arous, Tunis, Tunisia</p>
              <p>(+216) 71 425 633 / (+216) 54 425 633</p>
              <p>contact@sicaf.tn</p>
            </div>
          </div>
        </div>

        <hr className="border-slate-800 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} SICAF Engineering. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-800 hover:bg-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
