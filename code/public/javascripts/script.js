document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


function openNav() {
  document.getElementsByClassName("overlay")[0].style.width = "100%";
}

function closeNav() {
  document.getElementsByClassName("overlay")[0].style.width = "0%";
}

function myFunction() {
  var input, filter, a, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  itemName = document.getElementsByClassName("itemName");
  itemList = document.getElementsByClassName("itemList")
  
  
  for (i = 0; i < itemName.length; i++) {
      a = itemName[i];
      console.log(a)
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        itemList[i].style.display = "";
      } else {
        itemList[i].style.display = "none";
      }
  }
}


// function setbackground(){
//   var index = Math.round(Math.random() * 5);
//   var ColorValue = "#E6A9EC";
//   if(index == 1) ColorValue = "#FFCCCC";
//   if(index == 2) ColorValue = "#CCAFFF";
//   if(index == 3) ColorValue = "#A6BEFF";
//   if(index == 4) ColorValue = "#99FFFF";
//   if(index == 5) ColorValue = "#D5CCBB";
//   document.body.style.backgroundColor= ColorValue;
//   }
