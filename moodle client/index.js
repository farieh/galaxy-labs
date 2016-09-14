
var moodle_client = require("moodle-client");

moodle_client.init({
    wwwroot: "http://localhost/moodle/",
    token: "e7c2eb02d743314e32b3764492004ef7",
    service: "Administrator"

}).then(function (client) {
    console.log(client);
    //do_something(client);
    //do_otherthing(client);
    get_all_user(client);


}).catch(function (err) {
    console.log("Unable to initialize the client: " + err);
});


function delete_user(id) {
    moodle_client.init({
        wwwroot: "http://localhost/moodle/",
        token: "e7c2eb02d743314e32b3764492004ef7",
        service: "Administrator"

    }).then(function (client) {

        client.call({
            wsfunction: 'core_user_delete_users',
            args: {
                userids: [id]
            },
        }).then(function (info) {
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
        var arraylength = info.users.length;
        for (var i = 1; i < arraylength; i++) {
            tableUser = tableUser + '<tr><td>' + info.users[i].id + '</td><td>' + info.users[i].username + '</td><td>' + info.users[i].fullname + '</td><td>' + info.users[i].email + '</td><td><a href="#" id="user-delete" onClick="delete_user(' + info.users[i].id + ')" value="' + info.users[i].id + '">Delete</a></td></tr>';
        };

        $("#table-body").append(tableUser);
    });
}
var tableUser;


function do_otherthing(client) {
    client.call({
        wsfunction: 'core_course_create_categories',
        method: 'POST',
        args: {
            categories: [{
                name: 'Pendidikan',
                parent: 0,
                descriptionformat: 1
            }]

        },
    }).then(function (info) {
        console.log(info);

    });
}

function do_something(client) {
    client.call({
        wsfunction: "core_user_create_users",
        method: 'POST',
        args: {
            users: [{
                username: 'nani',
                password: 'B1smillah..',
                firstname: 'Nuna',
                lastname: 'Narita',
                email: 'nani@gmail.com',
                auth: 'manual',
                idnumber: '',
                lang: 'en',
                calendartype: 'gregorian'
            }]
        },
    }).then(function (info) {
        console.log(info);

    });
}


function create_user(client,usrname,psword,fsname,lsname,usrmail) {
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
        
        if(info[0].username != null){
            console.log('Complete registering '+usrname)
            $("#create-user").collapse('hide');
            $("input").val('');
        }
        
    });
}