const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('results-div');

const checkInput = input => {
    if (input === '') {
        alert('Please provide a phone number');
        return;
    };

    const numRegex = /^(1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;
    return numRegex.test(input)
};

checkBtn.addEventListener('click', () => {
    const inputValue = userInput.value.trim();
    checkInput(inputValue);
    
    checkInput(inputValue) ? result.textContent = `Valid US number:  ${inputValue}` : 
        result.textContent = `Invalid US number:  ${inputValue}`;
    }
);

clearBtn.addEventListener('click', () => {
    userInput.textContent = '';
    result.textContent = '';
});
