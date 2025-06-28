let API_KEY = "AIzaSyBc9AzRgLmktBTtOj-CRNJb_2XoOJoQCCs";

import {

    GoogleGenerativeAI, HarmCategory, HarmBlockThreshold
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 100,
    responseMimeType: "text/plain",

};
async function run(prompt) {
    console.log("Running Gemini with prompt:", prompt);
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });
    // console.log("Gemini model generationConfig:", generationConfig);
    // console.log("Chat session started:", chatSession);
    const result = await chatSession.sendMessage(prompt);
    // console.log("Gemini response:", result);

    // console.log("Response text:", result.response.text());
    return result.response.text()

}

export default run;