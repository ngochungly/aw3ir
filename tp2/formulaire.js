
function hideEtatMessage() {
    document.getElementById("error").style.display = "none";
    document.getElementById("resultat").style.display = "none";
}

function validation() {
    let nom = document.forms["formPersonne"]["nom"].value;
    let prenom = document.forms["formPersonne"]["prenom"].value;
    let adress = document.forms["formPersonne"]["adress"].value;
    let mail = document.forms["formPersonne"]["mail"].value;

    const champs = [nom, prenom, adress, mail];
    let lengthCheckResult = champs.every(lengthCheck);

    if (lengthCheckResult) {
        document.getElementById("error").style.display = "none";
        document.getElementById("resultat").style.display = "block";
        document.getElementById("resultat").innerHTML = "Bienvenue " + document.querySelector("#nom").value;
    } else {
        document.getElementById("resultat").style.display = "none";
        document.getElementById("error").style.display = "block";
    }
}

function lengthCheck(value, index, array) {
    return value.length >= 5;
}