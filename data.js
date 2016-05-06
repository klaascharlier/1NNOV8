var selectedData = [];

function loadData(start, end) {


    selectedData = [];
    getData(start,end);

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
}

function getDataOfYear(season) {
    selectedData.forEach(function (d) {
        if (d.year == season) {
            return d.data;
        }
    });
}

function getTeams() {
    var teams = [];
    selectedData.forEach(function (d) {
        d.data.forEach(function (e) {
            var found = false;
            for (var i = 0; i < teams.length; i++) {
                if (teams[i] == e.HomeTeam) {
                    found = true;
                }
            }
            if (!found) {
                teams.push(e.HomeTeam);
            }
        });
    });
    return teams;
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
                //console.log(e);
            }
        });
    });
    referees.sort(function(a,b){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    });
    console.log(referees);
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

function avgFaultsRatio(){
    var data =[];
    var averageRatio = 0;
    var count = 0;
    selectedData.forEach(function (d){
        var yearObject = {};
        yearObject.year = d.year;
        yearObject.ratioFaults = d3.sum(d.data, function (d) {
                return parseInt(d.HF);
            }) / (d3.sum(d.data, function (d) {
                return parseInt(d.AF);
            }) + d3.sum(d.data, function (d) {
                return parseInt(d.HF);
            }));
        if(!isNaN(yearObject.ratioFaults)) {
            averageRatio += yearObject.ratioFaults;
            count++;
        }
        yearObject.ratioYellow = d3.sum(d.data, function (d) {
                return parseInt(d.HY);
            }) / (d3.sum(d.data, function (d) {
                return parseInt(d.AY);
            }) + d3.sum(d.data, function (d) {
                return parseInt(d.HY);
            }));
        if(!isNaN(yearObject.ratioYellow)) {
            averageRatio += yearObject.ratioYellow;
            count++;
        }
        yearObject.ratioRed = d3.sum(d.data, function (d) {
                return parseInt(d.HR);
            }) / (d3.sum(d.data, function (d) {
                return parseInt(d.AR);
            }) + d3.sum(d.data, function (d) {
                return parseInt(d.HR);
            }));
        if(!isNaN(yearObject.ratioRed)) {
            averageRatio += yearObject.ratioRed;
            count++;
        }
        data.push(yearObject);
    });
    averageRatio = averageRatio/count;
    data.avgRatio = averageRatio;
    return data;
}

function getRefereeRatios(referee) {
    var data = [];
    var dataOfReferee = getDataOfReferee(referee);
    var averageRatioFaults = 0;
    var averageRatioYellow = 0;
    var averageRatioRed = 0;
    var countFaults = 0;
    var countYellow = 0;
    var countRed = 0;
    data.referee = referee;
    dataOfReferee.forEach(function (d) {
        var yearObject = {};
        yearObject.year = d.year;
        yearObject.age = d.age;
        yearObject.ratioFaults = d3.sum(d.data, function (d) {
                return parseInt(d.HF);
            }) / (d3.sum(d.data, function (d) {
                return parseInt(d.AF);
            }) + d3.sum(d.data, function (d) {
                return parseInt(d.HF);
            }));
        if(!isNaN(yearObject.ratioFaults)) {
            averageRatioFaults += yearObject.ratioFaults;
            countFaults++;
        }
        yearObject.ratioYellow = d3.sum(d.data, function (d) {
                return parseInt(d.HY);
            }) / (d3.sum(d.data, function (d) {
                return parseInt(d.AY);
            }) + d3.sum(d.data, function (d) {
                return parseInt(d.HY);
            }));
        if(!isNaN(yearObject.ratioYellow)) {
            averageRatioYellow += yearObject.ratioYellow;
            countYellow++;
        }
        yearObject.ratioRed = d3.sum(d.data, function (d) {
                return parseInt(d.HR);
            }) / (d3.sum(d.data, function (d) {
                return parseInt(d.AR);
            }) + d3.sum(d.data, function (d) {
                return parseInt(d.HR);
            }));
        if(!isNaN(yearObject.ratioRed)) {
            averageRatioRed += yearObject.ratioRed;
            countRed++;
        }
        data.push(yearObject);
    });
    averageRatioFaults = averageRatioFaults/countFaults;
    data.avgRatioFaults = averageRatioFaults;
    averageRatioYellow = averageRatioYellow/countYellow;
    data.avgRatioYellow = averageRatioYellow;
    averageRatioRed = averageRatioRed/countRed;
    data.avgRatioRed = averageRatioRed;
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