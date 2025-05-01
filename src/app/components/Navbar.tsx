'use client'
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed w-full top-0 left-0 right-0 z-50"
    >
      <motion.nav 
        className="w-full max-w-[1312px] h-16 flex items-center bg-[rgba(255,255,255,0.02)] backdrop-blur-lg rounded-full mx-auto my-3 border border-[#1C442A14] shadow-lg"
      >
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-full">
            <motion.div variants={itemVariants} className="flex items-center -ml-8">
              <Link href="/" className="flex-shrink-0">
                <motion.img 
                  src="/Logo.png" 
                  alt="AgriPath Logo" 
                  className="h-32 p-2 w-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
                  >
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.div variants={itemVariants}>
                <Link
                  href="/invest"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm text-base"
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Start Investing
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            <motion.div 
              className="md:hidden flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-green-600 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden absolute top-20 left-0 right-0 bg-bg-[rgba(255,255,255,0.02)] backdrop-blur-[21.3px] border-t border-[#1C442A14] overflow-hidden mx-3 rounded-xl"
          >
            <motion.div 
              className="px-4 py-3 space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                className="pt-4 pb-3 border-t border-gray-200"
                variants={itemVariants}
              >
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/invest"
                  className="block px-3 py-2 mt-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Invest Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;