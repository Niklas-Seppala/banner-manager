'use strict'

let BANNERS;
const FAC_ORDER = {
    "Vlandia": 0,
    "Battania": 1,
    "Sturgia": 2,
    "Empire": 3,
    "Aserai": 4,
    "Khuzait": 5,
    "None": 6
}

async function getBannersAsync() {
    const result = await $.ajax({
        dataType: 'json',
        url: './banners',
        error: (xhr, ajaxOptions, thrownError) => {
            console.error(xhr.responseText);
        }
    });
    return result;
}

$(document).ready(async function () {
    BANNERS = await getBannersAsync();
    createBannerList();
    setClipboardButton();
});

function changeBanner(id) {
    let banner;
    for (let i = 0; i < BANNERS.length; i++) {
        const b = BANNERS[i];
        if (b.id == id) {
            banner = b;
            break;
        }
    }
    console.log(banner);
    document.getElementById('display-banner-name').textContent = banner.name;
    document.getElementById('display-banner-code').children[0].textContent = banner.code;
    document.getElementById('display-banner-image').src = "/uploads/" + banner.image;

    let headerBlock = document.getElementById('display-banner-header');
    headerBlock.children[0].src = '/static/factions/' + banner.faction + '.jpg';
}

function createBannerList() {

    let listElems = [];

    BANNERS.forEach(banner => {
        let listElem = document.createElement('li');
        let btn = document.createElement('button');
        btn.value = banner.id;
        btn.className = "banner-list-btn"
        let name = document.createElement('span');
        name.appendChild(document.createTextNode(banner.name))
        let thumbnail = document.createElement('img');
        thumbnail.className = 'faction-thumbnail'
        thumbnail.src = '/static/factions/' + banner.faction + '.jpg';
        btn.appendChild(thumbnail);
        $(btn).append(name);
        $(btn).click(function (e) {
            e.preventDefault();
            changeBanner(btn.value);
        });
        listElem.appendChild(btn)
        listElems.push({ f: banner.faction, domElem: listElem });
    });
    listElems.sort((a, b) => FAC_ORDER[a.f] > FAC_ORDER[b.f] ? 1 : -1)
    listElems.forEach(elem => {
        $('ul').append(elem.domElem);
    });
}


function setClipboardButton() {
    let parent = document.getElementById('display-banner-code');
    $(parent).find('button').click(function (e) {
        e.preventDefault();
        let text = parent.children[0];
        text.select();
        document.execCommand('copy');
    });
}
