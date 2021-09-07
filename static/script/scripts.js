const user_data = {
    name: "bob",
    mail: "e@mail.com",
    score: -1,
    time: 9999999
};

function share_score() {
    let url = document.URL + "?" + user_data.name + "&" + user_data.mail + "&" + user_data.score + "&" + user_data.time;
    return url;
};

function sort_score_ascending(a, b) {
    return a[2] - b[2];
};

function sort_score_descending(a, b) {
    return b[2] - a[2];
};

function sort_time_ascending(a, b) {
    return a[3] - b[3];
};

function sort_time_descending(a, b) {
    return b[3] - a[3];
};

function load_score_table(sort_function) {
    let table_data = [["itai", "itai145@gmail.com", 8, 30000]];
    table_data.push([user_data.name, user_data.mail, user_data.score, user_data.time]);
    table_data.sort((a, b) => { return sort_function(a, b) });
    let str_data = "";
    table_data.forEach((data) => {
        str_data += "<tr><td>" + data[0] + "</td><td>" + data[1] + "</td><td>" + data[2] + "</td><td>" + data[3] / 1000 + "s</td></tr>";
    });
    document.getElementById('score_table').innerHTML = document.getElementById('score_table').innerHTML.split("</tr>", 1)[0] + "</tr>" + str_data;
};

function table_arrow_switch(show, hide) {
    document.getElementsByClassName("table_arrow")[show].classList.remove("hide");
    document.getElementsByClassName("table_arrow")[hide].classList.add("hide");
    document.getElementsByClassName("table_arrow")[hide].classList.add("up");
};

function table_sort_click(event) {
    let clicked_on = event.target.innerText
    let up = event.target.children[0].classList.contains("up")
    switch (clicked_on) {
        case "Score":
            table_arrow_switch(0, 1);
            if (up) {
                event.target.children[0].classList.remove("up");
                load_score_table(sort_score_descending);
            } else {
                event.target.children[0].classList.add("up");
                load_score_table(sort_score_ascending);
            }
            break;
        case "Time":
            table_arrow_switch(1, 0);
            if (up) {
                event.target.children[0].classList.remove("up");
                load_score_table(sort_time_ascending);
            } else {
                event.target.children[0].classList.add("up");
                load_score_table(sort_time_descending);
            }
            break;
    };
};

function shared_link() {
    let url = document.URL;
    if (url.includes("?")) {
        let url_array = url.split("?")[1].split("&");
        if (url_array.length == 4) {
            user_data.name = url_array[0];
            user_data.mail = url_array[1];
            user_data.score = parseInt(url_array[2]);
            user_data.time = parseInt(url_array[3]);
            load_score_table(sort_score_descending);
        };
    };
};


window.onload = () => {
    shared_link();
};