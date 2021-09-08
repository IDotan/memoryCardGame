const user_data = {
    name: "bob",
    mail: "e@mail.com",
    score: -1,
    time: 9999999
};
const share_msg = "Check out the score I got here:\n";

/**
 * Show the relevent page section while hiding all the others.
 * 
 * @param {Number} show section DOM "index" to show. * 
 */
function section_switch(show) {
    let sections_array = Array.from(document.getElementsByClassName("page_section"))
    sections_array.forEach((section, index) => {
        if (index == show) {
            section.classList.remove('hide');
        } else {
            section.classList.add('hide');
        };
    });
};

/**
 * Create url link to share with the user data.
 * 
 * @returns url link
 */
function share_score() {
    let url = document.URL.split("?")[0] + "?" + user_data.name + "$" + user_data.mail + "$" + user_data.score + "$" + user_data.time;
    return url;
};

/**
 * Sort table data by score, from lowest to largest.
 * 
 * @param {Array} a data array to check.
 * @param {Array} b data array to check.
 * @returns a[2] - b[2]
 */
function sort_score_ascending(a, b) {
    return a[2] - b[2];
};

/**
 * Sort table data by score, from largest to lowest.
 * 
 * @param {Array} a data array to check.
 * @param {Array} b data array to check.
 * @returns b[2] - a[2]
 */
function sort_score_descending(a, b) {
    return b[2] - a[2];
};

/**
 * Sort table data by time, from shortest to longest.
 * 
 * @param {Array} a data array to check.
 * @param {Array} b data array to check.
 * @returns a[3] - b[3]
 */
function sort_time_ascending(a, b) {
    return a[3] - b[3];
};

/**
 * Sort table data by time, from longest to shortest.
 * 
 * @param {Array} a data array to check.
 * @param {Array} b data array to check.
 * @returns b[3] - a[3]
 */
function sort_time_descending(a, b) {
    return b[3] - a[3];
};


/**
 * Load the sorted data in to the end screen table.
 * 
 * @param {Function} sort_function the function to sort by.
 */
function load_score_table(sort_function) {
    let table_data = [["itai", "itai145@gmail.com", 8, 30000]];
    table_data.push([user_data.name, user_data.mail, user_data.score, user_data.time]);
    table_data.sort((a, b) => { return sort_function(a, b) });
    let str_data = "";
    table_data.forEach((data, index) => {
        str_data += "<tr><td>" + (index + 1) + ".</td><td>" + data[0] + "</td><td>" + data[1] + "</td><td>" + data[2] + "</td><td>" + data[3] / 1000 + "s</td></tr>";
    });
    document.getElementById('score_table').innerHTML = document.getElementById('score_table').innerHTML.split("</tr>", 1)[0] + "</tr>" + str_data;
};

/**
 * Show the wanted arrow while hiding any other arrow.
 * 
 * @param {Number} show arrow "index" in the DOM to show.
 */
function table_arrow_switch(show) {
    let arrows_array = Array.from(document.getElementsByClassName("table_arrow"));
    arrows_array.forEach((arrow, index) => {
        if (index == show) {
            arrow.classList.remove("hide");
        } else {
            arrow.classList.add("hide");
            arrow.classList.add("up");
        };
    });
};

/**
 * Sort the score table by the table header clicked.
 * 
 * @param {Object} event click event object.
 */
function table_sort_click(event) {
    let clicked_on = event.target.innerText
    let up = event.target.children[0].classList.contains("up")
    switch (clicked_on) {
        case "Score":
            table_arrow_switch(0);
            if (up) {
                event.target.children[0].classList.remove("up");
                load_score_table(sort_score_descending);
            } else {
                event.target.children[0].classList.add("up");
                load_score_table(sort_score_ascending);
            }
            break;
        case "Time":
            table_arrow_switch(1);
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

/**
 * Run when useing shared link, load user info and show the end screen table.
 */
function shared_link() {
    let url = document.URL;
    if (url.includes("?")) {
        let url_array = url.split("?")[1].split("$");
        if (url_array.length == 4) {
            user_data.name = url_array[0];
            user_data.mail = url_array[1];
            user_data.score = parseInt(url_array[2]);
            user_data.time = parseInt(url_array[3]);
            load_score_table(sort_score_descending);
            section_switch(2);
        };
    };
};


function share_via_mail() {
    let mail_link = "mailto:?body=" + encodeURIComponent(share_msg) + share_score();
    window.open(mail_link, "_blank");
};

function share_via_whatsapp() {
    let whatsapp_link = "https://wa.me/?text=" + encodeURIComponent(share_msg) + share_score();
    window.open(whatsapp_link, "_blank");
}


window.onload = () => {
    shared_link();
};