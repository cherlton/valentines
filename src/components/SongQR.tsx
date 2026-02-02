import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YouTubeLink = "https://www.youtube.com/watch?v=kffacxfA7G4"; // Placeholder: Ed Sheeran - Perfect
const QRCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(YouTubeLink)}`;

const SongQR = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4"
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, x: 20, y: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, x: 20, y: 20 }}
                        className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-pink-100 flex flex-col items-center gap-2 mb-4"
                    >
                        <p className="text-xs font-serif text-pink-600 font-bold uppercase tracking-tighter">Scan to listen 🎵</p>
                        <div className="w-32 h-32 bg-white p-1 rounded-lg shadow-inner">
                            <img src={QRCodeURL} alt="Favorite Song QR Code" className="w-full h-full" />
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-2 text-[10px] text-gray-400 hover:text-pink-500 transition-colors uppercase tracking-widest"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex flex-row-reverse items-center gap-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 shadow-lg transition-colors"
            >
                <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-pink-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m9 18 6-6-6-6" /></svg>
                </motion.div>
                <span className="text-sm font-serif italic text-gray-800 font-medium whitespace-nowrap">
                    click to guess our fav song...
                </span>
            </motion.button>
        </motion.div>
    );
};

export default SongQR;
