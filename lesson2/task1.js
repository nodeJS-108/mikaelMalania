function icyHot(temp1, temp2){
    let multiplied = temp1 * temp2;
    // console.log(multiplied)
    // console.log(multiplied < 0 && (temp1 > 100 || temp2 > 100))
    if (multiplied < 0 && temp1 > 100 || temp2 > 100) {
       return true;
      
    } else {
      return false;
    }
    
  }

console.log(  icyHot(2, 120))