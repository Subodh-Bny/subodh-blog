"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Projects from "@/components/Projects";
import Link from "next/link";

export default function About() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[60vh] flex flex-col justify-center"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-primary mb-4"
            >
              Hi, I&apos;m Subodh
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground mb-6"
            >
              A frontend developer passionate about creating meaningful web
              experiences. I write about modern web development, best practices,
              and my learning journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href={"/#welcome"}
                className={buttonVariants({ variant: "default" })}
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/subodh.png"
              alt="subodh"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Showcase Section */}
      <Projects />

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "TailwindCSS",
            "MongoDb",
            "Git",
            "Docker",
          ].map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-4 text-center rounded-lg bg-accent hover:bg-card transition-colors"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
