// Logic to read query string from url
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

console.log('params = ', params.userId);

// localStorage config
let users = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];
console.log('Users data = ', users);

let single = users.find(item => item.id == params.userId);
console.log('single user = ', single);

//DOM Elements
let userForm = document.getElementById('userForm');
let userName = document.getElementById('name');
let userEmail = document.getElementById('email');
let userGender = document.getElementsByName('gender');

userName.value = single.name;
userEmail.value = single.email;

// reading the data from localStorage and selecting the radio inputs
for(let i=0; i<userGender.length; i++) {
    if(userGender[i].value === single.gender) {
        userGender[i].checked = true;
    }
}

// form submit Handler
userForm.addEventListener('submit', function (e) {
    e.preventDefault();     /* To avoid page refresh */

    // To pick value from selected radio input
    for(let i=0; i<userGender.length; i++) {
        if(userGender[i].checked) {
            selGender = userGender[i].value;
        }
    }

    // object
    let data = {
        id : single.id,
        name : userName.value,
        email : userEmail.value,
        gender : selGender
    }

    // console.log('updated user = ', data);
    updateUser(data);
});

// To update user info

function updateUser(data) {
    let index = users.findIndex((item) => item.id === data.id);
    console.log(index);

    // splice()
    users.splice(index,1,data);
    localStorage.setItem('userInfo', JSON.stringify(users));
    alert('User data updated successfully');
    window.location.href = '/index.html';
}