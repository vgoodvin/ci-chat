<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_messages extends CI_Migration {

  public function up()
  {
    $this->load->dbforge();
    $this->dbforge->add_field(array(
      'id' => array(
        'type' => 'INT',
        'constraint' => 9,
        'unsigned' => TRUE,
        'auto_increment' => TRUE
      ),
      'author' => array(
        'type' => 'VARCHAR',
        'constraint' => '50',
        'null' => TRUE,
      ),
      'message' => array(
        'type' => 'TEXT',
        'null' => TRUE,
      ),
      'created' => array(
        'type' => 'INT',
        'constraint' => 11,
        'null' => TRUE,
      ),
    ));
    $this->dbforge->add_key('id', TRUE);

    $this->dbforge->create_table('messages');
  }

  public function down()
  {
    $this->dbforge->drop_table('messages');
  }

}
