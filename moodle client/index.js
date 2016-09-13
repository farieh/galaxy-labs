
var moodle_client = require("moodle-client");

moodle_client.init({
    wwwroot: "http://localhost/moodle/",
    token: "e7c2eb02d743314e32b3764492004ef7",
    service: "Administrator"

}).then(function (client) {
    console.log(client);
    //do_something(client);
    do_otherthing(client);


}).catch(function (err) {
    console.log("Unable to initialize the client: " + err);
});


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
        console.log(info);
    });
}
var tableUser;
function do_otherthing(client) {
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
        console.log(info);
        var arraylength = info.users.length;
        for (var i = 1; i < arraylength; i++) {
            tableUser = tableUser + '<tr><td>'+ info.users[i].id+'</td><td>'+info.users[i].username+'</td><td>'+info.users[i].fullname+'</td><td>'+info.users[i].email+'</td></tr>';
        };

        $("#table-body").append(tableUser);
    });
}

function do_something(client) {
    client.call({
        wsfunction: "core_webservice_get_site_info",

    }).then(function (info) {
        console.log(info);
        console.log("Hello %s, welcome to %s", info.fullname, info.sitename);
    });
}

