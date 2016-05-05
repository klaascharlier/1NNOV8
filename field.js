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
var textLegende = [];
var circleLegende = [];
var avgCircles = [];
var avgRects = [];
var textAverage = [];
var textReferee = [];
var yearLabels = [];

var body;
var dimensions = {
    width: 360,
    height: 225
};
var lineThickness = dimensions.width * 0.005;
var svg;
var maxRatio = 0.000;

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

    var compareWindow = svg.append("rect")
        .attr("width", dimensions.width /2.9)
        .attr("height", dimensions.height/3.5)
        .attr("x", 5 * lineThickness)
        .attr("y", 5 * lineThickness)
        .attr("stroke", "white")
        .attr("stroke-width", lineThickness)
        .attr("fill", "black")
        .attr("opacity", 0.2);

    var homeText = svg.append("text")
        .attr("x", dimensions.width * 0.05)
        .attr("y", dimensions.height * 0.95)
        .text(function(){
            return "HOME ADV";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "40px")
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("opacity", 0.65);

    var awayText = svg.append("text")
        .attr("x", dimensions.width * 0.7)
        .attr("y", dimensions.height * 0.95)
        .text(function(){
            return "AWAY ADV";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "40px")
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("opacity", 0.65);


}

function clearRefCirclesFromSVG() {
    if (Object.keys(refereeCircles).length >= 0) {
        refereeCircles.forEach(function (obj) {
            obj.remove();
        });
        console.log(refereeCircles);
        refereeCircles = [];

    }
    if (Object.keys(textReferee).length >= 0) {
        textReferee.forEach(function (obj) {
            obj.remove();
        });
        textReferee = [];
    }

}

function clearRefTextFromSVG(){
    if (Object.keys(textReferee).length >= 0) {
        textReferee.forEach(function (obj) {
            obj.remove();
        });
        textReferee = [];
    }
}

function clearLegende(){
    if (Object.keys(textLegende).length >= 0) {
        textLegende.forEach(function (obj) {
            obj.remove();
        });
        textLegende = [];
    }
    if (Object.keys(circleLegende).length >= 0) {
        circleLegende.forEach(function (obj) {
            obj.remove();
        });
        circleLegende = [];
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

function clearYearLabels(){
    if (Object.keys(yearLabels).length >= 0) {
        yearLabels.forEach(function (obj) {
            obj.remove();
        });
        yearLabels = [];
    }
}

function writeYearLabels(data){
    clearYearLabels();
    var index = 0;
    for(var i in data){
        var text = svg.append("text")
            .attr("x", dimensions.width * 0.9)
            .attr("y", dimensions.height * 0.12 + index * (dimensions.height * 0.8 / (data.length - 1)))
            .attr("fill","white")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("color", "yellow")
            .text(function () {
                return data[i].year;
            });
        index++;
    }
}



function drawAvgData(data) {
    clearAvgCirclesFromSVG();
    //drawAVGrectData(data);
    var index = 0;

/*
    for (var i in data) {
        if (index < data.length) {
            var dataLength = ((data.length -1 - index) * (dimensions.height * 0.8) / (data.length-1)) + 0.1 * dimensions.height;
            var ratio = Math.round(data[i].ratio * 1000)/1000;
            var avgRatio = Math.round(data.avgRatio *1000)/1000;
            var year = data[i].year;
            var tooltipInfo = "Year: " + year+ "\nAverage ratio: " +ratio +"\nAverage ratio (All seasons): " + avgRatio;
            var dataLengthAvgCircle;
            var dataLengthAvgText;
            if(data.length <= 1){
                dataLengthAvgCircle = dimensions.height*0.5;
                dataLengthAvgText = (dimensions.height*0.5)-10;
            }else{
                dataLengthAvgCircle = dataLength;
                dataLengthAvgText = dataLength-10;
            }
            var circle = svg.append("circle")
                .attr("cx", dimensions.width * 0.5)
                .attr("cy", dataLengthAvgCircle)
                .attr("r", 0)
                .attr("stroke", "white")
                .attr("stroke-width", lineThickness)
                .attr("fill", "black")
                .on('mouseover', function () {
                    d3.select(this).transition().attr("r", lineThickness * 4).ease("elastic");
                })
                .on('mouseout', function () {
                    d3.select(this).transition().attr("r", lineThickness * 3);
                });
            circle.append("svg:title").text(function () {
                return tooltipInfo;
            });
            //circle.append("svg:text").text(function(){
             //return "test";
             //});

            var text = svg.append("text")
                .attr("x", dimensions.width * ratio)
                .attr("y",dataLengthAvgText)
                .attr("fill","white")
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .text("Average");

            circle.transition()
                .attr("r", lineThickness * 5)
                .attr("cx", dimensions.width * ratio)
                .duration(3000)
                .ease("elastic")
                .delay(0);
            avgCircles[index] = circle;
            textAverage[index] = text;
            index++;
        }
    }*/
}

/*function clearAvgRectsFromSVG(){
    if (Object.keys(avgRects).length > 0) {
        avgRects.forEach(function (obj) {
            obj.remove();
        });
        avgRects = [];
    }
    if (Object.keys(textAverage).length > 0) {
        textAverage.forEach(function (obj) {
            obj.remove();
        });
        textAverage = [];
    }
}

function drawAVGrectData(data){
    clearAvgRectsFromSVG();
    var index = 0;

    for (var i in data) {
        if (index < data.length) {
            var dataLength = ((data.length -1 - index) * (dimensions.height * 0.8) / (data.length-1)) + 0.1 * dimensions.height;
            var ratio = Math.round(data[i].ratio * 1000)/1000;
            var avgRatio = Math.round(data.avgRatio *1000)/1000;
            var year = data[i].year;
            var tooltipInfo = "Year: " + year+ "\nAverage ratio: " +ratio +"\nAverage ratio (All seasons): " + avgRatio;
            var dataLengthAvgRect;
            var dataLengthAvgText;
            if(data.length <= 1){
                dataLengthAvgRect = dimensions.height*0.5;
                dataLengthAvgText = (dimensions.height*0.5)-10;
            }else{
                dataLengthAvgRect = dataLength;
                dataLengthAvgText = dataLength-10;
            }
            var rect = svg.append("rect")
                .attr("x", dimensions.width * ratio)
                .attr("y", dataLengthAvgRect - lineThickness*6)
                .attr("width", 0)
                .attr("height", 0)
                .attr("stroke-width", lineThickness / 4)
                .attr("fill", "red")
                .on('mouseover', function () {
                    d3.select(this).transition().attr("height", lineThickness * 14).ease("elastic");
                })
                .on('mouseout', function () {
                    d3.select(this).transition().attr("height", lineThickness * 12);
                });
            rect.append("svg:title").text(function () {
                return tooltipInfo;
            });
            /!*circle.append("svg:text").text(function(){
             return "test";
             });*!/

            var text = svg.append("text")
                .attr("x", dimensions.width * ratio)
                .attr("y", dataLengthAvgText )
                .attr("fill","white")
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .text("");

            rect.transition()
                .attr("height", lineThickness * 12)
                .attr("width", dimensions.width * (Math.abs(ratio - 0.5)))
                .duration(3000)
                .ease("elastic")
                .delay(0);
            avgRects[index] = rect;
            textAverage[index] = text;
            index++;
        }
    }
}*/



function drawRefereeData(data, j, color){
    if(j == 1) {
        clearRefCirclesFromSVG();
        clearLegende();
    }
    writeYearLabels(data);
    var index = 0;



    for(var i in data){
        if(index < data.length) {

            newArray = [];
            for (var k = 0; k < selectedReferee.length; k++) {
                newArray[k] = data.avgRatio;
            }
            for(var p = 0; p < newArray.length;p++){
                if (newArray[p] > maxRatio) {
                    maxRatio =  Math.round(newArray[p] * 1000)/1000;
                }
            }

            var dataLength = ((data.length -1 - index) * (dimensions.height * 0.8) / (data.length-1)) + 0.1 * dimensions.height;
            var name = data.referee;
            var ratio = Math.round(data[i].ratio * 1000)/1000;
            //var dataColor = ["#004B4B","#B17628", "#2851B1" , "#B12828", "#28B151","#CCCC00" , "#66CC00",'#4C0099','#330019','#404040'];
            var dataColor = ["Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
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
                var tip_div = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                var comp_div = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                var dataLengthRef;
                var dataLengthText;
                if(data.length <= 1){
                    dataLengthRef = dimensions.height*0.5;
                    dataLengthText = 15+dimensions.height*0.5;
                }else{
                    dataLengthRef = dataLength;
                    dataLengthText = 15+dataLength;
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
                        tip_div.html("Referee: " + name + "<br>Season: " + data[i].year + "<br>Ratio: " + ratio + "<br>Personal avg: " + Math.round(data.avgRatio * 1000)/1000)
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
                        comp_div.html("Referee: " + name + "<br>Season: " + data[i].year + "<br>Ratio: " + ratio + "<br>Personal avg: " + Math.round(data.avgRatio * 1000)/1000)
                            .style("left", (7*dimensions.width / 8 + 50) + "px")
                            .style("top", (dimensions.height / 2 - 17) + "px")
                            .style("height", "65px")
                            .style("width", "130px");
                    });
                circle.append("svg:title").text(function () {
                    return tooltipInfo;
                });

                for(var n = 0; n < selectedReferee.length; n++) {
                    //TODO:Fix this
                    if(selectedReferee[n].avgRatio >= maxRatio){
                      //  console.log("found REF");
                        var colorText =	"#FF0000";
                    }else{
                        colorText = "white";
                    }
                    if (n <= 8) {
                        var legendeCircle = svg.append("circle")
                            .attr("cx", 20)
                            .attr("cy", 18 + (n) * 15)
                            .attr("r", 5)
                            .attr("stroke", "black")
                            .attr("stroke-width", lineThickness / 4)
                            .attr("fill", dataColor[n]);
                        var legendeText = svg.append("text")
                            .attr("x", 32)
                            .attr("y", 22 + (n) * 15)
                            .attr("fill", colorText)
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "10px")
                            .text(selectedReferee[n]);
                    }else if (n > 8 && n <= 17) {
                        var legendeCircle = svg.append("circle")
                            .attr("cx", 120)
                            .attr("cy", 18 + (n - 9) * 15)
                            .attr("r", 5)
                            .attr("stroke", "black")
                            .attr("stroke-width", lineThickness / 4)
                            .attr("fill", dataColor[n]);
                        var legendeText = svg.append("text")
                            .attr("x", 132)
                            .attr("y", 22 + (n-9) * 15)
                            .attr("fill", colorText)
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "10px")
                            .text(selectedReferee[n]);
                    } else if (n> 17 && n <= 26) {
                        var legendeCircle = svg.append("circle")
                            .attr("cx", 220)
                            .attr("cy", 18 + (n - 18) * 15)
                            .attr("r", 5)
                            .attr("stroke", "black")
                            .attr("stroke-width", lineThickness / 4)
                            .attr("fill", dataColor[n]);
                        var legendeText = svg.append("text")
                            .attr("x", 232)
                            .attr("y", 22 + (n-18) * 15)
                            .attr("fill", colorText)
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "10px")
                            .text(selectedReferee[n]);
                    }
                    textLegende.push(legendeText);
                    circleLegende.push(legendeCircle);
                }
                var text = svg.append("text")
                    .attr("x", dimensions.width * ratio)
                    .attr("y",dataLengthText)
                    .attr("fill","black")
                    .style("font-weight", "bold")
                    .attr("font-family", "bold sans-serif")
                    .attr("font-size", "10px")
                    .text(name);

                //TODO: fix bug bij uit/inzoomen
                circle.transition()
                    .attr("r", dimensions.width / 85)
                    .attr("cx", dimensions.width * ratio)
                    .duration(3000)
                    .ease("elastic")
                    .delay(0);

                textReferee.push(text);
                refereeCircles.push(circle);

            }
            index++;
        }
    }
    if(j == 0){
        clearRefTextFromSVG();
    }
}