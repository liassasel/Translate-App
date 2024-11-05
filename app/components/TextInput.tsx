import React from 'react';

interface TextInputProps {
    value: string;
    onChange: (text: string) => void;
    placeholder: string;
}

export default function TextInput({ value, onChange, placeholder }: TextInputProps) {
    return (
    <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full p-4 rounded bg-gray-800 text-white'
        rows={4}
    />
    );
}
