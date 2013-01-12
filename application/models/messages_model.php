<?php
class Messages_model extends CI_Model {

  public function __construct()
  {
    $this->load->database();
  }

  public function get_latest_messages()
  {
    return array_reverse($this->db->order_by('id', 'desc')->get('messages', 1000, 0)->result_array());
  }

  public function add_message()
  {
    $timezone = new DateTimeZone('UTC');
    $date = new DateTime('now', $timezone);
    $data = array(
      'author' => $this->input->cookie('ci-chat-nickname', TRUE),
      'message' => $this->input->post('msg'),
      'created_at' => $date->format('Y-m-d H:i:s'),
    );
    return $this->db->insert('messages', $data);
  }
}
