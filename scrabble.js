const SCORECHART = {
      'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
      'D': 2, 'G': 2,
      'B': 3, 'C': 3, 'M': 3, 'P': 3,
      'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
      'K': 5,
      'J': 8, 'X': 8,
      'Q': 10, 'Z': 10
    };

const Scrabble = {
  score(word) {
      if (!/^[a-zA-Z]+$/.test(word)) {
      throw new ArgumentException('Input must only contain letters');
    } else if (word.length > 7) {
      throw new ArgumentException('Input must not be greater than 7 characters');
    }

    let wordUpper = word.toUpperCase();
    let wordScore = 0;

    for (let i = 0; i < wordUpper.length; i++) {
      if (SCORECHART.hasOwnProperty(wordUpper[i])) {
        wordScore += SCORECHART[wordUpper[i]];
      }
    }

    if (wordUpper.length === 7) {
      wordScore += 50;
    }

    return wordScore;
  },

  tie(highestScoreWord, word) {
    if (highestScoreWord.length === 7) {
      return highestScoreWord;
    } else if (word.length === 7) {
      return word;
    } else {
      if (highestScoreWord.length > word.length) {
        return word;
      } else if (highestScoreWord.length < word.length) {
        return highestScoreWord;
      } else {
        return highestScoreWord;
      }
    }
  },

  highestScoreFrom(words) {
    if (words.length === 0) {
      throw new ArgumentException('Must have at least one word');
    }

    let highestScore = Scrabble.score(words[0]),
        highestScoreWord = words[0];

    for (i = 1; i < words.length; i++) {
      let wordScore = Scrabble.score(words[i]);
      if (highestScore < wordScore) {
        highestScore = wordScore;
        highestScoreWord = words[i];
      } else if (highestScore === wordScore) {
        highestScoreWord = Scrabble.tie(highestScoreWord, words[i]);
      }
    }
    //
    // words.forEach(function(word) {
    //   let wordScore = Scrabble.score(word);
    //   if (highestScore < wordScore) {
    //     highestScoreWord = word;
    //   } else if (highestScore === wordScore) {
    //     highestScoreWord = Scrabble.tie(highestScoreWord, word);
    //   }
    // })
    return highestScoreWord;
  }

};

Scrabble.Player = class Player {
  constructor(name){
    if (name === undefined) {
      throw new ArgumentException('You must have a name');
    }

    this.name = name;
    this.plays = [];
  }

  totalScore() {
    let totalScore = 0;
    this.plays.forEach(function(play) {
      totalScore += Scrabble.score(play);
    })
    return totalScore;
  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    }
    return false;
  }

  play(word) {
    if (!/^[a-zA-Z]+$/.test(word)) {
      throw new ArgumentException('Input must only contain letters');
    } else if (word.length > 7) {
      throw new ArgumentException('Input must not be greater than 7 characters');
    }

    if (this.hasWon()) {
      return false;
    }

    let currentPlay = word;
    this.plays.push(word);
    return currentPlay;
  }

  highestWordScore() {
    let playsLength = this.plays.length;
    if (playsLength === 0) {
      throw new Error('You have not played any words');
    }
    let highestWordScore =  Scrabble.score(this.plays[0]);
    for (let i = 1; i < playsLength; i++) {
      let currentScore = Scrabble.score(this.plays[i]);
      if (currentScore > highestWordScore) {
        highestWordScore = currentScore;
      }
    };
    return highestWordScore;
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

};

module.exports = Scrabble;
