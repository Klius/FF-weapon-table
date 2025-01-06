const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
db = urlParams.get('db') ? urlParams.get('db') : "weapons";
get_dataset(db);


async function get_dataset(dataset_name) {
    url = "/docs/db/" + dataset_name + ".json"
    const response = await fetch(url);
    const data = await response.json();
    init_table(data)
}

function init_table(dataset) {
    th = document.getElementById("table-header");
    tb = document.getElementById("table-body");
    header_row = th.insertRow(0)
    for (i = 0; i < dataset.fields.length; i++) {
        cell = header_row.insertCell(i);
        cell.innerHTML = dataset.fields[i];
        cell.innerHTML += '<span aria-hidden="true"></span>';
        cell.setAttribute('onclick', 'sortTable(' + i + ');');

    }

    for (i = 0; i < dataset.rows.length; i++) {
        row = tb.insertRow(i)
        for (x = 0; x < dataset.fields.length; x++) {
            field = dataset.fields[x]
            row.insertCell(x).innerHTML = dataset.rows[i][field];
        }
    }
    sortTable(0)
}

//https://www.w3schools.com/howto/howto_js_filter_table.asp
function filter_table() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filter_input");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}