var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid; 
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }

    //append name of user and email
    $(".userName").append(name + " >");
    $(".userEmail").append(email + " >");

  } else {
    // No user is signed in.
    document.getElementById("sidebarLogOut").style.display = "none";
  }
});

//When user clicks '>' small box pop up where user can update his/her info
document.getElementById('popup').addEventListener('click', updateInfoCard);
function updateInfoCard(e){
    e.preventDefault();
    document.querySelector('.bg-modal').style.display = 'flex';
    console.log("working");
}
//When user click any area except for the pop-up box, close the pop-up box
function closing(){
    document.querySelector('.bg-modal').style.display = "none";
}
//upading user info
function updating(){
    var newname = document.getElementById('newName').value;
    var newEmail = document.getElementById('newEmail').value;
    console.log("asdf" + document.referrer);
    console.log(newname);
    console.log(newEmail);
}