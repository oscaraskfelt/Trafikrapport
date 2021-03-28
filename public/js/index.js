$(document).ready(function () {
  //Handling form for registering/logging in a user
  $('#registerForm').on('submit', (e) => {
    const id = $('#registerEmail').val();
    sessionStorage.setItem('user', id);

    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        id
      )
    ) {
      console.log('fail');
      e.preventDefault();
      $('#registerForm').append(
        '<p class="error">Det måste vara en giltig e-post</p>'
      );
    }
  });

  //Handling form for unregistering a user
  $('#removeForm').on('submit', (e) => {
    e.preventDefault();

    const id = $('#removeEmail').val();
    sessionStorage.removeItem('user');

    $.post('/removeUser', { id: id }, (response) => {
      $('.valid').empty();
      $('.error').empty();
      $('#removeForm').append('<p class="valid">E-post borttagen</p>');
    }).fail((err) => {
      $('.error').empty();
      $('.valid').empty();
      $('#removeForm').append('<p class="error">E-posten fanns inte</p>');
    });
  });
});
