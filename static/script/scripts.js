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
    min_width: 1024,
    cards_in_column: 3,
    start_flip: 1000,
    start_time: 0,
    stored_time: 0,
    score: 0,
}
const reg_user = [["user", 1234]]

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

/**
 * Switch landing page sections, and update the carousel when needed.
 */
function taggle_landingscreed_sections() {
    document.querySelectorAll('.landing_screen_sections').forEach((section) => {
        section.classList.toggle('hide');
    });
    if (!document.getElementById('developers_carousel_container').classList.contains('hide')) {
        developers_data_set();
        developers_about_carousel();
        about_carousel_random();
    };
};

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
        document.querySelector('.about.center').classList.remove('center');
        setTimeout(() => {
            let nodlist = document.querySelectorAll('.about.tab');
            nodlist[nodlist.length - 1].classList.add('center');
        }, 100)
    };
};

/**
 * Rotate the developers carousel to right or left by the given direction.
 * 
 * @param {Number} direction 1 rotate right, -1 rotate left
 */
function rotate_carousel(direction) {
    /**
     * Change the 'center' class to be on the new center tab.
     * 
     * @param {HTMLElement} old_center old tab with 'center' class
     * @param {Number} direction rotate direction
     */
    function change_center(old_center, direction) {
        old_center.classList.remove('center');
        let new_center;
        if (direction < 0) {
            new_center = old_center.nextElementSibling;
            if (new_center == null) {
                new_center = document.querySelector('.about.tab');
            };
        } else {
            new_center = old_center.previousElementSibling;
            if (new_center.classList.contains('placeholder')) {
                let nodlist = document.querySelectorAll('.about.tab');
                new_center = nodlist[nodlist.length - 1];
            };
        };
        new_center.classList.add('center');
    };

    if (developers_data.easter_egg == false) {
        carousel_easter_egg(direction);
    };
    let carousel = document.getElementById('developers_carousel');
    let deg = carousel.style.transform.slice(8, -4);
    deg == "" ? deg = 0 : deg = parseInt(deg);
    document.getElementById('developers_carousel').style.transform = "rotateY(" + (deg + (developers_data.card_deg * direction)) + "deg)";
    if (Math.abs(direction) == 1) {
        let old_center = document.querySelector('.about.center');
        if (!old_center) {
            return
        }
        change_center(old_center, direction);
    };
};

/**
 * Change developers carousel to random place.
 */
function about_carousel_random() {
    document.getElementById('developers_carousel').style.transform = "rotateY(0deg)";
    document.querySelector('.about.center').classList.remove('center');
    let tab = Math.floor((Math.random() * developers_data.card_count) + 1);
    rotate_carousel(tab);
    // calculat the new center tab
    tab = (developers_data.card_count - 1) - (tab - 1);
    document.querySelectorAll('.about.tab')[tab].classList.add('center');
};

/******* popup *******/
let startBtn = document.getElementById('start_btn');
function showPopup() {
    let popup = document.querySelector(".popup_container");
    popup.style.display = 'block';
}

let closePopupBttn = document.getElementsByClassName('close_popup')[0];
closePopupBttn.addEventListener('click', closePopup);
window.addEventListener('keydown', function (key) {
    if (key.keyCode == '27') {
        closePopup();
    }
})

let loginBttn = document.getElementById('log_in_btn');
let signupBttn = document.getElementById('sign_up_btn');
startBtn.addEventListener('click', showPopup);
signupBttn.addEventListener('click', signup);

loginBttn.addEventListener('click', login);
window.addEventListener('keydown', function (key) {
    if (key.keyCode == '13') {
        login();
    }
});

function login() {
    let usernameInput = document.getElementById('email_form').value;
    let passwordInput = document.getElementById('password_form').value;
    checkData(usernameInput, passwordInput);
}

function checkData(usernameInput, passwordInput) {
    let data = dataBase()
    let logMessage = document.getElementById('log_message');

    console.log(user_data);
    for (let i = 0; i < data.length; i++) {
        if (passwordInput == data[i].password && usernameInput == data[i].username) {
            section_switch(1);
        }
        else if (logMessage.innerHTML == '') {
            logMessage.append('Username or Password is incorrect');
        }
    }
}

function signup() {
    let usernameIn = document.getElementById('email_form').value;
    let passwordIn = document.getElementById('password_form').value;
    let newUser = true;
    dataBase(usernameIn, passwordIn, newUser)
}

function closePopup() {
    let logMessage = document.getElementById('log_message');
    let popup = document.querySelector(".popup_container");
    popup.style.display = 'none';
    logMessage.innerHTML = '';
}

function dataBase(user, pass, newAcc) {

    let users = [
        {
            username: 'user',
            password: '1234'
        },
        {
            username: 'itay',
            password: '1234'
        }
    ];
    if (newAcc == true) {
        users.push({ username: user, passwprd: pass })
        console.log(users);
    }
    return users;
}

/******************** Card Game screen ********************/

/**
 * Reveal cards and flip back one by one, add click event at the end.
 */
function start_card_reveal() {
    /**
     * Show then hide the given card div and add event listener affter all card been shown.
     * 
     * @param {HTMLElement} target card div to take action on.
     * @param {Number} loop loop count to set the dilays by.
     */
    function time_card(target, loop) {
        setTimeout(() => {
            card_flip(null, target);
        }, (loop * game_data.start_flip));
        setTimeout(() => {
            card_flip(null, target);
        }, ((loop * game_data.start_flip) + game_data.start_flip));
        setTimeout(() => {
            target.addEventListener('click', card_flip);
        }, ((game_data.cards_count + 1) * game_data.start_flip));
    };

    document.getElementById('start_btn_container').classList.add('hide');
    let cards = document.querySelectorAll('.card');
    if (window.innerWidth < game_data.min_width) {
        cards.forEach((card, index) => {
            time_card(card, index);
        });
    } else {
        let cards_in_row = game_data.cards_count / game_data.cards_in_column;
        let loop_count = 0;
        for (let i = 0; i < game_data.cards_in_column; i++) {
            for (let j = 0; j < cards_in_row; j++) {
                let target_card = cards[(i + (j * game_data.cards_in_column))];
                time_card(target_card, loop_count);
                loop_count += 1;
            };
        };
    };
};

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
    document.querySelectorAll('.card').forEach((div, index) => {
        div.classList.add(index);
    });
    document.getElementById('difficulty_picking').classList.add('hide');
    document.getElementById('game_board').classList.remove('hide');
}

/**
 * Flip card to it's other side.
 * 
 * @param {Object} event click event object. null when calling from other function
 * @param {HTMLElement} card card div when not called from event listener.
 */
function card_flip(event, card = null) {
    if (card == null) {
        card = this;
    };
    let img_div = card.children[1];
    img_div.src == document.URL ? add_card_img(img_div) : setTimeout(() => { img_div.src = "" }, 500);
    card.classList.toggle('flip');
};

/**
 * Add image to the given <img>.
 * 
 * @param {HTMLElement} card_img card <img> to set.
 */
function add_card_img(card_img) {
    let path = document.URL.split(".index")[0];
    path = path.slice(0, path.lastIndexOf("/"));
    let img_path = "/static/img/mug.jpg";
    card_img.src = path + img_path;
};

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
        str_data += "<tr><td>" + (index + 1) + ".</td><td>" + data[0] + "</td><td>" + data[2] + "</td><td>" + data[3] / 1000 + "s</td><td>" + data[1] + "</td></tr>";
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
};
