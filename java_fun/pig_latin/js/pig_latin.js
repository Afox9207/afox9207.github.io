const btn = document.getElementById('btn');
btn.addEventListener('click', translate);

function translate() {

    const translatedPhrase = document.getElementById('translated_phrase');

    translatedPhrase.innerHTML = '';

    let englishPhrase = document.getElementById('user_input').value; //get user input

    const englishWords = englishPhrase.split(' '); //make phrase an array of words

    englishWords.forEach(translateWord);
    
    function translateWord(word) {
    
        //check if there is punctuation

        let isPunctuation;

        let lastIndex = word.length - 1;

        (word[lastIndex] === '.' || word[lastIndex] === ',' || word[lastIndex] === '?' || word[lastIndex] === '!' || word[lastIndex] === ';' || word[lastIndex] === ':' ) ? isPunctuation = true : isPunctuation = false;

        //check if first letter is capitol

        let isCapitol;

        (word[0] === word[0].toUpperCase()) ? isCapitol = true : isCapitol = false;

        //get rid of uppercase

        word = word.toLowerCase();
        
        //check if the first letter is a vowel

        let isFirstLetterAVowel;

        (word[0] === 'a' || word[0] === 'e' || word[0] === 'i' || word[0] === 'o' || word[0] === 'o') ? isFirstLetterAVowel = true : isFirstLetterAVowel = false;

        //check if the second letter is a vowel

        let isSecondLetterAVowel;

        (word[1] === 'a' || word[1] === 'e' || word[1] === 'i' || word[1] === 'o' || word[1] === 'o') ? isSecondLetterAVowel = true : isSecondLetterAVowel = false;

        //Pig Latin Rules

        let englishWordLetters = word.split('');
        let pigLatinLetters = [];

        //if the first letter is a consonant followed by a vowel

        if (!isFirstLetterAVowel && isSecondLetterAVowel) {
            
            if (isPunctuation) {
                pigLatinLetters = englishWordLetters.slice(1, lastIndex);
            } else {
                pigLatinLetters = englishWordLetters.slice(1);
            }

            pigLatinLetters.push(englishWordLetters[0], 'a', 'y')

            if (isPunctuation) {
                pigLatinLetters.push(englishWordLetters[lastIndex]); //add punctuation back
            }

            if (isCapitol) {
                pigLatinLetters[0] = pigLatinLetters[0].toUpperCase(); //make word capitol again
            }

        }

        //if the first two letters are consonant

        if (!isFirstLetterAVowel && !isSecondLetterAVowel) {

            if (isPunctuation) {
                pigLatinLetters = englishWordLetters.slice(2, lastIndex);
            } else {
                pigLatinLetters = englishWordLetters.slice(2);
            }

            pigLatinLetters.push(englishWordLetters[0], englishWordLetters[1], 'a', 'y');

            if (isPunctuation) {
                pigLatinLetters.push(englishWordLetters[lastIndex]);
            }

            if (isCapitol) {
                pigLatinLetters[0] = pigLatinLetters[0].toUpperCase();
            }

        }

        //if the first letter is a vowel

        if (isFirstLetterAVowel) {

            if (isPunctuation) {
                pigLatinLetters = englishWordLetters.slice(0, lastIndex);
            } else {
                pigLatinLetters = englishWordLetters;
            }

            pigLatinLetters.push('w', 'a', 'y')

            if (isPunctuation) {
                pigLatinLetters.push(englishWordLetters[lastIndex]);
            }

            if (isCapitol) {
                pigLatinLetters[0] = pigLatinLetters[0].toUpperCase();
            }

        }

        let pigLatinWord = pigLatinLetters.join(''); 

        const result = document.createTextNode(pigLatinWord + ' ');

        translatedPhrase.appendChild(result);

        //logs

        console.log(`isPunctuation: ${isPunctuation}`);
        console.log(`isCapitol: ${isCapitol}`);
        console.log(`isFirstLetterAVowel: ${isFirstLetterAVowel}`);
        console.log(`isSecondLetterAVowel: ${isSecondLetterAVowel}`);
        console.log(`englishWordLetters: ${englishWordLetters}`);
        console.log(`pigLatinLetters: ${pigLatinLetters}`);
        console.log(`pigLatinWord: ${pigLatinWord}`);
    }
    
}


