const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const TextAnalyzer = require("./text-analyzer");

const docPath = "./sample.txt";
let text = "";
try {
	text = fs.readFileSync(docPath, "utf8");
} catch (error) {
	console.log("Failed to load file", error);
}

const analyzer = new TextAnalyzer(text);

router.get("/", (req, res) => {
	try {
		const filePath = path.join(`${__dirname}`, "../views/analysis.html");
		res.sendFile(filePath);
	} catch (error) {
		console.error(`Error reading HTML file: ${error.message}`);
		res.status(500).send("Failed to load the content!");
	}
});

router.get("/analysing-text", (req, res) => {
	res.json({ text });
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
