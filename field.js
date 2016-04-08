var tempData = {
    "referee1": {"name":"John", "ratio": 0.5},
    "referee2": {"name":"Hugh", "ratio": 0.6},
    "referee3": {"name":"Victor", "ratio": 0.45},
    "referee4": {"name":"Klaas", "ratio": 0.8},
    "referee5": {"name":"Jean", "ratio": 0.55},
    "referee6": {"name":"John", "ratio": 0.4},
    "referee7": {"name":"Hugh", "ratio": 0.44},
    "referee8": {"name":"Victor", "ratio": 0.59},
    "referee9": {"name":"Klaas", "ratio": 0.42},
    "referee10": {"name":"Jean", "ratio": 0.49},
    "referee11": {"name":"John", "ratio": 0.35},
    "referee12": {"name":"Hugh", "ratio": 0.6},
    "referee13": {"name":"Victor", "ratio": 0.1},
    "referee14": {"name":"Klaas", "ratio": 0.8},
    "referee15": {"name":"Jean", "ratio": 0.55},
    "referee16": {"name":"John", "ratio": 0.4},
    "referee17": {"name":"Hugh", "ratio": 0.44},
    "referee18": {"name":"Victor", "ratio": 0.59},
    "referee19": {"name":"Klaas", "ratio": 0.42},
    "referee20": {"name":"Jean", "ratio": 0.49},
    "referee21": {"name":"John", "ratio": 0.35},
    "referee22": {"name":"Hugh", "ratio": 0.6},
    "referee23": {"name":"Victor", "ratio": 0.1},
    "referee24": {"name":"Klaas", "ratio": 0.8},
    "referee25": {"name":"Jean", "ratio": 0.55},
    "referee26": {"name":"John", "ratio": 0.4},
    "referee27": {"name":"Hugh", "ratio": 0.44},
    "referee28": {"name":"Victor", "ratio": 0.59},
    "referee29": {"name":"Klaas", "ratio": 0.42},
    "referee30": {"name":"Jean", "ratio": 0.49}
};
var refereeCircles = [];
var body;
var scale = 2.6;
var dimensions = {
    width: scale * 360,
    height: scale * 225
};
var lineThickness = dimensions.width * 0.005;
var svg;

function drawField() {

    var body = d3.select("#soccerfield")
        .attr("bgcolor", "grey");
    this.body = body;

    var svg = body.append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("align", "center")
    this.svg = svg;

    var field = svg.append("rect")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("fill", "green");

    var fieldRect = svg.append("rect")
        .attr("width", dimensions.width - 10 * lineThickness)
        .attr("height", dimensions.height - 10 * lineThickness)
        .attr("x", 5 * lineThickness)
        .attr("y", 5 * lineThickness)
        .attr("fill", "green")
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .on("mouseover", function () {
            hideOptions();
        });

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
        .attr("fill", "green");

    var middleStip = svg.append("circle")
        .attr("cx", dimensions.width * 0.5)
        .attr("cy", dimensions.height * 0.5)
        .attr("r", lineThickness * 4)
        .attr("stroke", "white")
        .attr("fill", "white")
        .on("mouseover", function () {
            showOptions();
        });

    var leftBigBak = svg.append("rect")
        .attr("width", dimensions.width / 6)
        .attr("height", dimensions.height * 0.5)
        .attr("x", 5 * lineThickness)
        .attr("y", dimensions.height * 0.25)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "green");

    var rightBigBak = svg.append("rect")
        .attr("width", dimensions.width / 6)
        .attr("height", dimensions.height * 0.5)
        .attr("x", dimensions.width - dimensions.width / 6 - 5 * lineThickness)
        .attr("y", dimensions.height * 0.25)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "green");

    var leftSmallBak = svg.append("rect")
        .attr("width", dimensions.width / 14)
        .attr("height", dimensions.height * 0.2)
        .attr("x", 5 * lineThickness)
        .attr("y", dimensions.height * 0.4)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "green");

    var rightSmallBak = svg.append("rect")
        .attr("width", dimensions.width / 14)
        .attr("height", dimensions.height * 0.2)
        .attr("x", dimensions.width - dimensions.width / 14 - 5 * lineThickness)
        .attr("y", dimensions.height * 0.4)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "green");

    var menuItems = ["teams", "referees", "something else", "eijfao", "fee", "teams", "referees", "something else", "eijfao", "fee",];
    var options = [];





    for(i = 0; i<10; i++) {
        var circle = svg.append("circle")
            .attr("cx", Math.sin(360 * i / menuItems.length * Math.PI / 180) * dimensions.width * 0.075 + dimensions.width * 0.5)
            .attr("cy", Math.cos(360 * i / menuItems.length * Math.PI / 180) * dimensions.width * 0.075 + dimensions.height * 0.5)
            .attr("r", lineThickness * 3)
            .attr("stroke", "white")
            .attr("fill", "white")
            .attr("visibility", "hidden")
            .on("click", function () {
                //console.log(teamsList[i]);
                drawRefereeData(tempData);
            })
            .on("mouseover", function () {
                d3.select(this).attr("fill", "red")
                    .attr("stroke", "red");
            })
            .on("mouseout", function () {
                d3.select(this).attr("fill", "white")
                    .attr("stroke", "white");
            });
        options.push(circle);
    }

    function showOptions() {
        for (i = 0; i < options.length; i++) {
            options[i].attr("visibility", "visible");
        }
    }

    function hideOptions() {
        for (i = 0; i < options.length; i++) {
            options[i].attr("visibility", "hidden");
        }
    }
}

function clearRefCirclesFromSVG() {
    if (Object.keys(refereeCircles).length > 0) {
        refereeCircles.forEach(function (obj) {
            obj.remove();
        });
        refereeCircles = [];
    }
}

function changeReferee(referee){ //TODO
    //could just be the drawRefereeData() function
}

function drawRefereeData(data){
    clearRefCirclesFromSVG();
    var index = 0;
    for(var i in data){
        if(index < data.length) {
            var name = data.referee;
            var ratio = Math.round(data[i].ratio * 100)/100;
            var verdict = "";
            if (ratio > 0.55) {
                verdict = "Away whistler";
            } else if (ratio < 0.45) {
                verdict = "Home whistler";
            } else if (ratio == 0.5) {
                verdict = "Fair as square";
            } else {
                verdict = "Reasonably fair";
            }
            var tooltipInfo = "Referee: " + name + "\nSeason: " + data[i].year + "\nRatio: " + ratio + "\nVerdict: " + verdict;

            var circle = svg.append("circle")
                .attr("cx", dimensions.width * 0.5)
                .attr("cy", ((data.length - 1 - index) * (dimensions.height * 0.8) / (Object.keys(data).length - 2)) + 0.1 * dimensions.height)
                .attr("r", 0)
                .attr("stroke", "black")
                .attr("stroke-width", lineThickness / 4)
                .attr("fill", "yellow")
                .on('mouseover', function () {
                    d3.select(this).transition().attr("r", lineThickness * 4).ease("elastic");
                })
                .on('mouseout', function () {
                    d3.select(this).transition().attr("r", lineThickness * 3);
                })
                .on('click', function () {
                    //clearRefCirclesFromSVG();
                    console.log("Hihi you clicked a circle " + name);
                });

            circle.append("svg:title").text(function () {
                return tooltipInfo;
            });
            circle.transition()
                .attr("r", lineThickness * 3)
                .attr("cx", dimensions.width * ratio)
                .duration(3000)
                .ease("elastic")
                .delay(0);
            refereeCircles[index] = circle;
            index++;
        }
    }
}