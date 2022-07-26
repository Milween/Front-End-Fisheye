// DOM Elements 
const regexName = /[a-zA-Z]/;
const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const modal = document.getElementById("contact_modal");
const message = document.getElementById("message");
const form = document.getElementById("contactForm");
const btnSubmit = document.querySelector("#submit");
const inputs = document.querySelectorAll('input,textarea');
const titleName = document.querySelector('.contactModalName');


// Fonctions 

// Fermeture du modal 

function displayModal() {
  modal.style.display = "flex";
  titleName.textContent = photographerName;
}

function closeModal() {
  modal.style.display = "none";
}

function keydown(e) {
  if (e.keyCode == 27) {
    closeModal();
  }
}
document.addEventListener("keydown", keydown, false);

//Empêcher la page de se recharger tant que le formulaire n'est pas validé
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm();
  validForm();
});

//Fonctions pour les bordures des inputs
function goodBorder(element) {
  changeBorder(element, "#279e7a");
}

function badBorder(element) {
  changeBorder(element, "#901c1c");
}

function changeBorder(element, color) {
  element.style.border = "2px solid " + color;
}

function resetBorder(array) {
  array.forEach(element => {
    element.style.border = 'none';
  });
}

//Fonctions d'apparition et disparition des messages d'erreur
function addInvisible(element) {
  element.nextElementSibling.classList.add("invisible");
}
function removeInvisible(element) {
  element.nextElementSibling.classList.remove("invisible");
}

//Fonctions de contrôle du formulaire
first.addEventListener("blur", (e) => {
  checkPrenom();
});

last.addEventListener("blur", (e) => {
  checkNom();
});

email.addEventListener("blur", (e) => {
  checkEmail();
});

message.addEventListener("blur", (e) => {
  checkMessage();
});

//Fonction de contrôle du prénom
function checkPrenom() {
  const firstValue = first.value.trim();
  if (regexName.exec(firstValue) === null || firstValue.length < 2) {
    removeInvisible(first);
    badBorder(first);
    return false;
  }
  goodBorder(first);
  addInvisible(first);
  return true;
}

//Fonction de contrôle du nom
function checkNom() {
  const lastValue = last.value.trim();
  if (regexName.exec(lastValue) === null || lastValue.length < 2) {
    removeInvisible(last);
    badBorder(last);
    return false;
  }
  goodBorder(last);
  addInvisible(last);
  return true;
}

//Fonction de contrôle de l'email
function checkEmail() {
  const emailValue = email.value.trim();
  if (regexEmail.exec(emailValue) === null) {
    removeInvisible(email);
    badBorder(email);
    return false;
  }
  goodBorder(email);
  addInvisible(email);
  return true;
}

function checkMessage() {
  const messageValue = message.value.trim();
  if (messageValue === null || messageValue.length < 10) {
    removeInvisible(message);
    badBorder(message);
    return false;
  }
  goodBorder(message);
  addInvisible(message);
  return true;
}

//Fonctions de contrôle avant validation du formulaire
function checkForm() {
  checkPrenom();
  checkNom();
  checkEmail();
  checkMessage();
}

//Fonction de validation du formulaire
function validForm() {
  console.log(
    "Prénom : " +
      first.value +
      "\nNom : " +
      last.value +
      "\nEmail : " +
      email.value +
      "\nMessage : " +
      message.value
  );
  if (checkPrenom() && checkNom() && checkEmail() && checkMessage()) {
    console.log('le Formulaire est valide');
    closeModal();
    form.reset();
    resetBorder(inputs);
    return true;
  }
  console.error("Le formulaire n'est pas valide");
  return false;
}