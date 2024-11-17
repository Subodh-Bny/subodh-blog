import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation";

const projets = [
  {
    image: "/ecommerce.png",
    alt: "ecommerce",
    title: "ECommerce platform",
    description: "Modern shopping experience with React",
    link: "https://brushstroke-portal.onrender.com/",
  },
  {
    image: "/portfolio.png",
    alt: "portfolio",
    title: "Portfolio ",
    description: "Responseive personal showcase",
    link: "https://subodh-portfolio.vercel.app/",
  },
  {
    image: "/chat-app.png",
    alt: "chat app",
    title: "Chat web app",
    description: "Chat app using React js",
    link: "https://chat-app-subodh.onrender.com",
  },
];

const Projects = () => {
  const router = useRouter();
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projets.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg bg-card hover:cursor-pointer"
              onClick={() => router.push(item.link)}
            >
              <div className="aspect-video relative">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default Projects;
