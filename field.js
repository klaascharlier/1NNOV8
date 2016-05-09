var dimensions = {
    width: 360,
    height: 225
};
var lineThickness = dimensions.width * 0.002;
var svg;
var deselectedReferees = [];
var inHueState = 0;
var faultWeight = 2;
var yellowWeight = 0;
var redWeight = 0;
var dataColor = ["hsla(0, 100%, 0%, 1)","hsla(0, 100%, 2%, 1)","hsla(0, 100%, 4%, 1)","hsla(0, 100%, 6%, 1)","hsla(0, 100%, 8%, 1)","hsla(0, 100%, 10%, 1)", "hsla(0, 100%, 12%, 1)","hsla(0, 100%, 14%, 1)", "hsla(0, 100%, 18%, 1)", "hsla(0, 100%, 22%, 1)", "hsla(0, 100%, 26%, 1)", "hsla(0, 100%, 30%, 1)", "hsla(0, 100%, 34%, 1)", "hsla(0, 100%, 38%, 1)", "hsla(0, 100%, 42%, 1)", "hsla(0, 100%, 46%, 1)", "hsla(0, 100%, 48%, 1)", "hsla(0, 100%, 50%, 1)", "hsla(0, 100%, 54%, 1)", "hsla(0, 100%, 58%, 1)", "hsla(0, 100%, 62%, 1)", "hsla(0, 100%, 68%, 1)", "hsla(0, 100%, 72%, 1)", "hsla(0, 100%, 76%, 1)", "hsla(0, 100%, 80%, 1)",
    "hsla(0, 100%, 84%, 1)", "hsla(0, 100%, 88%, 1)", "hsla(0, 100%, 90%, 1)", "hsla(0, 100%, 92%, 1)", "hsla(0, 100%, 94%, 1)", "hsla(0, 100%, 96%, 1)", "hsla(0, 100%, 98%, 1)", "hsla(0, 100%, 100%, 1)"]

function drawField() {

    svg = d3.select("#svg")
        .attr("align", "center");

    var body = d3.select("#soccerfield")
        .attr("bgcolor", "grey");
    this.body = body;

    var field = svg.append("rect")
        .attr("id", "fieldRect")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("fill", "green")
        .attr("opacity", 0.5);

    var fieldRect = svg.append("rect")
        .attr("width", dimensions.width - 10 * lineThickness)
        .attr("height", dimensions.height - 10 * lineThickness)
        .attr("x", 5 * lineThickness)
        .attr("y", 5 * lineThickness)
        .attr("fill", "green")
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("opacity", 0.5);

    var middleLine = svg.append("rect")
        .attr("width", lineThickness)
        .attr("height", dimensions.height - 10 * lineThickness)
        .attr("x", (dimensions.width - lineThickness) * 0.5)
        .attr("y", 5 * lineThickness)
        .attr("fill", "white");

    var middleCircle = svg.append("circle")
        .attr("cx", dimensions.width * 0.5)
        .attr("cy", dimensions.height * 0.5)
        .attr("r", dimensions.width * 0.075)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "green")
        .attr("opacity", 0.3);

    var middleStip = svg.append("circle")
        .attr("cx", dimensions.width * 0.5)
        .attr("cy", dimensions.height * 0.5)
        .attr("r", lineThickness * 4)
        .attr("stroke", "white")
        .attr("fill", "white");

    var leftBigBak = svg.append("rect")
        .attr("width", dimensions.width / 6)
        .attr("height", dimensions.height * 0.5)
        .attr("x", 5 * lineThickness)
        .attr("y", dimensions.height * 0.25)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "green")
        .attr("opacity", 0.3);

    var rightBigBak = svg.append("rect")
        .attr("width", dimensions.width / 6)
        .attr("height", dimensions.height * 0.5)
        .attr("x", dimensions.width - dimensions.width / 6 - 5 * lineThickness)
        .attr("y", dimensions.height * 0.25)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "green")
        .attr("opacity", 0.3);

    var leftSmallBak = svg.append("rect")
        .attr("width", dimensions.width / 14)
        .attr("height", dimensions.height * 0.2)
        .attr("x", 5 * lineThickness)
        .attr("y", dimensions.height * 0.4)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "green")
        .attr("opacity", 0.2);

    var rightSmallBak = svg.append("rect")
        .attr("width", dimensions.width / 14)
        .attr("height", dimensions.height * 0.2)
        .attr("x", dimensions.width - dimensions.width / 14 - 5 * lineThickness)
        .attr("y", dimensions.height * 0.4)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "green")
        .attr("opacity", 0.2);

    var homeText = svg.append("text")
        .attr("x", dimensions.width * 0.09)
        .attr("y", dimensions.height * 0.065)
        .text(function () {
            return "HOME ADVANTAGE";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 30)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("opacity", 0.65);

    var awayText = svg.append("text")
        .attr("x", dimensions.width * 0.6)
        .attr("y", dimensions.height * 0.065)
        .text(function () {
            return "AWAY ADVANTAGE";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 30)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("opacity", 0.65);

    var percentage_10 = svg.append("text")
        .attr("x", (dimensions.width - 20 * lineThickness) * 0.6 + 10 * lineThickness)
        .attr("y", dimensions.height * 0.97)
        .text(function () {
            return "10%";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 65)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.65);

    var percentage10 = svg.append("text")
        .attr("x", (dimensions.width - 20 * lineThickness) * 0.4 + 10 * lineThickness)
        .attr("y", dimensions.height * 0.97)
        .text(function () {
            return "10%";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 65)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.65);

    var percentage20 = svg.append("text")
        .attr("x", (dimensions.width - 20 * lineThickness) * 0.3 + 10 * lineThickness )
        .attr("y", dimensions.height * 0.97)
        .text(function () {
            return "20%";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 65)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.65);

    var percentage_20 = svg.append("text")
        .attr("x", (dimensions.width - 20 * lineThickness) * 0.7 + 10 * lineThickness)
        .attr("y", dimensions.height * 0.97)
        .text(function () {
            return "20%";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 65)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.65);

    var percentage_30 = svg.append("text")
        .attr("x", (dimensions.width - 20 * lineThickness) * 0.8 + 10 * lineThickness)
        .attr("y", dimensions.height * 0.97)
        .text(function () {
            return "30%";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 65)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.65);

    var percentage30 = svg.append("text")
        .attr("x", (dimensions.width - 20 * lineThickness) * 0.2 + 10 * lineThickness)
        .attr("y", dimensions.height * 0.97)
        .text(function () {
            return "30%";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 65)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.65);

    var percentage40 = svg.append("text")
        .attr("x", (dimensions.width - 20 * lineThickness) * 0.9 + 10 * lineThickness)
        .attr("y", dimensions.height * 0.97)
        .text(function () {
            return "40%";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 65)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.65);

    var percentage_40 = svg.append("text")
        .attr("x", (dimensions.width - 20 * lineThickness) * 0.1 + 10 * lineThickness)
        .attr("y", dimensions.height * 0.97)
        .text(function () {
            return "40%";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 65)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.65);


}

/*function clearYearLabels() {
    if (Object.keys(yearLabels).length >= 0) {
        yearLabels.forEach(function (obj) {
            obj.remove();
        });
        yearLabels = [];
    }
}

function writeYearLabels(data) {
    clearYearLabels();
    var index = 0;
    for (var i in data) {
        var text = svg.append("text")
            .attr("x", dimensions.width * 0.9)
            .attr("y", dimensions.height * 0.12 + index * (dimensions.height * 0.8 / (data.length - 1)))
            .attr("fill", "white")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("color", "yellow")
            .text(function () {
                return data[i].year;
            });
        index++;
    }
}*/


function drawCirclesOfReferee(dataOfReferee) {
    var circleArray = [];
    for (var i = 0; i < dataOfReferee.data.length; i++) {
        var dataHeight = ((dataOfReferee.data.length - 1 - i) * (dimensions.height * 0.8) / (dataOfReferee.data.length - 1)) + 0.1 * dimensions.height;
        if (!isNaN(dataOfReferee.data[i].ratioFaults)){
            console.log("test");
            var circle = svg.append("circle")
                .attr("cx", dimensions.width * dataOfReferee.data[i].ratioFaults )
                .attr("cy", dataHeight)
                .attr("r", 2)
                .attr("z-index",1)
                .attr("stroke", "black")
                .attr("stroke-width", lineThickness / 4)
                .attr("fill", "#7a0000")
                .attr("opacity", 1)
                .on('mouseover', function () {
                    highLight(dataOfReferee);
                })
                .on('mouseout', function () {
                    unHighLight(dataOfReferee);
                });
            circle.append("svg:title").text(function () {
                var year = dataOfReferee.data[i].year;
                var year_arr = year.split("");
                var ratio = Math.round(dataOfReferee.data[i].ratioFaults * 1000)/1000;
                if(ratio >= 0.5){
                    ratio = Math.round((dataOfReferee.data[i].ratioFaults - 0.5)*10000)/100;
                } else {
                    ratio = Math.round((0.5 - dataOfReferee.data[i].ratioFaults)*10000)/100;
                }
                return "Referee: " + dataOfReferee.data.referee + "\nSeason: 20"
                    + year_arr[0] + year_arr[1] + "-20" + year_arr[2] + year_arr[3]
                    + "\nRatio: " + ratio + "%";
            });
            circleArray.push(circle);
        }
    }
    return circleArray;
}
function updateRatio(dataOfReferee) {
    $.each(dataOfReferee, function (index, referee) {
        var min = 0;
        for (var i = 0; i < referee.data.length; i++) {
            if (!isNaN(referee.data[i].ratioFaults)) {
                    referee.circles[i - min].transition().duration(700).attr("cx", dimensions.width * ((calculateRatio(referee.data[i]) - 0.5)  + 0.5)).ease("sin-in-out");
                    referee.circles[i - min].select("title").text(function () {
                        var year = referee.data[i].year;
                        var year_arr = year.split("");
                        var ratio = Math.round(calculateRatio(referee.data[i]) * 1000)/1000;
                        if(ratio >= 0.5){
                            ratio = Math.round((calculateRatio(referee.data[i]) - 0.5)*10000)/100;
                        } else {
                            ratio = Math.round((0.5 - calculateRatio(referee.data[i]))*10000)/100;
                        }
                        return "Referee: " + referee.data.referee + "\nSeason: 20"
                            + year_arr[0] + year_arr[1] + "-20" + year_arr[2] + year_arr[3]
                            + "\nRatio: " + ratio + "%";
                    });
            }
            else {
                min++;
            }
        }
    });
    $.each(averageRefereeData.circles, function (index, circle){
        circle.transition().duration(700).attr("cx", dimensions.width * calculateRatio(averageRefereeData.data[index])).ease("sin-in-out");
        circle.select("title").text(function () {
            var year = averageRefereeData.data[index].year;
            var year_arr = year.split("");
            var ratio = Math.round(calculateRatio(averageRefereeData.data[index]) * 1000)/1000;
            if(ratio >= 0.5){
                ratio = Math.round((calculateRatio(averageRefereeData.data[index]) - 0.5)*10000)/100;
            } else {
                ratio = Math.round((0.5 - calculateRatio(averageRefereeData.data[index]))*10000)/100;
            }
            return "Referee: " + averageRefereeData.data[index].referee + "\nSeason: 20"
                + year_arr[0] + year_arr[1] + "-20" + year_arr[2] + year_arr[3]
                + "\nRatio: " + ratio + "%";
        });
    })
}

function calculateRatio(ratioData) {
    var ratio = 0;
    var localYellowWeight;
    var localRedWeight;
    if(isNaN(ratioData.ratioYellow) || ratioData.ratioYellow == 0){
        localYellowWeight = 0;
    }
    else{
        localYellowWeight = yellowWeight;
    }
    if(isNaN(ratioData.ratioRed) || ratioData.ratioRed == 0){
        localRedWeight = 0;
    }
    else{
        localRedWeight = redWeight;
    }
    ratio = (faultWeight*ratioData.ratioFaults + localYellowWeight*NaNToZero(ratioData.ratioYellow) + localRedWeight*NaNToZero(ratioData.ratioRed)) / (faultWeight + localYellowWeight + localRedWeight);
    if(isNaN(ratio)){
        ratio = 0.5;
    }
    return ratio;
}

function NaNToZero (number){
    return isNaN( number ) ? 0 : number;
}




function deSelectReferee(dataOfReferee){
    deselectedReferees.push(dataOfReferee);
    dataOfReferee.button.css("background-color", "grey");
    $.each(dataOfReferee.circles, function (index, circle) {
        circle.transition().attr("r", 1).attr("fill","grey").ease("sin-in-out");
    });
}

function drawHueCircles(dataOfReferee) {
    inHueState=1;
    $.each(dataOfReferee.circles, function(index, circle){
        circle.transition().duration(700).attr("fill", dataColor[calculateIndexAgeReferee(dataOfReferee)]).ease("sin-in-out");
    });
}

function disableHue(dataOfReferee){
    inHueState=0;
    $.each(dataOfReferee.circles, function(index, circle){
        circle.transition().duration(700).attr("fill", "black").ease("elastic");
    });

}

function selectReferee(dataOfReferee){
    var index = deselectedReferees.indexOf(dataOfReferee);
    deselectedReferees.splice(index, 1);
}

function highLight(dataOfReferee) {
    if(deselectedReferees.indexOf(dataOfReferee) == -1) {
        dataOfReferee.button.css("background-color", "#FFB90F");
        if(inHueState == 0) {
            $.each(dataOfReferee.circles, function (index, circle) {
                circle.transition().attr("r", dimensions.width / 65).attr("fill", "#FFB90F").attr("z-index", 0).ease("elastic");
            });
        }else{
            $.each(dataOfReferee.circles, function (index, circle) {
                circle.transition().attr("r", dimensions.width / 65).attr("fill", dataColor[calculateIndexAgeReferee(dataOfReferee)]).attr("z-index", 3000);
            });
        }
    }
}

function unHighLight(dataOfReferee) {
    if(deselectedReferees.indexOf(dataOfReferee) == -1) {
        dataOfReferee.button.css("background-color", "#7a0000");
        if(inHueState == 0) {
            $.each(dataOfReferee.circles, function (index, circle) {
                circle.transition().attr("r", 2).attr("fill", "#7a0000").ease("elastic");
            });
        }else{
            $.each(dataOfReferee.circles, function (index, circle) {
                circle.transition().attr("r", 2).attr("fill", dataColor[calculateIndexAgeReferee(dataOfReferee)]).ease("elastic");
            });
        }
    }
}


function drawAverageCircles(data) {
    var circleArray = [];
    for (var i = 0; i < data.length; i++) {
        var dataHeight = ((data.length - 1 - i) * (dimensions.height * 0.8) / (data.length - 1)) + 0.1 * dimensions.height;
        if (!isNaN(calculateRatio(data[i]))) {
            var circle = svg.append("circle")
                .attr("cx", dimensions.width * ((calculateRatio(data[i]) - 0.5) + 0.5))
                .attr("cy", dataHeight)
                .attr("r", 2)
                .attr("stroke", "black")
                .attr("stroke-width", lineThickness / 4)
                .attr("fill", "black")
                .attr("visibility", "hidden")
                .on('mouseover', function () {
                    d3.select(this).transition().attr("r", 5).ease("elastic");
                })
                .on('mouseout', function () {
                    d3.select(this).transition().attr("r", 2);
                });
            circle.append("svg:title").text(function () {
                var year = data[i].year;
                var year_arr = year.split("");
                var ratio = Math.round(calculateRatio(data[i]) * 1000)/1000;
                if(ratio >= 0.5){
                    ratio = Math.round((calculateRatio(data[i]) - 0.5)*10000)/100;
                } else {
                    ratio = Math.round((0.5 - calculateRatio(data[i]))*10000)/100;
                }
                return "Season: 20" + year_arr[0] + year_arr[1] + "-20" + year_arr[2] + year_arr[3]
                    + "\nRatio: " + ratio + "%";
            });
            circleArray.push(circle);
        }
    }
    return circleArray;
}



function showAverage() {
    var ratios = avgFaultsRatio();
    console.log(ratios);
    $.each(refereeData, function (index, referee) {
        var min = 0;
        for (var i = 0; i < referee.data.length; i++) {
            if (!isNaN(referee.data[i].ratioFaults)) {
                referee.circles[i - min].transition().duration(700).attr("cx", dimensions.width * ((calculateRatio(ratios[i]) - 0.5) * 1 + 0.5)).attr('opacity', 0).ease("sin-in-out");
                referee.circles[i - min].select("title").text(function () {
                    console.log("showAvg");
                    var year = referee.data[i].year;
                    var year_arr = year.split("");
                    var ratio = Math.round(calculateRatio(referee.data[i]) * 1000)/1000;
                    if(ratio >= 0.5){
                        ratio = Math.round((calculateRatio(referee.data[i]) - 0.5)*10000)/100;
                    } else {
                        ratio = Math.round((0.5 - calculateRatio(referee.data[i]))*10000)/100;
                    }
                    return "Referee: " + referee.data.referee + "\nSeason: 20"
                        + year_arr[0] + year_arr[1] + "-20" + year_arr[2] + year_arr[3]
                        + "\nRatio: " + ratio + "%";
                });
            }
            else {
                min++;
            }
        }
    });
    $.each(averageRefereeData.circles, function (index, circle) {
        circle.attr("visibility", "visible");
    });
}

function hideAverage() {
    $.each(refereeData, function (index, referee) {
        var min = 0;
        for (var i = 0; i < referee.data.length; i++) {
            if (!isNaN(referee.data[i].ratioFaults)) {
                referee.circles[i - min].transition().duration(700).attr("cx", dimensions.width * ((calculateRatio(referee.data[i]) - 0.5) * 1 + 0.5)).attr('opacity', 1).ease("sin-in-out");
                console.log(referee.data[i]);
            }
            else {
                min++;
            }
        }
    });
    $.each(averageRefereeData.circles, function (index, circle) {
        circle.attr("visibility", "hidden");
    });

}

function updateYears(start, end) {
    $.each(refereeData, function (index, referee) {
        var min = 0;
        for (var i = 0; i < referee.data.length; i++) {
            var dataHeight = ((end - 11 - i) * (dimensions.height * 0.8) / (end - start)) + 0.1 * dimensions.height;
            if (end - start == 0) {
                if (i == end - 11) {
                    dataHeight = 0.5 * dimensions.height;
                }
                else {
                    dataHeight = ((end - 11 - i) * (dimensions.height * 0.8) / (0.5) + 0.1 * dimensions.height);
                }
            }
            if (!isNaN(referee.data[i].ratioFaults)) {
                referee.circles[i - min].transition().duration(700).attr("cy", dataHeight).ease("sin-in-out");
            }
            else {
                min++;
            }
        }
    });

    for (var i = 0; i < averageRefereeData.data.length; i++) {
        var dataHeight = ((end - 11 - i) * (dimensions.height * 0.8) / (end - start)) + 0.1 * dimensions.height;
        if (end - start == 0) {
            if (i == end - 11) {
                dataHeight = 0.5 * dimensions.height;
            }
            else {
                dataHeight = ((end - 11 - i) * (dimensions.height * 0.8) / (0.5) + 0.1 * dimensions.height);
            }
        }
        averageRefereeData.circles[i].transition().duration(700).attr("cy", dataHeight).ease("sin-in-out");
    }
}

function calculateIndexAgeReferee(dataOfReferee){
    var birthYearReferees;
    for(var i = 0; i < dataOfReferee.data.length; i ++){
        birthYearReferees = dataOfReferee.data.age.toString().slice(6,10);
    }
    var currentTime = new Date();
    var year = currentTime.getFullYear();

    var ageReferees = year - birthYearReferees;
    var indexAgeRefs = 60-ageReferees;

    return indexAgeRefs;
}


/*
function drawRefereeData(data, j, color) {
    if (j == 1) {
        clearRefCirclesFromSVG();
        clearLegende();
    }
    writeYearLabels(data);
    var index = 0;

    for(var i in data){
        if(index < data.length) {

    for (var i in data) {
        if (index < data.length) {

            newArray = [];
            for (var k = 0; k < selectedReferee.length; k++) {
                newArray[k] = data.avgRatio;
            }
            for (var p = 0; p < newArray.length; p++) {
                if (newArray[p] > maxRatio) {
                    maxRatio = Math.round(newArray[p] * 1000) / 1000;
                }
            }

            var dataLength = ((data.length - 1 - index) * (dimensions.height * 0.8) / (data.length - 1)) + 0.1 * dimensions.height;
            var name = data.referee;
            var ratio = Math.round(data[i].ratio * 1000) / 1000;
            var dataColor = ["hsla(0, 100%, 10%, 1)", "hsla(0, 100%, 14%, 1)", "hsla(0, 100%, 18%, 1)", "hsla(0, 100%, 22%, 1)", "hsla(0, 100%, 26%, 1)", "hsla(0, 100%, 30%, 1)", "hsla(0, 100%, 34%, 1)", "hsla(0, 100%, 38%, 1)", "hsla(0, 100%, 42%, 1)", "hsla(0, 100%, 46%, 1)", "hsla(0, 100%, 48%, 1)", "hsla(0, 100%, 50%, 1)", "hsla(0, 100%, 54%, 1)", "hsla(0, 100%, 58%, 1)", "hsla(0, 100%, 62%, 1)", "hsla(0, 100%, 68%, 1)", "hsla(0, 100%, 72%, 1)", "hsla(0, 100%, 76%, 1)", "hsla(0, 100%, 80%, 1)",
                "hsla(0, 100%, 84%, 1)", "hsla(0, 100%, 88%, 1)", "hsla(0, 100%, 90%, 1)", "hsla(0, 100%, 92%, 1)", "hsla(0, 100%, 94%, 1)", "hsla(0, 100%, 96%, 1)", "hsla(0, 100%, 98%, 1)", "hsla(0, 100%, 100%, 1)"]
            if (!isNaN(ratio)) {
                var verdict = "";
                if (ratio > 0.53) {
                    verdict = "Away whistler";
                } else if (ratio < 0.47) {
                    verdict = "Home whistler";
                } else if (ratio == 0.5) {
                    verdict = "Fair as square";
                } else {
                    verdict = "Reasonably fair";
                }
                var tooltipInfo = "Referee: " + name + "\nSeason: " + data[i].year + "\nRatio: " + ratio + "\nPersonal avg: " + Math.round(data.avgRatio * 1000) / 1000 + "\nVerdict: " + verdict;
                var tip_div = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                var comp_div = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                var dataLengthRef;
                var dataLengthText;
                if (data.length <= 1) {
                    dataLengthRef = dimensions.height * 0.5;
                    dataLengthText = 15 + dimensions.height * 0.5;
                } else {
                    dataLengthRef = dataLength;
                    dataLengthText = 15 + dataLength;
                }
                var circle = svg.append("circle")
                    .attr("cx", dimensions.width * 0.5)
                    .attr("cy", dataLengthRef)
                    .attr("r", 0)
                    .attr("stroke", "black")
                    .attr("stroke-width", lineThickness / 4)
                    .attr("fill", dataColor[color])
                    .on('mouseover', function () {
                        d3.select(this).transition().attr("r", dimensions.width / 65).ease("elastic");
                        tip_div.transition()
                            .duration(200)
                            .style("opacity", 0.9);
                        tip_div.html("Referee: " + name + "<br>Season: " + data[i].year + "<br>Ratio: " + ratio + "<br>Personal avg: " + Math.round(data.avgRatio * 1000) / 1000)
                            .style("left", (dimensions.width / 8) + "px")
                            .style("top", (dimensions.height / 2 - 17) + "px")
                            .style("height", "65px")
                            .style("width", "130px");
                    })
                    .on('mouseout', function () {
                        d3.select(this).transition().attr("r", dimensions.width / 85);
                        tip_div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })
                    .on('click', function () {
                        d3.select(this).transition().attr("r", dimensions.width / 65).ease("elastic");
                        comp_div.transition()
                            .duration(500)
                            .style("opacity", 0);
                        comp_div.transition()
                            .duration(200)
                            .style("opacity", 0.9);
                        comp_div.html("Referee: " + name + "<br>Season: " + data[i].year + "<br>Ratio: " + ratio + "<br>Personal avg: " + Math.round(data.avgRatio * 1000) / 1000)
                            .style("left", (7 * dimensions.width / 8 + 50) + "px")
                            .style("top", (dimensions.height / 2 - 17) + "px")
                            .style("height", "65px")
                            .style("width", "130px");
                    });
                circle.append("svg:title").text(function () {
                    return tooltipInfo;
                });

                /!*   for(var n = 0; n < selectedReferee.length; n++) {
                 //TODO:Fix this

                 if(selectedReferee[n].avgRatio >= maxRatio){
                 //  console.log("found REF");
                 var colorText =	"#FF0000";
                 }else{
                 colorText = "white";
                 }
                 }*!/


                //TODO: fix bug bij uit/inzoomen
                circle.transition()
                    .attr("r", dimensions.width / 85)
                    .attr("cx", dimensions.width * ratio)
                    .duration(3000)
                    .ease("elastic")
                    .delay(0);

                refereeCircles.push(circle);

            }
            index++;
        }
    }
    if (j == 0) {
    }
}*/
