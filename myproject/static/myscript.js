var cursor = true;
var speed = 270;
setInterval(() => {
  if(cursor) {
    document.getElementById('cursor').style.opacity = 0;
    cursor = false;
  }else {
    document.getElementById('cursor').style.opacity = 1;
    cursor = true;
  }
}, speed);

// var cursor2 = true;
// setInterval(() => {
//   if(cursor2) {
//     document.getElementById('cursor2').style.opacity = 0;
//     cursor2 = false;
//   }else {
//     document.getElementById('cursor2').style.opacity = 1;
//     cursor2 = true;
//   }
// }, speed);

// var my_options = {
//   strings: ['Dan Rodriguez, Web Developer '],
//   typeSpeed: 40
// };

// var typed = new Typed('.my-name', my_options);


// var i = 0;
// var my_text = "Dan Rodriguez, Web Developer"
// var typing_speed = 50;
// typingEffect(() => {
//   if (i < my_text.length) {
//     document.getElementById("demo").innerHTML += my_text.charAt(i);
//     i++;
//     setTimeout(typingEffect, typing_speed);
//   }
// });






// var request = new XMLHttpRequest();
// // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
// request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-12-31&symbols=USD&base=" + clicked, true)
// var new_dates = [];
// var my_ordered_dates = [];
// var my_prices = [];
// var reduced_ordered_dates = [];
// var my_dates = [];
// console.log(clicked)
// request.onload = function () {
//
//   // Begin accessing JSON data here
//   var data = JSON.parse(this.response)
//
//   for (x in data.rates) {
//     md = x.split("-")
//     modified_date = Number(md[0]+md[1]+md[2])
//     new_dates.push(modified_date)
//     // console.log(modified_date)
//   }
//
//   new_dates.sort(function(a,b) {
//     return (a) - (b);
//   })
//
//   for (x in new_dates) {
//     od = new_dates[x].toString();
//     // console.log(od)
//     ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
//     my_ordered_dates.push(ordered_date)
//   }
//
//   for (let x = 0; x < my_ordered_dates.length; x+=15) {
//     reduced_ordered_dates.push(my_ordered_dates[x])
//   }
//
//   // for (z in my_ordered_dates) {
//   //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
//   // }
//
//   for (z in reduced_ordered_dates) {
//     my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
//   }
//
//   for (x in reduced_ordered_dates) {
//     nd = reduced_ordered_dates[x]
//     new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
//     my_dates.push(new_date)
//   }
//
//
// }
//
//
// // Send request
// request.send()
//
// var data = {
//   // A labels array that can contain any sort of values
//   labels: my_dates,
//   // Our series array that contains series objects or in this case series data arrays
//   series: [
//     my_prices
//   ]
// };
//
// var options = {
//   width: 800,
//   height: 600
// };
//
// // Create a new line chart object where as first parameter we pass in a selector
// // that is resolving to our chart container element. The Second parameter
// // is the actual data object.
// new Chartist.Line('#chart1', data, options);


// if ($(window).width() < 960) {
//    alert('Less than 960');
// }
// else {
//    alert('More than 960');
// }

function getChart2020chartjs(clicked) {
  var request = new XMLHttpRequest();
  // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
  request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=USD&base=" + clicked, true)
  var new_dates = [];
  var my_ordered_dates = [];
  var my_prices = [];
  var reduced_ordered_dates = [];
  var my_dates = [];
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    for (x in data.rates) {
      md = x.split("-")
      modified_date = Number(md[0]+md[1]+md[2])
      new_dates.push(modified_date)
      // console.log(modified_date)
    }

    new_dates.sort(function(a,b) {
      return (a) - (b);
    })

    for (x in new_dates) {
      od = new_dates[x].toString();
      // console.log(od)
      ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
      my_ordered_dates.push(ordered_date)
    }

    for (let x = 0; x < my_ordered_dates.length; x+=15) {
      reduced_ordered_dates.push(my_ordered_dates[x])
    }

    // for (z in my_ordered_dates) {
    //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
    // }

    for (z in reduced_ordered_dates) {
      my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
    }

    for (x in reduced_ordered_dates) {
      nd = reduced_ordered_dates[x]
      new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
      my_dates.push(new_date)
    }


  }


  // Send request
  request.send()

  var ctx = document.getElementById('myChart2020').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: my_dates,
          datasets: [{
              label: "Value per 1 USD",
              data: my_prices,
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
          }],
          fill: false
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
          }
      }
  });

}

function getChart2019chartjs(clicked) {
  var request = new XMLHttpRequest();
  // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
  request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2019-01-01&end_at=2019-12-31&symbols=USD&base=" + clicked, true)
  var new_dates = [];
  var my_ordered_dates = [];
  var my_prices = [];
  var reduced_ordered_dates = [];
  var my_dates = [];
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    for (x in data.rates) {
      md = x.split("-")
      modified_date = Number(md[0]+md[1]+md[2])
      new_dates.push(modified_date)
      // console.log(modified_date)
    }

    new_dates.sort(function(a,b) {
      return (a) - (b);
    })

    for (x in new_dates) {
      od = new_dates[x].toString();
      // console.log(od)
      ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
      my_ordered_dates.push(ordered_date)
    }

    for (let x = 0; x < my_ordered_dates.length; x+=15) {
      reduced_ordered_dates.push(my_ordered_dates[x])
    }

    // for (z in my_ordered_dates) {
    //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
    // }

    for (z in reduced_ordered_dates) {
      my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
    }

    for (x in reduced_ordered_dates) {
      nd = reduced_ordered_dates[x]
      new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
      my_dates.push(new_date)
    }


  }


  // Send request
  request.send()

  var ctx = document.getElementById('myChart2019').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: my_dates,
          datasets: [{
              label: "Value per 1 USD",
              data: my_prices,
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
          }],
          fill: false
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
          }
      }
  });

}


function getChart2018chartjs(clicked) {
  var request = new XMLHttpRequest();
  // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
  request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-12-31&symbols=USD&base=" + clicked, true)
  var new_dates = [];
  var my_ordered_dates = [];
  var my_prices = [];
  var reduced_ordered_dates = [];
  var my_dates = [];
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    for (x in data.rates) {
      md = x.split("-")
      modified_date = Number(md[0]+md[1]+md[2])
      new_dates.push(modified_date)
      // console.log(modified_date)
    }

    new_dates.sort(function(a,b) {
      return (a) - (b);
    })

    for (x in new_dates) {
      od = new_dates[x].toString();
      // console.log(od)
      ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
      my_ordered_dates.push(ordered_date)
    }

    for (let x = 0; x < my_ordered_dates.length; x+=15) {
      reduced_ordered_dates.push(my_ordered_dates[x])
    }

    // for (z in my_ordered_dates) {
    //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
    // }

    for (z in reduced_ordered_dates) {
      my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
    }

    for (x in reduced_ordered_dates) {
      nd = reduced_ordered_dates[x]
      new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
      my_dates.push(new_date)
    }


  }


  // Send request
  request.send()

  var ctx = document.getElementById('myChart2018').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: my_dates,
          datasets: [{
              label: "Value per 1 USD",
              data: my_prices,
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
          }],
          fill: false
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
          }
      }
  });

}

function getChart2017chartjs(clicked) {
  var request = new XMLHttpRequest();
  // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
  request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2017-01-01&end_at=2017-12-31&symbols=USD&base=" + clicked, true)
  var new_dates = [];
  var my_ordered_dates = [];
  var my_prices = [];
  var reduced_ordered_dates = [];
  var my_dates = [];
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    for (x in data.rates) {
      md = x.split("-")
      modified_date = Number(md[0]+md[1]+md[2])
      new_dates.push(modified_date)
      // console.log(modified_date)
    }

    new_dates.sort(function(a,b) {
      return (a) - (b);
    })

    for (x in new_dates) {
      od = new_dates[x].toString();
      // console.log(od)
      ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
      my_ordered_dates.push(ordered_date)
    }

    for (let x = 0; x < my_ordered_dates.length; x+=15) {
      reduced_ordered_dates.push(my_ordered_dates[x])
    }

    // for (z in my_ordered_dates) {
    //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
    // }

    for (z in reduced_ordered_dates) {
      my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
    }

    for (x in reduced_ordered_dates) {
      nd = reduced_ordered_dates[x]
      new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
      my_dates.push(new_date)
    }


  }


  // Send request
  request.send()

  var ctx = document.getElementById('myChart2017').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: my_dates,
          datasets: [{
              label: "Value per 1 USD",
              data: my_prices,
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
          }],
          fill: false
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
          }
      }
  });

}


function getChart2016chartjs(clicked) {
  var request = new XMLHttpRequest();
  // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
  request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2016-01-01&end_at=2016-12-31&symbols=USD&base=" + clicked, true)
  var new_dates = [];
  var my_ordered_dates = [];
  var my_prices = [];
  var reduced_ordered_dates = [];
  var my_dates = [];
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    for (x in data.rates) {
      md = x.split("-")
      modified_date = Number(md[0]+md[1]+md[2])
      new_dates.push(modified_date)
      // console.log(modified_date)
    }

    new_dates.sort(function(a,b) {
      return (a) - (b);
    })

    for (x in new_dates) {
      od = new_dates[x].toString();
      // console.log(od)
      ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
      my_ordered_dates.push(ordered_date)
    }

    for (let x = 0; x < my_ordered_dates.length; x+=15) {
      reduced_ordered_dates.push(my_ordered_dates[x])
    }

    // for (z in my_ordered_dates) {
    //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
    // }

    for (z in reduced_ordered_dates) {
      my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
    }

    for (x in reduced_ordered_dates) {
      nd = reduced_ordered_dates[x]
      new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
      my_dates.push(new_date)
    }


  }


  // Send request
  request.send()

  var ctx = document.getElementById('myChart2016').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: my_dates,
          datasets: [{
              label: "Value per 1 USD",
              data: my_prices,
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
          }],
          fill: false
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
          }
      }
  });

}


function getChart2015chartjs(clicked) {
  var request = new XMLHttpRequest();
  // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
  request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2015-01-01&end_at=2015-12-31&symbols=USD&base=" + clicked, true)
  var new_dates = [];
  var my_ordered_dates = [];
  var my_prices = [];
  var reduced_ordered_dates = [];
  var my_dates = [];
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    for (x in data.rates) {
      md = x.split("-")
      modified_date = Number(md[0]+md[1]+md[2])
      new_dates.push(modified_date)
      // console.log(modified_date)
    }

    new_dates.sort(function(a,b) {
      return (a) - (b);
    })

    for (x in new_dates) {
      od = new_dates[x].toString();
      // console.log(od)
      ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
      my_ordered_dates.push(ordered_date)
    }

    for (let x = 0; x < my_ordered_dates.length; x+=15) {
      reduced_ordered_dates.push(my_ordered_dates[x])
    }

    // for (z in my_ordered_dates) {
    //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
    // }

    for (z in reduced_ordered_dates) {
      my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
    }

    for (x in reduced_ordered_dates) {
      nd = reduced_ordered_dates[x]
      new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
      my_dates.push(new_date)
    }


  }


  // Send request
  request.send()

  var ctx = document.getElementById('myChart2015').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: my_dates,
          datasets: [{
              label: "Value per 1 USD",
              data: my_prices,
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
          }],
          fill: false
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
          }
      }
  });

}


function getChart2014chartjs(clicked) {
  var request = new XMLHttpRequest();
  // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
  request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2014-01-01&end_at=2014-12-31&symbols=USD&base=" + clicked, true)
  var new_dates = [];
  var my_ordered_dates = [];
  var my_prices = [];
  var reduced_ordered_dates = [];
  var my_dates = [];
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    for (x in data.rates) {
      md = x.split("-")
      modified_date = Number(md[0]+md[1]+md[2])
      new_dates.push(modified_date)
      // console.log(modified_date)
    }

    new_dates.sort(function(a,b) {
      return (a) - (b);
    })

    for (x in new_dates) {
      od = new_dates[x].toString();
      // console.log(od)
      ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
      my_ordered_dates.push(ordered_date)
    }

    for (let x = 0; x < my_ordered_dates.length; x+=15) {
      reduced_ordered_dates.push(my_ordered_dates[x])
    }

    // for (z in my_ordered_dates) {
    //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
    // }

    for (z in reduced_ordered_dates) {
      my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
    }

    for (x in reduced_ordered_dates) {
      nd = reduced_ordered_dates[x]
      new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
      my_dates.push(new_date)
    }


  }


  // Send request
  request.send()

  var ctx = document.getElementById('myChart2014').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: my_dates,
          datasets: [{
              label: "Value per 1 USD",
              data: my_prices,
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
          }],
          fill: false
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
          }
      }
  });

}















// Chartist.js GRAPHS //
// function getChart2018(clicked) {
//   var request = new XMLHttpRequest();
//   // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
//   request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-12-31&symbols=USD&base=" + clicked, true)
//   var new_dates = [];
//   var my_ordered_dates = [];
//   var my_prices = [];
//   var reduced_ordered_dates = [];
//   var my_dates = [];
//   console.log(clicked)
//   request.onload = function () {
//
//     // Begin accessing JSON data here
//     var data = JSON.parse(this.response)
//
//     for (x in data.rates) {
//       md = x.split("-")
//       modified_date = Number(md[0]+md[1]+md[2])
//       new_dates.push(modified_date)
//       // console.log(modified_date)
//     }
//
//     new_dates.sort(function(a,b) {
//       return (a) - (b);
//     })
//
//     for (x in new_dates) {
//       od = new_dates[x].toString();
//       // console.log(od)
//       ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
//       my_ordered_dates.push(ordered_date)
//     }
//
//     for (let x = 0; x < my_ordered_dates.length; x+=15) {
//       reduced_ordered_dates.push(my_ordered_dates[x])
//     }
//
//     // for (z in my_ordered_dates) {
//     //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
//     // }
//
//     for (z in reduced_ordered_dates) {
//       my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
//     }
//
//     for (x in reduced_ordered_dates) {
//       nd = reduced_ordered_dates[x]
//       new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
//       my_dates.push(new_date)
//     }
//
//
//   }
//
//
//   // Send request
//   request.send()
//
//   var data = {
//     // A labels array that can contain any sort of values
//     labels: my_dates,
//     // Our series array that contains series objects or in this case series data arrays
//     series: [
//       my_prices
//     ]
//   };
//
//   var options = {
//     width: 300,
//     height: 200
//   };
//
//   // Create a new line chart object where as first parameter we pass in a selector
//   // that is resolving to our chart container element. The Second parameter
//   // is the actual data object.
//   new Chartist.Line('#chart1', data, options);
//   // var my_2018_chart = new Chartist.Line('#chart1', data, options);
//
// }
//
// // $('#chart1').on('shown.bs.modal', function () {
// //   chart1.render();
// // });
//
// // $("#chart1").on('shown.bs.modal', function (e) {
// //    my_2018_chart.update();
// //  });
//
//
//
//
//
//
//
//
//
//
//
// function getChart2019(clicked) {
//   var request = new XMLHttpRequest();
//   // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2019-01-01&end_at=2019-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
//   request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2019-01-01&end_at=2019-12-31&symbols=USD&base=" + clicked, true)
//   var new_dates = [];
//   var my_ordered_dates = [];
//   var my_prices = [];
//   var reduced_ordered_dates = [];
//   var my_dates = [];
//   request.onload = function () {
//
//     // Begin accessing JSON data here
//     var data = JSON.parse(this.response)
//
//     for (x in data.rates) {
//       md = x.split("-")
//       modified_date = Number(md[0]+md[1]+md[2])
//       new_dates.push(modified_date)
//       // console.log(modified_date)
//     }
//
//     new_dates.sort(function(a,b) {
//       return (a) - (b);
//     })
//
//     for (x in new_dates) {
//       od = new_dates[x].toString();
//       // console.log(od)
//       ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
//       my_ordered_dates.push(ordered_date)
//     }
//
//     for (let x = 0; x < my_ordered_dates.length; x+=15) {
//       reduced_ordered_dates.push(my_ordered_dates[x])
//     }
//
//     // for (z in my_ordered_dates) {
//     //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
//     // }
//
//     for (z in reduced_ordered_dates) {
//       my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
//     }
//
//     for (x in reduced_ordered_dates) {
//       nd = reduced_ordered_dates[x]
//       new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
//       my_dates.push(new_date)
//     }
//
//
//   }
//
//
//   // Send request
//   request.send()
//
//   var data = {
//     // A labels array that can contain any sort of values
//     labels: my_dates,
//     // Our series array that contains series objects or in this case series data arrays
//     series: [
//       my_prices
//     ]
//   };
//
//   var options = {
//     width: 800,
//     height: 600
//   };
//
//   // Create a new line chart object where as first parameter we pass in a selector
//   // that is resolving to our chart container element. The Second parameter
//   // is the actual data object.
//   new Chartist.Line('#chart2', data, options);
//   // var my_2019_chart = new Chartist.Line('#chart2', data, options);
//   //
//   // document.getElementById("chart2").on('shown.bs.modal', function (e) {
//   //    my_2019_chart.update();
//   //  });
//
// }
//
//
//
//
//
//
// function getChart2020(clicked) {
//   var request = new XMLHttpRequest();
//   // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
//   request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=USD&base=" + clicked, true)
//   var new_dates = [];
//   var my_ordered_dates = [];
//   var my_prices = [];
//   var reduced_ordered_dates = [];
//   var my_dates = [];
//   request.onload = function () {
//
//     // Begin accessing JSON data here
//     var data = JSON.parse(this.response)
//
//     for (x in data.rates) {
//       md = x.split("-")
//       modified_date = Number(md[0]+md[1]+md[2])
//       new_dates.push(modified_date)
//       // console.log(modified_date)
//     }
//
//     new_dates.sort(function(a,b) {
//       return (a) - (b);
//     })
//
//     for (x in new_dates) {
//       od = new_dates[x].toString();
//       // console.log(od)
//       ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
//       my_ordered_dates.push(ordered_date)
//     }
//
//     for (let x = 0; x < my_ordered_dates.length; x+=15) {
//       reduced_ordered_dates.push(my_ordered_dates[x])
//     }
//
//     // for (z in my_ordered_dates) {
//     //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
//     // }
//
//     for (z in reduced_ordered_dates) {
//       my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
//     }
//
//     for (x in reduced_ordered_dates) {
//       nd = reduced_ordered_dates[x]
//       new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
//       my_dates.push(new_date)
//     }
//
//
//   }
//
//
//   // Send request
//   request.send()
//
//   var data = {
//     // A labels array that can contain any sort of values
//     labels: my_dates,
//     // Our series array that contains series objects or in this case series data arrays
//     series: [
//       my_prices
//     ]
//   };
//
//   var options = {
//     width: 800,
//     height: 600
//   };
//
//   // Create a new line chart object where as first parameter we pass in a selector
//   // that is resolving to our chart container element. The Second parameter
//   // is the actual data object.
//   new Chartist.Line('#chart3', data, options);
//   // var my_2020_chart = new Chartist.Line('#chart3', data, options);
//   //
//   // document.getElementById("chart3").on('shown.bs.modal', function (e) {
//   //    my_2020_chart.update();
//   //  });
//
// }
//
//
//
// function getChart2017(clicked) {
//   var request = new XMLHttpRequest();
//   // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
//   request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2017-01-01&end_at=2017-12-31&symbols=USD&base=" + clicked, true)
//   var new_dates = [];
//   var my_ordered_dates = [];
//   var my_prices = [];
//   var reduced_ordered_dates = [];
//   var my_dates = [];
//   request.onload = function () {
//
//     // Begin accessing JSON data here
//     var data = JSON.parse(this.response)
//
//     for (x in data.rates) {
//       md = x.split("-")
//       modified_date = Number(md[0]+md[1]+md[2])
//       new_dates.push(modified_date)
//       // console.log(modified_date)
//     }
//
//     new_dates.sort(function(a,b) {
//       return (a) - (b);
//     })
//
//     for (x in new_dates) {
//       od = new_dates[x].toString();
//       // console.log(od)
//       ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
//       my_ordered_dates.push(ordered_date)
//     }
//
//     for (let x = 0; x < my_ordered_dates.length; x+=15) {
//       reduced_ordered_dates.push(my_ordered_dates[x])
//     }
//
//     // for (z in my_ordered_dates) {
//     //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
//     // }
//
//     for (z in reduced_ordered_dates) {
//       my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
//     }
//
//     for (x in reduced_ordered_dates) {
//       nd = reduced_ordered_dates[x]
//       new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
//       my_dates.push(new_date)
//     }
//
//
//   }
//
//
//   // Send request
//   request.send()
//
//   var data = {
//     // A labels array that can contain any sort of values
//     labels: my_dates,
//     // Our series array that contains series objects or in this case series data arrays
//     series: [
//       my_prices
//     ]
//   };
//
//   var options = {
//     width: 800,
//     height: 600
//   };
//
//   // Create a new line chart object where as first parameter we pass in a selector
//   // that is resolving to our chart container element. The Second parameter
//   // is the actual data object.
//   new Chartist.Line('#chart4', data, options);
//
// }
//
//
// function getChart2016(clicked) {
//   var request = new XMLHttpRequest();
//   // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
//   request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2016-01-01&end_at=2016-12-31&symbols=USD&base=" + clicked, true)
//   var new_dates = [];
//   var my_ordered_dates = [];
//   var my_prices = [];
//   var reduced_ordered_dates = [];
//   var my_dates = [];
//   request.onload = function () {
//
//     // Begin accessing JSON data here
//     var data = JSON.parse(this.response)
//
//     for (x in data.rates) {
//       md = x.split("-")
//       modified_date = Number(md[0]+md[1]+md[2])
//       new_dates.push(modified_date)
//       // console.log(modified_date)
//     }
//
//     new_dates.sort(function(a,b) {
//       return (a) - (b);
//     })
//
//     for (x in new_dates) {
//       od = new_dates[x].toString();
//       // console.log(od)
//       ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
//       my_ordered_dates.push(ordered_date)
//     }
//
//     for (let x = 0; x < my_ordered_dates.length; x+=15) {
//       reduced_ordered_dates.push(my_ordered_dates[x])
//     }
//
//     // for (z in my_ordered_dates) {
//     //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
//     // }
//
//     for (z in reduced_ordered_dates) {
//       my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
//     }
//
//     for (x in reduced_ordered_dates) {
//       nd = reduced_ordered_dates[x]
//       new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
//       my_dates.push(new_date)
//     }
//
//
//   }
//
//
//   // Send request
//   request.send()
//
//   var data = {
//     // A labels array that can contain any sort of values
//     labels: my_dates,
//     // Our series array that contains series objects or in this case series data arrays
//     series: [
//       my_prices
//     ]
//   };
//
//   var options = {
//     width: 800,
//     height: 600
//   };
//
//   // Create a new line chart object where as first parameter we pass in a selector
//   // that is resolving to our chart container element. The Second parameter
//   // is the actual data object.
//   new Chartist.Line('#chart5', data, options);
//
// }
//
//
//
// function getChart2015(clicked) {
//   var request = new XMLHttpRequest();
//   // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
//   request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2015-01-01&end_at=2015-12-31&symbols=USD&base=" + clicked, true)
//   var new_dates = [];
//   var my_ordered_dates = [];
//   var my_prices = [];
//   var reduced_ordered_dates = [];
//   var my_dates = [];
//   request.onload = function () {
//
//     // Begin accessing JSON data here
//     var data = JSON.parse(this.response)
//
//     for (x in data.rates) {
//       md = x.split("-")
//       modified_date = Number(md[0]+md[1]+md[2])
//       new_dates.push(modified_date)
//       // console.log(modified_date)
//     }
//
//     new_dates.sort(function(a,b) {
//       return (a) - (b);
//     })
//
//     for (x in new_dates) {
//       od = new_dates[x].toString();
//       // console.log(od)
//       ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
//       my_ordered_dates.push(ordered_date)
//     }
//
//     for (let x = 0; x < my_ordered_dates.length; x+=15) {
//       reduced_ordered_dates.push(my_ordered_dates[x])
//     }
//
//     // for (z in my_ordered_dates) {
//     //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
//     // }
//
//     for (z in reduced_ordered_dates) {
//       my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
//     }
//
//     for (x in reduced_ordered_dates) {
//       nd = reduced_ordered_dates[x]
//       new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
//       my_dates.push(new_date)
//     }
//
//
//   }
//
//
//   // Send request
//   request.send()
//
//   var data = {
//     // A labels array that can contain any sort of values
//     labels: my_dates,
//     // Our series array that contains series objects or in this case series data arrays
//     series: [
//       my_prices
//     ]
//   };
//
//   var options = {
//     width: 800,
//     height: 600
//   };
//
//   // Create a new line chart object where as first parameter we pass in a selector
//   // that is resolving to our chart container element. The Second parameter
//   // is the actual data object.
//   new Chartist.Line('#chart6', data, options);
//
// }
//
//
// function getChart2014(clicked) {
//   var request = new XMLHttpRequest();
//   // request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-12-31&symbols=GBP,EUR,CHF,CAD,RUB,JPY,NZD,ZAR,AUD&base=USD", true)
//   request.open('GET', "https://api.exchangeratesapi.io/history?start_at=2014-01-01&end_at=2014-12-31&symbols=USD&base=" + clicked, true)
//   var new_dates = [];
//   var my_ordered_dates = [];
//   var my_prices = [];
//   var reduced_ordered_dates = [];
//   var my_dates = [];
//   request.onload = function () {
//
//     // Begin accessing JSON data here
//     var data = JSON.parse(this.response)
//
//     for (x in data.rates) {
//       md = x.split("-")
//       modified_date = Number(md[0]+md[1]+md[2])
//       new_dates.push(modified_date)
//       // console.log(modified_date)
//     }
//
//     new_dates.sort(function(a,b) {
//       return (a) - (b);
//     })
//
//     for (x in new_dates) {
//       od = new_dates[x].toString();
//       // console.log(od)
//       ordered_date = od.slice(0,4) + "-" + od.slice(4,6) + "-" + od.slice(6,8)
//       my_ordered_dates.push(ordered_date)
//     }
//
//     for (let x = 0; x < my_ordered_dates.length; x+=15) {
//       reduced_ordered_dates.push(my_ordered_dates[x])
//     }
//
//     // for (z in my_ordered_dates) {
//     //   my_prices.push(data.rates[my_ordered_dates[z]][clicked])
//     // }
//
//     for (z in reduced_ordered_dates) {
//       my_prices.push(data.rates[reduced_ordered_dates[z]]["USD"])
//     }
//
//     for (x in reduced_ordered_dates) {
//       nd = reduced_ordered_dates[x]
//       new_date = nd.slice(5,7) + "/" + nd.slice(8,10)
//       my_dates.push(new_date)
//     }
//
//
//   }
//
//
//   // Send request
//   request.send()
//
//   var data = {
//     // A labels array that can contain any sort of values
//     labels: my_dates,
//     // Our series array that contains series objects or in this case series data arrays
//     series: [
//       my_prices
//     ]
//   };
//
//   var options = {
//     width: 800,
//     height: 600
//   };
//
//   // Create a new line chart object where as first parameter we pass in a selector
//   // that is resolving to our chart container element. The Second parameter
//   // is the actual data object.
//   new Chartist.Line('#chart7', data, options);
//
// }
