import { Gochi_Hand } from "next/font/google";
import React from "react";

const gochi_Hand = Gochi_Hand({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const AboutSection = () => {
  return (
    <div className="bg-gray-50 w-full p-4 sm:p-8 rounded-lg">
      <div className="max-w-7xl mx-auto">
        {/* Who We Are Section */}
        <div className="text-center  p-2   py-4 sm:py-8">
          <h2
            className={`text-3xl sm:text-4xl text-primary font-semibold  ${gochi_Hand.className}`}
          >
            Who we are
          </h2>
          <p className="font-sans font-medium text-lg leading-7 tracking-normal text-center text-[#828282] max-w-3xl mx-auto px-4 sm:px-0">
           A Smarter Way to Farm and Invest
          </p>
         
        </div>

        {/* Why Choose Us Section */}
        <div className={`flex flex-col md:flex-row gap-8 md:gap-x-20 items-center`}>
          {/* Image on the left */}
          <div className="w-full md:w-1/3 h-[700px">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/who-we-are.png"
                alt="Farmer standing in field with crops"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text and benefits on the right */}
          <div className="w-full md:w-1/2">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl text-gray-800 mb-4">
                At AgriPath, we're building a future where agriculture works for everyone, the investors, farmers, and communities.
              </h2>
              <p className="text-gray-600 text-lg">
                Our goal is to transform agriculture by enhancing sustainable food production while generating competitive returns for our investors.
              </p>
            </div>

            <p className="text-gray-700 mb-6 text-lg">
              We grow crops, raise livestock, and run profitable agribusiness projects with a strong focus on transparency, sustainability, and impact.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="font-medium text-gray-800">Trusted farming partners across Ghana</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="font-medium text-gray-800">Crop and livestock investments with real returns</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="font-medium text-gray-800">Insured production and guaranteed offtake</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-background text-primary-foreground hover:bg-green-700  py-2 px-4 rounded-lg font-medium transition duration-300">
                View Available Investment
              </button>
              <button className="border-2 border-gray-300 text-primary-foreground hover:bg-background hover:text-white py-2 px-4 rounded-lg font-medium transition duration-300">
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
