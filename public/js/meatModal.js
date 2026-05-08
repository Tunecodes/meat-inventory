const cards = document.querySelectorAll(".meat-card");
const modal = document.querySelector(".card-modal");
const inputs = document.querySelectorAll(".modal-input");
const edit = document.querySelector(".edit");

//modal reference
const img = document.querySelector(".modal-img");
const modName = document.querySelector("#mod-name");
const modPrice = document.querySelector("#mod-price");
const modQuantity = document.querySelector("#mod-quantity");
const modType = document.querySelector("#color-code");
const deleteBtn = document.querySelector("#delete");

const check = () => {
  const password = "bXlTZWNyZXRQYXNzd29yZA==";
  const userInput = prompt("Enter Password");
  return atob(password) === userInput;
};

const getMeatData = async (name) => {
  const response = await fetch("/meat/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const res = await response.json();
  return res;
};

const updateMeat = async (name, newName, price, quantity) => {
  const response = await fetch("meat/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      newName: newName,
      price: price,
      quantity: quantity,
    }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
};

const removeMeat = async (name) => {
  const response = await fetch("meat/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
};

let selectedName = null;

// card events clicking will open a dialog
cards.forEach((card) => {
  card.addEventListener("click", async (e) => {
    e.preventDefault();
    selectedName = e.currentTarget.dataset.name;
    const data = await getMeatData(selectedName);
    modName.value = data[0].name;
    modPrice.value = data[0].price;
    modQuantity.value = data[0].quantity;
    img.src = data[0].image_url;
    modType.className = data[0].type;
    modType.innerText = data[0].type;
    deleteBtn.className = `delete ${data[0].type}`;
    modal.showModal();
    inputs.forEach((input) => (input.disabled = true));
  });
});

//edit toggle the input between disabled and non disabled
edit.addEventListener("click", async (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    input.disabled = !input.disabled;
  });

  const newName = modName.value;
  const price = modPrice.value;
  const quantity = modQuantity.value;
  await updateMeat(selectedName, newName, price, quantity);
});

deleteBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (check()) {
    await removeMeat(selectedName);
    alert("Item have been removed");
  } else {
    alert("Incorrect Password");
  }
  modal.close();
});


//refresh page on closed
modal.addEventListener("close", () => {
  window.location.reload();
});
