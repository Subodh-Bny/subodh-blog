import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>

          <div className="prose prose-lg">
            <p className="text-gray-600 mb-4">
              Welcome to our platform! We are dedicated to providing excellent
              service and innovative solutions to our users.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              To create meaningful experiences and deliver value through
              technology.
            </p>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Contact Information
            </h3>
            <p className="text-gray-600">
              Email: contact@example.com
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
