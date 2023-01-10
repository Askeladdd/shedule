entity='student';
show();

async function show() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

   await fetch(`${url}/${entity}`, requestOptions)
        .then(response => response.json())
        .then(response => addRows(response))
        .catch(error => console.log(`${entity} - error in find all`, error));

    await fetch(`${url}/group`, requestOptions)
        .then(response => response.json())
        .then(response => addGroups(response))
        .catch(error => console.log(`group - error in find all`, error));
}

    function addRows(response) {
        $('#data').empty();
        for (let i = 0; i < response.length; i++) {
            let tr = $('<tr>');
            tr.addClass("py-0")

            let id = response[i].id;
            tr.append($('<td>').html(id));

            tr.append($('<td>').html(response[i].surname));
            tr.append($('<td>').html(response[i].name));
            tr.append($('<td>').html(response[i].patronymic));

            tr.append($('<td>').html(response[i].group.name));

            let tdActions = $('<td>');
            tdActions.html(`<div class="container">
                <button type="button" class="btn btn-outline-danger btn-sm delete_${entity}" data-mdb-toggle="modal" data-mdb-target="#delete_${entity}" id="${id}">Delete</button>
                </div>
            `);
            tr.append(tdActions);
            $('#data').append(tr);
        }
}

function addGroups(response) {
    $('#group').empty();

    for (let i = 0; i < response.length; i++) {
        $('#group').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
}
}

$(document).off("click");
$(document).on("click", `#add_${entity} #save`, async function () {
        let surname = $("#surname").val();
        let name = $("#name").val();
        let patronymic = $("#patronymic").val();
        let groupId = $("#group option:selected").val();
        console.log(groupId)
        const res = await fetch(`${url}/${entity}`,
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({surname, name, patronymic, groupId})
                });
        show();
    }
);

$(document).on("click", `.delete_${entity}`, function(){
    let id = $(this).attr("id");
    //console.log(id);
    $(`#delete_${entity}`).val(id);
    //console.log($(`#delete_${entity}`));
});

$(document).on("click", `#delete_${entity} #delete`, async function () {
    //console.log('ok')
    let id = $(`#delete_${entity}`).val();
    //console.log(id)
    const res = await fetch(`${url}/${entity}/${id}`,
        {method: "DELETE",
            headers:{'Content-Type':'application/json'}
        });
    show();
});
