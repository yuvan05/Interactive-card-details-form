// [selectors]
let form = document.getElementsByTagName("form")[0]
let allInputsEl = document.querySelectorAll(".input")
let cardFrontNameEl = document.querySelector(".card-front-name")
let cardFrontNumberEl = document.querySelector(".card-front-number")
let cardFrontDateFirstEl = document.querySelector(".card-front-date-first")
let cardFrontDateSecondEl = document.querySelector(".card-front-date-second")
let cardBackCvcEl = document.querySelector(".card-back-cvc")
let successEl = document.querySelector(".success")

// [c: need this variable for validation of inputs]
let inputsWithNumbersIds = ["card-number", "exp-date-input-one", "exp-date-input-two", "cvc-input"]


// [event listeners]
// [c: validation of form]
form.addEventListener("submit", (event) => {
    event.preventDefault()
    allInputsEl.forEach(inputEl => {

        let errorEl = document.querySelector(`.${inputEl.id}-error`)
        let firstExpDateInputValidity = document.querySelector("#exp-date-input-one").checkValidity()

        if (inputEl.checkValidity()) {
            // if all valid 
            if (errorEl.classList.contains("active")) {
                errorEl.classList.remove("active")
                if (inputEl.id == "exp-date-input-two" && !firstExpDateInputValidity) {
                    errorEl.classList.add("active")
                }
            }
            if (inputEl.parentElement.classList.contains("wrong-input")) {
                inputEl.parentElement.classList.remove("wrong-input")
            }
        } else {
            // changing color of parent container to red
            if (!inputEl.parentElement.classList.contains("wrong-input")) {
                inputEl.parentElement.classList.add("wrong-input")
            }

            // if not valid
            // if empty values
            if (inputEl.validity.valueMissing) {
                errorEl.innerText = `Can't be blank`
                if (!errorEl.classList.contains("active")) {
                    errorEl.classList.add("active")
                }
            }

            if (inputEl.validity.tooShort) {
                errorEl.innerText = `Shall be ${inputEl.minLength} characters. You entered ${inputEl.value.length}.`
                if (!errorEl.classList.contains("active")) {
                    errorEl.classList.add("active")
                }
            }

            // if there is pattern mismatch 
            if (inputEl.validity.patternMismatch) {
                let numbersOrLetters = ""
                let numbersRegex = /^[0-9 ]+$/
                if (inputsWithNumbersIds.includes(inputEl.id)) {
                    numbersOrLetters = "numbers"
                } else {
                    numbersOrLetters = "letters"
                }
                let errorText = `Wrong format, ${numbersOrLetters} only`
                if (numbersOrLetters == "numbers") {
                    if(numbersRegex.test(inputEl.value) === true) {
                        errorText = `Refer to example ${inputEl.getAttribute("placeholder")}`
                    }
                }
                errorEl.innerText = errorText
                if (!errorEl.classList.contains("active")) {
                    errorEl.classList.add("active")
                }
            }
        }
    })
    // bring success window if form fully validates
    if (form.checkValidity()) {
        if (!successEl.classList.contains("on")) {
            successEl.classList.add("on")
        }
    }
})

// [c: updating values of the card to the left]
allInputsEl.forEach((input) => {
    input.addEventListener("input", (e)=> {
        if (e.target.id == "cardholder-name") {
            cardFrontNameEl.innerText = e.target.value.toUpperCase()
        }
        if (e.target.id == "card-number") {
            cardFrontNumberEl.innerText = e.target.value
        }
        if (e.target.id == "exp-date-input-one") {
            cardFrontDateFirstEl.innerText = e.target.value
        }
        if (e.target.id == "exp-date-input-two") {
            cardFrontDateSecondEl.innerText = "/" + e.target.value
        }
        if (e.target.id == "cvc-input") {
            cardBackCvcEl.innerText = e.target.value
        }
    })
})