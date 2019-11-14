function toggleSidebar() {
  var logo = document.getElementById("logo");
  var search = document.getElementById("searchIcon");
  var message = document.getElementById("messageIcon");
  logo.classList.toggle('disappear');
  search.classList.toggle('disappear');
  message.classList.toggle('disappear');
  document.getElementById("sidebar").classList.toggle('active');

  // document.getElementById("messageIcon").style.display = "none";
  // document.getElementById("searchIcon").style.display = "none";
  // document.getElementById("logo").style.display = "none";
}
