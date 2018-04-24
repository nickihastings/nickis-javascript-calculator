$(document).ready(function(){
  var calculation = 0;  //variable to hold the calculation
  var lastDigit = 'num'; //whether button pressed is number or symbol
  var digitNum = 0; //counts digits for screen display
  var decPoint = false; //decimal point can only be used once.
  
  function resetCalc(btnType){
    //if the clear button is pressed reset the calculation
    document.getElementById("display").innerHTML='0';
    document.getElementById("sum").innerHTML='';
    calculation = 0;
    lastDigit = 'num';
    digitNum = 0;
    decPoint = false;
  }
  
  //carry out the calculation and show the answer
  function doCalculation(){
    var result = eval(calculation);
    lastDigit = '=';
    result = result.toString();
    calculation = result;
    if(calculation.indexOf(".") !== -1){ //if the decimal point is there
      //stops the decimal point being used twice
      decPoint = true;
    }
    else{
      decPoint = false;
    }
    
    if(result.length > 11){
      document.getElementById("display").innerHTML=result.slice(0, 11);
      document.getElementById("sum").innerHTML='E';
    }
    else{
      document.getElementById("display").innerHTML=result;
      document.getElementById("sum").innerHTML='=';
    }
  }
  
  function decimalPoint(btnType){
    switch(decPoint){
      case true:
        break;
        
      case false:
        if(digitNum >= 11){
          //add the error symbol and freeze screen
          document.getElementById("sum").innerHTML='E';
        }
        //if the last digit was a symbol, clear the screen for the next number
        else if(lastDigit === 'symbol' || lastDigit === "="){
          document.getElementById("display").innerHTML="0.";
          if(lastDigit==="="){
            document.getElementById("sum").innerHTML='';
          }
          decPoint = true;
          calculation += "0.";
          lastDigit = 'num';
          digitNum = 2;
        }
        //otherwise append the point to the screen
        else{
          document.getElementById("display").innerHTML+=btnType;
          calculation += btnType;
          lastDigit = 'num';
          digitNum ++;
          decPoint = true;
        }
        break;
    }
  }
  
  function updateCalc(btnType){
    //if its a symbol update the symbol field and calculation
      document.getElementById("sum").innerHTML=btnType;
      //if the last digit was a number add the symbol.
      if(lastDigit === 'num' || lastDigit === "="){
        calculation += btnType;
        lastDigit = 'symbol';
        decPoint = false;
      }
      else{
        //otherwise, if the last digit was a symbol
        //remove the last symbol from the calculation
        var saveCalc = calculation.slice(0, -1);
        //then add the new one
        calculation = saveCalc + btnType;
        lastDigit = 'symbol';
        decPoint = false;
      }
  }
  
  function updateScreen(btnType){
    //display the number on the screen
    //if there are too many digits to display on the screen:
    if(digitNum >= 11){
      //add the error symbol and freeze screen
      document.getElementById("sum").innerHTML='E';
    }
    //if the number is currently zero, replace it unless it's a point.
    else if(calculation === 0 || calculation === '0' || lastDigit === "="){
      document.getElementById("display").innerHTML=btnType;
      document.getElementById("sum").innerHTML='';
      calculation = btnType;
      lastDigit = 'num';
      digitNum = 1;
    }
    //if the last digit was a symbol, clear the screen for the next number
    else if(lastDigit === 'symbol'){
      decPoint = false;
      document.getElementById("display").innerHTML=btnType;
      calculation += btnType;
      lastDigit = 'num';
      digitNum = 1;
    }
    //otherwise append the number to the screen
    else{
      document.getElementById("display").innerHTML+=btnType;
      calculation += btnType;
      lastDigit = 'num';
      digitNum ++;
    }
    
  }
  
  function captureBtn(num){
    //get the data-num attribute for the button
    var btnType = this.dataset.num;

    switch(btnType){
      
      case 'clear':
        resetCalc(btnType);
        break;
      
      case '=':
        doCalculation();
        break;
      
      case '*':
      case '-':
      case '+':
      case '/':
        updateCalc(btnType);
        break;
        
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        updateScreen(btnType);
        break;
      
      case '.':
        decimalPoint(btnType);
        break;
    }       
    
  }
  
  var theButtons = document.getElementsByClassName("button");
  for(var i = 0; i < theButtons.length; i++){
    theButtons[i].addEventListener("click", captureBtn);
  }

});