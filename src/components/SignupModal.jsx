import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-panel border border-line rounded-sm shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
          >
            {!submitted ? (
              <>
                <div className="flex items-center justify-between border-b border-line p-5 sm:p-6">
                  <div>
                    <p className="signage text-amber">Zone 06</p>
                    <h2 className="display text-[clamp(2.4rem,8vw,4.5rem)] mt-2">
                      Start
                      <br />
                      Training
                    </h2>
                  </div>

                  <button onClick={closeModal} className="text-ash hover:text-amber">
                    CLOSE
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="p-5 sm:p-6 space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <input required placeholder="First Name" className="bg-void border border-line px-4 py-4 outline-none focus:border-amber" />
                    <input required placeholder="Last Name" className="bg-void border border-line px-4 py-4 outline-none focus:border-amber" />
                  </div>

                  <input required type="email" placeholder="Email Address" className="w-full bg-void border border-line px-4 py-4 outline-none focus:border-amber" />
                  <input required type="tel" placeholder="Phone Number" className="w-full bg-void border border-line px-4 py-4 outline-none focus:border-amber" />

                  <select required defaultValue="" className="w-full bg-void border border-line px-4 py-4 outline-none focus:border-amber">
                    <option value="" disabled>Select Program</option>
                    <option>Foundation Membership</option>
                    <option>Performance Membership</option>
                    <option>Unlimited Membership</option>
                  </select>

                  <select required defaultValue="" className="w-full bg-void border border-line px-4 py-4 outline-none focus:border-amber">
                    <option value="" disabled>Primary Goal</option>
                    <option>Build Strength</option>
                    <option>Lose Body Fat</option>
                    <option>Gain Muscle</option>
                    <option>Athletic Performance</option>
                    <option>General Fitness</option>
                  </select>

                  <select required defaultValue="" className="w-full bg-void border border-line px-4 py-4 outline-none focus:border-amber">
                    <option value="" disabled>Training Experience</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>

                  <input type="date" className="w-full bg-void border border-line px-4 py-4 outline-none focus:border-amber" />

                  <button type="submit" className="w-full bg-amber text-void py-4 font-bold uppercase tracking-[0.18em] hover:bg-[#f0b653] transition-colors">
                    Start Training
                  </button>

                  <p className="text-center text-xs text-ash">
                    Demo application • Nothing is actually submitted.
                  </p>
                </form>
              </>
            ) : (
              <div className="relative min-h-[430px] sm:min-h-[500px] flex flex-col items-center justify-center text-center p-6 sm:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,164,60,0.18),transparent_48%)]" />

                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 border border-amber/40 bg-void rounded-sm flex items-center justify-center shadow-[0_0_60px_rgba(226,164,60,0.18)]"
              >
                  <span className="text-amber text-4xl">✓</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="signage text-amber mt-8"
                >
                  Application Received
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="display text-[clamp(2.2rem,10vw,5rem)] leading-[0.9] mt-4 max-w-full"
                >
                  Congrats.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-5 max-w-md text-ash leading-relaxed text-sm sm:text-base"
              >
                  Your demo intake has been received. A coach would contact you
                  to schedule your first session.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={closeModal}
                  aria-label="Close"
                  className="absolute top-5 right-5 text-ash hover:text-amber transition-colors text-3xl leading-none"
                >
                  ×
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
