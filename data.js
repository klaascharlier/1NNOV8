var data1516 = [];
var teams = [];
var referees = [];

function getData() {
    d3.csv("1516.csv", function (data) {
        data1516 = data;
        var event = new CustomEvent("dataReady");
        document.dispatchEvent(event);
    });
}

function getDataOfReferee(referee) {
    var data = [];
    data1516.forEach(function (d) {
        if (d.Referee == referee) {
            data.push(d);
        }
    });
    return data;
}

function getTeams() {
    data1516.forEach(function (d) {
        var found = false;
        for (var i = 0; i < teams.length; i++) {
            if (teams[i] == d.HomeTeam) {
                found = true;
            }
        }
        if (!found) {
            teams.push(d.HomeTeam);
        }
    });
    return teams;
}

function getReferees() {
    data1516.forEach(function (d) {
        var found = false;
        for (var i = 0; i < referees.length; i++) {
            if (referees[i] == d.Referee) {
                found = true;
            }
        }
        if (!found) {
            referees.push(d.Referee);
        }
    });
    return referees;
}

function getFaults(referee) {
    var data = {};
    var home = 0;
    var away = 0;
    var previousMaxHome = 0;
    var previousMaxAway = 0;
    var previousMinHome = 500;
    var previousMinAway = 500;
    getDataOfReferee(referee).forEach(function (d) {
        home += parseInt(d.HF);
        away += parseInt(d.AF);
        if (parseInt(d.HF) > previousMaxHome) {
            previousMaxHome = parseInt(d.HF);
        }
        if (parseInt(d.AF) > previousMaxAway) {
            previousMaxAway = parseInt(d.AF);
        }
        if (parseInt(d.HF) < previousMinHome) {
            previousMinHome = parseInt(d.HF);
        }
        if (parseInt(d.AF) < previousMinAway) {
            previousMinAway = parseInt(d.AF);
        }
    })
    data.referee = referee;
    data.ratio = home / away;
    data.maxHome = previousMaxHome;
    data.maxAway = previousMaxAway;
    data.minHome = previousMinHome;
    data.minAway = previousMinAway;
    return data;
}

function getRatioOfRefereeWins(referee) {
    var home = 0;
    var away = 0;
    data1516.forEach(function (d) {
        if (d.Referee == referee) {
            if (d.FTR == 'H') {
                home++;
            }
            else if (d.FTR == 'A') {
                away++;
            }
        }
    })
    return home / away;
}

function getRatioOfRefereeRed(referee) {
    var home = 0;
    var away = 0;
    data1516.forEach(function (d) {
        if (d.Referee == referee) {
            home += parseInt(d.HR);
            away += parseInt(d.AR);
        }
    })
    return home / away;
}

function getRatioOfRefereeYellow(referee) {
    var home = 0;
    var away = 0;
    data1516.forEach(function (d) {
        if (d.Referee == referee) {
            home += parseInt(d.HY);
            away += parseInt(d.AY);
        }
    })
    return home / away;
}