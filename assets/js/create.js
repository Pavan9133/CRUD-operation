// DOM Elements
let userForm = document.getElementById('userForm');
let userName = document.getElementById('name');
let userEmail = document.getElementById('email');
let userGender = document.getElementsByName('gender');
let selGender = "";

// localStorage config
let users = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];
console.log(users);

// To generate random Id
let genRadId = () => {
    let randId = Math.floor(Math.random() * 10000);
    return randId;
}

// Form Submit Handler
userForm.addEventListener('submit', (e) => {
    e.preventDefault(); /* To avoid page refresh */

    // To pick value from selected radio input
    for(let i=0; i<userGender.length; i++) {
        if(userGender[i].checked) {
            selGender = userGender[i].value;
        }
    }

    let data = {
        id: genRadId(),
        name: userName.value,
        email: userEmail.value,
        gender: selGender,
    }

    // console.log("New User =", data);
    createUser(data);
});

// To create new user
function createUser(user) {
    let exUser = users.find((item) => item.email === user.email);
    console.log(exUser);

    if(exUser) {
        alert('User Email already registered');
    } else {
        //save
        users.push(user);
        localStorage.setItem('userInfo', JSON.stringify(users));
        alert('New User created successfully');
        window.location.href = '/index.html';
    }
}


