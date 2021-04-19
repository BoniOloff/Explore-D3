const canvas = d3.select(".canva");
canvas.attr("width", "600")
    .attr("height", "600");

// var dataArray = [4, 15, 34, 12];

// var dataArray = [
//     {width: 25, height: 4, fill: "pink"},
//     {width: 25, height: 14, fill: "purple"},
//     {width: 25, height: 44, fill: "orange"},
//     {width: 25, height: 124, fill: "green"},
//     {width: 25, height: 12, fill: "grey"},
//     {width: 25, height: 34, fill: "red"}
// ]

const svg = canvas.append("svg")
            .attr("width", "1000")
            .attr("height", "1000");

const rect = svg.selectAll("rect");


var dataArray = d3.json("data.json")
                  .then(data => {
    
    rect.data(data)
        .enter().append("rect")
        .attr("width", "49")
        .attr("fill", d => d.fill)
        .attr("height", function(d){
            return d.height * 2;
        })
        .attr("x", (d, i) => i * 50)
        .attr("y", (d, i) => {
            return 700 - (d.height * 2);
        });
})