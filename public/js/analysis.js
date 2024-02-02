const loadResult = async () => {
	const responses = await Promise.all([
		fetch("/analysing-text").then((response) => response.json()),
		fetch("/character-count").then((response) => response.json()),
		fetch("/word-count").then((response) => response.json()),
		fetch("/sentence-count").then((response) => response.json()),
		fetch("/paragraph-count").then((response) => response.json()),
		fetch("/longest-words-in-pragraphs").then((response) =>
			response.json()
		),
	]);

	const result = formatResult(responses);
	return result;
};

const formatResult = async (responses) => {
	const result = {
		text: responses[0].text,
		characters: responses[1].characters,
		words: responses[2].words,
		sentences: responses[3].sentences,
		paragraphs: responses[4].paragraphs,
		longestWords: responses[5].longestWords,
	};

	return result;
};

const bindData = async () => {
	const result = await loadResult();
	document.querySelector("#analysing-text").textContent = result.text;
	document.querySelector("#characters").textContent = result.characters;
	document.querySelector("#words").textContent = result.words;
	document.querySelector("#sentences").textContent = result.sentences;
	document.querySelector("#paragraphs").textContent = result.paragraphs;

	const longestWordsContainer = document.querySelector("#longest-words");
	result.longestWords.map((words, index) => {
		const div = document.createElement("div");
		div.classList.add("flex", "gap-y-15", "paragraps-longest-words");
		div.innerHTML = `<p class="title">Paragraph-${
			index + 1
		}: </p><p class="longest-words">${words.join(", ")}</p>`;
		longestWordsContainer.appendChild(div);
	});
};

bindData();
