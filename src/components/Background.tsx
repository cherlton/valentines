import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Background = () => {
    const [hearts, setHearts] = useState<{ id: number; left: number; duration: number }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts((prev) => {
                const newHeart = {
                    id: Date.now(),
                    left: Math.random() * 100,
                    duration: Math.random() * 5 + 5,
                };
                // Keep only recent hearts to prevent memory issues
                return [...prev, newHeart].slice(-50);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-br from-pink-100 via-red-50 to-pink-200">
            {/* Floating Hearts */}
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: "110vh", opacity: 0 }}
                    animate={{ y: "-10vh", opacity: [0, 1, 0] }}
                    transition={{ duration: heart.duration, ease: "linear" }}
                    style={{
                        position: "absolute",
                        left: `${heart.left}%`,
                        fontSize: `${Math.random() * 20 + 10}px`,
                        color: Math.random() > 0.5 ? "#ff69b4" : "#ff1493",
                    }}
                >
                    ❤️
                </motion.div>
            ))}

            {/* Soft Glows */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full blur-[100px] opacity-30"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-0 right-0 w-96 h-96 bg-red-200 rounded-full blur-[100px] opacity-30"
            />
        </div>
    );
};

export default Background;
