<?php if (isset($_SERVER['REMOTE_ADDR'])) exit('Permission denied.');

class Migrations extends CI_Controller {

  public function install()
  {
    $this->load->database();
    $this->load->library('schema');

    $table_name = 'messages';
    $query = $this->db->query("SHOW TABLES LIKE '{$table_name}'");
    if ($query->num_rows > 0) {
      exit("Database tables already exist.\n");
    }
    else {
      Schema::create_table($table_name, function($table){
        $table->auto_increment_integer('id');
        $table->string('author', 50);
        $table->text('message');
        $table->datetime('created_at');
      });
      print "Database tables were created successfully.\n";
    }
  }
}
