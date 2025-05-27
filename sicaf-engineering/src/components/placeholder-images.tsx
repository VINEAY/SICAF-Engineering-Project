"use client";

import React from "react";

/**
 * This file contains placeholder image information for the website
 * In a production environment, these would be replaced with real images.
 */

// Helper to create gradient backgrounds with SVG
export function createGradientBackground(
  color1 = "#00c6d8",
  color2 = "#003847",
  width = 800,
  height = 600
): string {
  // Create a unique ID for this gradient
  const gradientId = `grad-${Math.random().toString(36).substring(2, 9)}`;

  // Create SVG with gradient
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#${gradientId})" />
      <g fill="#ffffff" opacity="0.05">
        ${Array.from({ length: 50 }).map((_, i) =>
          `<circle cx="${Math.random() * width}" cy="${Math.random() * height}" r="${2 + Math.random() * 5}" />`
        ).join('')}
      </g>
    </svg>
  `;

  // Convert to data URL
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export const PLACEHOLDER_IMAGES = {
  // Case study images
  caseStudies: {
    automotive: createGradientBackground('#0078A8', '#003040', 800, 600),
    manufacturing: createGradientBackground('#006D9C', '#002C40', 800, 600),
    pharma: createGradientBackground('#00A7C7', '#004458', 800, 600),
    food: createGradientBackground('#00B8A0', '#004840', 800, 600),
    logistics: createGradientBackground('#00C6D8', '#003847', 800, 600), // New placeholder
    energy: createGradientBackground('#009B77', '#002F2F', 800, 600), // New placeholder
  },

  // Blog post images
  blog: {
    leanManufacturing: createGradientBackground('#19A5B2', '#00303B', 1200, 800),
    tpmImplementation: createGradientBackground('#1190AE', '#00344D', 1200, 800),
    industry40: createGradientBackground('#0BBCD3', '#004D5F', 1200, 800),
    performanceManagement: createGradientBackground('#06C4D0', '#005260', 1200, 800),
    featuredArticle: createGradientBackground('#00D0E0', '#005C68', 1600, 900),
    newTrends: createGradientBackground('#00BFFF', '#005F7F', 1200, 800), // New placeholder
    caseStudyInsights: createGradientBackground('#00FF7F', '#004040', 1200, 800), // New placeholder
  },

  // Testimonial author images
  authors: {
    author1: createGradientBackground('#00A0B0', '#004046', 100, 100),
    author2: createGradientBackground('#00B0C0', '#00484E', 100, 100),
    author3: createGradientBackground('#00A8B8', '#004448', 100, 100),
  }
};

// Export URL constants for easy use
export const CASE_STUDY_AUTOMOTIVE = PLACEHOLDER_IMAGES.caseStudies.automotive;
export const CASE_STUDY_MANUFACTURING = PLACEHOLDER_IMAGES.caseStudies.manufacturing;
export const CASE_STUDY_PHARMA = PLACEHOLDER_IMAGES.caseStudies.pharma;
export const CASE_STUDY_FOOD = PLACEHOLDER_IMAGES.caseStudies.food;
export const CASE_STUDY_LOGISTICS = PLACEHOLDER_IMAGES.caseStudies.logistics; // New export
export const CASE_STUDY_ENERGY = PLACEHOLDER_IMAGES.caseStudies.energy; // New export

export const BLOG_LEAN_MANUFACTURING = PLACEHOLDER_IMAGES.blog.leanManufacturing;
export const BLOG_TPM_IMPLEMENTATION = PLACEHOLDER_IMAGES.blog.tpmImplementation;
export const BLOG_INDUSTRY_40 = PLACEHOLDER_IMAGES.blog.industry40;
export const BLOG_PERFORMANCE_MANAGEMENT = PLACEHOLDER_IMAGES.blog.performanceManagement;
export const BLOG_FEATURED_ARTICLE = PLACEHOLDER_IMAGES.blog.featuredArticle;
export const BLOG_NEW_TRENDS = PLACEHOLDER_IMAGES.blog.newTrends; // New export
export const BLOG_CASE_STUDY_INSIGHTS = PLACEHOLDER_IMAGES.blog.caseStudyInsights; // New export

export const AUTHOR_1 = PLACEHOLDER_IMAGES.authors.author1;
export const AUTHOR_2 = PLACEHOLDER_IMAGES.authors.author2;
export const AUTHOR_3 = PLACEHOLDER_IMAGES.authors.author3;
