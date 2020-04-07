document.addEventListener('DOMContentLoaded', () => { //Make navbar working 
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

function sendOnEnter() {
  if (event.key === 'Enter') {
    document.getElementById('send-message').click();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#emoji-button');
  const picker = new EmojiButton();

  picker.on('emoji', emoji => {
    document.getElementById('message-input').value += emoji;
  });

  button.addEventListener('click', () => {
    picker.togglePicker(button);
  });
});