define (require)->

  require('receiptverifier')


  require('./install-button')


  require('layouts/layouts')

  require('d3.v3')


  list = $('.list').get(0)

  list.collection.on "add", (item)->
    item.url = "#{item.get('url')}?callback=?"

  lat = -41.2893833
  lng = 174.7775983

  radius = 100

  arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(radius - 40)

  pie = d3.layout.pie().sort(null).value (d)-> d.value

  color = d3.scale.ordinal().range ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]

  $.getJSON "http://mashblock.co.nz/search/results.json?lat="+lat+"&lng="+lng+"&callback=?", (content)->
    _(content.results).each (value,key)->
      list.add
        title: value.name,
        url: value.url,
        type: key


  detail = $('.detail').get(0)
  detail.render = (item)->
    console.log('render')
    $('.title', @).html(item.get('title'))
    $('.charts', @).html("Loading details...")
    item.fetch
      success: =>
        $(".charts", @).html('')
        _(["Gender Ratio", "Ethnic Groups", "Religious Affiliation"]).each (group)=>
          data = _(item.get(group)).collect (value, key)-> {value: value, label: key}
          $(".charts", @).append $("<h2>#{group}</h2>")
          svg = d3.select(@).select(".charts").append("svg").attr("width",200).attr("height", 200).append("g").attr("transform", "translate(100,100)")

          g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc")

          g.append("path").attr("d", arc).style "fill", (d)->color(d.value)
    return
