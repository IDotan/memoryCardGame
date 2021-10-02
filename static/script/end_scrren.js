
/******* table *******/

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
 * Load and sorte data in to the end screen table.
 * 
 * @param {Function} sort_function the function to sort by.
 */
function load_score_table(sort_function) {
    let table_data = [
        ["Itai", "itai145@gmail.com", 6, 10000],
        ["Danielle", "danielle07t@gmail.com", 8, 65000],
        ["Artem", "sartem.meshkov@gmail.com", 10, 45000]];
    table_data.push([user_data.name, user_data.mail, user_data.score, user_data.time]);
    table_data.sort((a, b) => { return sort_function(a, b) });
    //td index => table_data position.
    const td_keys = { 1: 0, 2: 2, 3: 3, 4: 1 };
    let table_rows = document.querySelectorAll('tr');
    for (i = 1; i < table_rows.length; i++) {
        table_rows[i].querySelectorAll('td').forEach((td, index) => {
            if (index == 0) {
                td.innerHTML = i + '.';
            } else if (index == 3) {
                let time = Math.floor(table_data[i - 1][td_keys[index]] / 1000);
                time >= 60 ? td.innerHTML = (time / 60).toFixed(2) + ' min' : td.innerHTML = time + ' sec';
            } else {
                td.innerHTML = table_data[i - 1][td_keys[index]];
            };
        });
    };
};

/**
 * Show the wanted arrow while hiding any other arrow.
 * 
 * @param {Number} show arrow "index" in the DOM to show.
 */
function table_arrow_switch(show) {
    let arrows_array = document.querySelectorAll(".sort_by");
    arrows_array.forEach((arrow, index) => {
        if (index == show) {
            arrow.classList.add("show");
            arrow.classList.remove("up");

        } else {
            arrow.classList.add("up");
            arrow.classList.remove("show");
        };
    });
};

/**
 * Sort the score table by the table header clicked.
 * 
 * @param {Object} event click event object.
 */
function table_sort_click(event) {
    let clicked_on = event.target.innerText;
    let up = event.target.classList.contains("up");
    switch (clicked_on) {
        case "Score":
            table_arrow_switch(0);
            if (up) {
                load_score_table(sort_score_descending);
            } else {
                event.target.classList.add("up");
                load_score_table(sort_score_ascending);
            };
            break;
        case "Time":
            table_arrow_switch(1);
            if (up) {
                load_score_table(sort_time_ascending);
            } else {
                event.target.classList.add("up");
                load_score_table(sort_time_descending);
            };
            break;
    };
};

/**
 * When useing shared link, load user info and show the end screen table.
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

/******* button panel *******/

function try_again() {
    reset_game();
    section_switch(1);
};


/******* share *******/

/**
 * Create url link to share with the user data.
 * 
 * @returns url link
 */
function share_score() {
    return document.URL.split("?")[0] + "?" + user_data.name + "$" + user_data.mail + "$" + user_data.score + "$" + user_data.time;
};

/**
 * Open the user email with the preset body with the share link.
 */
function share_via_mail() {
    let mail_link = "mailto:?body=" + encodeURIComponent(share_msg) + share_score();
    window.open(mail_link, "_blank");
};

/**
 * Open the user whatsapp with the preset text with the share link.
 */
function share_via_whatsapp() {
    let whatsapp_link = "https://wa.me/?text=" + encodeURIComponent(share_msg) + share_score();
    window.open(whatsapp_link, "_blank");
}