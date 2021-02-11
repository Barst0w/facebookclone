document.addEventListener('click', (e) => {
    if (e.target.className === 'likeBtn') {
        console.log('Like Sent')
        fetch('postLike', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: e.target.getAttribute('postid') })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to send like post')
                }
        })
        .catch(err => {
            console.log(err)
        })
    }
})
