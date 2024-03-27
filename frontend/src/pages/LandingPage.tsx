import "../styles/pages/LandingPage.css";
import NavBar from "../components/NavBar.tsx";
import Hero from "../components/Hero.tsx";
import WhyUs from "../components/WhyUs.tsx";
import Pricing from "./Pricing.tsx";

export default function LandingPage() {
    return (
        <>
            <NavBar />
            <Hero />
            <WhyUs />
            <Pricing />
        </>
    );
}
