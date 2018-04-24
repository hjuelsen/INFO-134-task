


 function advanceSearch(søkedata){
  getJSON(requestURL, function(err, jsonData) {
    if (err !== null) {
      alert('noe gikk galt ' + err);
    }
     else {
       var søkeObj = søkedata;
       console.log(søkeObj);
       var keys = Object.keys(søkeObj);
       for(var i = 0; i< keys.length; i++){
         if (søkeObj[keys[i]] === "true"){
           søkeObj[keys[i]] = true;
           console.log(søkeObj);
         }
       }

       var alleObjekt = jsonData.entries
       var result = alleObjekt;

      if(søkeObj.herre === true){
         var herre = result.filter(obj => Number(obj["herre"]) == søkeObj["herre"]);
         result = herre;
       }
      if(søkeObj.dame === true){
          var dame = result.filter(obj=> Number(obj["dame"]) == søkeObj["dame"] );
          result = dame;
        }
      if(søkeObj.rullestol === true){
          var rullestol = result.filter(obj=> Number(obj["rullestol"]) == søkeObj["rullestol"] );
          result = rullestol;
      }
      if(søkeObj.stellerom === true){
          var stellerom = result.filter(obj=> Number(obj["stellerom"]) == søkeObj["stellerom"]);
          result = stellerom;
      }
      if(Number(søkeObj.pris) !== 0){
        var pris = result.filter(obj => Number(obj["pris"])<= søkeObj.pris || obj["pris"] === "NULL");
        result = pris;
      }
      if(søkeObj.gratis === true){
         var gratis = result.filter(obj=> obj["pris"] === "NULL");
         result = gratis;
      }
      if(søkeObj.åpenNå === true){
        var åpen;
        var klokken = getTime();
        console.log(klokken);
        if(getDay() === 6){
          åpen = result.filter (obj => compareTime(klokken,obj["tid_lordag"]));
          result = åpen;
        }
        if(getDay()=== 7){
          åpen = result.filter (obj => compareTime(klokken,obj["tid_sondag"]) );
            result = åpen;
        }
        else{
          åpen = result.filter (obj => compareTime(klokken,obj["tid_hverdag"]) );
            result = åpen;
            console.log("1");
        }
      }
      if(søkeObj.klokkeslett){
        if (!søkeObj.dag){
          åpen = result.filter (obj => compareTime(søkeObj.klokkeslett,obj["tid_hverdag"] || obj["tid_hverdag"] === "ALL"))
          result = åpen;
        }
        else {
          var dag = søkeObj.dag;
          åpen = result.filter (obj => compareTime(søkeObj.klokkeslett,obj[dag] ||  obj[dag] === "ALL"))
          result = åpen;

        }
      }
      console.log(result);
      section.removeChild(minListe);
      clearMarkers();
      fyllListe(result);
      setMarker(result, map);

}


});
}
