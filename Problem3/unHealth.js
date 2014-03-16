var bbDetail, bbOverview, dataSet, svgO, svgD;

var margin = {
    top: 50,
    right: 40,
    bottom: 50,
    left: 100
};

var width = 960 - margin.left - margin.right;

var height = 800 - margin.bottom - margin.top;

var parseDate = d3.time.format("%m/%Y").parse;

    var bbVis = {
            x: 0 + 100,
            y: 10,
            w: width - 100,
            h: 100
        };

var bbOverview = {
    x: 0,
    y: 10,
    w: width,
    h: 60
};

var xO = d3.time.scale()
    .range([0, bbOverview.w]);

var yO = d3.scale.linear()
    .range([bbOverview.h, 20]);

var xAxisO = d3.svg.axis()
    .scale(xO)
    .orient("bottom");

var yAxisO = d3.svg.axis()
    .scale(yO)
    .orient("left")
    .ticks(3);

var lineO = d3.svg.line()
    .x(function(d) { return xO(d.AnalysisDate); })
    .y(function(d) { return yO(d.WomensHealth); });

var bbDetail = {
    x: 0,
    y: 100,
    w: width,
    h: 300
};

var xD = d3.time.scale()
         .range([0, bbDetail.w]);

var yD = d3.scale.linear()
         .range([bbDetail.h, 20]);

var xAxisD = d3.svg.axis()
             .scale(xD)
             .orient("bottom");

var yAxisD = d3.svg.axis()
            .scale(yD)
            .orient("left");

var lineD = d3.svg.line()
            .x(function(d) { return xD(d.AnalysisDate); })
            .y(function(d) { return yD(d.WomensHealth); });

var area = d3.svg.area()
            .x(function(d) { return xD(d.AnalysisDate); })
            .y0(bbDetail.h)
            .y1(function(d) { return yD(d.WomensHealth); });

dataSet = [];

var svgO =   d3.select("#visUN")
            .append("svg")
            .attr({ width : width + margin.left + margin.right,
                   height: bbOverview.h + margin.top + margin.bottom
            })
            .append("g")
            .attr({ transform: "translate(" + margin.left + "," + margin.top + ")" });

var svgD =   d3.select("#visUN")
            .append("svg")
            .attr({ width : width + margin.left + margin.right,
                   height: bbDetail.h + margin.top + margin.bottom
            })
            .append("g")
            .attr({ transform: "translate(" + margin.left + "," + margin.top + ")" });

d3.csv("Twitter.csv", function(error, data) {
    data.forEach(function(d) {
    d.AnalysisDate = parseDate(d.AnalysisDate);
    d.WomensHealth = parseInt(+d.WomensHealth);
    });

  xO.domain(d3.extent(data, function(d) { return d.AnalysisDate; }));
  yO.domain(d3.extent(data, function(d) { return d.WomensHealth; }));

    // Brush

    var brush = d3.svg.brush().x(xO).on("brush", brushed);

  svgO.append("g")
      .attr("class", "x axis")
     // .attr("class", "line")
      .attr("transform", "translate(0," + bbOverview.h + ")")
      .call(xAxisO)
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("x", xO(d3.max(data,function (d) { return +d.AnalysisDate}))+30)
      .attr("dx", ".61em")
      .style("text-anchor", "end")
      .text("Timeline");


  svgO.append("g")
      .attr("class", "y axis")
      .call(yAxisO);

svgO.append("g")
       .attr("class", "brush")
       .call(brush)
       .selectAll("rect").attr({ height: 60,
                                 transform: "translate(0,"+bbOverview.x+")" });

  svgO.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineO);
  
  svgO.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  svgO.selectAll("dot")        
        .data(data)                                     
        .enter().append("circle")                               
        .filter(function(d) { return d.WomensHealth > 0 })                                          
        .style("fill", "steelblue")                                
        .attr("r", 2.5)                                     
        .attr("cx", function(d) { return xO(d.AnalysisDate); })       
        .attr("cy", function(d) { return yO(d.WomensHealth); });

  xD.domain(d3.extent(data, function(d) { return d.AnalysisDate; }));
  yD.domain(d3.extent(data, function(d) { return d.WomensHealth; }));

  svgD.append("g")
      .attr("class", "x axis")
     // .attr("class", "line")
      .attr("transform", "translate(0," + bbDetail.h + ")")
      .call(xAxisD)
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("x", xD(d3.max(data,function (d) { return +d.AnalysisDate})))
      .attr("dx", ".71em")
      .style("text-anchor", "end")
      .text("Timeline");

   svgD.append("g")
      .attr("class", "y axis")
      .call(yAxisD);    

   svgD.append("path")
      .attr("class", "detailArea")
      .datum(data)
      //.attr("class", "line")
      .attr("d", area);


   svgD.selectAll("dot")        
        .data(data)                                     
        .enter().append("circle")
        .attr("class","detailDots")                               
        .filter(function(d) { return d.WomensHealth > 0 })                                          
        .style("fill", "steelblue")                                
        .attr("r", 2.5)                                     
        .attr("cx", function(d) { return xD(d.AnalysisDate); })       
        .attr("cy", function(d) { return yD(d.WomensHealth); });
    
    function brushed() {
            svgO.selectAll(".rectSelection").remove();
            svgD.selectAll(".detailDots").data([]).exit().remove();

            xD.domain(brush.empty() ? xO.domain() : brush.extent());
            svgD.select(".detailArea").attr("d", area);
            svgD.select(".x.axis").call(xAxisD);
        }

    d3.selectAll("#btnEvent1").on("click",function(){

        svgO.selectAll(".rectSelection").remove();
        svgD.selectAll(".detailDots").data([]).exit().remove();

        svgO.append("g")
            .call(brush)
            .append("rect")  
            .attr("class", "rectSelection")
            .attr({ height: 60,
                    transform: "translate(0,"+bbOverview.x+")" ,
                      x:xO(new Date(2012,5)),
                     width:60
                  });


        xD.domain([new Date(2012,5), new Date(2012,9)]);
            svgD.select(".detailArea").attr("d", area);
            svgD.select(".x.axis").call(xAxisD);

    })

d3.selectAll("#btnEvent2").on("click",function(){
        svgO.selectAll(".rectSelection").remove();
        svgD.selectAll(".detailDots").data([]).exit().remove();

        svgO.append("g")
            .call(brush)
            .append("rect")  
            .attr("class", "rectSelection")
            .attr({ height: 60,
                transform: "translate(0,"+bbOverview.x+")" ,
                x:xO(new Date(2009,8)),
                width:60
                });


        xD.domain([new Date(2009,8), new Date(2010,0)]);
            svgD.select(".detailArea").attr("d", area);
            svgD.select(".x.axis").call(xAxisD);

})

});

var convertToInt = function(s) {
    return parseInt(s.replace(/,/g, ""), 10);
};

