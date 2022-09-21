entity='sortwork';
show();

function show() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`${url}/${entity}`, requestOptions)
        .then(response => response.json())
        .then(response => addRows(response))
        .catch(error => console.log(`${entity} - error in find all`, error));
}

    function addRows(response) {
        $('#data').empty();
        for (let i = 0; i < response.length; i++) {
            let tr = $('<tr>');
            tr.addClass("py-0")

            let id = response[i].id;
            tr.append($('<td>').html(id));

            tr.append($('<td>').html(response[i].name));

            let tdActions = $('<td>');
            tdActions.html(`<div class="container">
                <button type="button" class="btn btn-outline-primary btn-sm update_${entity}" data-mdb-toggle="modal" data-mdb-target="#update_${entity}" id="${id}">Change</button>
                <button type="button" class="btn btn-outline-danger btn-sm delete_${entity}" data-mdb-toggle="modal" data-mdb-target="#delete_${entity}" id="${id}">Delete</button>
                </div>
            `);
            tr.append(tdActions);
            $('#data').append(tr);
        }
}

$(document).on("click", `#add_${entity} #save`, async function () {
        let name = $("#name").val();
        //console.log(name)
        const res = await
            fetch(`${url}/${entity}`,
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name})
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
    let id = $(`#delete_${entity}`).val();
    //console.log(id)
    const res = await fetch(`${url}/${entity}/${id}`,
        {method: "DELETE",
            headers:{'Content-Type':'application/json'}
        });
    show();
});

$(document).on("click", `.update_${entity}`, function(){
    let id = $(this).attr("id");
    //console.log(id)
    fetch(`${url}/${entity}/${id}`, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => {
            $(`#update_${entity}`).val(id);
            $(`#update_${entity} #nameUpdated`).val(response.name);
            //console.log(response)
        })
        .catch(error => console.log('error', error));
});

$(document).on("click", `#update_${entity} #update`, async function(){
    let id = $(`#update_${entity}`).val();
    let name = $(`#update_${entity} #nameUpdated`).val();
    const res = await fetch(`${url}/${entity}/${id}`,
        {
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({id, name})
        });
    show();
});