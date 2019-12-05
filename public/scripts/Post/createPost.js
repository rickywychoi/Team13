function conditionDisplayNone() {
  document.getElementById("con").style.display = "none";
}

function conditionDisplay() {
  document.getElementById("con").style.display = "block";
}

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

    document.getElementById('postingForm').addEventListener('submit', submitForm)

    function submitForm(e) {
      e.preventDefault();

      // entered contents
      var postTitle = document.getElementById('title').value;
      var postDescription = document.getElementById('description').value;
      var postCondition = document.getElementById('condition').value / 10;
      var postedDate = firebase.firestore.Timestamp.fromDate(new Date())
      var postedBy = user.displayName;
      var file = document.getElementById('image').files[0];


      if ($('#lf').is(":checked")) {
        postCondition = - 1;
      }

      if ($('#fs').is(":checked")){
        postCondition = document.getElementById('condition').value / 10;
      }

      if (file != undefined) {
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child('images/' + file.name).put(file);
        uploadTask.on('state_changed', null, null, function () {
          var downloadURL = uploadTask.snapshot.downloadURL;
          db.collection('posts').add({
            postTitle: postTitle,
            contents: postDescription,
            conditionStatus: postCondition,
            createdDate: postedDate,
            postedBy: postedBy,
            url: downloadURL,
          })
          .then(function () {
            console.log("The post is created!");
            window.location.href = "../MainHome/mainHome.html";
          });
        });
      } else {
        db.collection('posts').add({
          postTitle: postTitle,
          contents: postDescription,
          conditionStatus: postCondition,
          createdDate: postedDate,
          postedBy: postedBy,
        })
        .then(function () {
          console.log("The post is created without an image!");
          window.location.href = "../MainHome/mainHome.html";
        });
      }
    }

    $("#cancelButton").click((e) => {
      e.preventDefault();
      window.history.back();
    })

  } else {
    // No user is signed in.
    document.getElementById("sidebarLogOut").style.display = "none";
  }
});