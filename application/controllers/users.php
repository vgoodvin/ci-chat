<?php
class Users extends CI_Controller {

  public function __construct()
  {
    parent::__construct();
    $this->load->helper('url');
    $this->load->helper('cookie');
  }

  public function login()
  {
    $this->load->helper('form');
    $this->load->library('form_validation');

    if ($this->input->cookie('ci-chat-nickname') != '') {
      redirect('/messages/index', 'location', 301);
      return;
    }
    elseif ($this->input->post()) {
      $this->form_validation->set_rules('login', 'Login', 'required');
      if ($this->form_validation->run() === TRUE)
      {
        set_cookie('ci-chat-nickname', $this->input->post('login'), 86400);
        redirect('/messages/index', 'location', 301);
        return;
      }
    }
    $this->load->view('shared/header', array('title' => 'User Login'));
    $this->load->view('users/login');
    $this->load->view('shared/footer');
  }

  public function logout()
  {
    delete_cookie("ci-chat-nickname");
    redirect('/messages/index', 'location', 301);
  }
}
