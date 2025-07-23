import {useEffect , useState} from 'react';
import React from 'react';
import './App.css';
import Row from './components/Row';
import { FaInstagram, FaLinkedin, FaGithubSquare } from "react-icons/fa";
import Words from './words.json'

function App() {
  // State to hold the target word
  const [targetWord, setTargetWord] = useState('');
  // State to hold the guessed words
  const [guessedWords, setGuessedWords] = useState(Array(6).fill(null)); // 6 attempts, each with an empty string
  // State ti stock the current guess
  const [currentGuess, setCurrentGuess] = useState('');
  // State to set if the game finished or not
  const [gameFinished, setGameFinished] = useState(false);

  const [displayTarget, setDisplayTarget] = useState(false);
  // Fetching data from the API
  useEffect(() => {
    const randomWord = Words.words[Math.floor(Math.random() * Words.words.length)];
    setTargetWord(randomWord);
  }, []);

  // Now let's handle the keyboard event 
  useEffect(() => {
    const handleKeyPressing = (event) =>{
      if(gameFinished) return;
      if(displayTarget){
        return;
      }
      if(event.key ==='Enter'){  
        if(currentGuess.length !== 5){
          return;
        }
        //let's make a copy off the current guessedWords so we don't modify the state directly
        const newGuesses = [...guessedWords];
        // finds the empty slot and fill it with the current guess
        newGuesses[guessedWords.findIndex(val => val == null)] = currentGuess;
        //update the state with the new guess
        setGuessedWords(newGuesses);
        // clear the current guess so the user enter a new one
        setCurrentGuess('');
        const guessesMade = guessedWords.filter(word => word !== null).length+1;
        if(guessesMade >= 6){
          setGameFinished(true);
          setDisplayTarget(true);
        }
      }
      

      if(event.key === 'Backspace'){
        setCurrentGuess(prev => prev.substring(0, prev.length-1));
        return;
      }
      const checkCorrect = currentGuess.toLocaleLowerCase === targetWord.toLowerCase;
      if(checkCorrect) setGameFinished(true);

      if(currentGuess.length >= 5) return;
      const isLetter = /^[a-z]$/.test(event.key);
      if(isLetter) setCurrentGuess(prevGuess => prevGuess + event.key);
      
    };

    window.addEventListener('keydown',handleKeyPressing);
    return () => window.removeEventListener('keydown',handleKeyPressing)
  },[currentGuess, gameFinished, targetWord, guessedWords, displayTarget]);
  return (
    <div>
    <div className='header'>Wordle B'Darija </div>
     {/* let's create a simple UI to display the Grid of wordle */}
    <div className='grid'>
      {
        guessedWords.map((guessWord, index) => {
          const isCurrentGuess = index === guessedWords.findIndex(val => val == null);
          return (
            
            <Row key={index}
              targetWord={targetWord}
              guessedWords={isCurrentGuess ? currentGuess : guessWord ?? ""}
              isTrue={!isCurrentGuess && guessWord != null}/>
          );
        })
      }
      {displayTarget && <div className='target-word'> Target word : {targetWord}</div>}
    </div>
    
    <div className='footer'>
      <div className='text'>
        <span id='rights'>All rights reserved </span>
        <span style={{ fontSize: '12px' }}>© Oussama ELMESSAOUDI 2025</span>
      </div>
      <div className='icons'>
        <a href='https://www.instagram.com/usamamse' target='_blank' rel='noopener noreferrer'>
           <FaInstagram/>
        </a>
        <a href='https://www.linkedin.com/in/usama-elmessaoudi/' target='_blank' rel='noopener noreferrer'>
           <FaLinkedin />
        </a>
        <a href='https://www.github.com/oussamaelmessaoudi' target='_blank' rel='noopener noreferrer'>
           <FaGithubSquare />
        </a>
          
          
      </div>
    </div>
    </div>
  );
}

export default App;
