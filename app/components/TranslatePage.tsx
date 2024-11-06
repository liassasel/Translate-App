"use client";

import { useState } from "react";

import SoundMaxFill from "../components/icons/SoundMaxFill";
import CopyIcon from "../components/icons/CopyIcon";
import TopLeftIcon from "../components/icons/TopLeftIcon";
import LogoIcon from "../components/icons/LogoIcon";
import SortAlfa from "../components/icons/SortAlfa";

type Language = "detect" | "EN" | "FR" | "ES";

export default function TranslatePage() {
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState<Language>("detect");
    const [targetLanguage, setTargetLanguage] = useState<Language>("FR");
    const [isTranslating, setIsTranslating] = useState(false);

    const handleTranslate = async () => {
        if (!inputText.trim()) return;

        setIsTranslating(true);
        try {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: inputText,
                    targetLang: targetLanguage,
                    sourceLang: sourceLanguage,
                }),
            });

            if (!response.ok) {
                throw new Error("Error in translation");
            }

            const data = await response.json();
            if (data.translations && data.translations[0]) {
                setTranslatedText(data.translations[0].text);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error:", error);
            setTranslatedText("Error in translation. Please try again.");
        } finally {
            setIsTranslating(false);
        }
    };

    const handleCopy = () => {
        if (translatedText) {
            navigator.clipboard.writeText(translatedText)
                .then(() => {
                    console.log("Translation copied to clipboard");
                })
                .catch((error) => {
                    console.error("Error copying text:", error);
                });
        }
    };

    const handleLanguageSwitch = () => {
        if (sourceLanguage !== "detect") {
            setSourceLanguage(targetLanguage);
            setTargetLanguage(sourceLanguage);
            setInputText(translatedText);
            setTranslatedText(inputText);
        }
    };

    const languageNames: Record<Language, string> = {
        detect: "Detect Language",
        EN: "English",
        FR: "French",
        ES: "Spanish",
    };

    return (
        <div className="relative h-screen">
            <img
                src="https://i.ibb.co/Jj2JhMh/hero-img.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Background"
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="mb-4 space-y-5">
                    <LogoIcon />
                </div>

                <div className="flex space-x-5">
                    {/* Card 1 */}
                    <div className="bg-cardcolor p-4 border-2 bg-opacity-80 border-buttoncolor rounded-3xl shadow-lg w-[550px] h-[320px]">
                        <div className="justify-between items-center">
                            <div className="flex space-x-4">
                                {(["detect", "EN", "FR", "ES"] as Language[]).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setSourceLanguage(lang)}
                                        className={
                                            sourceLanguage === lang
                                                ? "text-buttontitle text-sm font-sans px-4 py-2 rounded-lg bg-buttoncolor"
                                                : "text-greytext text-sm py-2 font-sans"
                                        }
                                    >
                                        {languageNames[lang]}
                                    </button>
                                ))}
                            </div>

                            <div className="border-b-2 border-buttoncolor mt-2 mb-4"></div>

                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="relative p-4 rounded-lg text-lg h-40 text-titlecolor font-sans w-full bg-transparent outline-none resize-none"
                                placeholder="Hello, how are you?"
                            />

                            {/* Sound button */}
                            <div className="flex space-x-4 mt-4">
                                <button className="text-gray-400 border-2 border-buttoncolor rounded-2xl p-2">
                                    <SoundMaxFill />
                                </button>

                                {/* Copy Button */}
                                <button
                                    onClick={handleCopy}
                                    className="text-gray-400 border-2 border-buttoncolor rounded-2xl p-2"
                                >
                                    <CopyIcon />
                                </button>

                                <button
                                    onClick={handleTranslate}
                                    disabled={isTranslating}
                                    className="relative left-60 flex rounded-2xl border-2 border-buttonborder bg-translatecolor px-6 py-2 font-sans text-titlecolor text-lg"
                                >
                                    <SortAlfa />
                                    {isTranslating ? "Translating" : "Translate"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-cardcolor2 p-4 border-2 bg-opacity-90 border-buttoncolor rounded-3xl shadow-lg w-[550px] h-[320px]">
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-4">
                                {(["EN", "FR", "ES"] as Language[]).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setTargetLanguage(lang)}
                                        className={
                                            targetLanguage === lang
                                                ? "text-buttontitle text-sm font-sans px-4 py-2 rounded-lg bg-buttoncolor"
                                                : "text-greytext text-sm py-2 font-sans"
                                        }
                                    >
                                        {languageNames[lang]}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleLanguageSwitch}
                                className="text-gray-400 border-2 border-buttoncolor rounded-xl p-1"
                            >
                                {/* Horizontal Top Icon */}
                                <TopLeftIcon />
                            </button>
                        </div>

                        <div className="border-b-2 border-buttoncolor mt-2 mb-4"></div>

                        <div className="relative p-4 rounded-lg text-lg h-40 text-titlecolor font-sans overflow-auto">
                            {translatedText}
                        </div>

                        {/* Sound Icon */}
                        <div className="flex space-x-4 mt-4">
                            <button className="text-gray-400 border-2 border-buttoncolor rounded-2xl p-2">
                                <SoundMaxFill />
                            </button>

                            {/* Copy Icon */}
                            <button
                                onClick={handleCopy}
                                className="text-gray-400 border-2 border-buttoncolor rounded-2xl p-2"
                            >
                                <CopyIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
