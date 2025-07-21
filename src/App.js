import {useEffect , useState} from 'react';
import React from 'react';
import './App.css';
import Row from './components/Row';
import * as XLSX from 'xlsx';

function App() {
  // State to hold the target word
  const [targetWord, setTargetWord] = useState('');
  // State to hold the guessed words
  const [guessedWords, setGuessedWords] = useState(Array(6).fill(null)); // 6 attempts, each with an empty string
  // State ti stock the current guess
  const [currentGuess, setCurrentGuess] = useState('');
  // State to set if the game finished or not
  const [gameFinished, setGameFinished] = useState(false);
  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ListofWords.xlsx');

        if (!response.ok) {
          throw new Error('Failed to load XLSX file');
        }

        const arrayBuffer = await response.arrayBuffer();

        
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // First sheet
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        
        const wordList = data.flat().filter(word =>
          typeof word === 'string' && word.length === 5 && /^[a-z]+$/.test(word)
        );

        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        setTargetWord(randomWord);
        console.log('Target word:', randomWord);

      } catch (error) {
        console.error('Error loading XLSX:', error);
      }
    }
    fetchData();
  },[])

  // Now let's handle the keyboard event 
  useEffect(() => {
    const handleKeyPressing = (event) =>{
      if(gameFinished) return;

      if(event.key ==='Enter'){  
        if(currentGuess.length !== 5){
          console.log(currentGuess.length);
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
      }
      

      if(event.key === 'Backspace'){
        setCurrentGuess(prev => prev.substring(0, prev.length-1));
        return;
      }
      const checkCorrect = currentGuess.toLocaleLowerCase === 'Talks'.toLowerCase;
      if(checkCorrect) setGameFinished(true);

      if(currentGuess.length >= 5) return;
      const isLetter = /^[a-z]$/.test(event.key);
      if(isLetter) setCurrentGuess(prevGuess => prevGuess + event.key);
      console.log(currentGuess.length);
    };

    window.addEventListener('keydown',handleKeyPressing);
    return () => window.removeEventListener('keydown',handleKeyPressing)
  },[currentGuess, gameFinished, targetWord, guessedWords]);
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
    </div>
    </div>
  );
}

export default App;
