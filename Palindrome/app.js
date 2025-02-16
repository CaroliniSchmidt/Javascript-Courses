const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

const isPalindrome = input => {
    const originalInput = input;
    if (!originalInput.trim()) {
        alert("Please input a value");
        return;
    }

    resultDiv.replaceChildren();
    const lowerCaseStr = input.replace(/[^0-9A-Za-z]/gi, '').toLowerCase();
    const resultMsg = `<strong>${originalInput}</strong> ${lowerCaseStr === [...lowerCaseStr].reverse().join('') ? 'is' : 'is not'
    } a palindrome.`;
    const spanTag = document.createElement("span");
  spanTag.className = 'text-input';
  spanTag.innerHTML = resultMsg;
  resultDiv.appendChild(spanTag);
  resultDiv.classList.remove("hidden");

};

checkBtn.addEventListener('click', () => {
    isPalindrome(textInput.value);
  textInput.value = '';
});
 
