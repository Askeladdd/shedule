entity = 'actual';
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

    await fetch(`${url}/subject`, requestOptions)
        .then(response => response.json())
        .then(response => addSubjects(response))
        .catch(error => console.log(`subject - error in find all`, error));

    await fetch(`${url}/typework`, requestOptions)
        .then(response => response.json())
        .then(response => addTypeworks(response))
        .catch(error => console.log(`typework - error in find all`, error));

    await fetch(`${url}/sortwork`, requestOptions)
        .then(response => response.json())
        .then(response => addSortworks(response))
        .catch(error => console.log(`sortwork - error in find all`, error));

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

        var options = {year: 'numeric', month: 'numeric', day: 'numeric'};

        var date = new Date(response[i].date);
        //console.log(dateBegin.toLocaleString("en-US", options))

        tr.append($('<td>').html(date.toLocaleString("ru-RU", options)));

        tr.append($('<td>').html(Math.round(response[i].count * 100) / 100));

        tr.append($('<td>').html(response[i].group.name));

        tr.append($('<td>').html(response[i].subject.name));

        tr.append($('<td>').html(response[i].typeWork.shortName));

        tr.append($('<td>').html(response[i].sortWork.name));

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
    }
}

function addSortworks(response) {
    $('#sortwork').empty();
    $('#sortworkUpdated').empty();

    for (let i = 0; i < response.length; i++) {
        $('#sortwork').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
        $('#sortworkUpdated').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
    }
}

function addGroups(response) {
    $('#group').empty();
    $('#groupUpdated').empty();

    for (let i = 0; i < response.length; i++) {
        $('#group').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
        $('#groupUpdated').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
    }
}

$(document).off("click");
$(document).on("click", `#add_${entity} #save`, async function () {
        let date = $("#date").val();
        let count = $("#count").val();
        let groupId = $("#group option:selected").val();
        let subjectId = $("#subject option:selected").val();
        let typeId = $("#typework option:selected").val();
        let sortId = $("#sortwork option:selected").val();
        //console.log(count)
        const res = await fetch(`${url}/${entity}`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({date, count, groupId, subjectId, typeId, sortId})
            });
        show();
    }
);

$(document).on("click", `.delete_${entity}`, function () {
    let id = $(this).attr("id");
    //console.log(id);
    $(`#delete_${entity}`).val(id);
    //console.log($(`#delete_${entity}`));
});

$(document).on("click", `#delete_${entity} #delete`, async function () {
    let id = $(`#delete_${entity}`).val();
    //console.log(id)
    const res = await fetch(`${url}/${entity}/${id}`,
        {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        });
    show();
});

$(document).on("click", `.update_${entity}`, async function () {
    let id = $(this).attr("id");
    //console.log(id)
    await fetch(`${url}/${entity}/${id}`, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => {
            $(`#update_${entity}`).val(id);

            var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
            var date = new Date(response.date);

            var day = ("0" + date.getDate()).slice(-2);
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            date = date.getFullYear() + "-" + (month) + "-" + (day);

            $(`#update_${entity} #dateUpdated`).val(date);
            $(`#update_${entity} #countUpdated`).val(response.count);
            $("#groupUpdated").val(response.group.id);
            $("#subjectUpdated").val(response.subject.id);
            $("#typeworkUpdated").val(response.typeWork.id);
            $("#sortworkUpdated").val(response.sortWork.id);
            //console.log(response)
        })
        .catch(error => console.log('error', error));
});

$(document).on("click", `#update_${entity} #update`, async function () {
    let id = $(`#update_${entity}`).val();
    let date = $(`#update_${entity} #dateUpdated`).val();
    let count = $(`#update_${entity} #countUpdated`).val();
    console.log(count)
    let groupId = $("#groupUpdated").val();
    let subjectId = $("#subjectUpdated").val();
    let typeId = $("#typeworkUpdated").val();
    let sortId = $("#sortworkUpdated").val();
    const res = await fetch(`${url}/${entity}/${id}`,
        {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, date, count, groupId, subjectId, typeId, sortId})
        });
    show();
});

