import React from 'react';

type Language = 'detect' | 'EN' | 'FR' | 'ES';

interface LanguageSelectorProps {
    selectedLanguage: Language;
    onLanguageChange: (language: Language) => void;
    languageNames: Record<Language, string>;
    label: string;
}

export default function LanguageSelector({
    selectedLanguage,
    onLanguageChange,
    languageNames,
    label,
}: LanguageSelectorProps) {
    return (
    <div>
        <label className='text-white font-semibold'>{label}</label>
        <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className='bg-gray-900 text-white p-2 rounded'
        >
        {Object.keys(languageNames).map((key) => (
            <option key={key} value={key}>
            {languageNames[key as Language]}
            </option>
        ))}
        </select>
    </div>
    );
}
