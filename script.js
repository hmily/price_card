window.onload = function () {
    insertNewDiv();
    var priceCardList = document.querySelectorAll('[data-card="price-card"]');
    var priceCardList_Array = Array.prototype.slice.call(priceCardList, 0);
    priceCardList_Array.sort(function (a, b) {
        return convert_price(a) - convert_price(b);
    });
    var new_table = constructTable(priceCardList_Array);
    document.getElementById("complimentary_price").appendChild(new_table);
}

function insertNewDiv() {
    var dataCardList = document.querySelectorAll('[data-card]');
    var new_div = document.createElement("div");
    new_div.id = "complimentary_price";
    new_div.setAttribute("data-card", "result-card");
    var new_h3 = document.createElement("h3");
    var title = document.createTextNode("Best Prices");
    new_h3.appendChild(title);
    new_div.appendChild(new_h3);
    dataCardList[0].parentNode.insertBefore(new_div, dataCardList[5]);
}


function convert_price(elem) {
    var text = elem.getElementsByClassName("price")[0].innerText.substring(1).replace(/,/g,"");
    return Number(text);
}

function constructTable(priceCardList_Array) {
    var n_table = document.createElement("table");
    n_table.id = "price_table";
    var n_tbody = document.createElement("tbody");
    var len = (priceCardList_Array.length >= 5) ? 5 : priceCardList_Array.length;
    for (var i = 0; i < len; i ++) {
        var n_tr = constructTableRow(priceCardList_Array[i]);
        n_tbody.appendChild(n_tr);
    }
    n_table.appendChild(n_tbody);
    return n_table;
}

function constructTableRow(priceCard) {
    var name = priceCard.querySelector("h3").innerText;
    var link = priceCard.querySelector("a").getAttribute("href");
    var price = priceCard.querySelector(".price").innerText;
    var row = document.createElement("tr");
    var cell_1 = document.createElement("td");
    var cell_2 = document.createElement("td");
    var url = document.createElement("a");
    url.href = link;
    url.target = "_blank";
    url.innerHTML = name;
    cell_1.appendChild(url);
    var priceNode = document.createElement("div");
    priceNode.className = "price";
    priceNode.innerText = price;
    cell_2.appendChild(priceNode);
    row.appendChild(cell_1);
    row.appendChild(cell_2);
    return row;
}

