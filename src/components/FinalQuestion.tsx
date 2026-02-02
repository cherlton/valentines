import type { MouseEvent } from "react";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

// Importing local images from assets
import img1 from "../assets/WhatsApp Image 2026-01-29 at 03.40.45.jpeg";
import img2 from "../assets/WhatsApp Image 2026-01-29 at 03.40.47 (1).jpeg";
import img3 from "../assets/WhatsApp Image 2026-01-29 at 03.40.47.jpeg";
import img4 from "../assets/WhatsApp Image 2026-01-29 at 03.40.48 (1).jpeg";
import img5 from "../assets/WhatsApp Image 2026-01-29 at 03.40.48 (2).jpeg";
import img6 from "../assets/WhatsApp Image 2026-01-29 at 03.40.48 (3).jpeg";
import img7 from "../assets/WhatsApp Image 2026-01-29 at 03.40.48.jpeg";
import img8 from "../assets/WhatsApp Image 2026-01-29 at 03.40.49 (1).jpeg";
import img9 from "../assets/WhatsApp Image 2026-01-29 at 03.40.49 (2).jpeg";
import img10 from "../assets/WhatsApp Image 2026-01-29 at 03.40.49.jpeg";
import img11 from "../assets/WhatsApp Image 2026-01-29 at 03.40.50 (1).jpeg";
import img12 from "../assets/WhatsApp Image 2026-01-29 at 03.40.50 (2).jpeg";
import img13 from "../assets/WhatsApp Image 2026-01-29 at 03.40.50.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13];

export default function FinalQuestion({ onYes }: { onYes: () => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        if (!isHovered) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 2000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const handleYes = () => {
        onYes();
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff69b4', '#ff1493', '#ffffff']
        });

        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 120,
                origin: { y: 0.4 },
                colors: ['#ffc0cb', '#ff1493', '#ffffff']
            });
        }, 300);

        alert("YAY 💕 I love you!");
    };

    const moveNo = (e: MouseEvent<HTMLButtonElement>) => {
        const x = Math.random() * 160 - 80;
        const y = Math.random() * 120 - 60;

        e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
    };

    return (
        <div className="relative flex justify-center items-center">
            {/* Hover Popup Overlay */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-[110%] mb-4 w-80 h-64 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-pink-100 z-50 p-3"
                    >
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-pink-50/50">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    src={images[currentSlide]}
                                    alt="Valentine Memory"
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -100, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Card */}
            <motion.div
                className="text-center p-12 bg-[#fffdfa]/90 backdrop-blur-sm shadow-[20px_20px_60px_rgba(0,0,0,0.1),-20px_-20px_60px_rgba(255,255,255,0.8)] border-l-8 border-pink-600 rounded-lg cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-10 italic">
                    Will you be my Valentine? 💖
                </h2>

                <div className="relative inline-flex items-center gap-10">
                    <button
                        onClick={handleYes}
                        className="px-12 py-5 text-xl rounded-none bg-pink-600 text-white font-bold shadow-xl hover:bg-pink-700 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border-b-4 border-pink-800"
                    >
                        YES 😍
                    </button>

                    <button
                        onMouseEnter={moveNo}
                        className="absolute text-sm px-6 py-2 rounded-none bg-gray-200 text-gray-600 hover:bg-gray-300 transition-transform duration-200 shadow-sm border-b-2 border-gray-400"
                        style={{ left: "120%" }}
                    >
                        no
                    </button>
                </div>

                {/* Subtle sidebar shadow inside the container */}
                <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
            </motion.div>
        </div>
    );
}
