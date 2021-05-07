let width = 600;
let height = 300;

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
    const margin = { top: 30, right: 40, bottom:40, left:100}
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.bottom - margin.top;

    // Create x scale
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth])
        .nice();

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

    // Put the axis on x
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight)

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`)
        
    xAxisG.selectAll('.domain').remove()

    // Put the axis on y
    const yAxis = d3.axisLeft(yScale)

    const yAxisg = g.append('g').call(yAxis)
        
    yAxisg.selectAll('.domain, .tick line').remove();
        
    // Add Title
    g.append('text')
        .text('7 Most Populous Country')
        .attr('y', -6)
        .attr('x', 120)
        .style('font-size', '1.3em')

    // Add x Label
    g.append('text')
        .text('Population')
        .attr('y', innerHeight + 30)
        .attr('x', innerWidth/2)
        .style('font-size', '1em')

    // combine everything above
    // create rectangle by creating new elements
    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());
})