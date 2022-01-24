let characters = new Array(30);
let presentSomewhere = new Array(30);
let notPresent = new Array(30);
let present = new Array(30);
let fixed = [0,0,0,0,0];
let resultingString = ['a','a','a','a','a'];
for(let i =0;i<30;i++){
    notPresent[i] = new Array(6);
    present[i] = new Array(6);
    characters[i] = 0;
    presentSomewhere[i] = 0;
    for(let j=0;j<6;j++){
        notPresent[i][j] = 0;
        present[i][j] = 0;
    }
}

let trimmedWords = words;
function sorts(word,verdict){
    let newTrimmedWords = [];
    for(let i=0;i<5;i++){
        if( verdict[i] === 'G' ){
            present[ word.charCodeAt(i) - 97 ][i] = 1;
            fixed[i] = 1;
            resultingString[i] = word.charAt(i);
            presentSomewhere[ word.charCodeAt(i)-97 ] = 1;
        }else if( verdict[i] === 'Y' ){
            notPresent[ word.charCodeAt(i) - 97 ][i] = 1;
            presentSomewhere[ word.charCodeAt(i)-97 ] = 1;
        }else{
            notPresent[ word.charCodeAt(i) - 97 ][i] = 1;
            if( presentSomewhere[ word.charCodeAt(i)-97 ] == 0 ){
                for(let j=0;j<5;j++){
                    notPresent[ word.charCodeAt(i) - 97 ][j] = 1;
                }
            }
        }
    }
    //console.log(resultingString,fixed);
    for(let i=0;i<trimmedWords.length;i++){
        let pos = true;
        for(let j=0;j<5;j++){
            if( notPresent[ trimmedWords[i].charCodeAt(j)-97 ][j] == 1 ){
                pos = false
            }
            if( fixed[j] == 1 && resultingString[j]!==trimmedWords[i][j] ){
                pos = false;
            }
        }
        if( pos ) newTrimmedWords.push(trimmedWords[i]);
    }
    newTrimmedWords.sort(function(a,b){
        let matches1 = 0,matches2 = 0,partialMatches1 = 0,partialMatches2 = 0;
        for(let i=0;i<5;i++){
            if( present[ a.charCodeAt(i) - 97 ][i] == 1 ) matches1++;
            else if( presentSomewhere[ a.charCodeAt(i) -97 ] == 1 ) partialMatches1++;

            if( present[ b.charCodeAt(i) - 97 ][i] == 1 ) matches2++;
            else if( presentSomewhere[ b.charCodeAt(i)-97 ] == 1 ) partialMatches2++;
        }

        if( matches1>matches2 ) return -1;
        else if( matches1<matches2 ) return 1;
        if( partialMatches1>partialMatches2 ) return -1;
        else if( partialMatches1<partialMatches2 ) return 1;
        return 0;
    });
    //console.log("kenobi ",newTrimmedWords.length);
    trimmedWords = newTrimmedWords;
}