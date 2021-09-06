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

function shared_link() {
    let url = document.URL;
    if (url.includes("?")) {
        let url_array = url.split("?")[1].split("&");
        user_data.name = url_array[0];
        user_data.mail = url_array[1];
        user_data.score = parseInt(url_array[2]);
        user_data.time = parseInt(url_array[3]);
    };
    // call the function to show the end game screen
}


window.onload = () => {
    shared_link();
};