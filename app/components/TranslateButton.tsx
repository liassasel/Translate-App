import React from 'react';

interface TranslateButtonProps {
    isTranslating: boolean;
    onClick: () => void;
}

export default function TranslateButton({ isTranslating, onClick }: TranslateButtonProps) {
    return (
    <button
        onClick={onClick}
        disabled={isTranslating}
        className={`px-4 py-2 rounded text-white ${isTranslating ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
    >
        {isTranslating ? 'Translating...' : 'Translate'}
    </button>
    );
}
