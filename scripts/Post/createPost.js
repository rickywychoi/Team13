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

    // // for sidebar
    // console.log(name);
    // document.getElementById("userName").innerHTML = "Hello, " + name;
    // document.getElementById("sidebarLogIn").style.display = "none";

    document.getElementById('postingForm').addEventListener('submit', submitForm);

    function submitForm(e) {
      e.preventDefault();

      // entered contents
      var postTitle = document.getElementById('title').value;
      var postDescription = document.getElementById('description').value;
      var postCondition = document.getElementById('condition').value / 10;
      var postedDate = firebase.firestore.Timestamp.fromDate(new Date())
      var postedBy = user.uid;

      db.collection('posts').add({
        postTitle: postTitle,
        contents: postDescription,
        conditionStatus: postCondition,
        createdDate: postedDate,
        image: "empty image",
        postedBy: postedBy,
      })

      //alert
      document.querySelector('.alert').style.display = "block";

      // Hide alert after 3 seconds
      setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
      }, 3000);

      document.getElementById('postingForm').reset();

    }


    $("#cancelButton").click(() => {
      window.history.back();
    })

  } else {
    // No user is signed in.
    document.getElementById("sidebarLogOut").style.display = "none";
  }
});











// var postRef = firebase.database().ref('Post');



// document.getElementById('postingForm').addEventListener('submit', submitForm);

// //submit form
// function submitForm(e){
//     e.preventDefault();

//     //Get values
//     var title = document.getElementById('title').value;
//     var description = document.getElementById('description').value;

//     //save post
//     savePost(title, description);



//     console.log(title);
//     console.log(description);

//     document.getElementById('postingForm').reset();

// }

// // Save post to firebase
// function savePost(title, description){
//     var newPostRef = postRef.push();
//     newPostRef.set({
//         title: title,
//         description: description
//     });
// }