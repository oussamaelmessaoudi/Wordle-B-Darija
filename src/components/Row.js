import '../App.css';

const LENGTH_OF_WORD = 5;

function Row({ guessedWords, isTrue, targetWord }) {
    // Let's create a simple Cases for each word
    const Cases = [];
    // retrieving each character from the guessed words

    for (let i=0;i<LENGTH_OF_WORD;i++){
            const char = guessedWords[i];
            // we define a variable that holds the name of class based on different cases
            let caseResult = 'case';

            if(isTrue){
                if(char === targetWord[i]) caseResult += ' matched';
                else if (targetWord.includes(char)) caseResult += ' includes';
                else caseResult += ' incorrect';
            }

            Cases.push(
                <div className={caseResult} key={i}>
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