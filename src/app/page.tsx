"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            A <span className="font-semibold">free repository</span> for
            community <br className="hidden lg:block" /> components using{" "}
            <span className="font-semibold underline decoration-primary">
              Tailwind CSS
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Open source Tailwind UI components and templates to{" "}
            <br className="hidden lg:block" /> bootstrap your new apps, projects
            or landing sites!
          </p>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <Image
            width={500}
            height={500}
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="tailwind css components"
            className="w-full h-full max-w-md mx-auto "
          />
        </div>
      </section>
      <section className="container px-4 py-16 mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-300">
            Choose the plan that&apos;s right for you
          </p>
        </div>

        <div className="grid gap-8 mt-12 lg:grid-cols-3">
          {/* Basic Plan */}
          <div className="flex flex-col p-6 space-y-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Basic
              </h3>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                Perfect for starters
              </p>
              <div className="mt-8">
                <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                  $9
                </span>
                <span className="text-gray-500 dark:text-gray-300">/month</span>
              </div>
            </div>
            <ul className="space-y-4">
              {["Up to 5 projects", "2GB Storage", "Basic Support"].map(
                (feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2 text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                )
              )}
            </ul>
            <Button className="w-full px-4 py-2 mt-auto text-white transition-colors duration-300 transform rounded-lg bg-primary hover:bg-primary/70 focus:outline-none">
              Get Started
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col p-6 space-y-6 rounded-lg shadow-md border border-primary dark:border-primary hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Pro
              </h3>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                For growing businesses
              </p>
              <div className="mt-8">
                <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                  $29
                </span>
                <span className="text-gray-500 dark:text-gray-300">/month</span>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                "Up to 15 projects",
                "10GB Storage",
                "Priority Support",
                "Advanced Features",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <Button className="w-full px-4 py-2 mt-auto text-white transition-colors duration-300 transform rounded-lg bg-primary hover:bg-primary/70 focus:outline-none">
              Get Started
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col p-6 space-y-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Enterprise
              </h3>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                For large organizations
              </p>
              <div className="mt-8">
                <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                  $99
                </span>
                <span className="text-gray-500 dark:text-gray-300">/month</span>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                "Unlimited projects",
                "Unlimited Storage",
                "24/7 Support",
                "Custom Features",
                "API Access",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <Button className="w-full px-4 py-2 mt-auto text-white transition-colors duration-300 transform rounded-lg bg-primary hover:bg-primary/70 focus:outline-none">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 transition-all duration-700 ease-out delay-100 motion-safe:animate-pulse">
            Featured Blog Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Card 1 */}
            <div className="group  rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="aspect-video animate-[pulse_2s_ease-in-out]">
                <Image
                  src={"/react.webp"}
                  height={500}
                  width={500}
                  alt="blog thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Understanding React Hooks
                </h3>
                <p className="text-gray-600">
                  Deep dive into React&apos;s hook system
                </p>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="group  rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="aspect-video  animate-[pulse_2s_ease-in-out]">
                <Image
                  src={"/tailwind.webp"}
                  height={500}
                  width={500}
                  alt="blog thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Tailwind CSS Best Practices
                </h3>
                <p className="text-gray-600">
                  Modern styling approaches with Tailwind
                </p>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="group  rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="aspect-video  animate-[pulse_2s_ease-in-out]">
                <Image
                  src={"/nextjs.webp"}
                  height={500}
                  width={500}
                  alt="blog thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Next.js 13 Features
                </h3>
                <p className="text-gray-600">
                  Exploring the latest Next.js updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 transition-all duration-700 ease-out delay-100 motion-safe:animate-pulse">
            Our Latest Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="group  rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="aspect-video  animate-[pulse_2s_ease-in-out]">
                <Image
                  src={"/ecommerce.png"}
                  height={500}
                  width={500}
                  alt="portfolio"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  E-Commerce Platform
                </h3>
                <p className="text-gray-600">
                  Modern shopping experience with React
                </p>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="group  rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="aspect-video  animate-[pulse_2s_ease-in-out]">
                {/* Image placeholder */}
                <Image
                  src={"/portfolio.png"}
                  height={500}
                  width={500}
                  alt="portfolio"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Portfolio Website
                </h3>
                <p className="text-gray-600">Responsive personal showcase</p>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="group  rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="aspect-video  animate-[pulse_2s_ease-in-out]">
                {/* Image placeholder */}
                <Image
                  src={"/chat-app.png"}
                  height={500}
                  width={500}
                  alt="portfolio"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Chat App</h3>
                <p className="text-gray-600">Cross-platform chat application</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
