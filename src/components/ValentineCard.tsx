import { useState } from "react";
import FinalQuestion from "./FinalQuestion";

const messages: string[] = [
    "Hey my love AKA Shawty ❤️",
    "I engineered this just for you",
    "Because you close to my heart like that, and cause I choose you daily",
    "You the sugar in my tea, the salt in my meat.What i'm saying is my life would be distasteful without a single tea spoon of you on a daily(meaning every 2 hours😅😍)",
];

export default function ValentineCard({ onYes }: { onYes: () => void }) {
    const [step, setStep] = useState<number>(0);

    return (
        <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
            {step < messages.length ? (
                <div className="flex flex-col items-center gap-16">
                    {/* Realistic Stacked Cards Container */}
                    <div className="relative w-80 h-56 [perspective:1200px]">
                        {messages.map((msg, index) => {
                            // Logic: 
                            // index < step: Moved to the left (shuffled away)
                            // index === step: Main center card
                            // index > step: In the stack behind

                            const isShuffled = index < step;
                            const isCurrent = index === step;
                            const stackIndex = index - step;

                            return (
                                <div
                                    key={index}
                                    className={`
                                        absolute inset-0 bg-[#fffdfa] rounded-none
                                        shadow-[2px_0_10px_rgba(0,0,0,0.1),-1px_0_4px_rgba(0,0,0,0.05)]
                                        flex items-center justify-center text-center px-10
                                        transition-all duration-700 ease-in-out border-gray-200
                                        ${isCurrent ? "z-30 scale-100 opacity-100" : ""}
                                        ${isShuffled ? "z-40 -translate-x-[150%] -rotate-12 opacity-0 pointer-events-none" : ""}
                                        ${!isCurrent && !isShuffled ? "z-20 opacity-100" : ""}
                                    `}
                                    style={{
                                        borderLeft: "6px solid #f0f0f0", // Sidebar depth
                                        transform: isShuffled
                                            ? "translateX(-150%) rotate(-15deg)"
                                            : isCurrent
                                                ? "translateX(0) rotate(0)"
                                                : `translateX(${stackIndex * 6}px) translateY(${stackIndex * -4}px) rotate(${stackIndex * 2}deg)`,
                                        boxShadow: isCurrent
                                            ? "10px 10px 30px rgba(0,0,0,0.15), -5px 0 15px rgba(0,0,0,0.05)"
                                            : "5px 5px 15px rgba(0,0,0,0.1)",
                                        visibility: isShuffled && index < step - 1 ? 'hidden' : 'visible'
                                    }}
                                >
                                    {/* Sidebar shadow simulation inside the card */}
                                    <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />

                                    <p className="text-xl font-serif text-gray-800 leading-relaxed italic">
                                        {msg}
                                    </p>

                                    {/* Subtle paper texture effect */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setStep((prev) => prev + 1)}
                        className="px-12 py-5 text-xl rounded-none bg-pink-600 text-white font-bold shadow-2xl hover:bg-pink-700 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border-b-4 border-pink-800"
                    >
                        {step === 0 ? "Open 💌" : "Next ✨"}
                    </button>
                </div>
            ) : (
                <div className="animate-in fade-in zoom-in duration-1000">
                    <FinalQuestion onYes={onYes} />
                </div>
            )}
        </div>
    );
}
