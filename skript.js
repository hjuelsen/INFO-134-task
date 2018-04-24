console.log("hei");

/* Setter variabel index til en, brukes i samtelige funksjoner */
var index = 1;

/*kjører funksjonen for å garantere at slideshow alltid begynner på det første bilde når siden loadest*/

slideImage(1)

/* plusser på index for å skrifte bilde, høreknappen next knappen gir +1 og prev knappen gir -1 */
function changeIndex(n){
  index = index + n;
  slideImage(index);
}

/* var x lager en liste av alle bildene. for-løkken setter alle bildene til display none, x[index-1] setter et av bildene til display block, -1 siden index starter på 1. if statementene passer på at index ikke overskrider eller underskrider antall bilder i listen */

function slideImage(i) {
var x = document.getElementsByClassName("slide");
if (x.length<i)
{index = 1;}
if (i<1){index = (x.length)}
  for(i = 0; i<x.length; i++){

      x[i].style.display = "none";

    }
    x[index-1].style.display = "block";

  }
/* skal vise arrangementinformasjons blokken. ikke i bruk ennå */
function showInfo(){
    var a = document.getElementsByClassName("arr-info");
    a.style.display = "block"

}
/* setter igang automatisk slideshow ved loading av siden */
autoSlide();

/* Øker index med 1 hvert 5 sekund */
function autoSlide(){
    var x = document.getElementsByClassName("slide");
     for(i = 0; i<x.length; i++){
      x[i].style.display = "none";
    }
    if (x.length<index)
    {index = 1;}
    x[index-1].style.display = "block";
    index++;
    setTimeout(autoSlide,5000);

}



