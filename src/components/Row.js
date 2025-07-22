import { useEffect, useState } from 'react';
import '../App.css';

const LENGTH_OF_WORD = 5;

function Row({ guessedWords, isTrue, targetWord }) {
    // Let's create a simple Cases for each word
    const Cases = [];
    const [showColors, setShowColors] = useState(false);

    useEffect(() => {

        if(isTrue){
            setShowColors(false);
            const timer = setTimeout(()=>{
                setShowColors(true);
            },100);
            return () => clearTimeout(timer);
        }
    },[isTrue])
    // retrieving each character from the guessed words

    for (let i=0;i<LENGTH_OF_WORD;i++){
            const char = guessedWords[i];
            // we define a variable that holds the name of class based on different cases
            let caseResult = 'case';

            if(isTrue){
                caseResult += ' flip';
                if(showColors){
                    if(char === targetWord[i]) caseResult += ' matched';
                    else if (targetWord.includes(char)) caseResult += ' includes';
                    else caseResult += ' incorrect';
                }
            }

            Cases.push(
                <div className={caseResult} key={i} style={{animationDelay: `${i*100}ms`}}>
                    {char}
                </div>
            )
    }
    return(
        <div className="row">
            {Cases}
        </div>
    );
}

export default Row;