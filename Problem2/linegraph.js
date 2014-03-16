/**
* Created by hen on 2/20/14.
*/
   var bbVis, brush, createVis, dataSet, handle, height, margin, svg, svg2, width;
   var xAxis, xScale, yAxis,  yScale;
   margin = {
       top: 50,
       right: 50,
       bottom: 50,
       left: 250
   };

   width = 960 - margin.left - margin.right;

   height = 500 - margin.bottom - margin.top;

   bbVis = {
       x: 0 + 100,
       y: 10,
       w: width - 100,
       h: 300
   };

   dataSet = [];

   svg = d3.select("#vis").append("svg").attr({
                                               width: width + margin.left + margin.right,
                                               height: height + margin.top + margin.bottom
                                               }).append("g")
                                               .attr({
                                                       transform: "translate(" + margin.left + "," + margin.top + ")"
                                               });


   d3.csv("World_population_estimates.csv", function(data) {   

   // convert your csv data and add it to dataSet

   createVis();
   dataSet=data;
     

   var line =  d3.svg.line()
               .interpolate("linear")
               .x(function(d) { return xScale(d.year); })
               .y(function(d) { return yScale(d.census); });
   var color = d3.scale.category10();

   color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

   var population_census_arr = color.domain().map(function(name) {
                                       return  {
                                                   name: name,
                                                   values: data.map(function(d) {
                                                   return {year: d.year, census: +d[name]};
                                                   })
                                               };
   });

   xScale.domain( [d3.min(data,function (d) { return +d.year}),
                   d3.max(data,function (d) { return +d.year}) ]);
   yScale.domain( [d3.min(population_census_arr, function(c) { return d3.min(c.values, function(v) { return v.census; }); }),
                   d3.max(population_census_arr, function(c) { return d3.max(c.values, function(v) { return v.census; }); })]);


   svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + bbVis.h + ")")
       .call(xAxis)
       .append("text")
       .attr("x", xScale(d3.max(data,function (d) { return +d.year})))
       .text("Year");

   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 6)
       .attr("dy", ".71em")
       .style("text-anchor", "end")
       .text("Population");

   var population = svg.selectAll(".population")
                   .data(population_census_arr)
                   .enter().append("g")
                   .attr("class", "population");

       population.append("path")
                   .attr("class", "line")
                   .attr("d", function(d,i) { 
                                   var valuesArray = new Array();
                                   var j =0;
                                   
                                   for (var i=0;i<d.values.length;i++){
                                       if(d.values[i].census !=""){
                      
                                           valuesArray[j++]={
                                                   year:d.values[i].year,
                                                   census:d.values[i].census
                                           }

                                       }
                                   }
                               return line(valuesArray); 
                               })                    
                   .style("stroke", function(d) { return color(d.name); });

   svg.selectAll("dot")        
       .data(data)                                     
       .enter().append("circle")                               
       .filter(function(d) { return d.USCensus > 0 })                                          
       .style("fill", function(d) { return color("USCensus") })                                
       .attr("r", 2.5)                                     
       .attr("cx", function(d) { return xScale(d.year); })       
       .attr("cy", function(d) { return yScale(d.USCensus); });

   svg.selectAll("dot")        
       .data(data)                                     
       .enter().append("circle")                               
       .filter(function(d) { return d.PopulationBureau > 0 })                                          
       .style("fill", function(d) { return color("PopulationBureau") })                                
       .attr("r", 2.5)                                     
       .attr("cx", function(d) { return xScale(d.year); })       
       .attr("cy", function(d) { return yScale(d.PopulationBureau); });

   svg.selectAll("dot")        
       .data(data)                                     
       .enter().append("circle")                               
       .filter(function(d) { return d.UN > 0 })                                          
       .style("fill", function(d) { return color("UN") })                                
       .attr("r", 2.5)                                     
       .attr("cx", function(d) { return xScale(d.year); })       
       .attr("cy", function(d) { return yScale(d.UN); });

   svg.selectAll("dot")        
       .data(data)                                     
       .enter().append("circle")                               
       .filter(function(d) { return d.HYDE > 0 })                                          
       .style("fill", function(d) { return color("HYDE") })                                
       .attr("r", 2.5)                                     
       .attr("cx", function(d) { return xScale(d.year); })       
       .attr("cy", function(d) { return yScale(d.HYDE); });

   svg.selectAll("dot")        
       .data(data)                                     
       .enter().append("circle")                               
       .filter(function(d) { return d.Maddison > 0 })                                          
       .style("fill", function(d) { return color("Maddison") })                                
       .attr("r", 2.5)                                     
       .attr("cx", function(d) { return xScale(d.year); })       
       .attr("cy", function(d) { return yScale(d.Maddison); });

   });

   createVis = function() {
     

      //   xScale = d3.scale.linear().domain([0,100]).range([0, bbVis.w]);  // define the right domain generically

     // example that translates to the bottom left of our vis space:

       xScale  =   d3.scale.linear()
                   .range([0, bbVis.w]);

       yScale  =   d3.scale.linear()
                   .range([bbVis.h, 0]);

       xAxis   =   d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom");

       yAxis   =   d3.svg.axis()
                   .scale(yScale)
                   .orient("left");



   var visFrame    =   svg.append("g").attr({
                                           "transform": "translate(" + bbVis.x + "," + (bbVis.y + bbVis.h) + ")",

     });

     visFrame.append("rect");


   };
