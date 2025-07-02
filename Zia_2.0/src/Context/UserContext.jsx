import { useState } from "react";
import run from "../Gemini";
// eslint-disable-next-line no-unused-vars
import dataContext from "./dataContext";

const UserContext = ({ children }) => {

const [speakAnimation, setSpeakAnimation] = useState(false);
const [prompt , setPrompt] = useState("Listening...");
const [aiResponseAnimation , setAiResponseAnimation] = useState(false);

  function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = "hi-IN";
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    console.log("prompt:", prompt);
    try {
      const text = await run(prompt);
      console.log("text:", text);
      speak(text);
      setPrompt(text);
      setAiResponseAnimation(true)

      setTimeout(()=>{
        setSpeakAnimation(false)
        setAiResponseAnimation(false)
      },6000)

      return text;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return null;
    }
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.onresult = (e) => {
      const currentIndex = e.resultIndex;
      const transcript = e.results[currentIndex][0].transcript;
      console.log("transcript:", transcript);
      setPrompt(transcript)
      aiResponse(transcript);
    };
  } else {
    console.warn("SpeechRecognition is not supported in this browser.");
  }

  const value = {
    speak,
    recognition,
    aiResponse,
    speakAnimation,
    setSpeakAnimation,
    prompt,
    setPrompt,
    aiResponseAnimation
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

export default UserContext;
