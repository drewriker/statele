const form = document.querySelector("form");
const stateGuess = document.querySelector("#guess-input");
const results = document.querySelector(".results");
const stateSelect = document.querySelector("#states");
const stateImg = document.querySelector(".state-img");

let remainingGuesses = 5;
let userGuess = [];
let gameOver = false;

function handleSubmit(e) {
	e.preventDefault();

	if (stateGuess.value < 1) {
		alert("You must enter a State");
		return;
	}

	const userGuess = stateGuess.value.trim();
	// console.log(userGuess);
	validateGuess(userGuess)
		.then(handleValidationResult)
		.catch((err) => console.log(err));
}

function validateGuess(guess) {
	const guessValidated = axios.post("http://localhost:4004/validate", {
		guess,
	});
	return guessValidated;
}

async function handleValidationResult(result) {
	// console.log(result.data.guess);
	const isCorrect = result.data.guess;
	if (isCorrect) {
		alert("Congratulations! You guessed the correct state!");
		getState();
		stateGuess.value = "";
		remainingGuesses = 5; // Reset remaining guesses
        resetResultDivs()
	} else {
		remainingGuesses--;
		if (remainingGuesses === 0) {
			try {
				let state = await getCurrentState();
				// console.log(state);
				alert(
					`Sorry, you've used all your guesses. The correct state was ${state}.`
				);
				getState(); // Fetch new state after incorrect guess
				remainingGuesses = 5; // Reset remaining guesses
                resetResultDivs()
			} catch (error) {
				console.error("Error occurred:", error);
			}
		} else {
            const resultDiv = document.querySelectorAll(".result");
            for (let i = 0; i < resultDiv.length; i++) {
                if (resultDiv[i].innerHTML === "") {
                    // Create a new <span> element for the state guess
                    const guessSpan = document.createElement("span");
                    guessSpan.textContent = stateGuess.value.trim();
        
                    // Create a new <span> element for the red X
                    const redXSpan = document.createElement("span");
                    redXSpan.textContent = " ❌"; // Unicode for the red X symbol
        
                    // Set the red color for the red X
                    redXSpan.style.color = "red";
        
                    // Append the state guess and red X to the resultDiv
                    resultDiv[i].appendChild(guessSpan);
                    resultDiv[i].appendChild(redXSpan);
        
                    break; // Exit the loop after updating the first empty div
                }
            }
            stateGuess.value = "";
        }
        // {
		// 	const resultDiv = document.querySelectorAll(".result");
		// 	for (let i = 0; i < resultDiv.length; i++) {
		// 		if (resultDiv[i].innerHTML === "") {
		// 			resultDiv[i].textContent = stateGuess.value.trim();
		// 			break; // Exit the loop after updating the first empty div
		// 		}
		// 	}
		// 	stateGuess.value = "";
		// }
	}
}

function resetResultDivs() {
	const resultDivs = document.querySelectorAll(".result");
	resultDivs.forEach((div) => {
		div.textContent = "";
	});
}

async function getCurrentState() {
	try {
		const response = await axios.get("http://localhost:4004/current-state");
		const state = response.data;
		console.log(state);
		return state;
	} catch (error) {
		console.error("Error fetching current state:", error);
		throw error; // Rethrow the error to be caught by the caller
	}
}

function getState() {
	stateImg.innerHTML = "";

	axios.get("http://localhost:4004/state").then((res) => {
		let { image } = res.data[0];
		var imgElement = document.createElement("img");
		imgElement.src = image;
		stateImg.appendChild(imgElement);
	});
}

getState();
form.addEventListener("submit", handleSubmit);
