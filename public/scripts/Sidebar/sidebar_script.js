// When user click side bar button, sidebar shows up and disappears.
function toggleSidebar() {
  var logo = document.getElementById("logo");
  logo.classList.toggle('disappear');
  document.getElementById("sidebar").classList.toggle('active');
}
