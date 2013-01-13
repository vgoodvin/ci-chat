<h1>Chat</h1>
<div id="messages">
  <?php foreach ($messages as $message): ?>
    <div class="message msg-id-<?php print $message['id']; ?>">
        <div class="created">[<?php print $message['created_at']; ?>]</div>
        <div class="author"><?php print $message['author']; ?></div>
        <div class="text"><?php print $message['message']; ?></div>
    </div>
  <?php endforeach; ?>
</div>

<?php echo validation_errors(); ?>
<?php echo form_open('messages/create', array('id' => 'new-message-form')) ?>
  <input type="input" name="msg" class="form-text"/>
  <input type="submit" name="submit" value="Send" class="form-submit"/>
</form>
