// localStorage config
let users = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];

let results = document.getElementById('results');

// To print data from the localStorage
function printUser() {
    users.forEach(item => {
        results.innerHTML +=  `
            <tr>
                <td> ${item.id} </td>
                <td> ${item.name} </td>
                <td> ${item.email} </td>
                <td> ${item.gender} </td>
                <td>
                    <a href = "/update.html?userId=${item.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                    <a onclick= "deleteUser(${item.id})"><i class="fa-solid fa-trash-can"></i></a>
                </td>

            </tr>
        `
    })
}

printUser();

// To delete the existing user
function deleteUser(id) {
    if(confirm(`Are you sure want to delete the user id = ${id}`)){
        let index = users.findIndex((item) => item.id == id);
        console.log(index);

        if(index === null) {
            alert("user doen not exist");
        } else {
            users.splice(index,1);
            localStorage.setItem('userInfo', JSON.stringify(users));
            window.location.href = '/index.html';
        }
    } else {
        return;
    }
}