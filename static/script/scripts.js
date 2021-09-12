const developers_data = {
    card_count: document.getElementsByClassName('about tab').length,
    card_width: 0,
    card_z: null,
    card_deg: 0,
    easter_egg: false,
    clicks: -1
};
developers_data.card_deg = Math.round(360 / developers_data.card_count)
const user_data = {
    name: "bob",
    mail: "e@mail.com",
    score: -1,
    time: 9999999
};
const share_msg = "Check out the score I got here:\n";
const game_data = {
    cards_count: 0,
    start_time: 0,
    score: 0,
}


/******************** Nav bar ********************/

/**
 * Show the relevent page section while hiding all the others.
 * 
 * @param {Number} show section DOM "index" to show. * 
 */
function section_switch(show) {
    let sections_array = document.querySelectorAll(".page_section")
    sections_array.forEach((section, index) => {
        if (index == show) {
            section.classList.remove('hide');
        } else {
            section.classList.add('hide');
        };
    });
};

/******************** Landing screen ********************/

/******* developers carousel *******/

/**
 * Set developers_data that are affected by the screen size.
 */
function developers_data_set() {
    let card_style = window.getComputedStyle(document.getElementsByClassName('about')[0]);
    let width = parseFloat(card_style.getPropertyValue("width").slice(0, -2));
    let gap = parseFloat(card_style.getPropertyValue("left").slice(0, -2)) * 2;
    developers_data.card_width = width + gap;
    developers_data.card_z = Math.round((developers_data.card_width / 2) / Math.tan(Math.PI / developers_data.card_count));
};

/**
 * Give the about cards the needed proprty for the carousel.
 */
function developers_about_carousel() {
    let temp = document.querySelectorAll('.about.tab');
    temp.forEach((div, index) => {
        div.style.transform = "rotateY(" + developers_data.card_deg * index + "deg) translateZ(" + developers_data.card_z + "px)";
    });
};

/**
 * When the right sequence clicks where made and then add the easter egg.
 * 
 * @param {Number} n direction from the clicked carousel arrow
 */
function carousel_easter_egg(n) {
    /**
     * Create the easter egg div.
     * 
     * @returns {HTMLElement} easter egg div element.
     */
    function create_easter_div() {
        let div = document.createElement("div");
        div.setAttribute("class", "about tab");
        let img = document.createElement("img");
        img.setAttribute("src", "static/img/mug.jpg");
        let h2 = document.createElement("h2");
        h2.innerText = "Coffee";
        div.append(img);
        div.append(h2);
        return div;
    };

    /**
     * Update the carousel needed data.
     */
    function carousel_data_update() {
        developers_data.card_count += 1;
        developers_data.card_deg = Math.round(360 / developers_data.card_count);
        developers_data_set();
        developers_about_carousel();
        document.getElementById('developers_carousel').style.transform = "rotateY(0deg)";
    };

    let code = [1, 1, -1, 1];
    developers_data.clicks == code.length - 1 ? developers_data.clicks = -1 : developers_data.clicks += 1;
    if (code[developers_data.clicks] != n) {
        developers_data.clicks = -1;
    } else if (developers_data.clicks == code.length - 1) {
        developers_data.easter_egg = true;
        document.getElementById('developers_carousel').append(create_easter_div());
        carousel_data_update();
    };
};

/**
 * Rotate the developers carousel to right or left by the given direction.
 * 
 * @param {Number} direction 1 rotate right, -1 rotate left
 */
function rotate_carousel(direction) {
    if (developers_data.easter_egg == false) {
        carousel_easter_egg(direction);
    };
    let carousel = document.getElementById('developers_carousel');
    let deg = carousel.style.transform.slice(8, -4);
    deg == "" ? deg = 0 : deg = parseInt(deg);
    document.getElementById('developers_carousel').style.transform = "rotateY(" + (deg + (developers_data.card_deg * direction)) + "deg)";
};

/**
 * Change developers carousel to random place.
 */
function about_carousel_random() {
    let tab = Math.floor((Math.random() * developers_data.card_count) + 1);
    rotate_carousel(tab);
};

/******* popup *******/

/**
 * login popup settings
 */
function popup() {
    let popup = document.querySelector(".popup_container");
    popup.style.display = 'block';
}

function closePopup() {
    let popup = document.querySelector(".popup_container");
    popup.style.display = 'none';
}

function login() {
    let username = document.getElementById('email_form').value;
    let password = document.getElementById('password_form').value;
    console.log('username: ' + username);
    console.log('password: ' + password);
    checkData(username, password);
}

function checkData(username_in, password_in) {
    data = dataBase();
    console.log(data);
}

/**
 * 
 * set the database for 
 */
function dataBase () {
    let users = [
        {
            username: 'user',
            password: '1234'
        }
    ];
    console.log(users);
}

/******************** Card Game screen ********************/

/**
 * Start the memory came with the amount of cards given.
 * 
 * @param {Number} cards numbers of card for the game
 */
function start_game(cards) {
    game_data.cards_count = cards;
    const card_temp = document.getElementById('card_template');
    let board = document.getElementsByClassName('card_container')[0];
    for (let i = 0; i < cards; i++) {
        board.appendChild(card_temp.content.cloneNode(true));
    };
    document.getElementById('difficulty_picking').classList.add('hide');
    document.getElementById('game_board').classList.remove('hide');
}

/******************** End screen ********************/

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
 * Load the sorted data in to the end screen table.
 * 
 * @param {Function} sort_function the function to sort by.
 */
function load_score_table(sort_function) {
    let table_data = [
        ["Itai", "itai145@gmail.com", 8, 30000],
        ["Danielle", "danielle07t@gmail.com", 10, 25000],
        ["Artem", "sartem.meshkov@gmail.com", 5, 70000]];
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
    let arrows_array = document.querySelectorAll(".sort_by");
    arrows_array.forEach((arrow, index) => {
        if (index == show) {
            arrow.classList.add("show");
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
    let clicked_on = event.target.innerText
    let up = event.target.classList.contains("up")
    switch (clicked_on) {
        case "Score":
            table_arrow_switch(0);
            if (up) {
                event.target.classList.remove("up");
                load_score_table(sort_score_descending);
            } else {
                event.target.classList.add("up");
                load_score_table(sort_score_ascending);
            }
            break;
        case "Time":
            table_arrow_switch(1);
            if (up) {
                event.target.classList.remove("up");
                load_score_table(sort_time_ascending);
            } else {
                event.target.classList.add("up");
                load_score_table(sort_time_descending);
            }
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

/******* share *******/

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

/******************** On event ********************/

window.onresize = () => {
    developers_data_set();
    developers_about_carousel();
};

window.onload = () => {
    shared_link();
    developers_data_set();
    developers_about_carousel();
    about_carousel_random();
};