entity = 'plan';
show();
var countTypeworks; //Количество видов нагрузки
var sortIds = [], subjectIds = [], groupIds = [], typeworkIds = [], typeworkSortedIds = []; //Тип нагрузки, номера предметов и групп
var planGroup;

async function show() {
    sortIds = [], subjectIds = [], groupIds = [], typeworkIds = [];
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

     await fetch(`${url}/typework`, requestOptions)
             .then(response => response.json())
             .then(response => addTypeworks(response))
             .catch(error => console.log(`typework - error in find all`, error));

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
};

function addRows(response) {
    planGroup = response;
        $('#data').empty();
    for (let i = 0; i < response.length; i++) {
        let tr = $('<tr>');
        tr.addClass("py-0")
        let id = response[i].id;
        tr.append($('<td>').html(id));

        sortIds.push(response[i].sortWorkId);
        subjectIds.push(response[i].subjectId);
        groupIds.push(response[i].groupId);
        let selectSort = `<select class="form-select mb-3" aria-label="Sort" id="sort${i}" disabled>
                    <option selected>Choose a sort</option></select>`;
        let selectSubject = `<select class="form-select mb-3" aria-label="Subject" id="subject${i}" disabled>
                    <option selected>Choose a subject</option></select>`;
        let selectGroup = `<select class="form-select mb-3" aria-label="Group" id="group${i}" disabled>
                <option selected>Choose a group</option></select>`;
        tr.append($('<td>').html(selectSort));
        tr.append($('<td>').html(selectSubject));
        tr.append($('<td>').html(selectGroup));
        tr.append($('<td>').html(response[i].groupCount));

        typeworkIds = [];
        for (let j = 0; j < countTypeworks; j++) {
            let idTypeWork = response[i].typeWorkCounts[j].id;
            typeworkIds.push(idTypeWork);
        }
        typeworkSortedIds = [...typeworkIds];
        typeworkSortedIds.sort(function(a, b) {
            if( a === Infinity )
                return 1;
            else if( isNaN(a))
                return -1;
            else
                return a - b;
        });
        //console.log(typeworkSortedIds)
        //console.log(typeworkIds)
        for (let j = 0; j < countTypeworks; j++) {
            let idTypeWork = typeworkSortedIds[j];
            let input = $(`<input type="text" id=${idTypeWork} class="form-control mb-3 active font-sm">`);
            //console.log(typeworkIds.indexOf(typeworkSortedIds[j]))
            let count = response[i].typeWorkCounts[typeworkIds.indexOf(typeworkSortedIds[j])].count;
            input.val(response[i].typeWorkCounts[typeworkIds.indexOf(typeworkSortedIds[j])].count);
            tr.append($('<td>').append(input));
        }

        let sum = 0;
        for (let j = 0; j < response[i].typeWorkCounts.length; j++)
            sum += response[i].typeWorkCounts[j].count;
        tr.append($('<td>').html(sum));
        let tdActions = $('<td>');
        tdActions.html(`<div class="container">  
                <button type="button" class="btn btn-outline-danger btn-sm delete_${entity}" data-mdb-toggle="modal" data-mdb-target="#delete_${entity}" id="${id}">Delete</button>
                </div>
            `);
        tr.append(tdActions);
        $('#data').append(tr);
    }
    //console.log(subjectIds)
    //console.log(sortIds)
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

function addTypeworks(response) {
    countTypeworks = response.length;
    let heads = ['#', 'Sort','Subject', 'Group', 'Count'];
    $('#thead').empty();
    for (let i = 0; i < heads.length; i++)
        $('#thead').append($('<th>', {
            text: heads[i],
            class: 'text-center'
        }));

    for (let i = 0; i < response.length; i++) {
        $('#thead').append($('<th>', {
            value: response[i].id,
            text: response[i].shortName,
            class: 'text-center'
        }));
    }

    $('#thead').append($('<th>', {
        text: 'Sum',
        class: 'text-center'
    }));
    let th = $('<th>').html(`Action
        <button type="button" class="btn btn-outline-primary btn-sm" 
        data-mdb-toggle="modal" data-mdb-target="#add_plan">New</button>
        <button type="button" class="btn btn-outline-primary btn-sm" 
        data-mdb-toggle="modal" data-mdb-target="#save_plan">Save</button>              
                `);
    $('#thead').append(th);

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
   // console.log(id);
    $(`#delete_${entity}`).val(id);
    //console.log($(`#delete_${entity}`));
});

$(document).on("click", `#delete_${entity} #delete`, async function () {
    let id = $(this).attr("id");
    //console.log(id)

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    await fetch(`${url}/plan/group`, requestOptions)
        .then(response => response.json())
        .then(response => deletePlans(response))
        .catch(error => console.log(`delete plan - error in find all`, error));

    await show();
});

async function deletePlans(response){
    let id = $(`#delete_${entity}`).val();
    //console.log(id)
    let index = -1;
    for (let i=0; i<response.length; i++)
        if (response[i].id==id) index = i;
        //console.log(index)
        for (let j=0; j<response[index].typeWorkCounts.length; j++)
            if (response[index].typeWorkCounts[j].idPlan!=null)
         res = await fetch(`${url}/${entity}/${response[index].typeWorkCounts[j].idPlan}`,
            {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'}
            });
}

$(document).on("click", `#save_${entity} #save`, async function () {
    //Из таблицы извлечь все ненулевые значения
    let countRows = $('#data').children().length;
    let countCols = $('#data').find("tr:eq(1)").children().length;
    //console.log(countRows);
    //console.log(countCols);
    for (let i=0; i<countRows; i++) {
        let sortId = $('#data').find(`tr:eq(${i})`).find(`td:eq(${1}) select option:selected`).val();
        let subjectId = $('#data').find(`tr:eq(${i})`).find(`td:eq(${2}) select option:selected`).val();
        let groupId = $('#data').find(`tr:eq(${i})`).find(`td:eq(${3}) select option:selected`).val();
        let dateBegin = new Date();
        let dateEnd = new Date();
        for (let j = 0; j < countCols; j++) {
            let input = $('#data').find(`tr:eq(${i})`).find(`td:eq(${j}) input`);
            if (input.val() !== undefined) {
                let index = parseInt(input.attr("id"));
                let idPlan = planGroup[i].typeWorkCounts[typeworkIds.indexOf(index)].idPlan;
                if (input.val() != 0) {
                    //console.log(input.val())
                    //console.log(planGroup[i].typeWorkCounts[input.attr("id")])
                    //console.log(input.attr("id"))
                    //console.log(idPlan)
                    let count = input.val();
                    let typeId = input.attr("id");

                    if (idPlan == null) {
                        let res = await fetch(`${url}/${entity}`,
                            {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({dateBegin, dateEnd, count, groupId, subjectId, typeId, sortId})
                            });
                    } else {
                        let res = await fetch(`${url}/${entity}/${idPlan}`,
                            {
                                method: "PUT",
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    idPlan,
                                    dateBegin,
                                    dateEnd,
                                    count,
                                    groupId,
                                    subjectId,
                                    typeId,
                                    sortId
                                })
                            });
                    }
                    //console.log(input.val());
                } else if (idPlan!=null)
                //Удалить нулевые планы
                    await fetch(`${url}/${entity}/${idPlan}`,
                        {
                            method: "DELETE",
                            headers: {'Content-Type': 'application/json'}
                        });
            }
        }
    }
    //console.log(count)
    await show();
});

$(document).on("click", `#add_${entity} #add`, async function () {
    let dateBegin = $("#dateBeginCreated").val();
    let dateEnd = $("#dateEndCreated").val();
    let count = 0;
    let groupId = $("#groupCreated option:selected").val();
    let subjectId = $("#subjectCreated option:selected").val();
    let typeId = typeworkIds[0];
    let sortId = $("#sortworkCreated option:selected").val();
    //console.log(name)
    const res = await
        fetch(`${url}/${entity}`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({dateBegin, dateEnd, count, groupId, subjectId, typeId, sortId})
            });
    show();

});

