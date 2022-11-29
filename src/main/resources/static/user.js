$(document).ready(async function () {
    await getTableWithUser();

});

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findUser: async () => await fetch('api/auth'),
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
