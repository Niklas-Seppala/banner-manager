'use strict'

let BANNERS;

$(document).ready(async function () {
    BANNERS = await getBannersAsync();
});

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

