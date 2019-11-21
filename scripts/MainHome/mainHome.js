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

    // retrieving data from each post
    let postsRef = db.collection('posts');
    postsRef.orderBy('createdDate', 'desc').get()  // get posts in descending order
    .then(snap => {
      console.log("MainHome.js")
      snap.forEach(doc => {
        console.log(doc.data());

        // fields of each post documents
        let post = {
          postId: doc.id,
          conditionStatus: doc.data().conditionStatus,
          contents: doc.data().contents,
          // createdDate: null || undefined ? '' : doc.data().createdDate.toDate(),
          createdDate: doc.data().createdDate.toDate(),
          image: doc.data().image,
          postTitle: doc.data().postTitle,
          postedBy: doc.data().postedBy,
        }

        // creating html elements with each post's data
        let postDiv = $('<div></div>');
        postDiv.addClass('post');
        let titlePara = $('<p>' + post.postTitle + '</p>');
        titlePara.addClass('postTitle');
        let postLink = $('<a></a>');
        postLink.addClass('toPost');
        postLink.attr('href', '../Post/post.html?postId=' + post.postId);
        let postImage = $('<div>image</div>');
        postImage.addClass('postImage');
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
        postDiv.append(titlePara, postLink, details);
        postLink.append(postImage);
        posterLink.append(posterPara);
        postIdDiv.append(posterLink, datePara);
        details.append(postIdDiv, contentsPara);

      })
    }).catch();

  } else {
    // No user is signed in.
    document.getElementById("sidebarLogOut").style.display = "none";
  }
});