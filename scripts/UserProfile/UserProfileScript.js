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
      uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }

    console.log(name);
    // document.getElementById("userName").innerHTML = "Hello, " + name;
    // document.getElementById("sidebarLogIn").style.display = "none";
    $(".userName").append(name + " >");
    $(".userEmail").append(email + " >");

  } else {
    // No user is signed in.
    document.getElementById("sidebarLogOut").style.display = "none";
  }
});

document.getElementById('popup').addEventListener('click', updateInfoCard);
function updateInfoCard(e){
    e.preventDefault();
    document.querySelector('.bg-modal').style.display = 'flex';
    console.log("working");
}

// document.querySelector('.close').addEventListener('click', function(){
//     document.querySelector('.bg-modal').style.display = 'none';
// });


// function close(e){
//     e.preventDefault();
//     document.querySelector('.bg-modal').style.display = "none";
//     console.log("working");
// }

function closing(){
    document.querySelector('.bg-modal').style.display = "none";
}

function updating(){
    var newname = document.getElementById('newName').value;
    var newEmail = document.getElementById('newEmail').value;


    // user.updateProfile({
    //     displayName: newname
    // });
    // user.updateEmail('1458wlstjd@gmail.com').then(function(){
    //     console.log("sucess");
    // }).catch(function(error){
    // }).then(function(){
    //     console.log(user.displayName);
    // }
    // )

    console.log("asdf" + document.referrer);
    console.log(newname);
    console.log(newEmail);
}