const ingField = document.querySelector(".add-ingredient")

function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");
  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(
      true
  );
  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;
  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
};

ingField.addEventListener("click", addIngredient);


const prepField = document.querySelector(".add-preparation")

function addPreparation() {
  const preparations = document.querySelector("#preparations");
  const fieldContainer = document.querySelectorAll(".preparation");
  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(
      true
  );
  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;
  // Deixa o valor do input vazio
  newField.children[0].value = "";
  preparations.appendChild(newField);
};

prepField.addEventListener("click", addPreparation);