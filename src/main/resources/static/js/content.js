entity='content';
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

    fetch(`${url}/subject`, requestOptions)
        .then(response => response.json())
        .then(response => addSubjects(response))
        .catch(error => console.log(`subject - error in find all`, error));

    fetch(`${url}/typework`, requestOptions)
        .then(response => response.json())
        .then(response => addTypeworks(response))
        .catch(error => console.log(`typework - error in find all`, error));
}

    function addRows(response) {
        $('#data').empty();
        for (let i = 0; i < response.length; i++) {
            let tr = $('<tr>');
            tr.addClass("py-0")

            let id = response[i].id;
            tr.append($('<td>').html(id));

            tr.append($('<td>').html(response[i].theme));

            tr.append($('<td>').html(response[i].count));

            tr.append($('<td>').html(response[i].subject.name));

            tr.append($('<td>').html(response[i].typeWork.name));

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

function addSubjects(response) {
    $('#subject').empty();
    $('#subjectUpdated').empty();

    for (let i = 0; i < response.length; i++) {
        $('#subject').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
        $('#subjectUpdated').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));

    //let option = $('<option>');
    //option.html(response[i].name);
}
}

function addTypeworks(response) {
    $('#typework').empty();
    $('#typeworkUpdated').empty();

    for (let i = 0; i < response.length; i++) {
        $('#typework').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
        $('#typeworkUpdated').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
        //let option = $('<option>');
        //option.html(response[i].name);
    }
}

$(document).on("click", `#add_${entity} #save`, async function () {
        let theme = $("#theme").val();
        let count = $("#count").val();
        let subjectId = $("#subject option:selected").val();
        let typeId = $("#typework option:selected").val();
        //console.log(name)
        const res = await
            fetch(`${url}/${entity}`,
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({theme, count, subjectId, typeId})
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
    console.log('ok')
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
            $(`#update_${entity} #themeUpdated`).val(response.theme);
            $(`#update_${entity} #countUpdated`).val(response.count);
            $("#subjectUpdated").val(response.subject.id);
            $("#typeworkUpdated").val(response.typeWork.id);
            //console.log(response)
        })
        .catch(error => console.log('error', error));
});

$(document).on("click", `#update_${entity} #update`, async function(){
    let id = $(`#update_${entity}`).val();
    let theme = $(`#update_${entity} #themeUpdated`).val();
    let count = $(`#update_${entity} #countUpdated`).val();
    let subjectId = $("#subjectUpdated").val();
    let typeId = $("#typeworkUpdated").val();
    const res = await fetch(`${url}/${entity}/${id}`,
        {
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({id, theme, count, subjectId, typeId})
        });
    show();
});