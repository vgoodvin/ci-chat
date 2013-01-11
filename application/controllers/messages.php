<?php
class Messages extends CI_Controller {

  public function __construct()
  {
    parent::__construct();
    $this->load->model('messages_model');
  }

  public function index()
  {
    $this->load->helper('form');
    if ($this->input->cookie('ci-chat-nickname') == '') {
      // TODO: implement new controller "users"
      $this->load->helper('url');
      redirect('/users/login');
      /*$this->input->set_cookie(array(
        'name'   => 'ci-chat-nickname',
        'value'  => 'Vasily',
        'expire' => 86400,
      ));*/
    }
    else {
      $this->load->view('messages/index', array(
        'messages' => $this->messages_model->get_latest_messages(),
        'title' => 'Chat'
      ));
    }
  }

  public function create()
  {
    $this->load->helper('url');
    $this->load->helper('form');
    $this->load->library('form_validation');

    if ($this->input->cookie('ci-chat-nickname') === '') {
      redirect('/users/login', 'location', 301);
    }

    $this->form_validation->set_rules('msg', 'Message', 'required');
    $data['title'] = 'Chat';

    if ($this->form_validation->run() === FALSE)
    {
      $this->load->view('messages/index',$data);
    }
    else
    {
      $this->messages_model->add_message();
      redirect('/messages/index', 'location', 301);
    }
  }
}
