

var csvContent;
var data = [];
var dataJSON = [];
var tableReady = false;
var table = $('#myTable').DataTable();

function downloadCSV(args) {
    var data, filename, link;

    csv = csvContent;

    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

function generateTableHTML(data) {
    
    var rows = data.split("\r"); 

    var tableData = "<thead>\
                    <tr>\
                        <th data-field='id' data-sortable='true'>#</th>\
                        <th data-field='target' data-sortable='true'>Target</th>\
                        <th data-field='response' data-sortable='true'>Response</th>\
                        <th data-field='robot' data-sortable='true'>Robot</th>\
                        <th data-field='human' data-sortable='true'>Human</th>\
                    </tr>\
                    </thead>\
                    <tbody>";

    $.each(rows, function(index, value) {
        // console.log(index + ": " + value);
        // ignore the header row
        if (!value.includes("id,Type,File")) {
            var columns = value.split(",");
            
            if (columns.length > 1) {
                // tableData += "<tr><th scope='row' class='col-md-1'>" + (index) + "</th>";
                tableData += "<tr><th scope='row'>" + (index) + "</th>";
                $.each(columns, function(index, value) {
                    if (index == 3 || index == 4) {
                        tableData += "<td>" + (value) + "</td>";
                        // console.log(index + ": " + value);
                    }
                });

                tableData += "<td class='text-center'>0</td><td class='text-center'>0</td></tr>";
            }
        }
    });

    tableData += "</tbody>";
    return tableData;

}

function populateTable(data) {

    var tableData = generateTableHTML(data);

    table.destroy();
    $('#myTable').empty();
    $('#myTable').html(tableData);
    table = $('#myTable').DataTable();
}

function generateJSON(csvData) {

    var rows = csvData.split("\r"); 

    // open the JSON array
    var strWithJSON = "[";

    $.each(rows, function(index, value) {
        // console.log(index + ": " + value);
        // ignore the header row
        if (!value.includes("id,Type,File")) {
            var columns = value.split(",");
            
            if (columns.length > 1) {

                strWithJSON += '{"index": "' + (index) + '",';
                $.each(columns, function(index, value) {
                    if (index == 3) {
                        strWithJSON += '"target": "' + scapeDoubleQuotes(value) + '",';
                    }
                    if (index == 4) {
                        strWithJSON += '"response": "' + scapeDoubleQuotes(value) + '",';
                    }
                });

                strWithJSON += '"robot" : "0", "human" : "0"},';
            }
        }
    });

    // eliminate trailing comma and close the array
    strWithJSON = strWithJSON.replace(/(^,)|(,$)/g, "")
    strWithJSON += "]";

    return strWithJSON;
}

function readSingleFile(evt) {
    // Retrieve the first (and only!) File from the FileList object
    var fp = evt.target.files[0];

    if (fp) {

        if ('name' in fp) {
            console.log("name: " + fp.name);
        } else {
            console.log("fileName: " + fp.fileName);
        }

        var r = new FileReader();

        r.onload = function(e) {
            var contents = e.target.result;
            csvContent = contents;
            populateTable(csvContent);
            dataJSON = generateJSON(csvContent);
            console.log(dataJSON);
        }

        r.readAsText(fp);

    } else {
        alert("Failed to load file");
    }
}

function addClickOnRowEventToTable() {
    var t = document.getElementById('myTable');

    t.onclick = function (event) {
        event = event || window.event; //IE8
        var target = event.target || event.srcElement;
        
        while (target && target.nodeName != 'TR') { // find TR
            target = target.parentElement;
        }

        // if (!target) { return; } // tr should be always found
        var cells = target.cells; // cell collection - https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement
        // var cells = target.getElementsByTagName('td'); //alternative
        if (!cells.length || target.parentNode.nodeName == 'THEAD') {
            return;
        }

        var f1 = document.getElementById('index');
        var f2 = document.getElementById('target');
        var f3 = document.getElementById('response');
        // var f4 = document.getElementById('robot');
        // var f5 = document.getElementById('human');
        f1.innerHTML = cells[0].innerHTML;
        f2.innerHTML = cells[1].innerHTML;
        f3.innerHTML = cells[2].innerHTML;
        // f4.innerHTML = cells[3].innerHTML;
        // f5.innerHTML = cells[4].innerHTML;
        // console.log(target.nodeName, event);
    };
}

function scapeDoubleQuotes(str) {
    return (str + '').replace(/[\\"]/g, '\\$&').replace(/\u0000/g, '\\0');
}


$(function() {

    $(document).keydown(function(e) {

        if (!e) {
            e = event;
        }
        
        var keyPressed = String.fromCharCode(e.which);
        console.log("Key: " + keyPressed + " Code: " + e.keyCode);

        e.preventDefault();
    });

    $("#myModal").keypress(function() {
        console.log( "Handler for .keypress() called." );
    });

    // add event listener
    $("#fileinput").change(readSingleFile);

    addClickOnRowEventToTable();
});

