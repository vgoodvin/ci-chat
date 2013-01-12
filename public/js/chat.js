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
    // TODO: put new messages on the #messages container
    console.log('message', e.data);
  };
  sock.onclose = function() {
    console.log('close');
  };

  $('#new-message-form').ajaxForm(function () {
    sock.send();
  });
});
