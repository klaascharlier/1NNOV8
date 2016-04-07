function drawField() {

    var body = d3.select("body")
        .attr("bgcolor", "grey");

    var scale = 2.6;

    var dimensions = {
        width: scale * 360,
        height: scale * 225
    };

    var lineThickness = dimensions.width * 0.005;

    var svg = body.append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("align", "center");

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
        .attr("onmouseover", "hideOptions()");

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
        .attr("onmouseover", "showOptions()");

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

    var activeMenu = "none";
    var activeReferee = "none";
    var menuItems = ["teams", "referees", "something else", "eijfao", "fee", "teams", "referees", "something else", "eijfao", "fee",];

    var options = [];

    for (i = 0; i < 10; i++) {
        var circle = svg.append("circle")
            .attr("cx", Math.sin(360 * i / menuItems.length * Math.PI / 180) * dimensions.width * 0.075 + dimensions.width * 0.5)
            .attr("cy", Math.cos(360 * i / menuItems.length * Math.PI / 180) * dimensions.width * 0.075 + dimensions.height * 0.5)
            .attr("r", lineThickness * 3)
            .attr("stroke", "white")
            .attr("fill", "white")
            .attr("visibility", "hidden")
            .on("click", function () {
                console.log(teamsList[i]);
            })
            .on("mouseover", function () {
                d3.select(this).attr("fill", "red");
            })
            .on("mouseout", function () {
                d3.select(this).attr("fill", "white");
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