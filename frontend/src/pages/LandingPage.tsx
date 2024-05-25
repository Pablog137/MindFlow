// Importa framer-motion y otros imports
import { motion } from "framer-motion";
import useScrollFade from "../hooks/useScrollFade.ts";
import "../styles/pages/LandingPage.css";
import NavBar from "../components/NavBar.tsx";
import Hero from "../components/Hero.tsx";
import WhyUs from "../components/WhyUs.tsx";
import Pricing from "./Pricing.tsx";
import { Faq } from "../components/FAQ.tsx";
import Features from "../components/Features.tsx";

// Define las variantes de animación
const fadeInOut = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};
const duration = 2;

export default function LandingPage() {
    const heroControls = useScrollFade("hero");
    const whyUsControls = useScrollFade("why-us");
    const pricingControls = useScrollFade("pricing");
    const featuresControls = useScrollFade("features");
    const faqControls = useScrollFade("faqs");

    return (
        <>
            <NavBar />
            <motion.div
                id="hero"
                initial="hidden"
                animate={heroControls}
                variants={fadeInOut}
                transition={{ duration }}
            >
                <Hero />
            </motion.div>
            <motion.div
                id="why-us"
                initial="hidden"
                animate={whyUsControls}
                variants={fadeInOut}
                transition={{ duration }}
            >
                <WhyUs />
            </motion.div>
            <motion.div
                id="pricing"
                initial="hidden"
                animate={pricingControls}
                variants={fadeInOut}
                transition={{ duration }}
            >
                <Pricing />
            </motion.div>
            <motion.div
                id="features"
                initial="hidden"
                animate={featuresControls}
                variants={fadeInOut}
                transition={{ duration }}
            >
                <Features />
            </motion.div>
            <motion.div
                id="faq"
                initial="hidden"
                animate={faqControls}
                variants={fadeInOut}
                transition={{ duration }}
            >
                <Faq />
            </motion.div>
        </>
    );
}
