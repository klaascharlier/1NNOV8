var selectedData = [];

function getData(start, end) {
    if (start != end + 1) {
        var j = start + 1;
        d3.csv("" + start + j + ".csv", function (data) {
                var dataObject = {};
                dataObject.data = data;
                dataObject.year = "" + start + j;
                selectedData.push(dataObject);
                getData(j, end);
            }
        );
    }
    else {
        var event = new CustomEvent("dataReady");
        document.dispatchEvent(event);
    }
}

function getDataOfYear(season) {
    selectedData.forEach(function (d) {
        if (d.year == season) {
            return d.data;
        }
    });
}

function getReferees() {
    var referees = [];
    selectedData.forEach(function (d) {
        d.data.forEach(function (e) {
            var found = false;
            for (var i = 0; i < referees.length; i++) {
                if (referees[i] == e.Referee) {
                    found = true;
                }
            }
            if (!found) {
                referees.push(e.Referee);
            }
        });
    });
    return referees;
}


function getDataOfReferee(referee) {
    var data = [];
    selectedData.forEach(function (d) {
        yearObject = {};
        yearObject.year = d.year;
        yearObject.data = [];
        d.data.forEach(function (e) {
            if (e.Referee == referee) {
                yearObject.data.push(e);
            }
        });
        data.push(yearObject);
    });
    return data;
}

function getFaults(referee) {
    var data = [];
    var dataOfReferee = getDataOfReferee(referee);
    data.referee = referee;
    dataOfReferee.forEach(function (d) {
        yearObject = {};
        yearObject.year = d.year;
        yearObject.ratio = d3.sum(d.data, function (d) {
                return parseInt(d.HF);
            }) / (d3.sum(d.data, function (d) {
                return parseInt(d.AF);
            }) + d3.sum(d.data, function (d) {
                return parseInt(d.HF);
            }));
        yearObject.maxHome = d3.max(d.data, function (d) {
            return parseInt(d.HF);
        });
        yearObject.maxAway = d3.max(d.data, function (d) {
            return parseInt(d.AF);
        });
        yearObject.minHome = d3.min(d.data, function (d) {
            return parseInt(d.HF);
        });
        yearObject.minAway = d3.min(d.data, function (d) {
            return parseInt(d.AF);
        });
        yearObject.avgHome = d3.mean(d.data, function (d) {
            return parseInt(d.HF);
        });
        yearObject.avgAway = d3.mean(d.data, function (d) {
            return parseInt(d.AF);
        });
        data.push(yearObject);
    });
    return data;
}

function getRedCards(referee) {
    var data = [];
    var dataOfReferee = getDataOfReferee(referee);
    data.referee = referee;
    dataOfReferee.forEach(function (d) {
        yearObject = {};
        yearObject.year = d.year;
        yearObject.ratio = d3.sum(d.data, function (d) {
                return parseInt(d.HR);
            }) / (d3.sum(d.data, function (d) {
                return parseInt(d.AR);
            }) + d3.sum(d.data, function (d) {
                return parseInt(d.HR);
            }));
        yearObject.maxHome = d3.max(d.data, function (d) {
            return parseInt(d.HR);
        });
        yearObject.maxAway = d3.max(d.data, function (d) {
            return parseInt(d.AR);
        });
        yearObject.minHome = d3.min(d.data, function (d) {
            return parseInt(d.HR);
        });
        yearObject.minAway = d3.min(d.data, function (d) {
            return parseInt(d.AR);
        });
        yearObject.avgHome = d3.mean(d.data, function (d) {
            return parseInt(d.HR);
        });
        yearObject.avgAway = d3.mean(d.data, function (d) {
            return parseInt(d.AR);
        });
        data.push(yearObject);
    });
    return data;
}

function getYellowCards(referee) {
    var data = [];
    var dataOfReferee = getDataOfReferee(referee);
    data.referee = referee;
    dataOfReferee.forEach(function (d) {
        yearObject = {};
        yearObject.year = d.year;
        yearObject.ratio = d3.sum(d.data, function (d) {
                return parseInt(d.HY);
            }) / (d3.sum(d.data, function (d) {
                return parseInt(d.AY);
            }) + d3.sum(d.data, function (d) {
                return parseInt(d.HY);
            }));
        yearObject.maxHome = d3.max(d.data, function (d) {
            return parseInt(d.HY);
        });
        yearObject.maxAway = d3.max(d.data, function (d) {
            return parseInt(d.AY);
        });
        yearObject.minHome = d3.min(d.data, function (d) {
            return parseInt(d.HY);
        });
        yearObject.minAway = d3.min(d.data, function (d) {
            return parseInt(d.AY);
        });
        yearObject.avgHome = d3.mean(d.data, function (d) {
            return parseInt(d.HY);
        });
        yearObject.avgAway = d3.mean(d.data, function (d) {
            return parseInt(d.AY);
        });
        data.push(yearObject);
    });
    return data;
}