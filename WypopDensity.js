//Hengtian Huang
var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('padding', '0 10px');
    
    
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var path = d3.geoPath();

var color = d3.scaleThreshold()
    .domain([1, 10, 50, 200, 500, 1000, 2000, 4000])
    .range(d3.schemeOrRd[9]);

    
var x = d3.scaleSqrt()
    .domain([0, 4500])
    .rangeRound([440, 950]);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,40)");

g.selectAll("rect")
  .data(color.range().map(function(d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });

g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Population per square mile");

g.call(d3.axisBottom(x)
    .tickSize(13)
    .tickValues(color.domain()))
  .select(".domain")
    .remove();
   
toggle_flag = true;    
color_flag = true;
    
d3.json("wy-topo.json", function(error, topology) {
  if (error) throw error;


  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(topology, topology.objects.tracts).features)
    .enter().append("path")
      .attr("fill", function(d) { return color(d.properties.density); })
      .attr("d", path)
     .on("mouseover", function(d) {
      tooltip.transition()
        .style('opacity', .9)
        .style('background', 'lightsteelblue')
        .text("population per square mile: "+d.properties.density)
        .style('left', (d3.event.pageX - 35) + 'px')
        .style('top', (d3.event.pageY - 30) + 'px')
        .duration(100);
    })
    .on("mouseout",function(d) {
       tooltip.transition()
         .style("opacity", "0")
         .duration(50);
    });

   if(toggle_flag==true){
            svg.append("path")
      .datum(topojson.feature(topology, topology.objects.counties))
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.3)
      .attr("d", path);
        }
});
    
function update1(){
        if(color_flag==true){
        color_flag = false;
    }else if(color_flag==false){
        color_flag = true;
    }
    svg.selectAll("rect").remove();
    
        if(color_flag==false){
            var color = d3.scaleThreshold()
    .domain([1, 10, 50, 200, 500, 1000, 2000, 4000])
    .range(d3.schemeBuPu[9]);
        }else{
            var color = d3.scaleThreshold()
    .domain([1, 10, 50, 200, 500, 1000, 2000, 4000])
    .range(d3.schemeOrRd[9]);
        }
    
g.selectAll("rect")
  .data(color.range().map(function(d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });
      
    svg.selectAll("path").remove();
    
    d3.json("wy-topo.json", function(error, topology) {
      if (error) throw error;
        
        svg.append("g")
    .selectAll("path")
    .data(topojson.feature(topology, topology.objects.tracts).features)
    .enter().append("path")
      .attr("fill", function(d) { return color(d.properties.density); })
      .attr("d", path)
     .on("mouseover", function(d) {
      tooltip.transition()
        .style('opacity', .9)
        .style('background', 'lightsteelblue')
        .text("population per square mile: "+d.properties.density)
        .style('left', (d3.event.pageX - 35) + 'px')
        .style('top', (d3.event.pageY - 30) + 'px')
        .duration(100);
    })
    .on("mouseout",function(d) {
       tooltip.transition()
         .style("opacity", "0")
         .duration(50);
    });
        
        if(toggle_flag==true){
            svg.append("path")
      .datum(topojson.feature(topology, topology.objects.counties))
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.3)
      .attr("d", path);
        }
        
    });

}  
     
function update2(){
       if(toggle_flag==true){
        toggle_flag = false;
    }else if(toggle_flag==false){
        toggle_flag = true;
    }

     svg.selectAll("rect").remove();
    
        if(color_flag==false){
            var color = d3.scaleThreshold()
    .domain([1, 10, 50, 200, 500, 1000, 2000, 4000])
    .range(d3.schemeBuPu[9]);
        }else{
            var color = d3.scaleThreshold()
    .domain([1, 10, 50, 200, 500, 1000, 2000, 4000])
    .range(d3.schemeOrRd[9]);
        }
    
g.selectAll("rect")
  .data(color.range().map(function(d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });
      
    svg.selectAll("path").remove();
    
    d3.json("wy-topo.json", function(error, topology) {
      if (error) throw error;
        
        svg.append("g")
    .selectAll("path")
    .data(topojson.feature(topology, topology.objects.tracts).features)
    .enter().append("path")
      .attr("fill", function(d) { return color(d.properties.density); })
      .attr("d", path)
     .on("mouseover", function(d) {
      tooltip.transition()
        .style('opacity', .9)
        .style('background', 'lightsteelblue')
        .text("population per square mile: "+d.properties.density)
        .style('left', (d3.event.pageX - 35) + 'px')
        .style('top', (d3.event.pageY - 30) + 'px')
        .duration(100);
    })
    .on("mouseout",function(d) {
       tooltip.transition()
         .style("opacity", "0")
         .duration(50);
    });
        
        if(toggle_flag==true){
            svg.append("path")
      .datum(topojson.feature(topology, topology.objects.counties))
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.3)
      .attr("d", path);
        }
        
    });

}   
