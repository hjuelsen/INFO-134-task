function getTime(){
var d = new Date();
if(d.getMinutes() < 10){
var klokken = d.getHours()+":"+"0"+d.getMinutes();
}
 else{
   klokken = d.getHours()+":"+d.getMinutes();
}
return klokken;
}

function getDay(){
  var d = new Date();
  var dag = d.getDay();

  return dag;
}

function compareTime(input ,compareTo){
 var compareble = compareTo.split(/[.\s-]+/);
 var open = compareble[0] + compareble[1];
 var close = compareble[2] + compareble[3];

 input = input.split(":");
 input = input[0]+input[1];
console.log(input);
 if (Number(input)> Number(open) && Number(input)< Number(close)){
  return true;
 }
 else{
   return false;
 }
}
