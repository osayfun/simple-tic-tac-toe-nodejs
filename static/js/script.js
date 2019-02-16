function triggerAlert(message){
  $('.alert p').text(message);
  $('.alert').fadeIn();
  setTimeout(() => {
    $('.alert').fadeOut();
  }, 3000);
}

$(document).ready(function() {
  var socket = io.connect('http://192.168.1.6:9595');

  socket.on('onlines', (data) => {
    for( var i in data ){
      $('ul.online').append("<li data-socket='" + data[i].id + "'> " + data[i].name + '</li>');
    }
  })

  socket.on('offClean', (data) => {
    $('ul.online').html('');
  })

  socket.on('onCon', (data) => {
    $('ul.online').append("<li data-socket='" + data.id + "'> " + data.name + '</li>');
  })

  socket.on('offCon', (data) => {
    $('.online li[data-socket="' + data + '"]').remove();
  })

  // $('#login').on('submit', (e) => {
  //   e.preventDefault();
  //   var name      = $('#login #name').val();
  //   var username  = $('#login #username').val();
  //   var password  = $('#login #password').val();
  //   if( name != '' && username != '' && password != '' ){
  //
  //     socket.emit('auth', {'name': name, 'username': username, 'password': password}, (data) => {
  //       if( !data.success ){
  //
  //         var error = "Failed to Login/Register. Please try again";
  //         if( data.error ){
  //
  //           error = data.error;
  //         }
  //         triggerAlert(error);
  //       }else{
  //         $('#loginSection').fadeOut(300, () => {
  //           $('#mainSection').css("display", "flex").hide().fadeIn();
  //         })
  //       }
  //     })
  //   }else{
  //     triggerAlert(' Empty field is not allowed ');
  //   }
  // })
})
