const form = document.querySelector(".new-post-form");
const commentInp = document.querySelector(".textarea");

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(commentInp.value)
    const url = new URL("http://localhost:3000/posts/newpost")

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: `${commentInp.value}`
        })
    }).then(data => {
        // console.log(data);
        if (data.ok === true) {
            console.log('Working');
            window.location.href = data.url;
        }
    })
})