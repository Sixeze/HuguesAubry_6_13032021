// ====== open and close form ======
const bgModal = document.getElementsByClassName("bground")[0];
const btnModal = document.getElementsByClassName("ph-contact btn")[0];
const closeModal = document.getElementById("cross-close");

// When the user clicks the button, open the modal
// btnModal.onclick = function () {
//   bgModal.style.display = "block";
// };

// When the user clicks on <svg> (x), close the modal
closeModal.onclick = function () {
  bgModal.style.display = "none";
};

// when the user clicks everywhere out of the modal
window.onclick = function (close) {
  if (close.target == bgModal) {
    bgModal.style.display = "none";
  }
};

// form event DOM

// const newEltError = document.createElement("p");
// const inputsValue = {
//   firstNameInput: {
//     firstName: document.querySelector("input[name=prenom]"),
//     errorFirstName: firstName.insertAdjacentElement("afterend", newEltError),
//   },
//   lastNameInput: {
//     lastName: document.querySelector("input[name=nom]"),
//     errorLastName: last.insertAdjacentElement("afterend", newEltError),
//   },
//   mailInput: {
//     eMail: document.querySelector("input[name=email]"),
//     errorLastName: eMail.insertAdjacentElement("afterend", newEltError),
//   },
// };
// const inputFirstName = inputsValue.firstNameInput.firstName;
// question a lola : pourquoi cette classification en objet ne fonctionne pas .

// error input value
const newEltError = document.createElement("p");

// firstname Input value
const firstName = document.querySelector("input[name=prenom]");
const errorFirstName = firstName.insertAdjacentElement("afterend", newEltError);

//LastName Input Value
const lastName = document.querySelector("input[name=nom]");
const errorLastName = lastName.insertAdjacentElement("afterend", newEltError);

//Email Input Value
const eMail = document.querySelector("input[name=email]");
const errorEMail = eMail.insertAdjacentElement("afterend", newEltError);

// Message input value
const textArea = document.querySelector("textarea[name=message]");
const errorTextArea = textArea.insertAdjacentElement("afterend", newEltError);

const errorMessages = {
  errorFirstNameTxt:
    "votre Prenom doit contenir 3 caractères minimun pour être valide",
  errorLastNameTxt:
    "votre Nom doit contenir 3 caractères minimun pour être valide",
  errorEMailTxt: "Votre Email n'est pas valide",
  errorTextAreaTxt: "Veuillez saisir votre méssage",
};

function checkName(value) {
  let nameRegex = /^[\w'\-,.][^0-9_!¡?÷?\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
  if (value !== "" && value.length >= 3 && nameRegex.test(value)) {
    return true;
  } else {
    return false;
  }
}

function checkMail(value) {
  let emailRegex = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(value)) {
    return true;
  } else {
    return false;
  }
}

function displayError(nameCheck, error, errorMessages, input) {
  if (nameCheck === true) {
    error.textContent = "";
    input.style.border = "4px solid green";
  } else {
    error.textContent = errorMessages;
    error.style.color = "red";
    error.style.fontSize = "1.2em";
    error.style.fontWeight = "800";
    input.style.border = "4px solid red";
  }
}

firstName.addEventListener("input", function () {
  let nameCheck = checkName(this.value);
  let errorTxt = errorMessages.errorFirstNameTxt;
  displayError(nameCheck, errorFirstName, errorTxt, firstName);
});

lastName.addEventListener("input", function () {
  let nameCheck = checkName(this.value);
  let errorTxt = errorMessages.errorLastNameTxt;
  displayError(nameCheck, errorLastName, errorTxt, lastName);
});

eMail.addEventListener("input", function () {
  let mailcheck = checkMail(this.value);
  let errorMailTxt = errorMessages.errorEMailTxt;
  displayError(mailcheck, errorEMail, errorMailTxt, eMail);
});

textArea.addEventListener("input", function () {
  let txtCheck = checkName(this.value);
  let errorTxt = errorMessages.errorTextAreaTxt;
  displayError(txtCheck, errorTextArea, errorTxt, textArea);
});

//validate and send
// si tous les inputs sont valide envoi en cliquant sur le bouton envoyé sinon n'envoi pas le formulaire.
