entity = 'actual';
var typeworks = [];
var query = `${url}/${entity}`;
show();

async function show() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    await fetch(`${url}/typework`, requestOptions)
        .then(response => response.json())
        .then(response => addTypeworks(response))
        .catch(error => console.log(`typework - error in find all`, error));

    await fetch(query, requestOptions)
        .then(response => response.json())
        .then(response => addRows(response))
        .catch(error => console.log(`${entity} - error in find all`, error));

    await fetch(`${url}/subject`, requestOptions)
        .then(response => response.json())
        .then(response => addSubjects(response))
        .catch(error => console.log(`subject - error in find all`, error));

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
        var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        var date = new Date(response[i].date);
        //console.log(dateBegin.toLocaleString("en-US", options))

        tr.append($('<td>').html(date.toLocaleString("ru-RU", options)));
        tr.append($('<td>').html(response[i].subject.name));
        tr.append($('<td>').html(response[i].group.name));
        tr.append($('<td>').html(response[i].typeWork.shortName));
        tr.append($('<td>').html(response[i].count));
        $('#data').append(tr);
        let found = typeworks.find(typework => typework.id==response[i].typeWork.id);
        //console.log(found)
        if (found!=null) found.count+=response[i].count;
    }
    //console.log(typeworks)
     let message = ''; let sum = 0;
    typeworks.forEach(function (element) {
        if (element.count>0)
        message+=`${element.shortName}: ${Math.round(element.count * 100) / 100}, `;
        sum+=element.count;
    });

    message+='Sum: '+Math.round(sum * 100) / 100;

    let tr = $('<tr>');
    tr.append($('<td>').html(message));
    $('#data').append(tr);
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
    typeworks = response;
    typeworks.forEach(function (element) {
        element.count = 0;
    });
    //console.log(typeworks);
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
$(document).on("click", `#add_${entity} #ok`, async function () {
        let dateStart = $("#dateStart").val();
        let dateEnd = $("#dateEnd").val();
        let sortId = $("#sortwork option:selected").val();
        query = `${url}/${entity}/sort/${sortId}/dateStart/${dateStart}/dateEnd/${dateEnd}`;
        show();
    }
);