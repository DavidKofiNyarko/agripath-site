import React from "react";

const CallToActionSection = () => {
  return (
    <div className="max-w-7xl mx-auto my-4 sm:my-8">
      <div className="relative rounded-xl overflow-hidden cta-section">
        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60 bg-opacity-85"></div>

        {/* Content */}
        <div className="relative p-6 sm:p-12 text-white">
          <div className="max-w-md">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Exclusive High-Value Investment Opportunities
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base mb-6 sm:mb-8">
              Become a High Value Investor and fund entire farm productions for
              higher returns and deeper impact.
            </p>

            {/* Benefits with checkmarks */}
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 mr-2 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Gain priority access to large-scale farm projects.</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 mr-2 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Enjoy tailored investment structures with optimised returns.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 mr-2 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Receive personalised reports and direct farm insights.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 mr-2 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Be part of an exclusive network of high-net-worth investors.
                </span>
              </li>
            </ul>

            {/* CTA Button */}
            <button className="w-full sm:w-auto bg-white text-green-800 py-2 px-6 rounded-md text-sm sm:text-base font-medium hover:bg-gray-100 transition duration-300">
              Become a High-Value Investor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;
