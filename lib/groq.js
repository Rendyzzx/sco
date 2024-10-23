import Groq from "groq-sdk"
const groq = new Groq({
    apiKey: "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"
})

async function generate(text, prompt) {
    var res = await groq.chat.completions.create({
        messages: [{
                role: "system",
                content: prompt
            },
            {
                role: "assistant",
                content: prompt
            },
            {
                role: "user",
                content: text
            }
        ],
        model: "Llama3-70b-8192"
    }).then(a => a.choices[0].message)
    return res
}

export {
    generate
}