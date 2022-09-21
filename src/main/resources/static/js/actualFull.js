entity = 'actual';
var sortIds = [], subjectIds = [], groupIds = [], typeIds = [];
var responseActual;
show();

async function show() {
    sortIds = [], subjectIds = [], groupIds = [], typeIds = [];

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    await fetch(`${url}/${entity}/group`, requestOptions)
            .then(response => response.json())
            .then(response => addRows(response))
            .catch(error => console.log(`${entity}/group - error in find all`, error));

    await fetch(`${url}/sortwork`, requestOptions)
            .then(response => response.json())
            .then(response => addSorts(response))
            .catch(error => console.log(`sort - error in find all`, error));

    await fetch(`${url}/subject`, requestOptions)
            .then(response => response.json())
            .then(response => addSubjects(response))
            .catch(error => console.log(`subject - error in find all`, error));

    await fetch(`${url}/group`, requestOptions)
            .then(response => response.json())
            .then(response => addGroups(response))
            .catch(error => console.log(`group - error in find all`, error));

    await fetch(`${url}/typework`, requestOptions)
        .then(response => response.json())
        .then(response => addTypes(response))
        .catch(error => console.log(`type - error in find all`, error));
};

function addRows(response) {
        responseActual = response;
        $('#data').empty();
    for (let i = 0; i < response.length; i++) {
        let tr = $('<tr>');
        tr.addClass("py-0")
        let id = i;
        let sort = response[i].sortWork.id;
        let subject = response[i].subjectId;
        let group = response[i].groupId;
        tr.append($('<td>').html(id));

        sortIds.push(response[i].sortWork.id);
        subjectIds.push(response[i].subject.id);
        groupIds.push(response[i].group.id);
        typeIds.push(response[i].typeWork.id);
        let selectSort = `<select class="form-select mb-3 max-width" aria-label="Sort" id="sort${i}" disabled>
                    <option selected>Choose a sort</option></select>`;
        let selectSubject = `<select class="form-select mb-3 max-width" aria-label="Subject" id="subject${i}" disabled>
                    <option selected>Choose a subject</option></select>`;
        let selectGroup = `<select class="form-select mb-3 max-width" aria-label="Group" id="group${i}" disabled>
                <option selected>Choose a group</option></select>`;
        let selectType = `<select class="form-select mb-3 max-width" aria-label="Type" id="type${i}" disabled>
                <option selected>Choose a type</option></select>`;
        tr.append($('<td>').html(selectSort));
        tr.append($('<td>').html(selectSubject));
        tr.append($('<td>').html(selectGroup));
        tr.append($('<td>').html(selectType));
        tr.append($('<td>').html(response[i].count));

        let tdActions = $('<td>');
        tdActions.html(`<div class="container">  
                <button type="button" class="btn btn-outline-danger btn-sm delete_${entity}" data-mdb-toggle="modal" data-mdb-target="#delete_${entity}" id="${id}">Delete</button>
                </div>
            `);
        tr.append(tdActions);
        $('#data').append(tr);
    }
}

function addSorts(response) {
    $('[id^=sort]').empty();

    for (let i = 0; i < response.length; i++) {
        $('[id^=sort]').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
    }
    for (let i=0; i<sortIds.length; i++)
        $(`[id^=sort${i}]`).val(sortIds[i]);
}

function addSubjects(response) {
    $('[id^=subject]').empty();

    for (let i = 0; i < response.length; i++) {
        $('[id^=subject]').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
    }
    for (let i=0; i<subjectIds.length; i++)
        $(`[id^=subject${i}]`).val(subjectIds[i]);
}

function addTypes(response) {
    $('[id^=type]').empty();

    for (let i = 0; i < response.length; i++) {
        $('[id^=type]').append($('<option>', {
            value: response[i].id,
            text: response[i].shortName
        }));
    }
    for (let i=0; i<typeIds.length; i++)
        $(`[id^=type${i}]`).val(typeIds[i]);
}

function addGroups(response) {
    $('[id^=group]').empty();

    for (let i = 0; i < response.length; i++) {
        $('[id^=group]').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
    }
    for (let i=0; i<groupIds.length; i++)
        $(`[id^=group${i}]`).val(groupIds[i]);
}

$(document).on("click", `.delete_${entity}`, function () {
    let id = $(this).attr("id");
    //console.log(id);
    $(`#delete_${entity}`).val(id);
    //console.log($(`#delete_${entity}`));
});

$(document).on("click", `#delete_${entity} #delete`, async function () {
    let id = $(`#delete_${entity}`).val();
    let sortId = sortIds[id];
    let subjectId = subjectIds[id];
    let groupId = groupIds[id];
    let typeId = typeIds[id];
    //console.log(id)
    //console.log(sortIds[id])
    await fetch(`${url}/${entity}/sort/${sortId}/subject/${subjectId}/group/${groupId}/type/${typeId}`,
        {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        });

    await show();
});

$(document).on("click", `#add_${entity} #add`, async function () {

    let sortId = $("#sortworkCreated option:selected").val();
    let groupId = $("#groupCreated option:selected").val();
    let subjectId = $("#subjectCreated option:selected").val();
    let typeId = $("#typeworkCreated option:selected").val();
    let dateBegin = $("#dateBeginCreated").val();
    let dateEnd = $("#dateEndCreated").val();
    let option = $('#each').prop("checked");
    let count = $("#countCreated").val();

    if (moment(dateEnd).isBefore(dateBegin)) return;

    let date = dateBegin;
    let diff = option?7:14;

    while (moment(date).isBefore(dateEnd)){
        await
            fetch(`${url}/${entity}`,
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({date, count, subjectId, groupId, typeId, sortId})
                });
        date = moment(date).add(diff, 'd').toDate();
    }

    show();

});

