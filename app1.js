var express = require("express");
var app = express();
var request = require("request");

var step = 0;
var error = 0;
var resent = 0;
var iphone = " ";
var ownernum = " ";
var authKey = "20140303";
var message = " ";
var clue = " ";
var phone = " ";
var key = " ";
var pkey = " ";
var name = "Chandana";
var keyLen = 0;
var lsend = 0;
var final = "Your gift is behind the UPS in conference room";
var pNums = [];

var keys = {
    1: "555666",
    2: "+8688624136555666",
    3: "555666",
    4: "555666",
    5: "555666",
    // 6: "+7702129365916703",
    // 7: "+7702129365384221",
    // 8: "+7702129365164550",
    // 9: "+7702129365601920",
    // 10: "+7702129365442139",
    // 11: "+7702129365735291",
    // 12: "+7702129365620097",
    // 13: "+7702129365100429",
    // 14: "+7702129365843100",
    // 15: "+7702129365420957"
};
var clues = {
    1: "Check in your row in drawers",
    3: "Check in the cupboard",
    4: "Check in research and development room",
    5: "Check under CPUs in .net block",
    // 6: "Check under CPUs in .net block",
    // 7: "Check in meeting room near reception",
    // 8: "Check in the space between your block and the glass wall",
    // 10: "Check in research and development room",
    // 12: "Check in the pebbles of your block",
    // 14: "Check behind monitor's in 2nd shift SAP block"
};

app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(express.static("public"));

// * API_Key for 8712899416:  ravinEmMFgzo42kbc0QLiTOs
// * API_Key for 8688624136:  ravin18P5flGEa4cVos2nA

for (var k in keys) {
    if (keys.hasOwnProperty(k)) {
        ++keyLen;
    }
}

app.get("/", function(req, res) {
    pNums = [];
    res.render("home", { name: name, resent: resent, error: error, ownernum: ownernum });
    // res.render("welcome", { required: 1, pNums: pNums, keyLen: 0, message: " " });
});

app.get("/home", function(req, res) {
    pNums = [];

    if ((req.query.phone1) && pNums.length == 0) {
        keyLen = req.query.keylen;
        var stop = " ";
        var alert;

        for (var i = 1; i <= keyLen; i++) {
            i == 1 ? pNums.push("0") : " ";
            var pId = 'phone' + i;
            if (req.query[pId].length == 10) {
                pNums.push(req.query[pId]);
            }
            else {
                pNums.push(req.query[pId]);
                stop = i;
            }
        }

        if (stop !== " ") {
            alert = "Invalid Phone# " + stop;
        }

        if (stop == " " && pNums.length == Number(keyLen) + 1) {
            message = "Hi " + name + "," + "Your Validation code to start the app is: " + authKey;

            phone = iphone;
            var url = "https://smsapi.engineeringtgr.com/send/?Mobile=8712899416&" +
                "Password=sumithra&Key=ravinEmMFgzo42kbc0QLiTOs&Message=" + message + "&To=" + phone;
            request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {

                }
            });

            step = 0;
            error = 0;
            resent = 0;
            res.render("home", { name: name, resent: resent, error: error, ownernum: ownernum });
        }
        else {
            res.render("welcome", { required: 0, pNums: pNums, keyLen: keyLen, message: alert });
        }

    }
    else if (pNums.length == 0) {
        iphone = req.query.phone;
        name = req.query.name;
        keyLen = req.query.keylen;
        res.render("welcome", { required: 0, pNums: pNums, keyLen: keyLen, message: " " });
    }
});

app.get("/validate", function(req, res) {
    var validate = req.query.validate;
    if (validate == authKey) {
        step += 1;
        clue = clues[step];
        error = 0;
        lsend = 0;

        if (step <= keyLen) {
            pkey = keys[step];
            key = keys[step];
            if (clues[step]) {
                clue = clues[step];
            }
        }
        else {
            key = "rashmith";
        }

        if (key.slice(0, 1) == "+") {
            pkey = key.slice(11);
            phone = key.slice(1, 11);
            message = "Hi " + name + "," + "Your password " + step + " is:" + pkey;

            // var url = "http://api.msg91.com/api/sendhttp.php?sender=" + name.slice(0, 7) +
            //     "&route=4&mobiles=" + phone + "&authkey=190019AjqeSZErl3Rj5a4389f2&country=91&message=" + message;
            // request(url, function(error, response, body) {
            //     if (!error && response.statusCode == 200) {

            //     }
            // });

            phone = pNums[step];
            clue = "Your password is sent to mobile: " + phone;

            var url = "https://smsapi.engineeringtgr.com/send/?Mobile=8712899416&" +
                "Password=sumithra&Key=ravinEmMFgzo42kbc0QLiTOs&Message=" + message + "&To=" + phone;
            request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {

                }
            });
        }

        res.render("clues", { step: step, lsend: lsend, error: error, clue: clue, phone: phone });
    }
    else {
        error = 1;
        res.render("home", { name: name, lsend: lsend, resent: resent, error: error, ownernum: ownernum });
    }
});

app.get("/next", function(req, res) {
    var password = req.query.password;
    key = keys[step];
    pkey = keys[step];

    if (key.slice(0, 1) == "+") {
        pkey = key.slice(11);
    }

    if (step <= keyLen && password == pkey) {
        phone = " ";
        error = 0;
        step += 1;

        if (step <= keyLen) {
            pkey = keys[step];
            key = keys[step];
            if (clues[step]) {
                clue = clues[step];
            }
        }
        else {
            key = "rashmith";
        }

        if (key.slice(0, 1) == "+") {
            pkey = key.slice(11);
            phone = key.slice(1, 11);
            message = "Hi " + name + "," + "Your password " + step + " is:" + pkey;

            // var url = "http://api.msg91.com/api/sendhttp.php?sender=" + name.slice(0, 7) +
            //     "&route=4&mobiles=" + phone + "&authkey=190019AjqeSZErl3Rj5a4389f2&country=91&message=" + message;
            // request(url, function(error, response, body) {
            //     if (!error && response.statusCode == 200) {

            //     }
            // });

            // phone = pNums[step];
            if (!(clue)) {
                clue = "Your password is sent to mobile: " + phone;
            }

            if (phone) {
                var url = "https://smsapi.engineeringtgr.com/send/?Mobile=8712899416&" +
                    "Password=sumithra&Key=ravinEmMFgzo42kbc0QLiTOs&Message=" + message + "&To=" + phone;
                request(url, function(error, response, body) {
                    if (!error && response.statusCode == 200) {

                    }
                });
            }
        }

        if (step <= keyLen) {
            lsend = 0;
            res.render("clues", { step: step, lsend: lsend, error: error, clue: clue, phone: phone });
        }
        else {
            res.render("congrats", { name: name, clue: final });
        }
    }
    else {
        error = 1;
        var clue = " ";
        res.render("clues", { step: step, lsend: lsend, error: error, clue: clue, phone: phone });
    }
});

app.get("/resend", function(req, res) {
    if (step == 0) {
        error = 0;

        message = "Hi " + name + "," + "Your authentication key is:" + authKey;
        // var url = "http://api.msg91.com/api/sendhttp.php?sender=" + name.slice(0, 6) +
        //     "&route=4&mobiles=" + ownernum + "&authkey=190019AjqeSZErl3Rj5a4389f2&country=91&message=" + message;
        // request(url, function(error, response, body) {
        //     if (!error && response.statusCode == 200) {

        //     }
        // });

        phone = iphone;
        ownernum = iphone;

        var url = "https://smsapi.engineeringtgr.com/send/?Mobile=8712899416&" +
            "Password=sumithra&Key=ravinEmMFgzo42kbc0QLiTOs&Message=" + message + "&To=" + ownernum;
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {

            }
        });
        resent = 1;
        lsend = -1;
        error = 0;
        res.render("home", { name: name, lsend: lsend, error: error, resent: resent, ownernum: ownernum });
    }
    else {
        error = 0;
        phone = " ";
        key = keys[step];
        pkey = keys[step];

        if (key.slice(0, 1) == "+") {
            pkey = key.slice(11);
            phone = key.slice(1, 11);
            message = "Hi " + name + "," + "Your password " + step + " is:" + pkey;

            // var url = "http://api.msg91.com/api/sendhttp.php?sender=" + name.slice(0, 6) +
            //     "&route=4&mobiles=" + phone + "&authkey=190019AjqeSZErl3Rj5a4389f2&country=91&message=" + message;
            // request(url, function(error, response, body) {
            //     if (!error && response.statusCode == 200) {

            //     }
            // });

            phone = pNums[step];
            clue = "Your password#" + step + " is resent to mobile: " + phone;

            var url = "https://smsapi.engineeringtgr.com/send/?Mobile=8712899416&" +
                "Password=sumithra&Key=ravinEmMFgzo42kbc0QLiTOs&Message=" + message + "&To=" + phone;
            request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {

                }
            });
        }

        lsend = -1;
        res.render("clues", { step: step, lsend: lsend, error: error, clue: clue, phone: phone });
    }
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Guarding your treasure...");
});
