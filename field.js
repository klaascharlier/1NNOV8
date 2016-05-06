var dimensions = {
    width: 360,
    height: 225
};
var lineThickness = dimensions.width * 0.002;
var svg;

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
        .attr("x", dimensions.width * 0.05)
        .attr("y", dimensions.height * 0.95)
        .text(function () {
            return "HOME ADV";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 50)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("opacity", 0.65);

    var awayText = svg.append("text")
        .attr("x", dimensions.width * 0.84)
        .attr("y", dimensions.height * 0.95)
        .text(function () {
            return "AWAY ADV";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", dimensions.width / 50)
        .attr("font-weight", "bold")
        .attr("fill", "white")
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
        if (!isNaN(dataOfReferee.data[i].ratioFaults)) {
            var circle = svg.append("circle")
                .attr("cx", dimensions.width * ((dataOfReferee.data[i].ratioFaults - 0.5) * 2 + 0.5))
                .attr("cy", dataHeight)
                .attr("r", 2)
                .attr("stroke", "black")
                .attr("stroke-width", lineThickness / 4)
                .attr("fill", "black")
                .attr("opacity", 1)
                .on('mouseover', function () {
                    highLight(dataOfReferee);
                })
                .on('mouseout', function () {
                    unHighLight(dataOfReferee);
                });
            circleArray.push(circle);
        }
    }
    return circleArray;
}

function highLight(dataOfReferee) {
    dataOfReferee.button.css("background-color", "white");
    $.each(dataOfReferee.circles, function (index, circle) {
        circle.transition().attr("r", dimensions.width / 65).attr("fill","black").ease("elastic");
    });
}

function unHighLight(dataOfReferee) {
    dataOfReferee.button.css("background-color", "#7a0000");
    $.each(dataOfReferee.circles, function (index, circle) {
        circle.transition().attr("r", 2).ease("elastic");
    });
}

function drawAverageCircles(data) {
    var circleArray = [];
    for (var i = 0; i < data.length; i++) {
        var dataHeight = ((data.length - 1 - i) * (dimensions.height * 0.8) / (data.length - 1)) + 0.1 * dimensions.height;
        if (!isNaN(data[i].ratio)) {
            var circle = svg.append("circle")
                .attr("cx", dimensions.width * ((data[i].ratio - 0.5) * 2 + 0.5))
                .attr("cy", dataHeight)
                .attr("r", 2)
                .attr("stroke", "black")
                .attr("stroke-width", lineThickness / 4)
                .attr("fill", "black")
                .attr("visibility", "hidden");
            circleArray.push(circle);
        }
    }
    return circleArray;
}

function showAverage() {
    var ratios = avgFaultsRatio();
    $.each(refereeData, function (index, referee) {
        var min = 0;
        for (var i = 0; i < referee.data.length; i++) {
            if (!isNaN(referee.data[i].ratioFaults)) {
                referee.circles[i - min].transition().duration(700).attr("cx", dimensions.width * ((ratios[i].ratio - 0.5) * 2 + 0.5)).attr('opacity', 0).ease("sin-in-out");
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
                referee.circles[i - min].transition().duration(700).attr("cx", dimensions.width * ((referee.data[i].ratioFaults - 0.5) * 2 + 0.5)).attr('opacity', 1).ease("sin-in-out");
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

function deSelectReferee(dataOfReferee){
    $.each(dataOfReferee.circles, function (index, circle) {
        circle.transition().attr("r", 1).attr("fill","grey").ease("elastic");
    });
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
