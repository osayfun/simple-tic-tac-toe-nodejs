$(document).ready(function() {
  $('.alert').fadeOut();
  var socket = io.connect('http://127.0.0.1:9595');
  socket.on('onCon', (data) => {
    $('ul.online').append("<li data-socket='" + data.id + "'> " + data.name + '</li>');
  })
  socket.on('offCon', (data) => {
    $('.online li[data-socket="' + data + '"]').remove();
  })

  $('#login').on('submit', (e) => {
    e.preventDefault();
    $('.alert').fadeIn();
    var name      = $('#login #name').val();
    var username  = $('#login #username').val();
    var password  = $('#login #password').val();
    if( name != '' && username != '' && password != '' ){

    }else{

    }
  })
})
