$(document).ready(async function () {
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
    findUser: async () => await fetch('api/auth'),
    findAllUsers: async () => await fetch('api/users'),
    findAllRoles: async () => await fetch('api/roles')
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
                            <button href="/api/findOne/?id=${user.id}"
                                type="button"
                                class="btn btn-info eBtn"
                                data-toggle="modal">Edit</button>
                            </td>    
                            <td>
                             <button href="/api/findOne/?id=${user.id}"
                                type="button"
                                class="btn btn-danger dBtn"
                                data-toggle="modal">Delete</button>
                            </td>      
                        </tr>
                )`;
                tableUser.append(tableFilling);
            })
        })

    $('#tbody_users .dBtn').on('click', async function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        let sel = $('#role_delete');
        sel.empty();
        await userFetchAdminService.findAllRoles()
            .then(res => res.json())
            .then(roles => {
                for (let i = 0; i < 2; i++) {
                    let opt = `$(
                         <option value=${roles[i].name}>${roles[i].name}
                        </option>
                    )`;
                    sel.append(opt);
                }
            });
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
    });


    $('#tbody_users .eBtn').on('click', async function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        let userRes;
        let sel = $('#role_edit');
        sel.empty();
        await userFetchAdminService.findAllRoles()
            .then(res => res.json())
            .then(roles => {
                for (let i = 0; i < 2; i++) {
                    let opt = `$(
                         <option value=${roles[i].name}>${roles[i].name}
                        </option>
                    )`;
                    sel.append(opt);
                }
            });
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
    });

    $('#nav-profile-tab').on('click', async(event) => {
        event.preventDefault();
        let sel = $('#role_save');
        sel.empty();
        await userFetchAdminService.findAllRoles()
            .then(res => res.json())
            .then(roles => {
                for (let i = 0; i < 2; i++) {
                    let opt = `$(
                         <option value=${roles[i].name}>${roles[i].name}
                        </option>
                    )`;
                    sel.append(opt);
                }
            });
    })
}

async function editUser() {
    const form = document.getElementById('editForm');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const id = form.querySelector('[name="id"]'),
            name = form.querySelector('[name="name"]'),
            surname = form.querySelector('[name="surname"]'),
            age = form.querySelector('[name="age"]'),
            email = form.querySelector('[name="email"]'),
            password = form.querySelector('[name="password"]'),
            roles = form.querySelector('[name="roles"]');

        const data = {
            id: id.value,
            name: name.value,
            surname: surname.value,
            age: age.value,
            email: email.value,
            password: password.value,
            roles: [{
                name: roles.value
            }]
        };
        let json = JSON.stringify(data);
        console.log(json);
        let response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: json
        });
        if (response.ok) {
            $('#editModal').modal('hide');
            await getTableWithUsers();
        }
    });
}

async function createUser() {
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
            roles: [{
                name: roles.value
            }]
        };
        let json = JSON.stringify(data);
        console.log(json);
        let response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: json
        });
        if (response.ok) {
            document.getElementById("createForm").reset();
            document.getElementById('nav-home-tab').click();
            await getTableWithUsers();
        }
    });
}

async function deleteUser() {
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
            roles: [{
                name: roles.value
            }]
        };
        let json = JSON.stringify(data);
        console.log(json);
        let response = await fetch('/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: json
        });
        if (response.ok) {
            $('#deleteModal').modal('hide');
            await getTableWithUsers();
        }
    });
}