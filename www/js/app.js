(function() {

  define(function(require) {
    var arc, color, detail, lat, list, lng, pie, radius;
    require('receiptverifier');
    require('./install-button');
    require('layouts/layouts');
    require('d3.v3');
    list = $('.list').get(0);
    list.collection.on("add", function(item) {
      return item.url = "" + (item.get('url')) + "?callback=?";
    });
    lat = -41.2893833;
    lng = 174.7775983;
    radius = 100;
    arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(radius - 40);
    pie = d3.layout.pie().sort(null).value(function(d) {
      return d.value;
    });
    color = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    $.getJSON("http://mashblock.co.nz/search/results.json?lat=" + lat + "&lng=" + lng + "&callback=?", function(content) {
      return _(content.results).each(function(value, key) {
        return list.add({
          title: value.name,
          url: value.url,
          type: key
        });
      });
    });
    detail = $('.detail').get(0);
    return detail.render = function(item) {
      var _this = this;
      console.log('render');
      $('.title', this).html(item.get('title'));
      $('.charts', this).html("Loading details...");
      item.fetch({
        success: function() {
          $(".charts", _this).html('');
          return _(["Gender Ratio", "Ethnic Groups", "Religious Affiliation"]).each(function(group) {
            var data, g, svg;
            data = _(item.get(group)).collect(function(value, key) {
              return {
                value: value,
                label: key
              };
            });
            $(".charts", _this).append($("<h2>" + group + "</h2>"));
            svg = d3.select(_this).select(".charts").append("svg").attr("width", 200).attr("height", 200).append("g").attr("transform", "translate(100,100)");
            g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");
            return g.append("path").attr("d", arc).style("fill", function(d) {
              return color(d.value);
            });
          });
        }
      });
    };
  });

}).call(this);
