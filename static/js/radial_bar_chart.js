function createRadialBarChart(ind) {
    const width = 960 / 2,
        height = 600 / 2,
        chartRadius = height / 2 - 50;
    d33 = d3version4;
    const color = d33.scaleOrdinal(d33.schemeCategory10);
    d33.select(".radial-chart-container").html('')
    let svg = d33.select(".radial-chart-container").append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    let tooltip = d33.select(".radial-chart-container").append('div')
        .attr('class', 'tooltip');

    const PI = Math.PI,
        arcMinRadius = 5,
        arcPadding = 3,
        labelPadding = -5,
        numTicks = 10;

    d33.json("../static/data/top3_data.json", (error, data) => {
        // Only picking nutrition info and not the total value of calories
        data = eval(data[ind]["nutrition_info"]);
        console.log(data);
        var full_data = data;
        data_slice = data.slice(1, data.length + 1)
        console.log(data_slice);
        // max_value = d33.max(data_slice, d => parseFloat(d))
        // console.log(max_value);

        let scale = d33.scaleLinear()
            .domain([0, d33.max(data_slice, d => parseFloat(d)) * 1.25])
            .range([0, 2 * PI]);

        let ticks = scale.ticks(numTicks).slice(0, -1);
        // let keys = data.map((d, i) => d.name);
        let keys = ['total fat', 'sugar', 'sodium', 'protein', 'sat. fat', 'total carbohydrate']
        console.log(keys);
        //number of arcs
        const numArcs = keys.length + 2;
        console.log(numArcs);
        const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / (numArcs - 2);
        console.log(arcWidth);
        let arc = d33.arc()
            .innerRadius((d, i) => getInnerRadius(i))
            .outerRadius((d, i) => getOuterRadius(i))
            .startAngle(0)
            .endAngle((d, i) => scale(d))
        
        // radialAxis.append('circle')
        //     .attr('r', (d, i) => getOuterRadius(i) + arcPadding);
        let radialAxis = svg.append('g')
            .attr('class', 'r axis')
            .selectAll('g')
            .data(keys)
            .enter().append('g');

        radialAxis.append('circle')
            .attr('r', (d, i) => getOuterRadius(i + 1) + arcPadding + 5)
            .style('stroke', 'lightgrey');

        //data arcs
        let arcs = svg.append('g')
            .attr('class', 'data')
            .selectAll('path')
            .data(data_slice)
            .enter().append('path')
            .attr('class', 'arc')
            .style('fill', (d, i) => color(i))

        arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTween);

        arcs.on('mousemove', showTooltip)
        arcs.on('mouseout', hideTooltip)

        // Add total calories in the middle of the plot
        svg.append('text')
            .attr('x', -40)
            .attr('y', 0)
            .text(full_data[0] + " kcal")
            // .html(`${full_data[0]}<br>kcal`)
            .attr('font-size', "17px")
            .attr('font-weight', "bold");

        let axialAxis = svg.append('g')
            .attr('class', 'a axis')
            .selectAll('g')
            .data(ticks)
            .enter().append('g')
            .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

        // axialAxis.append('line')
        //     .attr('x2', chartRadius + 50);

        radialAxis.append('text')
            .attr('x', labelPadding)
            .attr('y', (d, i) => -getOuterRadius(i) + arcPadding + 5)
            .text(d => d)
            .style('fill', (d, i) => color(i))
            .attr('font-size', "14px")
            .attr('font-weight', "bold");

        axialAxis.append('text')
            .attr('x', chartRadius * 1.5)
            .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
            .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 50) + ',0)')
            .text(d => d + '%')
            .attr('font-size', "15px")
            .attr('font-weight', "bold")
            .style('fill', 'gray')
            ;
        function arcTween(d, i) {
            let interpolate = d33.interpolate(0, d);
            return t => arc(interpolate(t), i);
        }

        function showTooltip(d) {
            tooltip.style('left', (d33.event.pageX + 10) + 'px')
                .style('top', (d33.event.pageY - 25) + 'px')
                .style('display', 'inline-block')
                .html(d.value);
        }

        function hideTooltip() {
            tooltip.style('display', 'none');
        }

        function rad2deg(angle) {
            return angle * 180 / PI;
        }

        function getInnerRadius(index) {
            return arcMinRadius + (numArcs - (index)) * (arcWidth + arcPadding);
        }

        function getOuterRadius(index) {
            return getInnerRadius(index) + arcWidth;
        }
    })
    
};

// var nutrition_csv = '../Resources/Example/nutrition.csv';
// createRadialBarChart(2);