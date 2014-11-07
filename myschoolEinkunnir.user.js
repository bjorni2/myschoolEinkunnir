// ==UserScript==
// @name                Myschool einkunnir
// @namespace	        http://www.ru.is/
// @version				0.1
// @author				Björn Ingi Baldvinsson
// @description	        Birtir einkunnadreifingu.
// @include				https://myschool.ru.is/myschool/*verkID*
// @require				http://cdnjs.cloudflare.com/ajax/libs/canvasjs/1.4.1/canvas.min.js
// ==/UserScript==
var myList = document.getElementsByTagName("h3"); // get all h3 elements
for(var i = 0; i < myList.length; i++){
    if(myList[i].textContent  == 'Tölfræði'){
        //alert('Fann tölfræði');
        var cell = myList[i].nextSibling.firstChild.firstChild.firstChild;
        var cellContent = cell.innerHTML;
        //alert(cellContent);
        var dataIndex = cellContent.indexOf('data');
        var data = cellContent.substring(dataIndex);
        data = data.substring(data.indexOf('=') + 1, data.indexOf('&'));
        //alert(data);
        data = data.split('|');
        
        var legendIndex = cellContent.indexOf('legend');
        var legend = cellContent.substring(legendIndex);
        legend = legend.substring(legend.indexOf('=') + 1, legend.indexOf('"'));
        //alert(legend);
        legend = legend.split('|');
        
        var chartData = [];

        for(var i = 0; i < data.length; i++){
            chartData[i] = {label: legend[i], x: i*5, y: parseInt(data[i])};
        }
        cell.innerHTML = '<div id="chartContainer"></div>';
        
        var chart = new CanvasJS.Chart("chartContainer", {
            
            title:{
                text: "Einkunnir"              
            },
            data: [//array of dataSeries              
                { //dataSeries object
                    
                    /*** Change type "column" to "bar", "area", "line" or "pie"***/
                    type: "column",
                    dataPoints: chartData
                }
            ]
        });
        
        chart.render();
    }
}