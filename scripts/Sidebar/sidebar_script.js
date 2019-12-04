function toggleSidebar() {
  var logo = document.getElementById("logo");
  logo.classList.toggle('disappear');
  // search.classList.toggle('disappear');
  // message.classList.toggle('disappear');
  document.getElementById("sidebar").classList.toggle('active');
}
