// ==UserScript==
// @name                Myschool einkunnir
// @namespace	        http://www.ru.is/
// @version				0.2
// @author				Björn Ingi Baldvinsson
// @description	        Birtir einkunnadreifingu.
// @include				https://myschool.ru.is/myschool/*
// @require				http://cdnjs.cloudflare.com/ajax/libs/canvasjs/1.4.1/canvas.min.js
// ==/UserScript==
var myList = document.getElementsByTagName("img"); // get all img elements
var chartCount = 0;
//alert(myList.length);
for(var i = 0; i < myList.length; i++){
   // alert(myList[i].parentNode.innerHTML);
    if(myList[i].getAttribute('src').lastIndexOf('system/Skins/ruGraph.asp', 0)  === 0){
        
        //var cell = myList[i].nextSibling.firstChild.firstChild.firstChild;
        var cell = myList[i].parentNode;
        var cellContent = cell.innerHTML;
        
        var dataIndex = cellContent.indexOf('data');
        var data = cellContent.substring(dataIndex);
        data = data.substring(data.indexOf('=') + 1, data.indexOf('&'));
        
        data = data.split('|');
        
        var legendIndex = cellContent.indexOf('legend');
        var legend = cellContent.substring(legendIndex);
        legend = legend.substring(legend.indexOf('=') + 1, legend.indexOf('"'));
        
        legend = legend.split('|');
        
        var selectedIndex = cellContent.indexOf('selected');
        var selected = cellContent.substring(selectedIndex);
        selected = selected.substring(selected.indexOf('=') + 1, selected.indexOf('&'));
        selected = parseInt(selected);
        
        var chartData = [];
        
        for(var j = 0; j < data.length; j++){
            if(j + 1 == selected){
                chartData[j] = {label: legend[j], y: parseInt(data[j]), x: j, color: "red" };
            }else{
                chartData[j] = {label: legend[j], y: parseInt(data[j]), x: j};
            }
        }
        cell.innerHTML = '<div id="chartContainer' + i + '" style="height: 400px; width: 75%;"></div>';
        //alert(i);
        var charts = [];
        charts[chartCount] = new CanvasJS.Chart("chartContainer" + i, {
            
            title:{
                text: "Dreifing einkunna"              
            },
            
            axisX:{ 
                title: "Einkunn",
            },
            
            axisY:{ 
                title: "Fjöldi nemenda",
            },
            
            data: [            
                { 
                    /*** Change type "column" to "bar", "area", "line" or "pie"***/
                    type: "column",
                    color: "blue",
                    dataPoints: chartData
                }
            ]
        });
        chartCount++;
    }
}

for(var i = 0; i < charts.length; i++){
    charts[i].render();   
}