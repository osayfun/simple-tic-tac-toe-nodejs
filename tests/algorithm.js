opp1 = [  1, 0, 0,
          0, 1, 0,
          1, 0, 1];

opp2 = [  0, 0, 1,
          1, 0, 0,
          0, 1, 0];

function checkWin(opp1, opp2, n){
  var result = 0;
  // Row Win
  var rowSelector = 0;
  for(var i = 0; i < n; i++){
    rowSelector = i * n;
    for(var j = 0; j < n; j++){
      if( opp1[rowSelector] == 1 ){

        if( j == n - 1 ){
          result = -1;
        }
        rowSelector++;
      }else{
        break;
      }
    }
  }
  rowSelector = 0;
  for(var i = 0; i < n; i++ ){
    rowSelector = i * n;
    for(var j = 0; j < n; j++ ){
      if( opp2[rowSelector] == 1 ){

        if( j == n - 1 ){
          result = 1;
        }
        rowSelector++;
      }else{
        break;
      }
    }
  }
  // Column Win
  var columnSelector = 0;
  for( var i = 0; i < n; i++ ){
    columnSelector = i;
    for( var j = 0; j < n; j++ ){
      if( opp1[columnSelector] == 1 ){

        if( j == n - 1 ){

          result = -1;
        }
        columnSelector += n;
      }else{
        break;
      }
    }
  }
  columnSelector = 0;
  for( var i = 0; i < n; i++ ){
    columnSelector = i;
    for( var j = 0; j < n; j++ ){
      if( opp2[columnSelector] == 1 ){

        if( j == n - 1 ){

          result = 1;
        }
        columnSelector += n;
      }else{
        break;
      }
    }
  }
  // Diagonal Win
  var diagonalSelector = 0;
  for( var i = 0; i < n; i++ ){
    if( opp1[diagonalSelector] == 1 ){

      if( i == n - 1 ){

        result = -1;
      }
      diagonalSelector += n + 1;
    }else{
      break;
    }
  }
  diagonalSelector = n - 1;
  for( var i = 0; i < n; i++ ){
    if( opp1[diagonalSelector] == 1 ){

      if( i == n - 1 ){

        result = -1;
      }
      diagonalSelector += n - 1;
    }else{
      break;
    }
  }
  diagonalSelector = 0;
  for( var i = 0; i < n; i++ ){
    if( opp2[diagonalSelector] == 1 ){

      if( i == n - 1 ){

        result = 1;
      }
      diagonalSelector += n + 1;
    }else{
      break;
    }
  }
  diagonalSelector = n - 1;
  for( var i = 0; i < n; i++ ){
    if( opp2[diagonalSelector] == 1 ){

      if( i == n - 1 ){

        result = 1;
      }
      diagonalSelector += n - 1;
    }else{
      break;
    }
  }
  return result;
}

function checkFull(opp1, opp2, n){
  var sum = opp1.map((value, index) => {
    return value + opp2[index];
  })
  var sumString = sum.join('');
  var fullBoard = 0;
  for(var i = 0; i < n * n ; i++){
    fullBoard += 1 * Math.pow(10, i);
  }
  fullBoard = fullBoard.toString();
  if( sumString == fullBoard ){

    return true;
  }else{
    return false;
  }
}

function checkFinished(opp1, opp2, n, cb){
  var finished  = checkFull(opp1, opp2, n);
  var result    = checkWin(opp1, opp2, n);

  if( result != 0 ){

    finished = true;
  }
  cb(finished, result);
}
