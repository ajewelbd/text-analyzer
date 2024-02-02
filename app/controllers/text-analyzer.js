const natural = require("natural");

class TextAnalyzer {
	text = "";

	constructor(text) {
		this.text = text;
	}

	removePunctuation(text) {
		const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
		const formattedText = text
			.replace(punctuationRegex, "")
			.replace(/\r?\n\s*\r?\n/g, " ");
		return formattedText;
	}

	countCharacters() {
		const text = this.removePunctuation(this.text);
		return text.length;
	}

	countWords() {
		const text = this.removePunctuation(this.text);
		const words = text.split(/\s+/);
		return words.length;
	}

	countSentences() {
		/* const sentences = this.text.split(/[.!?]+/).filter((sentence) => sentence.trim() !== "");
		 * Above solution will be failed count sentences from text which includes abbreviations, decimal numbers, and ellipses.
		 * Example: Dr. Abc joined the meeting.
		 * For this reason I use tokenizer from a Natural Language Processing library called "natural".
		 */

		const tokenizer = new natural.SentenceTokenizer();
		const sentences = tokenizer.tokenize(this.text);
		return sentences.length;
	}

	countParagraphs(lengthOnly = true) {
		const paragraphs = this.text
			.split(/\n+/g)
			.filter((paragraph) => paragraph.trim() !== "");
		return lengthOnly ? paragraphs.length : paragraphs;
	}

	getLongestWordsInPragraphs() {
		const paragraphs = this.countParagraphs(false);
		const longestWordsInPragraphs = [];

		paragraphs.forEach((paragraph) => {
			const textWitoutPunctuation = this.removePunctuation(paragraph);
			const words = textWitoutPunctuation.split(/\s+/);
			let longestWord = "";
			let longestWords = [];
			words.forEach((word) => {
				if (word.length > longestWord.length) {
					longestWords = [word];
					longestWord = word;
				}

				if (
					word !== longestWord &&
					word.length === longestWord.length
				) {
					longestWords.push(word);
				}
			});

			longestWordsInPragraphs.push(longestWords);
		});

		return longestWordsInPragraphs;
	}
}

module.exports = TextAnalyzer;
