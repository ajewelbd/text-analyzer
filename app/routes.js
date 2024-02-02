const express = require("express");
const router = express.Router();
const fs = require("fs");
const TextAnalyzer = require("./text-analyzer");

const filePath = "./sample.txt";
let text = "";
try {
	text = fs.readFileSync(filePath, "utf8");
} catch (error) {
	console.log("Failed to load file", error);
}

const analyzer = new TextAnalyzer(text);

router.get("/", async (req, res) => {
	const msg = "Welcome to text analyzer apllication";
	res.json({ msg });
});

router.get("/word-count", (req, res) => {
	const words = analyzer.countWords();
	res.json({ words });
});

router.get("/character-count", (req, res) => {
	const characters = analyzer.countCharacters();
	res.json({ characters });
});

router.get("/sentence-count", (req, res) => {
	const sentences = analyzer.countSentences();
	res.json({ sentences });
});

router.get("/paragraph-count", (req, res) => {
	const paragraphs = analyzer.countParagraphs();
	res.json({ paragraphs });
});

router.get("/longest-words-in-pragraphs", (req, res) => {
	const longestWords = analyzer.getLongestWordsInPragraphs();
	res.json({ longestWords });
});

module.exports = router;
