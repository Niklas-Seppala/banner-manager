'use strict'

let BANNERS;
const FACTIONS = {
    "Vlandia": 0,
    "Battania": 1,
    "Sturgia": 2,
    "Empire": 3,
    "Aserai": 4,
    "Khuzait": 5,
    "None": 6,
    "All": 7
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
    setFactionSorting();
    createBannerList();
    setClipboardButton();
    setDefaultBanner();
});

function setDefaultBanner() {
    if (BANNERS) {
        changeBanner(BANNERS[0].id);
    }
}

function setFactionSorting() {
    $('#by-faction-selection').change(function () {
        const id = Number.parseInt($("#by-faction-selection option:selected").val());
        const factionText = $("#by-faction-selection option:selected").text();
        let factionImg = document.getElementsByClassName('display-by-faction-img')[0];
        switch (id) {
            case FACTIONS.All:
                $(factionImg).hide();
                showAllBanners();
                break;
            case FACTIONS.None:
                $(factionImg).show();
                factionImg.src = '/static/faction_images/None.jpg';
                filterBannerList(id);
                break;
            case FACTIONS.Vlandia:
                $(factionImg).show();
                factionImg.src = '/static/faction_images/' + factionText + '.jpg';
                filterBannerList(id);
                break;
            case FACTIONS.Sturgia:
                $(factionImg).show();
                factionImg.src = '/static/faction_images/' + factionText + '.jpg';
                filterBannerList(id);
                break;
            case FACTIONS.Aserai:
                $(factionImg).show();
                factionImg.src = '/static/faction_images/' + factionText + '.jpg';
                filterBannerList(id);
                break;
            case FACTIONS.Battania:
                $(factionImg).show();
                factionImg.src = '/static/faction_images/' + factionText + '.jpg';
                filterBannerList(id);
                break;
            case FACTIONS.Empire:
                $(factionImg).show();
                factionImg.src = '/static/faction_images/' + factionText + '.jpg';
                filterBannerList(id);
                break;
            case FACTIONS.Khuzait:
                $(factionImg).show();
                factionImg.src = '/static/faction_images/' + factionText + '.jpg';
                filterBannerList(id);
                break;
            default:
                break;
        }
    });
}

function changeBanner(id) {
    let banner;
    for (let i = 0; i < BANNERS.length; i++) {
        const b = BANNERS[i];
        if (b.id == id) {
            banner = b;
            break;
        }
    }
    $('.code-area').val(banner.code);
    document.getElementsByClassName('selected-banner')[0].src = "/img/" + banner.image;
    document.getElementById('selected-banner-name').textContent = banner.name;
    document.getElementsByClassName('banner-faction-img')[0].src = '/static/faction_images/' + banner.faction + '.jpg';

    let creatorParent = document.getElementById('selected-banner-creator');
    if (!banner.creator) {
        $(creatorParent).hide();
        return;
    } else {
        $(creatorParent).show();
    }
    if (creatorParent.childElementCount > 1) {
        creatorParent.removeChild(creatorParent.childNodes[1]);
    }
    if (banner.creator.includes('u/')) {

        let redditLink = document.createElement('a');
        redditLink.className = 'creator-name'

        let asd = banner.creator;
        asd = asd.replace('u/', 'user/');
        redditLink.href = "https://www.reddit.com/" + asd;
        redditLink.text = banner.creator;
        creatorParent.appendChild(redditLink);
    } else {
        let creatorSpan = document.createElement('span');
        creatorSpan.textContent = banner.creator;
        creatorParent.appendChild(creatorSpan);
    }

}

function emptyBannerList() {
    let bannerList = document.getElementsByClassName('banner-list')[0];
    while (bannerList.lastChild)
        bannerList.removeChild(bannerList.lastChild);
}

function filterBannerList(faction) {
    let bannerList = document.getElementsByClassName('banner-list')[0];
    for (let i = 0; i < bannerList.children.length; i++) {
        const child = bannerList.children[i];
        const factionVal = Number.parseInt(child.getElementsByTagName('input')[0].value);
        if (faction !== factionVal)
            $(child).hide();
        else
            $(child).show();
    }
}

function showAllBanners() {
    let bannerList = document.getElementsByClassName('banner-list')[0];
    for (let i = 0; i < bannerList.children.length; i++) {
        const child = bannerList.children[i];
        $(child).show();
    }
}

function createBannerList() {

    let bannerList = [];

    BANNERS.forEach(banner => {
        let bannerElem = document.createElement('div');
        bannerElem.classList.add('banner-list-item');
        let button = document.createElement('button');
        let img = document.createElement('img');
        let span = document.createElement('span');
        let hiddenFaction = document.createElement('input');


        button.value = banner.id;
        img.src = '/static/faction_images/' + banner.faction + '.jpg';
        span.appendChild(document.createTextNode(banner.name));

        button.appendChild(img);
        button.appendChild(span);

        $(button).click(function (e) {
            e.preventDefault();
            changeBanner(button.value);
        });
        bannerElem.appendChild(button);

        hiddenFaction.hidden = true;
        hiddenFaction.value = FACTIONS[banner.faction];
        bannerElem.appendChild(hiddenFaction);

        bannerList.push({ f: banner.faction, domElem: bannerElem });
    });
    bannerList.sort((a, b) => FACTIONS[a.f] > FACTIONS[b.f] ? 1 : -1)
    bannerList.forEach(elem => {
        $('.banner-list').append(elem.domElem)
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