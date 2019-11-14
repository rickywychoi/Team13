console.log("[post]");

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
const db = firebase.firestore();
let conditionStatus, contents, createdDate, image, postTitle, postedBy;

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
    document.getElementById("userName").innerHTML = "Hello, " + name;
    document.getElementById("sidebarLogIn").style.display = "none";

    db.collection('posts').doc('2').onSnapshot(snap => {
      console.log(snap.data());
      post = {
        conditionStatus: snap.data().conditionStatus,
        contents: snap.data().contents,
        createdDate: snap.data().createdDate,
        image: snap.data().image,
        postTitle: snap.data().postTitle,
        postedBy: snap.data().postedBy,
      }
      document.getElementById('postTitle').innerHTML = post.postTitle;
      document.getElementById('user').innerHTML = post.postedBy;
      document.getElementById('postTime').innerHTML = post.createdDate;
      document.getElementById('postContent').innerHTML = post.contents;
      document.getElementById('condition').innerHTML = post.conditionStatus;
    })

  } else {
    // No user is signed in.
    document.getElementById("sidebarLogOut").style.display = "none";
  }
});