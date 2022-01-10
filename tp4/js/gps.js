
// demande de la localisation à l'utilisateur
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        notification("Erreur!", "Geolocation is not supported by this browser.");
    }
  }
  
  // Si l"utilisateur l'autorise, on récupère les coordonnées dans l'objet "position"
  function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    var key_api = "AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg";
    var img_url = `https://maps.googleapis.com/maps/api/staticmap?markers=${latlon}&zoom=14&size=400x300&scale=2&key=${key_api}`;
  
    //document.querySelector("#map").innerHTML = `<img src='${img_url}'>`;
    let src_text = `${img_url}`;

    document.querySelector("#adresse").value = latlon;

    // L'image adress vers Google Maps
    let alt_text = "Votre position ici.";
    let img_html = document.createElement("img");
    img_html.setAttribute("src", src_text);
    img_html.setAttribute("alt", alt_text);
    img_html.style.width = "100%";
    img_html.style.height = "auto";

    let p = document.createElement("p");
    let p_text = document.createTextNode(latlon);
    p.appendChild(p_text);

    var myModal = new bootstrap.Modal(document.querySelector("#myModal"));
    document.querySelector("#exampleModalLabel").innerHTML = "Votre géolocalisation";

    // ajouter les elements à modal et afficher modal
    let modal_body = document.querySelector(".modal-body");
    modal_body.innerHTML = "";
    modal_body.appendChild(img_html);
    modal_body.appendChild(p);
    myModal.show();
  }
  
  // Au cas ou l'utilisateur refuse
  // Ou si une erreur arrive
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        notification("Erreur!", "User denied the request for Geolocation.");
        //document.querySelector("#map").innerHTML =
        //  "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        notification("Erreur!", "Location information is unavailable.");  
        //document.querySelector("#map").innerHTML =
        //  "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        notification("Erreur!", "The request to get user location timed out.");  
        //document.querySelector("#map").innerHTML =
        //  "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        notification("Erreur!", "An unknown error occurred.");  
        //document.querySelector("#map").innerHTML = "An unknown error occurred.";
        break;
    }
}