import React, { useState, useEffect} from 'react'
import "./Drum.css"

const sounds = [
  {
    keyCode: 81,
    text: "Q",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    text: "W",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    text: "E",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    text: "A",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    text: "S",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    text: "D",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    text: "Z",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    text: "X",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    text: "C",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"
  }
];

const Drum = () => {

   const [letter, setLetter] = useState("")
   useEffect(() => {
    document.addEventListener("keydown", (event) => {
      switch(event.key) {
        case "q":
        case "w":
        case "e":
        case "a":
        case "s":
        case "d":
        case "z":
        case "x":
        case "c":
          playback(event.key.toUpperCase())
          break;
        case "Q":
        case "W":
        case "E":
        case "A":
        case "S":
        case "D":
        case "Z":
        case "X":
        case "C":
          playback(event.key)
      }
    })
  })

  const [volume, setVolume] = useState(1)
  const [power, setPower] = useState(true);

  const powerSwitch = () => {
    setPower(!power)
  }

  const volumeChange = (e) => {
    setVolume(e.target.value)
  }

  const buttonVolume = () => {
    const audioclips = sounds.map(sound => document.getElementById(sound.text));
    audioclips.forEach(audio => {
      if(audio) {
        audio.volume = volume;
      }
    }) 
  }

  const playback = (arg) => {
    if (power === true) {
      const audio = document.getElementById(arg)
      audio.play()
      setLetter(arg)
    } else {
      return;
    }
  }  

  return (
    <div id="drum-machine" className="wrapper">
      {buttonVolume()}
      <div id="drum-pads">
        {sounds.map((drumPad) => 
          <button key={drumPad.keyCode} onClick={() => {playback(drumPad.text)}} className="drum-pad" id={drumPad.keyCode}>{drumPad.text} 
          <audio className="clip" src={drumPad.src} id={drumPad.text}></audio>
          </button>
        )}
      </div>
      <div className="controls">
        <div id="powerBtn"><input id="checkbox" type="checkbox" defaultChecked onClick={powerSwitch}/>
          <label className="switch" htmlFor="checkbox">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="slider">
          <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
          ></path>
          </svg>
          </label></div>
          <div id="display" className="display">{letter}</div>
          <div id="volumeslider">
            <input max={1} min={0} step="0.01" type="range" defaultValue={1} className="slider" onChange={volumeChange}/>
          </div>
        </div>
      </div>
  )
}

export default Drum