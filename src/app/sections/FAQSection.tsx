"use client";
import React, { useState } from "react";
import { ChevronUp, ChevronDown, Pin } from "lucide-react";

const HowItWorksAndFAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | string | null>(
    null
  );

  const toggleQuestion = (questionId: number | string | null) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const steps = [
    {
      id: 1,
      title: "Choose a Crop",
      description: "Select a crop or crops and units you want to invest in.",
    },
    {
      id: 2,
      title: "Sign Up & Invest Securely",
      description:
        "Register, invest through a trusted payment gateway, and receive a private login.",
    },
    {
      id: 3,
      title: "We Handle the Farming",
      description:
        "We manage everything from planting to harvest. Track your investment.",
    },
    {
      id: 4,
      title: "Receive Your Returns",
      description: "Enjoy scheduled payouts or reinvest in new opportunities.",
    },
  ];

  const faqs = [
    {
      id: "question1",
      question: "What is AgriPath, and how does it work?",
      answer:
        "AgriPath is an agricultural investment platform that allows investors to fund various crop production projects and earn returns based on harvest sales.",
    },
    {
      id: "question2",
      question: "Who can invest in AgriPath projects?",
      answer:
        "Anyone can invest in AgriPath projects. We welcome individual and institutional investors looking for sustainable agricultural opportunities.",
    },
    {
      id: "question3",
      question: "How do I sign up as an investor?",
      answer:
        "You can sign up through our secure online portal. Follow the registration process, verify your identity, and you can start investing in available projects.",
    },
    {
      id: "question4",
      question: "How often do you release updates?",
      answer:
        "We provide regular updates on project progress, including planting, growth stages, and harvest forecasts. Investors receive monthly reports and notifications.",
    },
  ];

  return (
    <div className="w-full ">
      {/* How It Works Section */}
      <div className=" py-8 sm:py-12 md:py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 text-center mb-2">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-center text-gray-800 mb-8 sm:mb-12">
            A Simple Process to Grow Your Wealth
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center p-4 bg-white/50 rounded-lg "
              >
                <div className="relative mb-3 sm:mb-4 flex items-center gap-1">
                  <Pin className="text-red-500 mt-2 rotate-45" size={20}  />
                  <h3 className="text-lg sm:text-xl font-bold text-green-600 mt-2">
                    Step {step.id}
                  </h3>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">{step.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative py-8 sm:py-12 md:py-16 px-4 faq-section min-h-[400px] sm:min-h-[470px]">
        {/* Background Image with a Cleaner Overlay */}

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-black mb-6 lg:mb-0">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="lg:col-span-2">
              {faqs.map((faq) => (
                <div key={faq.id} className="border-b border-green-500">
                  <button
                    className="w-full py-3 sm:py-4 flex justify-between items-center text-black text-left text-sm sm:text-base"
                    onClick={() => toggleQuestion(faq.id)}
                  >
                    <span className="pr-4">{faq.question}</span>
                    {openQuestion === faq.id ? (
                      <ChevronUp className="flex-shrink-0" size={18}  />
                    ) : (
                      <ChevronDown className="flex-shrink-0" size={18} />
                    )}
                  </button>

                  {openQuestion === faq.id && (
                    <div className="pb-3 sm:pb-4 text-black opacity-90">
                      <p className="text-sm sm:text-base">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksAndFAQ;
