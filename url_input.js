

onload = function create_searchObj() {
    var searchObj = {};
    var url = document.location.href;
    search_string = url.substring(url.indexOf("?"));
    var reg = /(?:[?&])([^&=]+)(?:=)([^&]*)/g;
    decode = function(str) {return decodeURIComponent(str.replace(/\+/g, " "));};
    var result =  reg.exec(search_string);
    while(result != null ){
       if(decode(result[2])!== ""){
       searchObj[decode(result[1])] = decode(result[2]);
        result =  reg.exec(search_string);
      }
    else if(decode(result[2]) == "" ){
        result =  reg.exec(search_string);
      }
    }
        console.log(searchObj);

    advanceSearch(searchObj);
}
