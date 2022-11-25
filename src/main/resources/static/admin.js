$(document).ready(async function () {
    //alert("My First Jquery Test");

    await getTableWithAdmin();
    await getTableWithUsers();
    await editUser();
    await createUser();
    await deleteUser();
});

const userFetchAdminService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findUser: async () => await fetch('admin/auth'),
    findAllUsers: async () => await fetch('admin/index'),
}

async function getTableWithAdmin() {
    let tableAdmin = $('#tbody_admin');
    tableAdmin.empty();

    await userFetchAdminService.findUser()
        .then(res => res.json())
        .then(admin => {
            $('#admin_email').html(admin.email);
            $('#admin_role').html(admin.roles.map(role => role.name).join('\n'));
            let tableFilling = `$(
                        <tr>
                            <td>${admin.id}</td>
                            <td>${admin.name}</td>
                            <td>${admin.surname}</td>
                            <td>${admin.age}</td>     
                            <td>${admin.email}</td>                                       
                            <td>
                                ${admin.roles.map(role => role.name).join(' ')}
                            </td>                           
                        </tr>
                )`;
            tableAdmin.append(tableFilling);
        })


}

async function getTableWithUsers() {
    let tableUser = $('#tbody_users');
    tableUser.empty();

    await userFetchAdminService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let tableFilling = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.age}</td>     
                            <td>${user.email}</td>                                       
                            <td>
                                ${user.roles.map(role => role.name).join(' ')}
                            </td> 
                            <td>
                            <button href="/admin/findOne/?id=${user.id}"
                                type="button"
                                class="btn btn-info eBtn"
                                data-toggle="modal">Edit</button>
                            </td>    
                            <td>
                             <button href="/admin/findOne/?id=${user.id}"
                                type="button"
                                class="btn btn-danger dBtn"
                                data-toggle="modal">Delete</button>
                            </td>      
                        </tr>
                )`;
                tableUser.append(tableFilling);
            })
        })
}

async function editUser() {
    $('#tbody_users .eBtn').on('click', async function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        let userRes;
        await fetch(href)
            .then(res => res.json())
            .then(async function (user) {
                userRes = {
                id: $('#id_edit').val(user.id),
                name: $('#name_edit').val(user.name),
                surname: $('#surname_edit').val(user.surname),
                    age: $('#age_edit').val(user.age),
                email: $('#email_edit').val(user.email),
                password: $('#password_edit').val(''),
                roles: $('#role_edit').val('')
                };
            });
        $('#editModal').modal();
        const form = document.getElementById('editForm');
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            const id = form.querySelector('[name="id"]'),
                name = form.querySelector('[name="name"]'),
                surname = form.querySelector('[name="surname"]'),
                age = form.querySelector('[name="age"]'),
                email = form.querySelector('[name="email"]'),
                password = form.querySelector('[name="password"]'),
                roles = form.querySelector('[name="roles"]')

            const data = {
                id: id.value,
                name: name.value,
                surname: surname.value,
                age: age.value,
                email: email.value,
                password: password.value,
                roles: [ {
                    name: roles.value
                } ]
            };
            let json = JSON.stringify(data);
            console.log(json);
            let response = await fetch('/admin/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: json
            });
            $('#editModal').modal('hide');

        });


    });

}

async function createUser() {
    /*$('.nBtn').on('click', async function(event) {
        event.preventDefault();*/

       /* $('#createButton').on('click', async function(event) {
            event.preventDefault();*/
            const form = document.getElementById('createForm');
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const name = form.querySelector('[name="name"]'),
                    surname = form.querySelector('[name="surname"]'),
                    age = form.querySelector('[name="age"]'),
                    email = form.querySelector('[name="email"]'),
                    password = form.querySelector('[name="password"]'),
                    roles = form.querySelector('[name="roles"]')

                const data = {
                    name: name.value,
                    surname: surname.value,
                    age: age.value,
                    email: email.value,
                    password: password.value,
                    roles: [ {
                        name: roles.value
                    } ]
                };
                let json = JSON.stringify(data);
                console.log(json);
                let response = await fetch('/admin/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: json
                });

            });

            //window.history.back();
        //});
    //});
}

async function deleteUser() {
    $('#tbody_users .dBtn').on('click', async function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        await fetch(href)
            .then(res => res.json())
            .then(async function (user) {
                $('#id_delete').val(user.id);
                $('#name_delete').val(user.name);
                $('#surname_delete').val(user.surname);
                $('#age_delete').val(user.age);
                $('#email_delete').val(user.email);
            });
        $('#deleteModal').modal();
        const form = document.getElementById('deleteForm');
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            const id = form.querySelector('[name="id"]'),
                name = form.querySelector('[name="name"]'),
                surname = form.querySelector('[name="surname"]'),
                age = form.querySelector('[name="age"]'),
                email = form.querySelector('[name="email"]'),
                roles = form.querySelector('[name="roles"]')

            const data = {
                id: id.value,
                name: name.value,
                surname: surname.value,
                age: age.value,
                email: email.value,
                roles: [ {
                    name: roles.value
                } ]
            };
            let json = JSON.stringify(data);
            console.log(json);
            let response = await fetch('/admin/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: json
            });
            $('#deleteModal').modal('hide');
        });
    });
}