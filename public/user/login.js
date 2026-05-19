const loginForm = document.querySelector('.login-form');
const emailInp = document.querySelector('#email-id');
const passwordInp = document.querySelector('#password');
const errorMessage = document.querySelector('.error-message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // check password and email field is not Empty
    const emailId = emailInp.value;
    const password = passwordInp.value;

    if (!password || !password.trim() || !emailId || !emailId.trim()) {
        errorMessage.innerText = "Please Enter All Fields";
        return;
    }

    // Post salt route
    // localhost URL
    // const url = new URL("http://localhost:3000/users/login/salt");

    const url = new URL(`${window.location.href}/salt`);

    const data = new URLSearchParams();
    data.append('emailId', emailId);

    const response = await fetch(url,
        {
            method: 'POST',
            body: data
        }
    );

    // console.log(response);
    const salt = await response.json();
    if (salt.error) {
        errorMessage.innerText = salt.error;
        return;
    }
    // console.log('loginSalt', salt.salt);

    // return;

    // hashing password
    const passwordInBytes = new TextEncoder().encode(password);
    const passCryptoKey = await window.crypto.subtle.importKey(
        "raw",
        passwordInBytes,
        "PBKDF2",
        false,
        ['deriveKey']
    );


    // const saltEncoded = new TextEncoder().encode(salt.salt);
    const saltEncoded = Uint8Array.from(salt.salt.split(',').map(x => parseInt(x, 10)));
    // console.log('saltEncoded', saltEncoded);
    // console.log('saltEncoded', typeof saltEncoded);
    const cryptoKey = await window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: saltEncoded,
            iterations: 100000,
            hash: 'SHA-256'
        },
        passCryptoKey,
        { name: 'AES-GCM', length: 128 },
        true,
        ['encrypt', 'decrypt']
    )

    const exportKey = await window.crypto.subtle.exportKey('jwk', cryptoKey);
    // const passValue = new Uint8Array(exportKey);
    // console.log('login-passvalue', exportKey.k);
    // return;
    // POST /users/Login Route
    data.append('userPassword', exportKey.k);

    // local login URL
    // const loginURL = new URL("http://localhost:3000/users/login");

    // Vercel login URL
    // const loginURL = new URL("https://facebook-basic-mongo-ml9hrk86l-krishnasukhijas-projects.vercel.app/users/login")
    const loginURL = new URL(`${window.location.href}`)
    const response2 = await fetch(loginURL,
        {
            method: 'POST',
            body: data
        }
    );
    console.log(response2);
    // console.log(response2.ok);
    if (response2.ok) {
        errorMessage.innerText = '';
        window.location.href = response2.url;
    }
    else if (!response2.ok) {
        passwordInp.value = password;
        // console.log('NOT WORKING!!');
        errorMessage.innerText = 'Login Failed!'
    }


})

