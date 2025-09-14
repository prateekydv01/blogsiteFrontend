// src/components/LoadingScreen.jsx
import { motion } from "framer-motion";
import { Logo } from "./index";

export default function LoadingScreen() {
  // Enhanced animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    }
  };

  const itemVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0.5, opacity: 0, rotate: -10 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay: 0.1
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 flex flex-col items-center justify-center 
                 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 z-50
                 backdrop-blur-sm"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full 
                     bg-gradient-to-br from-blue-400/10 to-indigo-600/10 
                     rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.02, 0.04, 0.02]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full 
                     bg-gradient-to-tl from-indigo-400/10 to-blue-600/10 
                     rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Enhanced Logo Container */}
        <motion.div
          variants={logoVariants}
          className="relative mb-8"
        >
          {/* Glowing backdrop */}
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 
                       rounded-full blur-xl"
          />
          
          {/* Logo container with glass effect */}
          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 
                          rounded-full p-6 shadow-2xl
                          backdrop-blur-sm border border-white/20
                          before:absolute before:inset-0 before:rounded-full 
                          before:bg-gradient-to-r before:from-white/10 before:to-transparent
                          before:blur-sm">
            <Logo width="80px" className="relative z-10" />
          </div>
        </motion.div>

        {/* Enhanced Brand Text */}
        <motion.div variants={itemVariants} className="text-center mb-2">
          <h1 className="text-4xl md:text-5xl font-bold 
                         bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 
                         bg-clip-text text-transparent 
                         drop-shadow-sm tracking-tight">
            Welcome
          </h1>
          <motion.p 
            variants={itemVariants}
            className="text-slate-600 text-lg font-medium mt-2 tracking-wide"
          >
            Getting things ready...
          </motion.p>
        </motion.div>

        {/* Sophisticated Loading Animation */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center space-y-6"
        >
          {/* Animated Dots with improved timing */}
          <div className="flex space-x-3">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500
                           shadow-lg"
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1.5 bg-slate-200/60 rounded-full overflow-hidden
                          backdrop-blur-sm border border-white/20">
            <motion.div
              animate={{
                x: [-256, 256],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-full w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent
                         rounded-full blur-sm"
            />
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full blur-sm"
            style={{
              left: `${15 + i * 10}%`,
              bottom: '10%'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
