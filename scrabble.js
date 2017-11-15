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
  score: function score(word) {
    // ensure word is a string
    if (!/^[a-zA-Z]+$/.test(word)) {
      throw new ArgumentException('Input must only contain letters');
    } else if (word.length > 7) {
      throw new ArgumentException('Input must be a max of 7 characters long');
    }
    // if (typeof word !== 'string') {
    //   throw 'Input must be a string';
    // }

    let wordUpper = word.toUpperCase();
    let wordScore = 0;

    for (let i = 0; i < wordUpper.length; i++) {
      if (SCORECHART.hasOwnProperty(wordUpper[i])) {
        // key = wordUpper[i];
        wordScore += SCORECHART[wordUpper[i]];
      }
    }

    if (wordUpper.length === 7) {
      wordScore += 50;
    }

    return wordScore;
  },

  highestScoreFrom: function highestScoreFrom(words) {
    let highestScore = words[0];
    words.forEach(function(word)) {
      if (highestScore < Scrabble.score(word)) {

      }
    }

  }

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
