console.log("[mainHome]");

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
    
    $("#sidebarLogOut").click((e) => {
      e.preventDefault();

      firebase.auth().signOut().then(function() {
        window.location.href = "../../index.html";
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    });

    // retrieving data from each post
    let postsRef = db.collection('posts');
    postsRef.where("postedBy", "==", name).orderBy('createdDate', 'desc').get() // get posts in descending order
      .then(snap => {
        console.log("MainHome.js")
        snap.forEach(doc => {

          let contents = doc.data().contents;
          let postedBy = doc.data().postedBy;

          // properties of each post documents
          let post = {
            postId: doc.id,
            conditionStatus: doc.data().conditionStatus,
            contents: contents.length > 50 ? contents.substring(0, 51).concat("...") : contents,
            createdDate: doc.data().createdDate.toDate().toString().substring(0, 10),
            image: doc.data().image,
            postTitle: doc.data().postTitle,
            postedBy: postedBy.length > 15 ? postedBy.substring(0, 16).concat("...") : postedBy,
            url: doc.data().url,
          }

          // creating html elements with each post's data
          let postDiv = $('<div></div>');
          postDiv.addClass('post');
          let titlePara = $('<p>' + post.postTitle + '</p>');
          titlePara.addClass('postTitle');
          let deleteButton = $('<button>Delete</button>');
          deleteButton.attr('id', `delete${post.postId}`);
          deleteButton.addClass('deleteButton');
          let postLink = $('<a></a>');
          postLink.addClass('toPost');
          postLink.attr('href', '../Post/post.html?postId=' + post.postId);
          let postImageDiv = $('<div></div>');
          postImageDiv.addClass('postImage');
          let postImage = $('<img/>');
          postImage.attr("src", post.url);
          let details = $('<div></div>');
          details.addClass('postDetail');
          let postIdDiv = $('<div></div>');
          postIdDiv.addClass('postId');
          let posterLink = $('<a></a>');
          posterLink.addClass('toPostedBy');
          posterLink.attr('href', '#');
          let posterPara = $('<p>' + post.postedBy + '</p>');
          posterPara.addClass('postedBy');
          let datePara = $('<p>' + post.createdDate + '</p>');
          datePara.addClass('postedDate');
          let contentsPara = $('<p>' + post.contents + '</p>');
          contentsPara.addClass('contents');

          // html elements structure
          $('#main').append(postDiv);
          postDiv.append(titlePara, deleteButton, postLink, details);
          postLink.append(postImageDiv);
          postImageDiv.append(postImage);
          posterLink.append(posterPara);
          postIdDiv.append(posterLink, datePara);
          details.append(postIdDiv, contentsPara);

          // click delete button in my post
          $(`#delete${post.postId}`).click(e => {
            e.preventDefault();

            // alert to prevent user deleting by mistake
            alert("Are you sure to delete this post?");
    
            // delete my post
            db.collection("posts").doc(post.postId).delete()
            .then(() => {
              console.log(`Document ${post.postId} successfully deleted!`);
              location.reload();
            }).catch(function (error) {
              console.error("Error removing document: ", error);
            });
          });
        });
      }).catch();


  } else {
    // No user is signed in.
    document.getElementById("sidebarLogOut").style.display = "none";
    document.getElementById("sidebarLogIn").style.display = "block";
  }
});
