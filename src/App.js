import React, { useEffect, useState } from 'react';
import {fetchData} from './api/api';
import { scrambledWord } from './helpers/ScrambleWord';
import './App.css';

const Heading = ({ content }) => {
     const styles = {
          textAlign: 'center'
     }

     return (
          <h1 style={ styles } id='scrambled-word'>{ content }</h1>
     )
}

const App = () => {
     const [data, setData] = useState({ sentence: '' });
     const [sentence, setSentence] = useState('');
     const [sentenceToCompare, setSentenceToCompare] = useState({});
     const [fetchId, setFetchId] = useState(1);
     const [score, setScore] = useState(0);
     let letterId;
     
     useEffect(() => {
          const getData = async () => {
               const response = await fetchData(fetchId);
               const { data } = await response.data;
               setData(data);
               const arrFromDataSentence = Array.from(data.sentence);
               const setValuesToSentenceToCompare = arrFromDataSentence.map(i => ({value:'', correctGuess: false}))
               setSentenceToCompare(setValuesToSentenceToCompare);
          };
          
          getData().catch(err => console.log(err.message));
     },[fetchId]);
     
     useEffect(() => {
          if (data) setSentence(scrambledWord(data));
          
     },[data]);

     const handleLettersInput = (e) => {
          e.preventDefault();
          setSentenceToCompare({...sentenceToCompare, [e.target.id]: {value: e.target.value, correctGuess: false}})
          
          const trueSentenceArr = Array.from(data.sentence);
          trueSentenceArr.map((item, index) => {
               if(index === Number(e.target.id) && item === e.target.value){
                    setSentenceToCompare({ ...sentenceToCompare, [e.target.id]: {value: e.target.value, correctGuess: true}})
                    return true
               } else {
                    return false
               }
          })

          const letter = document.getElementById(`${Number(e.target.id) + 1}`);
          if(!letter){
               return false;
          }
          letter.focus()
     };

     const nextItemChange = (e) => {
          e.preventDefault();
          if(e.keyCode === 8){
               const item = document.getElementById(`${Number(e.target.id) - 1}`);
               setSentenceToCompare({ ...sentenceToCompare, [e.target.id - 1]: {value: '', correctGuess: false}})
               if(!item) {
                    return false;
               }
               item.focus();
          } else if( e.keyCode === 37 ) {
               const item = document.getElementById(`${Number(e.target.id) - 1}`);
               if(!item) {
                    return false;
               } 
               item.focus()
          } else if( e.keyCode === 39 ) {
               const item = document.getElementById(`${Number(e.target.id) + 1}`);
               if(!item) {
                    return false;
               } 
               item.focus()
          }
     };

     const checkCorrectGuess = () => {
          const sentenceToCheckForCorrectness = Object.entries(sentenceToCompare);
          const isAllLetterCorrect = sentenceToCheckForCorrectness.filter(i => i[1].correctGuess === true).length;
          const length = sentence.length;
          return {correct: isAllLetterCorrect === length, correctLength: isAllLetterCorrect}
     }

     const handleSubmit = (e) => {
          e.preventDefault();
          if(fetchId < 11 ) {
               setScore(score + 1);
               setFetchId(fetchId + 1);
               document.getElementById('0').focus();
          }
     };
     
     return (
          <main id='main'>
               { fetchId > 10 
                    ? <div className='container center-screen'>
                         Hello
                    </div>
                    
                    : <div className='container'>
                         <Heading content={ sentence }/>
                         <p className='par'>Guess the sentence! Starting typing</p>
                         <p className='par'>The yellow blocks are meant for spaces</p>
                         <p className='par'>Letter Guessed: { checkCorrectGuess().correctLength } out of {sentence.length}</p>
                         <p className='par'>Score: { score }</p>
                         <form onSubmit={ handleSubmit }>
                              <div className='inputs__container'>

                                   {data.sentence.split(/(\s+)/).map((word, wordIndex) => {

                                        return (
                                             <div key={ wordIndex + 100 }>
                                                  { word.split('').map((letter, index) => {
                                                       
                                                       if(index === 0 && wordIndex === 0){
                                                            letterId = 0;
                                                       } else {
                                                            letterId += 1;
                                                       }
                                                       if(letter === ' ' ){
                                                            return (
                                                                 <input 
                                                                      key={index} 
                                                                      id={letterId}
                                                                      value={ sentenceToCompare[letterId].value }
                                                                      onChange={ handleLettersInput } 
                                                                      maxLength={1} 
                                                                      onKeyUp={ nextItemChange }
                                                                      className={`${ sentenceToCompare[letterId]?.correctGuess ? 'correct' : 'spaceInput' }`}
                                                                 />
                                                            )
                                                       } else {
                                                            return (
                                                                 <input 
                                                                      key={index} 
                                                                      id={letterId}
                                                                      value={ sentenceToCompare[letterId].value }
                                                                      autoFocus={ letterId === 0 ? true : false}
                                                                      onChange={ handleLettersInput } 
                                                                      maxLength={1} 
                                                                      onKeyUp={ nextItemChange }
                                                                      className={`${ sentenceToCompare[letterId]?.correctGuess ? 'correct' : 'letterInput' }`}
                                                                 />
                                                            ) 
                                                       }
                                                  })}
                                             </div>
                                        )
                                   })}
                              </div>
                              <div className='btn__container'>
                                   <button 
                                        id='btn'
                                        className={`btn ${ checkCorrectGuess().correct ? 'btnCorrect' : '' }`}
                                   >Next</button>
                              </div>
                         </form>
                    </div>
               }
          </main>
     );
};

export default App;