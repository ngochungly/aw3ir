
function hideEtatMessage() {
    document.getElementById("error").style.display = "none";
    document.getElementById("resultat").style.display = "none";
}

function validation() {
    let nom = document.forms["formPersonne"]["nom"].value;
    let prenom = document.forms["formPersonne"]["prenom"].value;
    let adress = document.forms["formPersonne"]["adress"].value;
    let mail = document.forms["formPersonne"]["mail"].value;

    const champs = [nom, prenom, adress];
    let lengthCheckResult = champs.every(lengthCheck);
    let emailCheckResult = validateEmail(mail);

    if (lengthCheckResult && emailCheckResult) {
        document.getElementById("error").style.display = "none";
        document.getElementById("resultat").style.display = "block";
        document.getElementById("resultat").innerHTML = "Bienvenue " + document.querySelector("#nom").value + " !";
    } else if (lengthCheckResult && !emailCheckResult) {
        document.getElementById("resultat").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "L'adress mail est incorrecte.";
    } else if (!lengthCheckResult && emailCheckResult) {
        document.getElementById("resultat").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "Les champs Nom, Prenom et Adress sont remplis et contiennent au moins 5 caractères.";
    } else {
        document.getElementById("resultat").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "L'adress mail est incorrecte. Les champs Nom, Prénom et Adress sont remplis et contiennent au moins 5 caractères.";
    }

}

function lengthCheck(value, index, array) {
    return value.length >= 5;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}