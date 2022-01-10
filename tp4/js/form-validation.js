window.onload = function () {   // ce code est exécuter une fois que toute la page est téléchargée par le navigateur
    // voir plus : https://www.w3schools.com/js/js_htmldom.asp
     console.log( "DOM ready!" );
     
     // Y mettre le code Javascript pour valider tous les champs du formulaire
     document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        validation();
        console.log("form submitted!");
      });

    // Y mettre le code Javascript pour demander la géolocalisation à l’utilisateur
    document.querySelector("#gpsbutton").addEventListener("click", function (event) {
        event.preventDefault();
        getLocation();
        console.log("GPS button clicked!");
      });

    // Y mettre le code Javascript pour afficher le nombre de caractère saisie en temps réel
    // document.querySelector("#nom").onkeyup = function(){
    //     document.querySelector("#nom + span").textContent = document.querySelector("#nom").value.length + " car.";
    // };

    // document.querySelector("#prenom").onkeyup = function(){
    //     document.querySelector("#prenom + span").textContent = document.querySelector("#prenom").value.length + " car.";
    // };
};

function validation() {
    let nom = document.querySelector("#nom").value;
    let prenom = document.querySelector("#prenom").value;
    let dateNaissance = document.querySelector("#dateDeNaissance").value;
    let adresse = document.querySelector("#adresse").value;
    let mail = document.querySelector("#mail").value;

    const champs = [nom, prenom, adresse];
    // Verifier le nombre minimum de caractères
    let lengthCheckResult = champs.every(lengthCheck);
    // Verifier l'adresse mail
    let emailCheckResult = validateEmail(mail);

    // une notification si le nombre de caractères n'est pas suffisant
    if (!lengthCheckResult) {
        notification("Erreur!", "Les champs Nom, Prenom et Adresse sont remplis et contiennent au moins 5 caractères.");
    } else {
        // une notification si l'adresse mail est incorrecte
        if (!emailCheckResult) {
            notification("Erreur!", "L'adresse mail est incorrecte.");
        } else {
            // verifier la date de naissance
            if (dateNaissance == "") {
                notification("Erreur!", "Le champ de date est obligatoire.");
            } else {
                // processing date
                let dateObj = new Date(dateNaissance);
                let dateNaissanceTimestamp = dateObj.getTime();
                let nowTimestamp = Date.now();
                ////////////////////////////

                if (dateNaissanceTimestamp > nowTimestamp) {
                    notification("Erreur!", "La date de naissance ne peut pas être dans le futur.");

                } else {
                    // ajoutr les informations au tableau JSON
                    contactStore.add(nom, prenom, dateNaissance, adresse, mail);

                    // Afficher la liste des contacts dans un tableau HTML
                    contactList = contactStore.getList();
                    document.querySelector("table tbody").innerHTML = "";
                    var key_api = "AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg";
                    
                    for (var i in contactList) {
                        var contact = contactList[i];
                        var img_url = `https://maps.googleapis.com/maps/api/staticmap?markers=${contact.adress}&zoom=14&size=400x300&scale=2&key=${key_api}`;
                        document.querySelector("table tbody").innerHTML =
                            document.querySelector("table tbody").innerHTML +
                            "<tr><td>" +
                            contact.name +
                            "</td><td>" +
                            contact.firstname +
                            "</td><td>" +
                            contact.date +
                            "</td><td><a href=\"" + img_url + "\">" +
                            contact.adress +
                            "</a></td><td><a href=\"mailto:" + contact.mail + "\">" +
                            contact.mail +
                            "</a></td></tr>";
                    }
                }
            }
        }
    }

}

function lengthCheck(value, index, array) {
    return value.length >= 5;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function notification(msg_title, msg_body) {
    var myModal = new bootstrap.Modal(document.querySelector("#myModal"));
    document.querySelector("#exampleModalLabel").innerHTML = msg_title;
    document.querySelector(".modal-body").innerHTML = msg_body;
    myModal.show();
}

function calcNbChar(id) {
    document.querySelector(`#${id} + span`).textContent = document.querySelector(`#${id}`).value.length + " car.";
}