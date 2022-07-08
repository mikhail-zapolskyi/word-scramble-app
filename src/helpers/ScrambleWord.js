export const scrambledWord = (data) => {
     const sentenceArr = data.sentence.split(' ');
     let newSentenceArr = [];

     sentenceArr.forEach(word => {
          if (word.length <= 3) {
               newSentenceArr.push(word)
          } else {
               const oldWord = word.split('').slice(1, -1);
               const newWord = (word[0] + word[word.length - 1]).split('');
               
               for(let i = 0; i < oldWord.length; i++){
                    if(oldWord.length === 2){
                         const tmp = oldWord[0]
                         oldWord[0] = oldWord[1]
                         oldWord[1] = tmp;
                    } 
                    const a = Math.floor(Math.random() * oldWord.length);
                    let tmp = oldWord[i];
                    oldWord[i] = oldWord[a];
                    oldWord[a] = tmp
               }
               oldWord.map(i => newWord.splice(1, 0, i));
               newSentenceArr.push(newWord.join(''));
          }
      });
      
      return newSentenceArr.join(' ');
};