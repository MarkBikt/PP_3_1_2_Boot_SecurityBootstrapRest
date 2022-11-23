$(document).ready(async function () {
    alert("My First Jquery Test");

    await getTableWithAdmin();
    await getTableWithUsers();

});

const userFetchAdminService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findUser: async () => await fetch('admin/auth'),
    findAllUsers: async () => await fetch('admin/index'),
    updateUser: async (data) => await fetch('admin/save', {method: 'PUT', headers: userFetchAdminService.head, body: JSON.stringify(data)})
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
                console.log(user.name);
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

        $('#tbody_users .eBtn').on('click', async function (event) {
            event.preventDefault();
            let href = $(this).attr('href');
            await fetch(href)
                .then(res => res.json())
                .then(function (user) {

                    $('#id_edit').val(user.id);
                    $('#name_edit').val(user.name);
                    $('#surname_edit').val(user.surname);
                    $('#age_edit').val(user.age);
                    $('#email_edit').val(user.email);
                });


            $("#editButton").on('click', async () => {
                let data = {
                    id: $('#id_edit').val().trim(),
                    name: $('#name_edit').val().trim(),
                    surname: $('#surname_edit').val().trim(),
                    age: $('#age_edit').val().trim(),
                    email: $('#email_edit').val().trim(),
                    password: $('#password_edit').val().trim(),
                    roles: $('#role_edit').val()
                };
                const response = userFetchAdminService.updateUser(data);
            });
                $('#editModal').modal();
            });





        $('#tbody_users .dBtn').on('click', async function (event) {
            event.preventDefault();
            var href = $(this).attr('href');
            await fetch(href)
                .then(res => res.json())
                .then(function (user) {
                    $('#id_delete').val(user.id);
                    $('#name_delete').val(user.name);
                    $('#surname_delete').val(user.surname);
                    $('#age_delete').val(user.age);
                    $('#email_delete').val(user.email);
                });
            $('#deleteModal').modal();
        });

}