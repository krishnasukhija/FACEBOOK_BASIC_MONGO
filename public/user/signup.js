// const CryptoJS = require('crypto-js');

// const { sign } = require("jsonwebtoken");


const signupform = document.querySelector('#signupform');
const firstnameInp = document.querySelector('#first-name');
const lastnameInp = document.querySelector('#last-name');
const emailInp = document.querySelector('#email');
const passwordInp = document.querySelector('#password');
const errorMessage = document.querySelector('.error-message');

signupform.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Turning password into Bytes
    const password = passwordInp.value;
    const passInBytes = new TextEncoder().encode(password);

    const passCryptoKey = await window.crypto.subtle.importKey(
        'raw',
        passInBytes,
        'PBKDF2',
        false,
        ['deriveKey']
    );

    // deriving cryptokey from user password
    const salt = crypto.getRandomValues(new Uint8Array(16));
    // console.log('salt', salt);
    // console.log('salt', typeof salt);
    const cryptokey = await crypto.subtle.deriveKey({
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
    },
        passCryptoKey,
        {
            name: 'AES-GCM', length: 128
        },
        true,
        ['encrypt', 'decrypt']
    );

    const exportKey = await window.crypto.subtle.exportKey('jwk', cryptokey);
    // console.log(exportKey.k);
    // console.log('signup-passValue', exportKey.k);

    passwordInp.value = exportKey.k;
    // console.log('signupHashedPassword', passwordInp.value);
    // return;

    const formdata = new FormData(signupform);
    // const saltDecoded = new TextDecoder().decode(salt);
    // track signup salt
    // console.log("salt", salt);

    formdata.append('salt', salt.toString());
    // console.log(...formdata);

    const data = new URLSearchParams();

    for (const pair of formdata) {
        data.append(pair[0], pair[1]);
    };

    // for (const pair of data) {
    //     console.log(pair[0], pair[1])
    // }
    // console.log(data);
    // return;

    // Local signup URL
    // const url = new URL("http://localhost:3000/users/signup");

    // Vercel signup URL
    const url = new URL("https://facebook-basic-mongo-ml9hrk86l-krishnasukhijas-projects.vercel.app/users/signup")
    fetch(url, {
        method: 'POST',
        body: data,
    }, { mode: 'cors' }).then(data => {
        console.log('signup-response', data);
        if (data.ok) {
            errorMessage.innerText = "";
            passwordInp.value = password;
            window.location.href = data.url;
        }
        else if (!data.ok) {
            passwordInp.value = password;
            errorMessage.innerText = "SignUP Failed!!";
        }
        // console.log('submitted');
    })

})



// var u8arr = new Uint8Array([34, 128, 255]);
// var u8str = u8arr.toString();  // Convert Uint8Array to String
// console.log(u8str);
// var u8arr2 = Uint8Array.from(u8str.split(',').map(x=>parseInt(x,10)));
// console.log(u8arr2);  // back to Uint8Array



