var myString = "It is currently 90.2 degrees with 46% humidity. There is no chance of rain";
var String2 = "Saint Petersburg, Florida, United States"
var speach =
  "In " +
  String2.substring(0, String2.indexOf(",")) + " " + 
  myString.substring(0, myString.indexOf(".")) +
  " point " +
  myString.substring(myString.indexOf(".") + 1)

myString2 = myString.substring(myString.indexOf(".") + 1);
myString1 = myString.substring(0, myString.indexOf("."));
console.log(speach);