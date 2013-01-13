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
      $this->load->helper('url');
      redirect('/users/login', 'location', 301);
    }
    else {
      $this->load->view('shared/header');
      $this->load->view('messages/index', array(
        'messages' => $this->messages_model->get_latest_messages(),
        'title' => 'Chat'
      ));
      $this->load->view('shared/footer');
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
      $this->load->view('shared/header');
      $this->load->view('messages/index',$data);
      $this->load->view('shared/footer');
    }
    else
    {
      $this->messages_model->add_message();
      redirect('/users/login', 'location', 301);
    }
  }
}
