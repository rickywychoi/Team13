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

    $("#sidebarLogOut").click((e) => {
      e.preventDefault();

      firebase.auth().signOut().then(function () {
        window.location.href = "../../index.html";
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
    });

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
        createdDate: snap.data().createdDate.toDate().toString().substring(0, 10),
        image: snap.data().image,
        postTitle: snap.data().postTitle,
        postedBy: snap.data().postedBy,
        url: snap.data().url,
      }
      document.getElementById('postTitle').innerHTML = post.postTitle;
      document.getElementById('user').innerHTML = post.postedBy;
      document.getElementById('postTime').innerHTML = "Posted on: " + post.createdDate;
      if (post.url == undefined) {
        document.getElementById('postImage').style.display = "none";
      } else {
        document.getElementById('postImage').setAttribute("src", post.url);
      }
      document.getElementById('postContent').innerHTML = post.contents;
      document.getElementById('condition').innerHTML = post.conditionStatus;

      // name in modal
      document.getElementById('modalPosterName').innerHTML = post.postedBy;

      // email in modal
      document.getElementById('modalPosterEmail').innerHTML = email;

      // Get the modal
      var modal = document.getElementById("myModal");

      // Get the button that opens the modal
      var btn = document.getElementById("directMessage");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks the button, open the modal 
      btn.onclick = function () {
        modal.style.display = "block";
      }

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      // Click to send an email to poster
      function sendMail () {
        window.open(`mailto:${email}`);
      }

      $('#modalPosterEmail').click(e=> {
        e.preventDefault();
        sendMail();
      })
    })

  } else {
    // No user is signed in.
    document.getElementById("sidebarLogOut").style.display = "none";
  }
});
