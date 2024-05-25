import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";

const useScrollFade = (id: string, threshold = 0.5) => {
    const controls = useAnimation();
    const [hasAppeared, setHasAppeared] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById(id);
            if (!element) return;
            const rect = element.getBoundingClientRect();
            const isVisible =
                rect.top < window.innerHeight * threshold && rect.bottom > 0;

            if (isVisible && !hasAppeared) {
                controls.start("visible");
                setHasAppeared(true);
            }
        };

        handleScroll(); // Run once to check the initial position
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls, id, threshold, hasAppeared]);

    return controls;
};

export default useScrollFade;
