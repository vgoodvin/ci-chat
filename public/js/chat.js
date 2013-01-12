/**
 * @file chat.js
 * TODO: add description.
 */

$(document).ready(function() {
  var sock = new SockJS('http://ci-chat:9999/chat');

  sock.onmessage = function(e) {
    var $messagesContainer = $('#messages');
    var $messages = $('<div></div>');
    var messages = JSON.parse(e.data).reverse();
    $.each(messages, function (index, value) {
      if ($('.msg-id-' + value['id']).length === 0) {
        var $message = $('<div>').addClass('message').addClass('msg-id-' + value['id']);
        $('<span>').addClass('author').text(value['author']).appendTo($message);
        $('<span>').addClass('created').text(value['created_at']).appendTo($message);
        $('<span>').addClass('text').text(value['message']).appendTo($message);
        $message.appendTo($messages);
      }
    });
    $messagesContainer.append($messages.children('div')).scrollTop($messagesContainer[0].scrollHeight)
  };

  $('#new-message-form').ajaxForm(function () {
    sock.send();
  });

  /*var testInc = 0;
  setInterval(function () {
    $.post('http://ci-chat/index.php/messages/create', { "msg": "Test message #" + testInc++ }, function () {
      sock.send();
    });
  }, 50);*/
});
