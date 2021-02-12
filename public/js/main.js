// Send id for either post like, or friend request to POST.
document.addEventListener('click', (e) => {

    if (e.target.className === 'likeBtn') {
        console.log('Like Sent')
        fetch('postLike', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: e.target.getAttribute('postid') })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    if (e.target.className === 'addFriend') {
        console.log('Friend Request Sent')
        fetch('friendRequest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: e.target.getAttribute('userid') })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

})
