console.log("[post]");

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
// for firebase database
const db = firebase.firestore();

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

    // for sidebar
    console.log(name);
    document.getElementById("userName").innerHTML = "Hello, " + name;
    document.getElementById("sidebarLogIn").style.display = "none";

    // for contents
    db.collection('posts').doc('3').onSnapshot(snap => {
      console.log(snap.id);
      console.log(snap.data());
      let post = {
        conditionStatus: snap.data().conditionStatus,
        contents: snap.data().contents,
        createdDate: snap.data().createdDate.toDate(),
        image: snap.data().image,
        postTitle: snap.data().postTitle,
        postedBy: snap.data().postedBy,
      }
      document.getElementById('postTitle').firstChild.nodeValue = post.postTitle;
      document.getElementById('user').innerHTML = post.postedBy;
      document.getElementById('postTime').innerHTML = post.createdDate;
      document.getElementById('postContent').innerHTML = post.contents;
      document.getElementById('condition').innerHTML = post.conditionStatus;
    })

    // db.collection('posts').once('value', gotUserData());

    // function gotUserData(snapshot){
    //   snapshot.forEach(userSnapshot => {
    //     var k = userSnapshot.key;
    //     var id = userSnapshot.val().AssignedID;
    //     var name = userSnapshot.val().Name;
    //     ref.child("teams").child(id).once("value", teamsSnapshot => {
    //       teamsSnapshot.forEach(teamSnapshot => {
    //         var teamKey = teamSnapshot.key;
    //         teamSnapshot.forEach(teamProp => {
    //           var prop = teamProp.key;
    //           var val = teamProp.val();
    //           console.log(k+" "+name+" "+id+": "+teamKey+", "+prop+"="+val);
    //         });
    //       });
    //     });
    //   })
    // }

  } else {
    // No user is signed in.
    document.getElementById("sidebarLogOut").style.display = "none";
  }
});