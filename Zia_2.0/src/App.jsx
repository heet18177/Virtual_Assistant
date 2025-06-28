import React, { useContext } from "react";
import "./App.css";
import zia from "./assets/zia.png";
import speakImg from "./assets/speak.gif"
import AiVoice from "./assets/aiVoice.gif"
import { CiMicrophoneOn } from "react-icons/ci";
import dataContext from "./Context/dataContext";

function App() {
  let { recognition , speakAnimation , setSpeakAnimation , prompt , setPrompt , aiResponseAnimation} = useContext(dataContext);

  return (
    <div className="main-container">
      <img src={zia} alt="Zia" className="image" />
      <span>I'm Zia, your advanced virtual assistant.</span>

      {!speakAnimation ? (
        <button
          className="btn"
          onClick={() => {
            setPrompt("Listening...");
            setSpeakAnimation(true);
            recognition.start();
          }}
        >
          Speak here <CiMicrophoneOn className="icon" />
        </button>
      ) : (
        <div className="AnimationDiv">
          {!aiResponseAnimation ? (
            <img className="speakGif" src={speakImg} alt="Animation" />
          ) : (
            <img className="aivoice" src={AiVoice} alt="Animation" />
          )}
          <div className="para">
            <p>{prompt}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
