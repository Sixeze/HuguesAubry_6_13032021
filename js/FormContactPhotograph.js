fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    // GET Params Number of URL
    const params = new URL(document.location).searchParams;
    const urlIdNumber = params.get("dataph");

    // analyse if URL parameter is same of photograph.id parameter
    const photographer = phData.photographers.find((p) => p.id == urlIdNumber);

    // ====== Dom Elements for formContact ======
    const blockPage = document.querySelector(".block_page");
    const divDialogForm = document.createElement("div");

    divDialogForm.setAttribute("role", "dialog");
    divDialogForm.setAttribute("id", "dialog__form--bground");
    divDialogForm.setAttribute("aria-labelledby", "dialog-title");
    divDialogForm.setAttribute("aria-describedby", "dialog-desc");
    divDialogForm.setAttribute("aria-modal", "true");
    divDialogForm.setAttribute("aria-hidden", "true");
    divDialogForm.setAttribute("tabindex", "-1");

    divDialogForm.innerHTML = `<div role="document" class="content">
                                  <div class="title-form">
                                      <h2 id="dialog-title">Contactez-moi</h2>
                                      <span id="dialog-desc">${photographer.name}</span>
                                      <button class="cross-close">fermer</button>
                                  </div>
                                  <form method="POST" action="traitement.php" role="document">
                                  <div
                                    role="group"
                                    aria-label="contact photographer"
                                    class="form-content"
                                  >
                                    <label for="prenom">Prénom</label>
                                    <input
                                      type="text"
                                      name="prenom"
                                      id="prenom"
                                      class="input"
                                      placeholder="votre prénom"
                                    />
                                    <label for="nom">Nom</label>
                                    <input
                                      type="text"
                                      name="nom"
                                      id="nom"
                                      class="input"
                                      placeholder="votre nom"
                                    />
                                    <label for="email">Email</label>
                                    <input
                                      type="text"
                                      name="email"
                                      id="email"
                                      class="input"
                                      placeholder="votre email pour vous répondre"
                                    />
                                    <label for="message">Votre message</label>
                                    <textarea
                                      name="message"
                                      id="message"
                                      class="input"
                                      placeholder="vos demandes et besoins"
                                    ></textarea>
                                    <input
                                      id="submitBtn"
                                      class="modal-btn btn"
                                      type="submit"
                                      value="envoyer"
                                    />
                                  </div>
                              </form>
                            </div>`;

    blockPage.appendChild(divDialogForm);

    const contentDialogForm = document.querySelector("div[class='content']");
    const firstNameInput = document.getElementById("prenom");
    const btnOpenModal = document.querySelector(
      "button[aria-haspopup='dialog']"
    );
    const mainBanner = document.querySelector("#main-banner");
    const mainPage = document.querySelector("#photographer-page");
    const closeModal = document.querySelector(".cross-close");
    const sendBtn = document.querySelector("input[id='submitBtn']");

    // When the user clicks button "contactez-moi", open modal
    btnOpenModal.addEventListener("click", (e) => {
      e.preventDefault();
      divDialogForm.style.display = "block";
      divDialogForm.style.display = "fixed";
      divDialogForm.setAttribute("aria-hidden", "false");
      mainBanner.setAttribute("aria-hidden", "true");
      mainPage.setAttribute("aria-hidden", "true");
      firstNameInput.focus();
    });

    // comportement of Keypress action
    contentDialogForm.addEventListener("keydown", (e) => {
      const keyCode = e.keyCode ? e.keyCode : e.which;
      if (keyCode === 9) {
        if (e.shiftKey) {
          if (document.activeElement === closeModal) {
            e.preventDefault();
            sendBtn.focus();
          }
        } else {
          if (document.activeElement === sendBtn) {
            e.preventDefault;
            closeModal.focus();
          }
        }
      }

      if (keyCode === 27) {
        closeModalAttr();
      }
    });

    closeModal.addEventListener("click", closeModalAttr);

    function closeModalAttr() {
      divDialogForm.style.display = "none";
      divDialogForm.setAttribute("aria-hidden", "true");
      mainBanner.setAttribute("aria-hidden", "false");
      mainPage.setAttribute("aria-hidden", "false");
      btnOpenModal.focus();
    }

    // error input value
    const newEltError = document.createElement("p");

    // firstname Input value
    const firstName = document.querySelector("input[name=prenom]");
    const errorFirstName = firstName.insertAdjacentElement(
      "afterend",
      newEltError
    );

    //LastName Input Value
    const lastName = document.querySelector("input[name=nom]");
    const errorLastName = lastName.insertAdjacentElement(
      "afterend",
      newEltError
    );

    //Email Input Value
    const eMail = document.querySelector("input[name=email]");
    const errorEMail = eMail.insertAdjacentElement("afterend", newEltError);

    // Message input value
    const textArea = document.querySelector("textarea[name=message]");
    const errorTextArea = textArea.insertAdjacentElement(
      "afterend",
      newEltError
    );

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
      let emailRegex =
        /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
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
        console.log(nameCheck);
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
    sendBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(
        `le prénom envoyé est : ${firstName.value},
        le nom envoyé est : ${lastName.value},
        l'email de contact est : ${eMail.value}
        la demande du clients est : ${textArea.value}`
      );
    });
  })
  .catch((error) => console.log("Erreur : " + error));
