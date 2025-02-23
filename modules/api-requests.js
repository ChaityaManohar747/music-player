function decodeHTMLentities(string) {
    var txt = document.createElement("textarea");
    txt.innerHTML = string;
    return txt.value;
}

function decodeJsonHTMLentities(json_object) {
    let json_string = JSON.stringify(json_object);
    let new_string = json_string.replace(/&quot;/g, `\\\"`)
    let decoded_string = decodeHTMLentities(new_string);
    return JSON.parse(decoded_string);
}

async function fetchJSON(url) {
    try {
        let obj = await (await fetch(url)).json();
        if (obj.status === 'FAILED') { throw obj.message };
        return decodeJsonHTMLentities(obj.data);
    }
    catch(e) {
        console.error("API request failed: " + e);
    }
}

// fetches homepage data
// contains the following attributes: albums, charts, playlist and trending
async function fetchHomepage(language = 'hindi, english') {
    let url = 'https://saavn.me/modules?language=' + language;
    return await fetchJSON(url);
}

async function fetchSongDetails(song_id) {
    let url = 'https://saavn.me/songs?id=' + song_id;
    return (await fetchJSON(url))[0];
}

async function fetchPlaylistDetails(playlist_id) {
    let url = 'https://saavn.me/playlists?id=' + playlist_id;
    return await fetchJSON(url);
}

async function fetchAlbumDetails(album_id) {
    let url = 'https://saavn.me/albums?id=' + album_id;
    return await fetchJSON(url);
}

export { fetchHomepage, fetchSongDetails, fetchPlaylistDetails, fetchAlbumDetails };
