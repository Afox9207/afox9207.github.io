//open and close info

const openInfo = () => document.getElementById("info").style.display = "block";
const closeInfo = () => document.getElementById("info").style.display = "none";

//translate English Word

const translateEnglishWord = (englishWord) => {

    //check for punctuation

    let isPunctuation;

    (englishWord[englishWord.length - 1] === '.' || englishWord[englishWord.length - 1] === ',' || englishWord[englishWord.length - 1] === '?' || englishWord[englishWord.length - 1] === '!' || englishWord[englishWord.length - 1] === ';' || englishWord[englishWord.length - 1] === ':') ? isPunctuation = true : isPunctuation = false;

    //check for capitol letter

    let isCapitol;

    (englishWord[0] === englishWord[0].toUpperCase()) ? isCapitol = true : isCapitol = false;

    //turn word lowercase

    englishWord = englishWord.toLowerCase();
    
    //check if first letter is a vowel

    let isFirstLetterAVowel;

    (englishWord[0] === 'a' || englishWord[0] === 'e' || englishWord[0] === 'i' || englishWord[0] === 'o' || englishWord[0] === 'u') ? isFirstLetterAVowel = true : isFirstLetterAVowel = false;

    //check if second letter is a vowel

    let isSecondLetterAVowel;

    (englishWord[1] === 'a' || englishWord[1] === 'e' || englishWord[1] === 'i' || englishWord[1] === 'o' || englishWord[1] === 'u') ? isSecondLetterAVowel = true : isSecondLetterAVowel = false;

    //turn word into array and make array for pig latin letters

    let englishWordLetters = englishWord.split('');
    let pigLatinLetters = [];

    //pig latin rules

    let pigLatinWord;

    //if first letter is a consonant and second a vowel

    if (!isFirstLetterAVowel && isSecondLetterAVowel) {

        if (isPunctuation) {
            pigLatinLetters = englishWordLetters.slice(1, englishWordLetters.length - 1);
        } else {
            pigLatinLetters = englishWordLetters.slice(1);
        }

        pigLatinLetters.push(englishWordLetters[0]);
        pigLatinLetters.push('a', 'y');

        if (isPunctuation) {
            pigLatinLetters.push(englishWordLetters[englishWordLetters.length - 1]);
        }

        if (isCapitol) {
            pigLatinLetters[0] = pigLatinLetters[0].toUpperCase();
        }

        pigLatinWord = pigLatinLetters.join('');

    }

    //if first and second letters are consonants

    if (!isFirstLetterAVowel && !isSecondLetterAVowel) {

        if (isPunctuation) {
            pigLatinLetters = englishWordLetters.slice(2, englishWordLetters.length - 1);
        } else {
            pigLatinLetters = englishWordLetters.slice(2);
        }

        pigLatinLetters.push(englishWordLetters[0], englishWordLetters[1]);
        pigLatinLetters.push('a', 'y');

        if (isPunctuation) {
            pigLatinLetters.push(englishWordLetters[englishWordLetters.length - 1]);
        }

        if (isCapitol) {
            pigLatinLetters[0] = pigLatinLetters[0].toUpperCase();
        }

        pigLatinWord = pigLatinLetters.join('');

    }

    //if the first letter is a vowel

    if (isFirstLetterAVowel) {

        if (isPunctuation) {
            pigLatinLetters = englishWordLetters.splice(0, englishWordLetters.length - 1);
        } else {
            pigLatinLetters = englishWordLetters;
        }

        pigLatinLetters.push('w', 'a', 'y');

        if (isPunctuation) {
            pigLatinLetters.push(englishWordLetters[englishWordLetters.length - 1]);
        }

        if (isCapitol) {
            pigLatinLetters[0] = pigLatinLetters[0].toUpperCase();
        }

        pigLatinWord = pigLatinLetters.join('');

    }

    pigLatinWords = [];

    return pigLatinWords.push(pigLatinWord);

};

//put Pig Latin phrase together

let pigLatin = [];

function translateEnglishPhrase() {
    
    let translatedPhrase = document.getElementById('translated-phrase')

    let englishPhrase = document.getElementById("phrase").value;

    let englishWords = englishPhrase.split(' ');

    englishWords.forEach(translateEnglishWord);

    let pigLatinPhrase = pigLatinWords.join(' ');

    translatedPhrase.innerHTML = pigLatinPhrase;

}

