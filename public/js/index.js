$(document).ready(function () {
  $('#registerForm').on('submit', (e) => {
    const id = $('#registerEmail').val();
    sessionStorage.setItem('user', id);
  });

  $('#removeForm').on('submit', (e) => {
    e.preventDefault();
    const id = $('#removeEmail').val();
    sessionStorage.removeItem('user');
    $.post('/removeUser', { id: id }, (response) => {
      console.log(response);
    }).fail((err) => console.log(err));
  });
});
