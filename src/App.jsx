import { useState } from "react";
import Hero from "./sections/Hero.jsx";
import GymFloor from "./sections/GymFloor.jsx";
import TheRack from "./sections/TheRack.jsx";
import Philosophy from "./sections/Philosophy.jsx";
import Membership from "./sections/Membership.jsx";
import Footer from "./sections/Footer.jsx";
import SignupModal from "./components/SignupModal.jsx";
import Atmosphere from "./components/Atmosphere.jsx";

export default function App() {
  const [signupOpen, setSignupOpen] = useState(false);

  const openSignup = () => setSignupOpen(true);

  return (
    <div className="relative">
      <Atmosphere />

      <main className="relative z-10">
        <Hero onStartTraining={openSignup} />
        <GymFloor />
        <TheRack />
        <Philosophy />
        <Membership onStartTraining={openSignup} />
        <Footer />
      </main>

      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
