//   var postRef = firebase.database().ref('post');


document.getElementById('postingForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    var postTitle = document.getElementById('title').value;
    var postDescription = document.getElementById('description').value;
    var postCondition = document.getElementById('condition').value / 10;

    db.collection('posts').add({
        title: postTitle,
        description: postDescription,
        condition: postCondition

    })

    //alert
    document.querySelector('.alert').style.display = "block";

    // Hide alert after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

     document.getElementById('postingForm').reset();

}






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