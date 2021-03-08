//add month
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
const month = monthNames[d.getMonth()];
const dateElement = document.getElementById("month");
dateElement.innerHTML = month;

// declaration
const rem_inc = document.getElementById("ilist");
const rem_exp = document.getElementById("elist");
var sum_inc = 0;
var sum_exp = 0;
var final_score = 0;
var perc_count = 0;


//main function
function run() {

    //get users values
    const typev = document.getElementById("type").value;
    const descv = document.getElementById("desc").value;
    var valuev = document.getElementById("val").value;

    //validation
    if (descv == "" || valuev < 1) {
        alert("field should not remain empty");
    }
    else {

        if (typev == "+") {
            saveLocalInc(descv, valuev);
            var desctxt = document.createTextNode(descv);
            var valtxt = document.createTextNode("+" + valuev);
            console.log(valtxt);
            var node1 = document.createElement("i");
            var node2 = document.createElement("div");
            node2.appendChild(node1);
            node1.setAttribute("class", "fa fa-close");
            node2.setAttribute("class", "item__delete--btn");
            var node3 = document.createElement("div");
            node3.appendChild(node2);
            var node4 = document.createElement("div");
            node4.appendChild(valtxt);
            var node5 = document.createElement("div");
            node5.setAttribute("class", "right ");
            node5.appendChild(node4);
            node5.appendChild(node3);
            var node6 = document.createElement("div");
            node6.appendChild(desctxt);
            var node7 = document.createElement("div");
            node7.setAttribute("class", "item");
            node7.appendChild(node6);
            node7.appendChild(node5);
            document.getElementById("ilist").appendChild(node7);
            updateinc1(valuev);
            document.getElementById("desc").value = "";
            document.getElementById("val").value = "";
        }
        else {
            saveLocalExp(descv, valuev);
            var desctxt = document.createTextNode(descv);
            var valtxt = document.createTextNode(valuev);
            var perctxt = document.createTextNode(calc_perc(valuev) + "%");
            var node1 = document.createElement("i");
            var node2 = document.createElement("div");
            node2.appendChild(node1);
            node1.setAttribute("class", "fa fa-close");
            node2.setAttribute("class", "item__delete--btn");
            var node3 = document.createElement("div");
            node3.appendChild(node2);
            var node4 = document.createElement("div");
            node4.setAttribute("class", "item__percentage");
            node4.appendChild(perctxt);
            var node5 = document.createElement("div");
            node5.appendChild(valtxt);
            var node6 = document.createElement("div");
            node6.setAttribute("class", "right ");
            node6.appendChild(node5);
            node6.appendChild(node4);
            node6.appendChild(node3);
            var node7 = document.createElement("div");
            node7.appendChild(desctxt);
            var node8 = document.createElement("div");
            node8.setAttribute("class", "item ");
            node8.appendChild(node7);
            node8.appendChild(node6);
            document.getElementById("elist").appendChild(node8);
            updateexp1(valuev);
            document.getElementById("desc").value = "";
            document.getElementById("val").value = "";
        }
    }

}

function remove_inc(element) {
    element.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode.parentNode);
}

function remove_exp(element) {
    element.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode.parentNode);
}

rem_inc.addEventListener("click", function (event) {
    const element = event.target;
    var ch = element.parentNode.parentNode.parentNode.firstChild;
    var ch2 = element.parentNode.parentNode.parentNode.parentNode.firstChild;
    var value = parseInt(ch.innerText);
    var desc = ch2.innerText;
    const elementjob = element.nodeName;
    if (elementjob == "I") {
        remove_inc(element);
        removeLocalInc(value, desc);
        updateinc2(value);
    }
});

rem_exp.addEventListener("click", function (event) {
    const element = event.target;
    var ch = element.parentNode.parentNode.parentNode.firstChild;
    var value = parseInt(ch.innerText);
    var ch2 = element.parentNode.parentNode.parentNode.firstChild.nextSibling;
    var ch3 = element.parentNode.parentNode.parentNode.parentNode.firstChild;
    var percent = parseInt(ch2.innerText);
    var desc = ch3.innerText;
    elementjob = element.nodeName;
    if (elementjob == "I") {
        remove_exp(element);
        updateexp2(value);
        removeLocalExp(value, desc);
        update_f_perc(percent);
    }
});

function updateinc1(valuev) {
    var a = parseInt(valuev);
    sum_inc = sum_inc + a;
    document.getElementById("upd_inc").innerHTML = "+ " + sum_inc;
    update_total();
    drawgraph();
}

function updateinc2(v) {
    sum_inc = sum_inc - v;
    document.getElementById("upd_inc").innerHTML = "+ " + sum_inc;
    update_total();
    drawgraph();
}

function updateexp1(valuev) {
    var a = parseInt(valuev);
    sum_exp = sum_exp + a;
    document.getElementById("upd_exp").innerHTML = "- " + sum_exp;
    update_total();
    drawgraph();
}

function updateexp2(v) {
    var a = parseInt(v);
    sum_exp = sum_exp - a;
    document.getElementById("upd_exp").innerHTML = "- " + sum_exp;
    update_total();
    drawgraph();
}

function update_total() {
    var final_score = sum_inc - sum_exp;
    if (final_score > 0) {
        document.getElementById("f_scr").innerHTML = "+ " + final_score + " Rs.";
    }
    else {
        document.getElementById("f_scr").innerHTML = final_score + " Rs.";
    }
}

function calc_perc(valuev) {
    var perc = Math.round((parseInt(valuev) / sum_inc) * 100);
    if (perc_count == "Infinity") {
        perc_count = 0;
    }
    perc_count = perc_count + perc;
    document.getElementById("exp_fperc").innerHTML = perc_count + "%";
    return perc;
}

function update_f_perc(v2) {
    perc_count = perc_count - v2;
    document.getElementById("exp_fperc").innerHTML = perc_count + "%";
}

document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        run();
    }
});

//function to save income at local storage
function saveLocalInc(desc, price) {
    let locinc;
    up1 = {
        description: desc,
        money: price
    };
    if (localStorage.getItem("locinc") === null) {
        locinc = [];
    } else {
        locinc = JSON.parse(localStorage.getItem("locinc"));
    }
    locinc.push(up1);
    localStorage.setItem('locinc', JSON.stringify(locinc));
}

//function to save expense at local storage
function saveLocalExp(desc, price) {
    let locexp;
    up2 = {
        description: desc,
        money: price
    };
    if (localStorage.getItem("locexp") === null) {
        locexp = [];
    } else {
        locexp = JSON.parse(localStorage.getItem("locexp"));
    }
    locexp.push(up2);
    localStorage.setItem('locexp', JSON.stringify(locexp));
}




//function to load previously stored income nd expenses
function getall() {
    let savedinc, savedexp;
    if (localStorage.getItem("locinc") === null) {
        savedinc = [];
    } else {
        savedinc = JSON.parse(localStorage.getItem("locinc"));
    }
    if (localStorage.getItem("locexp") === null) {
        savedexp = [];
    } else {
        savedexp = JSON.parse(localStorage.getItem("locexp"));
    }
    savedinc.forEach(function (inc) {
        console.log(inc['description']);
        console.log(inc['money']);
        var desctxt = document.createTextNode(inc['description']);
        var valtxt = document.createTextNode("+" + inc['money']);
        var node1 = document.createElement("i");
        var node2 = document.createElement("div");
        node2.appendChild(node1);
        node1.setAttribute("class", "fa fa-close");
        node2.setAttribute("class", "item__delete--btn");
        var node3 = document.createElement("div");
        node3.appendChild(node2);
        var node4 = document.createElement("div");
        node4.appendChild(valtxt);
        var node5 = document.createElement("div");
        node5.setAttribute("class", "right");
        node5.appendChild(node4);
        node5.appendChild(node3);
        var node6 = document.createElement("div");
        node6.appendChild(desctxt);
        var node7 = document.createElement("div");
        node7.setAttribute("class", "item");
        node7.appendChild(node6);
        node7.appendChild(node5);
        document.getElementById("ilist").appendChild(node7);
        updateinc1(inc['money']);
        document.getElementById("desc").value = "";
        document.getElementById("val").value = "";
    });
    savedexp.forEach(function (inc) {
        console.log(inc['description']);
        console.log(inc['money']);
        var desctxt = document.createTextNode(inc['description']);
        var valtxt = document.createTextNode(inc['money']);
        var perctxt = document.createTextNode(calc_perc(inc['money']) + "%");
        var node1 = document.createElement("i");
        var node2 = document.createElement("div");
        node2.appendChild(node1);
        node1.setAttribute("class", "fa fa-close");
        node2.setAttribute("class", "item__delete--btn");
        var node3 = document.createElement("div");
        node3.appendChild(node2);
        var node4 = document.createElement("div");
        node4.setAttribute("class", "item__percentage");
        node4.appendChild(perctxt);
        var node5 = document.createElement("div");
        node5.appendChild(valtxt);
        var node6 = document.createElement("div");
        node6.setAttribute("class", "right");
        node6.appendChild(node5);
        node6.appendChild(node4);
        node6.appendChild(node3);
        var node7 = document.createElement("div");
        node7.appendChild(desctxt);
        var node8 = document.createElement("div");
        node8.setAttribute("class", "item");
        node8.appendChild(node7);
        node8.appendChild(node6);
        document.getElementById("elist").appendChild(node8);
        updateexp1(inc['money']);
        document.getElementById("desc").value = "";
        document.getElementById("val").value = "";
    });
}

getall();

//remove expense from local storage 
function removeLocalExp(value, desc) {
    let locexp;
    if (localStorage.getItem("locexp") === null) {
        locexp = [];
    } else {
        locexp = JSON.parse(localStorage.getItem("locexp"));
    }
    let index = locexp.find(item => item.money == value && item.description == desc);
    locexp.splice(locexp.indexOf(index), 1);
    localStorage.setItem("locexp", JSON.stringify(locexp));
}

//remove Income from local storage  
function removeLocalInc(value, desc) {
    let locinc;
    if (localStorage.getItem("locinc") === null) {
        locinc = [];
    } else {
        locinc = JSON.parse(localStorage.getItem("locinc"));
    }
    let index = locinc.find(item => item.money == value && item.description == desc);
    locinc.splice(locinc.indexOf(index), 1);
    localStorage.setItem("locinc", JSON.stringify(locinc));
}

//Chart 
Chart.defaults.global.defaultFontColor = "black";
Chart.defaults.global.defaultFontSize = 15;
function drawgraph() {
    var ctx = document.getElementById('chart-area').getContext('2d');
    var config = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    sum_exp,
                    sum_inc
                ],
                backgroundColor: [
                    "red",
                    "green",
                ],
                label: 'Income and Expenses'
            }],
            labels: [
                'Expense',
                'Income'
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Graphical Representation'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}