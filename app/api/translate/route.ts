import { NextResponse } from 'next/server';

// Connection to DeepL to perform translations using the API
export async function POST(request: Request) {
    try {
    // Parsing the request body
    const body = await request.json();
    const { text, targetLang, sourceLang } = body;

    // Verifying if the text and targetLang parameters are present
    if (!text || !targetLang) {
        return NextResponse.json(
        { error: 'Missing required fields: text and targetLang' },
        { status: 400 }
        );
    }

    // Making a request to the DeepL API
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        text: [text],
        target_lang: targetLang,
        ...(sourceLang !== 'detect' && { source_lang: sourceLang }),
        }),
    });

    // Check for errors in the response
    if (!response.ok) {
        throw new Error(`DeepL Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

    } catch (error) {
    console.error('Translation server error:', error);
    return NextResponse.json(
        { error: 'Translation server error' },
        { status: 500 }
    );
    }
}
