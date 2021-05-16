fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    // GET Params Number of URL
    const params = new URL(document.location).searchParams;
    const urlIdNumber = params.get("dataph");

    // analyse if URL parameter is same of photograph.id parameter
    const photographer = phData.photographers.find((p) => p.id == urlIdNumber);
    // console.log(photographer);

    // get dom Elments
    const formBground = document.querySelector("div[class='form-bground']");

    formBground.innerHTML = `<div role="dialog" aria-hidden="false" aria-labelledby="dialog-title"
                                  class="content" aria-modal="true">
                              <div class="title-form" role="document">
                                <h2 id="dialog-title">Contactez-moi</h2>
                                <span>${photographer.name}</span>
                                <svg
                                  role="button"
                                  aria-label="fermer"
                                  aria-labelledby="title"
                                  data-dismiss="dialog"
                                  width="42"
                                  height="42"
                                  viewBox="0 0 42 42"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  id="cross-close"
                                  tabindex="0"
                                >
                                  <title>fermer le formulaire</title>
                                  <path
                                    d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>
                              <form method="POST" action="traitement.php" role="document">
                                <div
                                  role="group"
                                  aria-labelledby="contact photographer"
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

    // ====== open and close form ======
    const contentDialogForm = document.querySelector("div[class='content']");
    // console.log(contentDialogForm);
    const firstNameInput = document.getElementById("prenom");
    const btnModal = document.getElementsByClassName("ph-contact btn")[0];
    // console.log(btnModal);

    const closeModal = document.getElementById("cross-close");
    const sendBtn = document.querySelector("input[id='submitBtn']");
    const focusOnBtnContact = document.querySelector(
      "button[aria-haspopup='dialog']"
    );
    // console.log(focusOnBtnContact);
    // When the user clicks the button, open the modal
    btnModal.addEventListener("click", (e) => {
      e.preventDefault();
      formBground.style.display = "block";
      formBground.style.position = "fixed";
      formBground.setAttribute("aria-hidden", "false");
      firstNameInput.focus();
      // console.log("la modal s'ouvre !");
      // debugger;
    });

    contentDialogForm.addEventListener("keydown", (e) => {
      if (document.activeElement === closeModal) {
        e.preventDefault();
        sendBtn.focus();
      } else if (document.activeElement === sendBtn) {
        e.preventDefault;
        closeModal.focus();
      }
    });

    // When the user clicks on <svg> (x), close the modal
    closeModal.addEventListener("click", () => {
      formBground.style.display = "none";
      formBground.setAttribute("aria-hidden", "true");
      focusOnBtnContact.focus();
      // console.log("la modal se ferme !");
    });

    document.addEventListener("keydown", function (event) {
      let nomTouche = event.key;
      if (nomTouche === "Escape") {
        formBground.style.display = "none";
        formBground.setAttribute("aria-hidden", "true");
        focusOnBtnContact.focus();
        // console.log("la modal se ferme !");
      }
    });

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
        // console.log(false);
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
        console.log(nameCheck);
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
