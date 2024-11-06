import { NextResponse } from 'next/server'


// Connection to DeepL, to perform translations using the Api
export async function POST(request: Request) {
    try {
    const body = await request.json()
    
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        text: [body.text],
        target_lang: body.targetLang,
        ...(body.sourceLang !== 'detect' && { source_lang: body.sourceLang }),
        }),
    })

    if (!response.ok) {
        throw new Error(`Error de DeepL: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
    } catch (error) {
    console.error('Error en la traducción:', error)
    return NextResponse.json(
        { error: 'Error en el servidor de traducción' },
        { status: 500 }
    )
    }
}
