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
var avgCircles = [];
var textAverage = [];
var textReferee = [];
var body;
var dimensions = {
    width: 360,
    height: 225
};
var lineThickness = dimensions.width * 0.005;
var svg;

function drawField(width) {

    svg.selectAll("*").remove();

    dimensions.width = width;
    dimensions.height = 225/360*width;

    svg = d3.select("#svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("align", "center");

    var body = d3.select("#soccerfield")
        .attr("bgcolor", "grey");
    this.body = body;

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
        .attr("stroke-width", lineThickness);

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

    var menuItems = ["teams", "referees", "something else"];
    var options = [];


}

function clearRefCirclesFromSVG() {
    if (Object.keys(refereeCircles).length > 0) {
        refereeCircles.forEach(function (obj) {
            obj.remove();
        });
        refereeCircles = [];
    }
    if (Object.keys(textReferee).length > 0) {
        textReferee.forEach(function (obj) {
            obj.remove();
        });
        textReferee = [];
    }
}

function clearAvgCirclesFromSVG() {
    if (Object.keys(avgCircles).length > 0) {
        avgCircles.forEach(function (obj) {
            obj.remove();
        });
        avgCircles = [];
    }
    if (Object.keys(textAverage).length > 0) {
        textAverage.forEach(function (obj) {
            obj.remove();
        });
        textAverage = [];
    }
}

function changeReferee(referee){ //TODO
    //could just be the drawRefereeData() function
}

function drawAvgData(data) {
    clearAvgCirclesFromSVG();
    var index = 0;
    for (var i in data) {
        if (index < data.length) {
            var ratio = Math.round(data[i].ratio * 1000)/1000;
            var avgRatio = Math.round(data.avgRatio *1000)/1000;
            var year = data[i].year;
            var tooltipInfo = "Year: " + year+ "\nAverage ratio: " +ratio +"\nAverage ratio (All seasons): " + avgRatio;
            var circle = svg.append("circle")
                .attr("cx", dimensions.width * 0.5)
                .attr("cy", ((data.length - 1 - index) * (dimensions.height * 0.8) / (data.length - 1)) + 0.1 * dimensions.height)
                .attr("r", 0)
                .attr("stroke", "black")
                .attr("stroke-width", lineThickness / 4)
                .attr("fill", "white")
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
            /*circle.append("svg:text").text(function(){
                return "test";
            });*/
            var text = svg.append("text")
                .attr("x", dimensions.width * ratio)
                .attr("y",(-10+(data.length - 1 - index) * (dimensions.height * 0.8) / (data.length - 1)) + 0.1 * dimensions.height )
                .attr("fill","white")
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .text("Average");

            circle.transition()
                .attr("r", lineThickness * 3)
                .attr("cx", dimensions.width * ratio)
                .duration(3000)
                .ease("elastic")
                .delay(0);
            avgCircles[index] = circle;
            textAverage[index] = text;
            index++;
        }
    }
}

function drawRefereeData(data){

    clearRefCirclesFromSVG();

    var index = 0;
    for(var i in data){
        if(index < data.length) {
            var name = data.referee;
            var ratio = Math.round(data[i].ratio * 1000)/1000;
            if(!isNaN(ratio)) {
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
                var tooltipInfo = "Referee: " + name + "\nSeason: " + data[i].year + "\nRatio: " + ratio + "\nPersonal avg: " + Math.round(data.avgRatio * 1000)/1000+ "\nVerdict: " + verdict;

            var circle = svg.append("circle")
                .attr("cx", dimensions.width * 0.5)
                .attr("cy", ((data.length -1 - index) * (dimensions.height * 0.8) / (data.length - 1)) + 0.1 * dimensions.height)
                .attr("r", 0)
                .attr("stroke", "black")
                .attr("stroke-width", lineThickness / 4)
                .attr("fill", "#004B4B")
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
                var text = svg.append("text")
                    .attr("x", dimensions.width * ratio)
                    .attr("y",(15+(data.length - 1 - index) * (dimensions.height * 0.8) / (data.length - 1)) + 0.1 * dimensions.height )
                    .attr("fill","black")
                    .style("font-weight", "bold")
                    .attr("font-family", "bold sans-serif")
                    .attr("font-size", "10px")
                    .text(name);
                circle.transition()
                    .attr("r", lineThickness * 3)
                    .attr("cx", dimensions.width * ratio)
                    .duration(3000)
                    .ease("elastic")
                    .delay(0);
                textReferee[index] = text;
                refereeCircles[index] = circle;
            }
            else {
                var rect = svg.append("rect")
                    .attr("x", dimensions.width * 0.5 - 1.5*lineThickness)
                    .attr("y", ((data.length - 1 - index) * (dimensions.height * 0.8) / (data.length - 1)) + 0.1 * dimensions.height + 1.5*lineThickness )
                    .attr("width", 3 * lineThickness)
                    .attr("height", 3 * lineThickness)
                    .attr("fill", "red")
                    .attr("stroke", "yellow")
                    .attr("stroke-width", lineThickness/4);
                rect.transition()
                    .attr("x", dimensions.width * 0.5 - 3*lineThickness)
                    .attr("y", ((data.length - 1 - index) * (dimensions.height * 0.8) / (data.length - 1)) + 0.1 * dimensions.height)
                    .attr("width", 6 * lineThickness)
                    .attr("height", 6 * lineThickness)
                    .duration(3000)
                    .ease("elastic")
                    .delay(0);
                rect.append("svg:title").text(function () {
                    return "Referee: " + name + "\nHas not lead a match in the season " + data[i].year;
                });
                refereeCircles[index] = rect;
            }
            index++;
        }
    }
}