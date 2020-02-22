import { readFileSync } from "fs";
import movies from "../bin/movies";
const randomArrKey = items => items[Math.floor(Math.random() * items.length)];

let movie = randomArrKey(Object.keys(movies));
const hash = window.location.hash.substr(1);

if (movies[hash]) {
	movie = hash;
}

const wordList = JSON.parse(
	movie === "sw"
		? readFileSync(__dirname + "/../dest/cache-sw.json", "utf-8")
		: readFileSync(__dirname + "/../dest/cache-bop.json", "utf-8")
);

const tweets = {
	sw: word => `STAR WARS: ${word}`,
	bop: word => `BIRDS OF PREY: ${word}`
};

const buildUpFanta = $sw => {
	const word = randomArrKey(wordList);
	const hue = Math.random() * 360;
	if (Math.random() > 0.8) {
		$sw.style.setProperty("--fill", "white");
	}
	$sw.style.setProperty("--hue", hue);
	$sw.style.setProperty("--length", word.length);
	const wordHtml = word
		.split(" ")
		.map(
			w => `<span data-short="${w.length <= 3 || w.includes(`'`)}">${w}</span>`
		)
		.join(" ");
	$sw.querySelector("x-txt").innerHTML = wordHtml;
	const tweet = tweets[movie](word);

	return { tweet };
};

const $roots = {
	bop: document.querySelector("x-bop"),
	sw: document.querySelector("x-wars")
};
const go = () => {
	const $root = $roots[movie];
	for (let $otherRoot of Object.values($roots)) {
		if ($otherRoot !== $root) {
			$otherRoot.remove();
		}
	}
	const data = buildUpFanta($root);

	console.log(JSON.stringify(data));
};
go();
