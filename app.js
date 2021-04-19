const canvas = d3.select(".canva");

const svg = canvas.append("svg")
            .attr("width", "600")
            .attr("height", "600");

svg.append("circle")
    .attr("cx", "100")
    .attr("cy", "100")
    .attr("r", "50")
    .attr("fill", "blue");

svg.append("rect")
    .attr("width", "100")
    .attr("height", "100")
    .attr("x", "150")
    .attr("y", "50")
    .attr("fill", "green")
    .attr("rx", "15")
    .attr("ry", "15");

svg.append("line")
    .attr("x1", "9")
    .attr("x2", "45")
    .attr("y1", "300")
    .attr("y2", "46")
    .attr("stroke", "grey")

svg.append("text")
    .text("Hello there")
    .attr("x", "100")
    .attr("y", "200")
    .attr("fill", "grey")
    .attr("font-size", "30")
    