const form = document.querySelector(".addForm");

const check = () => {
  const password = "bXlTZWNyZXRQYXNzd29yZA==";
  const userInput = prompt("Enter Password");
  return atob(password) === userInput;
};

form.addEventListener("submit", (e) => {
  if (!check()) {
    e.preventDefault();
    alert("Incorrect Password");
  }
});
