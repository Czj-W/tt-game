webpackJsonp([2], {
  27: function (a, b, c) {
    "use strict";

    var d = c(3),
        e = d.connector.connectPage({
      env: function (a) {
        return a.env;
      },
      count: function (a) {
        return a.count.count;
      }
    })({
      data: {
        inputValue: 1
      }
    });
    Page(e);
  }
}, [27]);

function webpackJsonp() {
  require("./../../common.js"), tt.webpackJsonp.apply(null, arguments);
}