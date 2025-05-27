"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight, Tag, User } from "lucide-react";
import { AnimatedScroll, StaggerContainer } from "@/components/ui/animated-scroll";
import OptimizedImage from "@/components/ui/optimized-image";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    image: string;
  };
  category: string;
  coverImage: string;
}

const ArticleCard = ({ post, index }: { post: BlogPost; index: number }) => {
  return (
    <AnimatedScroll
      directionY="up"
      delay={0.1 * index}
      className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <OptimizedImage
          src={post.coverImage}
          alt={post.title}
          fill
          className="transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center">
          <Tag className="w-3 h-3 mr-1" />
          {post.category}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {post.date}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {post.author.name}
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center text-primary font-medium group"
        >
          Read More
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </AnimatedScroll>
  );
};

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Sample blog posts
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      slug: "lean-manufacturing-benefits",
      title: "5 Ways Lean Manufacturing Can Transform Your Production Line",
      excerpt: "Discover how implementing lean manufacturing principles can reduce waste, increase efficiency, and boost your bottom line with concrete examples from automotive industries.",
      date: "March 15, 2023",
      author: {
        name: "Ahmed Hakim",
        image: "/authors/ahmed-hakim.jpg" // Placeholder - would need a real image
      },
      category: "Lean Manufacturing",
      coverImage: "/blog/lean-manufacturing.jpg" // Placeholder - would need a real image
    },
    {
      id: "2",
      slug: "tpm-implementation-guide",
      title: "A Complete Guide to Implementing Total Productive Maintenance",
      excerpt: "Learn the step-by-step process for implementing a successful TPM program in your facility, including key metrics to track and common pitfalls to avoid.",
      date: "April 22, 2023",
      author: {
        name: "Sonia Belaid",
        image: "/authors/sonia-belaid.jpg" // Placeholder - would need a real image
      },
      category: "Maintenance",
      coverImage: "/blog/tpm-implementation.jpg" // Placeholder - would need a real image
    },
    {
      id: "3",
      slug: "industry-4-0-future",
      title: "Industry 4.0: The Future of Manufacturing is Already Here",
      excerpt: "Explore how Industry 4.0 technologies like IoT, AI, and real-time monitoring are revolutionizing manufacturing operations and creating new opportunities for efficiency.",
      date: "May 10, 2023",
      author: {
        name: "Karim Gharbi",
        image: "/authors/karim-gharbi.jpg" // Placeholder - would need a real image
      },
      category: "Industry 4.0",
      coverImage: "/blog/industry-4-0.jpg" // Placeholder - would need a real image
    },
    {
      id: "4",
      slug: "strategic-performance-management",
      title: "Strategic Performance Management: Aligning KPIs with Business Goals",
      excerpt: "How to develop a performance management system that directly supports your strategic business objectives, with real examples from leading companies.",
      date: "June 5, 2023",
      author: {
        name: "Leila Ben Salah",
        image: "/authors/leila-ben-salah.jpg" // Placeholder - would need a real image
      },
      category: "Performance",
      coverImage: "/blog/performance-management.jpg" // Placeholder - would need a real image
    }
  ];

  return (
    <section id="blog" ref={ref} className="py-24 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Latest Insights</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest articles on industrial engineering,
            lean manufacturing, and operational excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <ArticleCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium transition-transform hover:translate-y-[-2px] hover:shadow-md"
          >
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>

        {/* Featured Article - Can be shown on larger screens */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 hidden lg:block"
        >
          <div className="bg-slate-50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 gap-0">
              <div className="relative h-full min-h-[400px]">
                <OptimizedImage
                  src="/blog/featured-article.jpg" // Placeholder - would need a real image
                  alt="Featured Article"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-12 flex flex-col justify-center">
                <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1 rounded-full mb-6">
                  Featured Article
                </div>
                <h3 className="text-2xl font-bold mb-4">How Industrial Engineering is Shaping the Future of Manufacturing</h3>
                <p className="text-gray-600 mb-6">
                  Explore the latest trends in industrial engineering and how they are transforming
                  manufacturing processes across industries. Learn about the technologies and methodologies
                  that are driving this change and how you can stay ahead of the curve.
                </p>
                <Link
                  href="/blog/industrial-engineering-future"
                  className="inline-flex items-center text-primary font-medium group"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
