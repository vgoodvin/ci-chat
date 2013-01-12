/**
 * @file chat.js
 * TODO: add description.
 */

$(document).ready(function() {
  var sock = new SockJS('http://ci-chat:9999/chat');
  sock.onopen = function() {
    console.log('open');
  };
  sock.onmessage = function(e) {
    var messages = JSON.parse(e.data);
    var $messages = $('<div></div>');
    $.each(messages, function (index, value) {
      var $message = $('<div>').addClass('message');
      $('<span>').addClass('author').text(value['author']).appendTo($message);
      $('<span>').addClass('created').text(value['created_at']).appendTo($message);
      $('<span>').addClass('text').text(value['message']).appendTo($message);
      $message.prependTo($messages);
    });
    $('#messages').html($messages.children('div'));
  };
  sock.onclose = function() {
    console.log('close');
  };

  $('#new-message-form').ajaxForm(function () {
    sock.send();
  });
});
