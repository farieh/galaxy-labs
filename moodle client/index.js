
var moodle_client = require("moodle-client");
var http = require('http');
http.post = require('http-post');

moodle_client.init({
    wwwroot: "http://localhost/moodle/",
    username: "siswa",
    password: "Siswa123$"

}).then(function (client) {
    console.log(client);
    //do_something(client);
    //do_otherthing(client);
    //get_all_user(client);
    get_quizzes_by_courses(client);
    get_user_attempts(client);
    get_attempt_data(client);

}).catch(function (err) {
    console.log("Unable to initialize the client: " + err);
});



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
function get_attempt_data(client) {
    client.call({
        wsfunction: 'mod_quiz_get_attempt_data',
        args: {
            attemptid  : 12,
            page : 3
        },
    }).then(function (info) {
        console.log(info);
        
        $("#quiz").prepend(info.questions["0"].html);

    });
}

function get_user_attempts(client) {
    client.call({
        wsfunction: 'mod_quiz_get_user_attempts',
        args: {
            quizid  : 2,
            status : 'all'
        },
    }).then(function (info) {
        console.log(info);

    });
}

function get_quizzes_by_courses(client) {
    client.call({
        wsfunction: 'mod_quiz_get_quizzes_by_courses ',
        args: {
            courseids   : [1]
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