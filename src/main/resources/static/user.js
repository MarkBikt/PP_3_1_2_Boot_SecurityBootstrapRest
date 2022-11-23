$(document).ready(async function () {
    alert("My First Jquery Test");

    await getTableWithUser();

});

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findUser: async () => await fetch('user/auth'),
}

async function getTableWithUser() {
    let table = $('#tbody');
    table.empty();

    await userFetchService.findUser()
        .then(res => res.json())
        .then(user => {
                $('#nav_email').html(user.email);
                $('#nav_roles').html(user.roles.map(role => role.name).join(' '));
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
                        </tr>
                )`;
                table.append(tableFilling);
        })
    }




/*await fetch("http://localhost:8080/user/auth")
    .then(res => res.json())
    .then(function (data) {
        $('#nav_email').html(data.email);

        $('#id').html(data.id);
        $('#name').html(data.name);
        $('#surname').html(data.surname);
        $('#age').html(data.age);
        $('#email').html(data.email);

        for (let i = 0; i < data.roles.length; i++) {
            $('#roles').html(data.roles[i].name);
            $('#nav_roles').html(data.roles[i].name);
        }
    });*/