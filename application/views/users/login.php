<h1>Login</h1>
<?php echo validation_errors(); ?>
<?php echo form_open('users/login') ?>
  <input type="input" name="login"/><br />
  <input type="submit" name="submit" value="Log in"/>
</form>
