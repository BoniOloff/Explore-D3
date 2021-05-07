let width = 600;
let height = 600;

let svg = d3.select("svg");
svg.attr('width', width);
svg.attr('height', height);


d3.csv("data.csv").then(data => {
    // convert the data type
    data.forEach(d => {
        d.population = +d.population;
    });
    
    // Function that return values
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = { top: 20, right: 40, bottom:20, left:100}
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.bottom - margin.top;

    // Create x scale
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth]);

    // Create yscale
    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);
    
    // Create a grouping
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create custom format for x axis
    const xAxisTickFormat = number =>
        d3.format('.3s')(number)
            .replace('G', 'B');
    
    // Put the axis
    g.append('g').call(d3.axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();

    g.append('g').call(d3.axisBottom(xScale).tickFormat(xAxisTickFormat))
        .attr('transform', `translate(0,${innerHeight})`)
        .selectAll('.domain')
        .remove();

    // combine everything above
    // create rectangle by creating new elements
    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());

})