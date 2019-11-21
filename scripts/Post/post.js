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

    // for passing post id into url query
    function parseURLParams(url) {
      var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        params = {},
        i, n, v, nv;

      if (query === url || query === "") return;

      for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!params.hasOwnProperty(n)) params[n] = [];
        params[n].push(nv.length === 2 ? v : null);
      }
      return params;
    }

    let postId = parseURLParams(window.location.href).postId[0];

    // for contents
    db.collection('posts').doc(postId).get().then(snap => {
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
