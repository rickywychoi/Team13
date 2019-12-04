

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

    document.getElementById('postingForm').addEventListener('submit', submitForm)

    function submitForm(e) {
      e.preventDefault();

      // entered contents
      var postTitle = document.getElementById('title').value;
      var postDescription = document.getElementById('description').value;
      var postCondition = document.getElementById('condition').value / 10;
      var postedDate = firebase.firestore.Timestamp.fromDate(new Date())
      var postedBy = user.displayName;

      //upload image

      var file = document.getElementById('image').files[0];
      // var storageRef = firebase.storage().ref('product/' + image.name);
      // storageRef.put(image);
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef.child('images/' + file.name).put(file);
      uploadTask.on('state_changed', null, null, function(){
        var downloadURL = uploadTask.snapshot.downloadURL;
        db.collection('posts').add({
          postTitle: postTitle,
          contents: postDescription,
          conditionStatus: postCondition,
          createdDate: postedDate,
          image: "empty image",
          postedBy: postedBy,
          url: downloadURL,
        }).then(function(){
          window.location.href = "../MainHome/mainHome.html";
        });
      })


      // var uploadTask = storageRef.put(image);
      // uploadTask.on('state_changed', function(snapshot){

      // })
      // var donwloadURL = uploadTask.snapshot.donwloadURL;
      // storageRef.put(image).getDownloadURL().then(function(url){
      //   console.log(url);
      // })

      // db.collection('posts').add({
      //   postTitle: postTitle,
      //   contents: postDescription,
      //   conditionStatus: postCondition,
      //   createdDate: postedDate,
      //   image: "empty image",
      //   postedBy: postedBy,
      //   // url: downloadURL,
      // })

      // db.collection('users').doc(user.uid).get().then(snap => {
      //   // console.log(snap.data());
      //   var post = {
      //     // numOfPost: snap.data().numberOfPost
      //   }
      //   db.collection('users').doc(user.uid).collection('posts').doc((post.numOfPost + 1).toString()).set({
      //     postTitle: postTitle,
      //     contents: postDescription,
      //     conditionStatus: postCondition,
      //     createdDate: postedDate,
      //     image: "empty image",
      //     postedBy: postedBy,
      //   })

      //   db.collection('users').doc(user.uid).update({
      //     numberOfPost: post.numOfPost + 1
      //   })
      // })
// .then(function(){
//         window.location.href = "../MainHome/mainHome.html";
//       })

      document.getElementById('postingForm').reset();
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