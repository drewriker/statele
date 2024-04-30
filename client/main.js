const form = document.querySelector("form");
const stateGuess = document.querySelector("#guess-input");
const results = document.querySelector(".results");
const stateSelect = document.querySelector("#states");
const stateImg = document.querySelector(".state-img");
const playAgainBtn = document.getElementById("play-again-btn");
const modal = document.getElementById("modal");

let remainingGuesses = 5;
let userGuess = [];
let gameOver = false;

document.addEventListener("DOMContentLoaded", function () {
	modal.style.display = "none";
});

function handleSubmit(e) {
	e.preventDefault();

	if (stateGuess.value < 1) {
		alert("You must enter a State");
		return;
	}

	const userGuess = stateGuess.value.trim();
	validateGuess(userGuess)
		.then(handleValidationResult)
		.catch((err) => console.log(err));
}

function validateGuess(guess) {
	const guessValidated = axios.post("/validate", {
		guess,
	});
	return guessValidated;
}

async function handleValidationResult(result) {
	const isCorrect = result.data.guess;
	if (isCorrect) {
		addResult(true);
	} else {
		remainingGuesses--;
		if (remainingGuesses === -1) {
			playAgain();
		} else if (remainingGuesses === 0) {
			try {
				addResult(false);
				let state = await getCurrentState();
				message = `Sorry, you've used all your guesses. The correct state was ${state}.`;
				showModal(message);
			} catch (error) {
				console.error("Error occurred:", error);
			}
		} else {
			addResult(false);
		}
	}
}

function addResult(isCorrect) {
	if (isCorrect) {
		remainingGuesses--;
		message = "Congratulations! You guessed the correct state!";

		// Create a div for guess content
		let guessContent = document.createElement("div");
		guessContent.classList.add("guess-content");
		guessContent.textContent = stateGuess.value.trim();

		// Create a div for the green check mark
		const greenCheckContainer = document.createElement("div");
		greenCheckContainer.classList.add("green-check-container");

		// Create a span for the green check mark
		const greenCheckSpan = document.createElement("span");
		greenCheckSpan.classList.add("green-check");
		greenCheckSpan.textContent = "✅";

		// Append the guess content and green check mark to the result div
		const resultDiv = getResultDiv();
		resultDiv.appendChild(guessContent);
		resultDiv.appendChild(greenCheckContainer);
		greenCheckContainer.appendChild(greenCheckSpan);
		stateGuess.value = "";
		remainingGuesses = 0;
		showModal(message);
	} else {
		const resultDiv = getResultDiv();
		// Create a div for guess content
		const guessContent = document.createElement("div");
		guessContent.classList.add("guess-content");
		guessContent.textContent = stateGuess.value.trim();

		// Create a div to contain the red X with its border
		const redXContainer = document.createElement("div");
		redXContainer.classList.add("red-x-container");

		// Create a span for the red X
		const redXSpan = document.createElement("span");
		redXSpan.classList.add("red-x");
		redXSpan.textContent = "❌";

		// Append the red X span to the red X container
		redXContainer.appendChild(redXSpan);

		// Append guess content and red X container to the resultDiv
		resultDiv.appendChild(guessContent);
		resultDiv.appendChild(redXContainer);
		stateGuess.value = "";
	}
}

function showModal(message) {
	const modal = document.getElementById("modal");
	modal.style.display = "block";

	// Display custom message in modal
	const modalContent = document.querySelector(".modal-content");
	modalContent.innerHTML = message;

	const playAgainBtn = document.createElement("button");
	playAgainBtn.setAttribute("id", "play-again-btn");
	playAgainBtn.textContent = "Play Again";

	// Append button to modal content
	modalContent.appendChild(playAgainBtn);

	// Close modal when the close button or anywhere outside the modal is clicked
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};

	playAgainBtn.addEventListener("click", playAgain);
}

function getResultDiv() {
	return document.querySelector(`#guess${remainingGuesses + 1}`);
}

function resetResultDivs() {
	const resultDivs = document.querySelectorAll(".result");
	resultDivs.forEach((div) => {
		div.textContent = "";
	});
}

async function getCurrentState() {
	try {
		const response = await axios.get("/current-state");
		const state = response.data;
		return state;
	} catch (error) {
		console.error("Error fetching current state:", error);
		throw error; // Rethrow the error to be caught by the caller
	}
}

async function fetchStatesList() {
	try {
		const response = await axios.get("/states-list");
		const states = response.data;
		const datalist = document.getElementById("statesList");

		// Clear existing options
		datalist.innerHTML = "";

		// Populate datalist with states
		states.forEach((state) => {
			const option = document.createElement("option");
			option.value = state;
			datalist.appendChild(option);
		});
	} catch (error) {
		console.error("Error fetching states:", error);
	}
}

function playAgain() {
	resetResultDivs();
	getState();
	stateGuess.value = "";
	location.reload();
}

function getState() {
	stateImg.innerHTML = "";

	axios.get("/state").then((res) => {
		let { image } = res.data[0];
		var imgElement = document.createElement("img");
		imgElement.src = image;
		stateImg.appendChild(imgElement);
	});
}

getState();
fetchStatesList();

form.addEventListener("submit", handleSubmit);
