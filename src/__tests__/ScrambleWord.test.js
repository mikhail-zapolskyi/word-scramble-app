'use strict';
import { scrambledWord } from '../helpers/ScrambleWord';
import { fetchData } from '../api/api';

test('isTextScrambled', async () => {
     const response = await fetchData(1);
     const { data } = await response.data;
     const { sentence } = data;
     const scrambled = scrambledWord(data);
     
     expect(sentence).not.toBe(scrambled);

     const sentenceArr = sentence.split(' ');
     const scrambledArr = scrambled.split(' ');

     sentenceArr.map((item, index) => {
          expect(item[0]).toEqual(scrambledArr[index][0])
          expect(item[item.length - 1]).toEqual(scrambledArr[index][scrambledArr[index].length - 1])
     })
});

