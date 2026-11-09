/* Stand-in for https://cdn.sendfox.com/js/form.js in local tests.
   Same shape: after DOMContentLoaded, bind a bubbling submit listener
   on .sendfox-form. The real file would POST to SendFox from here. */
document.addEventListener('DOMContentLoaded', function () {
  var forms = document.getElementsByClassName('sendfox-form');
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', function () {
      window.__formJsPosts = (window.__formJsPosts || 0) + 1;
    });
  }
});
