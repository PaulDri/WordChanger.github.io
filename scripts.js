const string = document.querySelector(".string-input");
const word = document.querySelector(".word-input");
const newWord = document.querySelector(".new-word-input");
const oldSentence = document.querySelector(".old-sentence");
const newSentence = document.querySelector(".new-sentence");
const showOutput = document.querySelector(".output-container");
const replaceAllCheckbox = document.querySelector(".replace-all-checkbox");
const submitBtn = document.querySelector(".submit-btn");

function myReplace(string, wordToReplace, newWords, replaceAll)
{
  const regex = /[a-z]+[^\s]*/gi;
  const words = string.match(regex) || [];

  wordToReplace.forEach((word, i) => {
    words.forEach((w, index) => {
      if(w.replace(/[^\w]/g, "").toLowerCase() === word.trim().toLowerCase())
      {
        let replacement = replaceAll
        ? (newWords[0] || "").trim()
        : (newWords[i] || "").trim();

        if(replacement)
        {
          if(/[A-Z]/.test(w[0]))
          {
            replacement = replacement[0].toUpperCase() + replacement.slice(1);
          }
          else
          {
            replacement = replacement[0].toLowerCase() + replacement.slice(1);
          }

          const punctuation = words[index].match(/[^\w]+$/)
          words[index] = replacement + (punctuation ? punctuation[0] : "");
        }

        if(!replaceAll)
        {
          return;
        }
      }
    });
  });

  return words.join(" ");
}

submitBtn.addEventListener("click", () => {

  if(string.value === "" || word.value === "" || newWord.value === "")
  {
    alert("Input a value to all of the boxes!");
    return;
  }

  oldSentence.innerText = string.value;

  const wordsToReplace = word.value.split(",");
  const newWords = newWord.value.split(",");
  const replaceAll = replaceAllCheckbox.checked;

  newSentence.innerText = myReplace(string.value, wordsToReplace, newWords, replaceAll);

  showOutput.hidden = false;

  word.value = "";
  newWord.value = "";
  string.value = "";
  replaceAllCheckbox.checked = false;

});
