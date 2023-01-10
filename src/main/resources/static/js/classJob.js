entity = 'student';
var query = `${url}/${entity}`;
var queryActual = `${url}/actual`;
var queryMark = `${url}/mark`;
var students, actuals, marks;

show();

async function show() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    await fetch(queryActual, requestOptions)
        .then(response => response.json())
        .then(response => addActuals(response))
        .catch(error => console.log(`actual - error in find all`, error));

    await fetch(queryMark, requestOptions)
        .then(response => response.json())
        .then(response => addMarks(response))
        .catch(error => console.log(`mark - error in find all`, error));

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
    students = response;
    //Заголовок с указанием предмета, группы
    $('#header').empty();
    if ($('#group').val()>0) {
        let subject = $('#subject').find(":selected").text();
        let group = $('#group').find(":selected").text();
        let typework = $('#typework').find(":selected").text();
        $('#header').append(`<div><h5 class="fs-6">Group: ${group}, Subject: ${subject}, Type: ${typework}</h5></div>`);
    }

    $('#head').empty();
    $('#head').append('<th>#</th>');
    let th = $('<th>');
    th.addClass("min-width");
    th.html('Student');
    $('#head').append(th);
    for (let i=0; i<actuals.length; i++) {
        let dateUtc = moment.utc(actuals[i].date);
        let localDate = moment(dateUtc).local();
        let dateFormat = 'DD-MM-YY';
        let th = $('<th>').html(localDate.format(dateFormat));
        th.addClass("th-rotate font-sm");
        $('#head').append(th);
    }
     th = $('<th>').html(`Actions
        <button type="button" class="btn btn-outline-primary btn-sm" 
        data-mdb-toggle="modal" data-mdb-target="#save_marks">Save</button>              
                `);
    $('#head').append(th);
    $('#data').empty();

    for (let i = 0; i < response.length; i++) {
        let tr = $('<tr>');
        tr.addClass("py-0 min-width");

        tr.append(`<td>${i+1}</td>`);
        let id = response[i].id;
        let name = `${response[i].surname} ${response[i].name.charAt(0)}. ${response[i].patronymic.charAt(0)}.`;
        let td = $('<td>');
        td.addClass('min-width');
        tr.append(td.html(name));

        for (let j = 0; j < actuals.length; j++) {
            let tdActions = $('<td>');
            let select = $('<select>');

            select.append($(`<option></option>`));
            for (let k=10; k>=0; k--)
                select.append($(`<option>${k}</option>`));
            select.addClass('select-mark present');
            tdActions.html(select);

            /*
            tdActions.html(`<div class="container">
                <button type="button" class="btn add_mark present" data-mdb-toggle="modal" data-mdb-target="#add_mark" id="${id}">&nbsp&nbsp&nbsp&nbsp</button>
                </div>`);
             */
            tdActions.addClass('max-width td-border')
            tr.append(tdActions);

            $('#data').append(tr);
        }
        td = $('<td><span class="badge rounded-pill badge-danger" count="0"></span></td>');
        tr.append(td);
        $('#data').append(tr);
    }

    //Отображение оценок
    for (let i=0; i<marks.length; i++){
        let studentId = marks[i].student.id;
        let actualId = marks[i].actual.id;
        let studentIndex = students.findIndex(function (student){ return student.id == studentId});
        let actualIndex = actuals.findIndex(function (actual){ return actual.id == actualId});
        let select = $('#data').find(`tr:eq(${studentIndex})`).find(`td:eq(${actualIndex+2}) select`);
        select.attr("id",marks[i].id);
        select.val(marks[i].mark).change();

        //console.log(marks[i].presence);
        if (!marks[i].presence){
            select.removeClass("present");
            select.addClass("missing");
            let span = $('#data').find(`tr:eq(${studentIndex})`).find(`td:eq(${actuals.length+2}) span`);
            //console.log(span)
            let count = span.attr("count");
            count++;
            span.attr("count", count);
            span.html(count);
        }
    }
}

function addActuals(response) {
    actuals = response;
    //console.log(actuals);
}

function addMarks(response) {
    marks = response;
    //console.log(marks);
}

function addSubjects(response) {
    $('#subject').empty();
    for (let i = 0; i < response.length; i++) {
        $('#subject').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
    }
}

function addTypeworks(response) {
    $('#typework').empty();
    for (let i = 0; i < response.length; i++) {
        $('#typework').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
    }
}

function addSortworks(response) {
    $('#sortwork').empty();
    for (let i = 0; i < response.length; i++) {
        $('#sortwork').append($('<option>', {
            value: response[i].id,
            text: response[i].name
        }));
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
$(document).on("click", `#add_actual #ok`, async function () {
        let date = $("#date").val();
        let dateStart = '1970-01-01';

        let subjectId = $("#subject option:selected").val();
        let groupId = $("#group option:selected").val();
        let typeId = $("#typework option:selected").val();
        let sortId = $("#sortwork option:selected").val();
        let count = $("#count").val();
        await fetch(`${url}/actual`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({date, count, groupId, subjectId, typeId, sortId})
            });

        query = `${url}/${entity}/group/${groupId}`;
        queryActual = `${url}/actual/sort/${sortId}/subject/${subjectId}/group/${groupId}/dateStart/${dateStart}/dateEnd/${dateNowF}`;
        queryMark = `${url}/mark/sort/${sortId}/subject/${subjectId}/group/${groupId}/type/${typeId}`;
        //console.log(queryActual);
        show();
    }
);

$(document).on("click", `#save_marks #save`, async function () {
       //console.log(actuals);
       //console.log(students);
    //Из таблицы извлечь все ненулевые значения
    let countRows = $('#data').children().length;
    let countCols = $('#data').find("tr:eq(1)").children().length;
    for (let i=0; i<countRows; i++) {
        for (let j = 2; j < countCols; j++) {
            let select = $('#data').find(`tr:eq(${i})`).find(`td:eq(${j}) select`);
            if (select.val() !== undefined) {
                let idMark = select.attr("id");
                let mark = select.val();
                let presence = select.hasClass("missing")?false:true;
                let studentId = students[i].id;
                let actualId = actuals[j-2].id;
                //return;
                if (mark!='' || !presence)
                if (idMark == null) {
                    let res = await fetch(`${url}/mark`,
                        {
                            method: "POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({mark, presence, studentId, actualId})
                        });
                } else {
                    let res = await fetch(`${url}/mark/${idMark}`,
                        {
                            method: "PUT",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({idMark, mark, presence, studentId, actualId})
                        });
                }
                else if (idMark!=null){
                    let res = await fetch(`${url}/mark/${idMark}`,
                        {
                            method: "DELETE",
                            headers: {'Content-Type': 'application/json'}
                        });
                }
            }
        }
    }
    await show();
    });

$(document).on("click", `.select-mark`,  function (event) {
    //console.log(cntrlIsPressed)
    $(event.target).attr('present', function(index, attr){
        return attr == null ? true : null;
    });
    let present =  $(event.target).attr('present');
    if (event.ctrlKey) {
        $(event.target).children().prop('disabled', true);
        //console.log('ok')
        if (present) {
            //$(event.target).attr("disabled", "true");
            $(event.target).removeClass("present");
            $(event.target).addClass("missing");
        }
        else
        {
            //$(event.target).prop("disabled", false);
            $(event.target).removeClass("missing");
            $(event.target).addClass("present");
        }
        event.preventDefault();
        this.blur();
        //window.focus();
    }
    $(event.target).children().prop('disabled', false);
});