function triggerAlert(message){
  $('.alert p').text(message);
  $('.alert').fadeIn();
  setTimeout(() => {
    $('.alert').fadeOut();
  }, 3000);
}

$(document).ready(function() {
  var socket = io.connect('http://172.20.10.3:9595');

  socket.on('onlines', (data) => {
    for( var i in data ){
      $('ul.online').append("<li data-id='" + data[i].id + "'> " + data[i].name + '</li>');
    }
  })

  socket.on('offClean', (data) => {
    $('ul.online').html('');
  })

  socket.on('onCon', (data) => {
    $('ul.online').append("<li data-id='" + data.id + "'> " + data.name + '</li>');
  })

  socket.on('offCon', (data) => {
    $('.online li[data-id="' + data + '"]').remove();
  })

  socket.on('onAvailable', (data) => {
    $('.available tbody').append("<tr class='starter' data-socket='" + data.socket + "' data-id='" + data.id + "'> <td> " + data.name + " </td> <td> " + data.username + " </td> </tr>");
  })

  socket.on('offAvailable', (data) => {
    $('.available .starter[data-id="' + data + '"]').remove();
  })

  socket.on('listAvailable', (data) => {
    $('.available tbody').html('');
    for( var i in data ){
      $('.available tbody').append("<tr class='starter' data-socket='" + data[i].socket + "' data-id='" + data[i].id + "'> <td> " + data[i].name + " </td> <td> " + data[i].username + " </td> </tr>");
    }
  })

  socket.on('hey', (data) => {
    alert(data.mark);
  })

  $('.waitTrigger').on('click', (e) => {
    socket.emit('setAvailable');
    $('#mainSection').fadeOut(400, () => {
      $('#preGameSection .waiting').fadeIn();
    })
  })

  $('.chooseTrigger').on('click', (e) => {
    socket.emit('getAvailable');
    $('#mainSection').fadeOut(400, () => {
      $('#preGameSection .choosing').fadeIn();
    })
  })
  $(document).on('click', '.available .starter', function(){
    socket.emit('startGame', {opponent: $(this).data('socket')});
    $('#preGameSection').fadeOut(400, () => {
      $('#gameSection').fadeIn();
    })
  });
  $(document).on('click', '.gameBoard .button', function(){
    if( $(this).hasClass('done') ){

      console.log("Sorry");
    }else{
      socket.emit('move', {position: $('#gameSection #position').val(), position: $('#gameSection #position').val(), box: $(this).data('num')}, (data) => {
        if( data.success ){

        }else{

        }
      })
    }
  });
})
