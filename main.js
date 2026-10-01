// Mark JS as available (lets the roots animation start hidden, then draw)
document.documentElement.classList.add('js');

// Draw the root lines once, when the initiatives section scrolls into view
(function () {
  var roots = document.querySelector('.roots');
  if (!roots) return;
  if (!('IntersectionObserver' in window)) { roots.classList.add('drawn'); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { roots.classList.add('drawn'); io.disconnect(); }
    });
  }, { threshold: 0.4 });
  io.observe(roots);
})();

// Footer year
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Contact form: open the visitor's email app with a prefilled message to info@sarvamoola.in
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var d = new FormData(form);
    var subject = 'Message from ' + d.get('name') + ' via sarvamoola.in';
    var body = d.get('message') + '\n\n' + d.get('name') + '\n' + d.get('email');
    window.location.href = 'mailto:info@sarvamoola.in'
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);
  });
})();
