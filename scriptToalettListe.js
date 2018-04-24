var requestURL = document.getElementById('data').innerHTML;
var section = document.querySelector('section');
var map;
var minListe; // globalt slik at det kan fjernes direkte fra advanceSearch-metoden.
var markerArray = []; // ---- || -----
var timer;


// object for henting av JSON data. Bruker XMLHttpRequest.
var getJSON = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', requestURL, true);
  request.responseType = 'json';
  request.onload = function() {
    if (request.readyState === 4 && request.status === 200) {
      callback(null, request.response)
    } else {
      callback(request.status, request.response)
    }
  };
  request.send();
};

// Skjekker for feil og kjører fylliste viss ikke feil.
getJSON(requestURL, function(err, jsonData) {
  if (err !== null) {
    alert('noe gikk galt ' + err);
  } else {
    var alleObjekt = jsonData.entries;
    fyllListe(alleObjekt);
  }
});

//instansierer Kartet i sentrum, kjører setMaker på arrayet av objektet.
function fyllKart() {
  getJSON(requestURL, function(err, jsonData) {
    if (err !== null) {
      alert('noe gikk galt ' + err);
    } else {
      var alleObjekt = jsonData.entries;
      var sentrum = {
        lat: 60.393399,
        lng: 5.323014
      };
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: sentrum
      });
      setMarker(alleObjekt, map);
    }
  });
}


//fyller en nummerert liste med plasseringer på individuelle objekt-objekt.
function fyllListe(array) {
  minListe = document.createElement('ol');
  for (var i = 0; i < array.length; i++) {
    var etObjekt = array[i];
    var listeElement = document.createElement('li');
    if(requestURL == 'https://hotell.difi.no/api/json/bergen/dokart'){
    listeElement.textContent = etObjekt.plassering;
    }
    else {
      listeElement.textContent = etObjekt.navn;
    }
    minListe.appendChild(listeElement);
  }
  section.appendChild(minListe);

}


//fyller kartet med markører, verdiene hentet variabel "array"
function setMarker(array, map) {
  var marker;
  var plassering;
  var adresse;
  var navn;
  var infoVindu;
  for (var i = 0; i < array.length; i++) {
    var etObjekt = array[i];
    if(requestURL == 'https://hotell.difi.no/api/json/bergen/dokart'){
     plassering = etObjekt.plassering;
     adresse = etObjekt.adresse;
  }
    else{
        navn = etObjekt.navn;
    }

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(etObjekt.latitude, etObjekt.longitude),
      label: i + 1 + "",
      adressering: plassering + " " + adresse,
      navn: navn
    });

    infoVindu = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
      if(requestURL == 'https://hotell.difi.no/api/json/bergen/dokart'){
      infoVindu.setContent(this.adressering);
    }
      else{
        infoVindu.setContent(this.navn);
      }
      infoVindu.open(this.getMap(), this);
    });
    markerArray.push(marker);

  }
  for (var j = 0; j < markerArray.length; j++) {
    markerArray[j].setMap(map);
  }
}

//fjerner markerene i kartet.
function clearMarkers() {
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }
  markerArray.length = 0;
}


function fastSearch(){
var search = document.getElementById('bar');
var input = search.value.toLowerCase();
console.log(input);
var result = input.split(" ");
console.log(result);
fastSearchResult(result);
}

function fastSearchResult(array){
getJSON(requestURL, function(err, jsonData) {
  if (err !== null) {
    alert('noe gikk galt ' + err);
  }
   else {
     var alleObjekt = jsonData.entries;
     var j = 0;
     var result = [];
    var finalResult = [];
    var keys = Object.keys(alleObjekt[1]);
    for(var j = 0 ; j<array.length; j++){
    if (keys.includes(array[j])){
    var filterResult = alleObjekt.filter(objekt => objekt[array[j]] != "NULL");
      }
    if (!keys.includes(param)){
        for(var i = 0; i<alleObjekt.length; i++){
          etObjekt = alleObjekt[i];
          if (etObjekt.keys[i].includes(keys[j])){
            result.push(objekt);
          }

      }
    }
    }
    if(filterResult[0] != null) {
      var finalResult = result.concat(filterResult);

    }
    else{
      finalResult = result;
    }
    section.removeChild(minListe);
    clearMarkers();
    fyllListe(finalResult);
    setMarker(finalResult, map);
      }
    });
    }

//Returnerer en liste med stringer av søkekriterium
//function formInput() {
//  var searchCriteria = [];
  //var searchBox = document.getElementsByName('søk');
  // for (var i = 0; i < searchBox.length; i++) {
    // if (searchBox[i].checked) {
//       searchCriteria.push(searchBox[i].value);
//     }
//   }
//   advanceSearch(searchCriteria);
// }


// sender kriterielisten gjennom filter med vilkår for hvert kriterium.
function advanceSearch(searchArray) {
  getJSON(requestURL, function(err, jsonData) {
    if (err != null) {
      alert(err + "noe gikk galt")
    } else {
      var searchElements = searchArray;
      var alleObjekt = jsonData.entries;
      var first = alleObjekt.filter(objekt => objekt[searchElements[0]] != "NULL");
      var second = first.filter(objekt => objekt[searchElements[1]] != "NULL");
      var third = second.filter(objekt => objekt[searchElements[2]] != "NULL");
      var result = third.filter(objekt => objekt[searchElements[3]] != "NULL");
    }
    section.removeChild(minListe);
    clearMarkers();
    fyllListe(result);
    setMarker(result, map);

  });
}
