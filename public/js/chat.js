/**
 * @file chat.js
 * Main chat logic.
 */

$(document).ready(function() {
  var sock = new SockJS('http://localhost:9999/chat');

  var $newMsgForm = $('#new-message-form');
  var $msgContainer = $('#messages');

  // Updated messages log when new messages were received.
  sock.onmessage = function(e) {
    var $newMessages = $('<div></div>');
    var newMessages = JSON.parse(e.data).reverse();
    $.each(newMessages, function (index, value) {
      if ($('.msg-id-' + value['id']).length === 0) {
        var $newMessage = $('<div>').addClass('message').addClass('msg-id-' + value['id']);
        var createdAt = $.format.date(value['created_at'], 'yyyy-MM-dd HH:mm:ss');
        $('<div>').addClass('created').text('[' + createdAt + ']').appendTo($newMessage);
        $('<div>').addClass('author').text(value['author']).appendTo($newMessage);
        $('<div>').addClass('text').text(value['message']).appendTo($newMessage);
        $newMessage.appendTo($newMessages);
      }
    });
    $msgContainer.append($newMessages.children('div')).scrollTop($msgContainer[0].scrollHeight)
  };

  // Inform Node.js server about new messages.
  $newMsgForm.ajaxForm(function () {
    sock.send();
    $('.form-text', $newMsgForm).val('');
  });

  // Scroll to botton on page load.
  $msgContainer.scrollTop($msgContainer[0].scrollHeight);
});
