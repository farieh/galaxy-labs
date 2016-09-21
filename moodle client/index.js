
var moodle_client = require("moodle-client");

moodle_client.init({
    wwwroot: "http://localhost/moodle/",
    username: "1111",
    password: "Password123$"

}).then(function (client) {
    console.log(client);
    //do_something(client);
    do_otherthing(client);
    //get_all_user(client);


}).catch(function (err) {
    console.log("Unable to initialize the client: " + err);
});


function delete_user(id) {
    moodle_client.init({
        wwwroot: "http://localhost/moodle/",
        username: "1111",
        password: "Password123$"

    }).then(function (client) {

        client.call({
            wsfunction: 'core_user_delete_users',
            args: {
                userids: [id]
            },
        }).then(function (info) {
            $("#" + id).remove();
            console.log('User ' + id + ' deleted');
        })
    })
}

function get_all_user(client) {
    client.call({
        wsfunction: 'core_user_get_users',
        args: {
            criteria: [
                {
                    key: 'email',
                    value: '%%'
                }
            ]

        },
    }).then(function (info) {
        //console.log(info);
        var tableUser;
        var arraylength = info.users.length;
        for (var i = 1; i < arraylength; i++) {
            tableUser = tableUser + '<tr id="' + info.users[i].id + '"><td>' + info.users[i].id + '</td><td>' + info.users[i].username + '</td><td>' + info.users[i].fullname + '</td><td>' + info.users[i].email + '</td><td><a href="#" id="user-delete" onClick="delete_user(' + info.users[i].id + ')" value="' + info.users[i].id + '">Delete</a></td></tr>';
        };

        $("#table-body").append(tableUser);
    });
}

function do_otherthing(client) {
    client.call({
        wsfunction: 'mod_quiz_get_quizzes_by_courses',
        args: {
            courseids : [1]
        },
    }).then(function (info) {
        console.log(info);

    });
}

function do_something(client) {

}


function create_user(client, usrname, psword, fsname, lsname, usrmail) {
    client.call({
        wsfunction: "core_user_create_users",
        method: 'POST',
        args: {
            users: [{
                username: usrname,
                password: psword,
                firstname: fsname,
                lastname: lsname,
                email: usrmail,
                auth: 'manual',
                idnumber: '',
                lang: 'en',
                calendartype: 'gregorian'
            }]
        },
    }).then(function (info) {
        console.log(info);
        if (info[0].username != null) {
            console.log('Complete registering ' + usrname)
            $("#create-user").collapse('hide');
            $("input").val('');
            $("tr").remove();
            get_all_user(client);

        }

    });
}