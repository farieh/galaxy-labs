
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
            console.log('User '+id+' deleted');
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
        console.log(info);
        var arraylength = info.users.length;
        for (var i = 1; i < arraylength; i++) {
            tableUser = tableUser + '<tr><td>' + info.users[i].id + '</td><td>' + info.users[i].username + '</td><td>' + info.users[i].fullname + '</td><td>' + info.users[i].email + '</td><td><a href="#" id="user-delete" onClick="delete_user('+info.users[i].id+')" value="' + info.users[i].id + '">Delete</a></td></tr>';
        };

        $("#table-body").append(tableUser);
    });
}
var tableUser;



function do_otherthing(client) {
    client.call({
        wsfunction: 'core_user_create_users',
        method: 'POST',
        args: {
            users: [
                {
                    username: 'Nunu',
                    password: 'Nanana',
                    createpassword: 0,  //True if password should be created and mailed to user.
                    firstname: 'Nunu',   //The first name(s) of the user
                    lastname: 'Nana',   //The family name of the user
                    email: 'nunu@gmail.com',//A valid and unique email address
                    auth: 'manual',//Auth plugins include manual, ldap, imap, etc
                    idnumber: '', //An arbitrary ID code number perhaps from the institution
                    lang: 'en',//Language code such as "en", must exist on server
                    calendartype: 'gregorian', //Calendar type such as "gregorian", must exist on server
                    theme: 'standard', //Theme name such as "standard", must exist on server
                    timezone: '99',//Timezone code such as Australia/Perth, or 99 for default
                    mailformat: 1,//Mail format code is 0 for plain text, 1 for HTML etc
                    description: 'Profile Desciption', //User profile description, no HTML
                    city: 'Kota', //Home city of the user
                    country: 'AU', //Home country code of the user, such as AU or CZ
                    firstnamephonetic: 'as',//The first name(s) phonetically of the user
                    lastnamephonetic: 'asd',//The family name phonetically of the user
                    middlename: 'asdasd', //The middle name of the user
                    alternatename: 'asdasdas',//The alternate name of the user
                    preferences: [{
                        type: 'string',  //The name of the preference
                        value: 'string'   //The value of the preference
                    }], //User preferences
                    customfields: [{
                        type: 'string',
                        value: 'string'
                    }]
                }]

        },
    }).then(function (info) {
        console.log(info);

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

