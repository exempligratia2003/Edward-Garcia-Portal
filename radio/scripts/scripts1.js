let linkedFavicon = "assets/favicon.svg";

linkedFavicon = document.createElement("link");
linkedFavicon.rel = "icon";
linkedFavicon.type = "image/svg+xml";
linkedFavicon.href = "assets/favicon.svg";
document.head.appendChild(linkedFavicon);

let linkedStylesheets = [
    "styles/styles1.css",
    "styles/fonts.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
];

linkedStylesheets.forEach(stylesheet => {
    let linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = stylesheet;
    document.head.appendChild(linkElement);
},);

function dropDownMenu() {
    var x = document.getElementById("myNavBar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

const spotifyLatestRelease = document.querySelector('#spotify-embed-latest-releases');
fetch('./scripts/spotify-latest-releases.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
            spotifyLatestRelease.insertAdjacentHTML('beforeend', `
                <div class="column-no-margin">
                    <iframe
                        data-testid="embed-iframe"
                        style="border-radius:12px"
                        src="https://open.spotify.com/embed/track/${post.lr_spotify_id}"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowfullscreen=""
                        allow="autoplay;
                        clipboard-write;
                        encrypted-media;
                        fullscreen;
                        picture-in-picture"
                        loading="lazy">
                    </iframe>
                </div>`
            );
        });
    });

const spotifyAlbums = document.querySelector('#spotify-embed-albums');
fetch('./scripts/spotify-albums.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
            spotifyAlbums.insertAdjacentHTML('beforeend', `
                <div class="column-no-margin-s-album">
                    <iframe
                        data-testid="embed-iframe"
                        style="border-radius:12px"
                        src="https://open.spotify.com/embed/album/${post.al_spotify_id}"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowfullscreen=""
                        allow="autoplay;
                        clipboard-write;
                        encrypted-media;
                        fullscreen;
                        picture-in-picture"
                        loading="lazy">
                    </iframe>
                </div>`
            );
        });
    });

const spotifyPlaylists = document.querySelector('#spotify-embed-playlists');
fetch('./scripts/spotify-playlists.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
            spotifyPlaylists.insertAdjacentHTML('beforeend', `
                <div class="column-no-margin-s-playlist">
                    <iframe
                        data-testid="embed-iframe"
                        style="border-radius:12px"
                        src="https://open.spotify.com/embed/playlist/${post.pl_spotify_id}"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowfullscreen=""
                        allow="autoplay;
                        clipboard-write;
                        encrypted-media;
                        fullscreen;
                        picture-in-picture"
                        loading="lazy">
                    </iframe>
                </div>`
            );
        });
    });

const youtubeVideos = document.querySelector('#youtube-embed');
fetch('./scripts/youtube-videos.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
            youtubeVideos.insertAdjacentHTML('beforeend', `
                <div class="column-no-margin-y-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/${post.youtube_id}"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                    </iframe>
                </div>`
            );
        });
    });

function openPatreon() {
    window.open('https://www.patreon.com/exempligratia2003/membership', '_blank')
}

let footerContent = document.getElementById("footerContent");
footerContent.innerHTML = `
<p>&copy; 2025 Edward Garcia Radio. All rights reserved.</p>
<p>Where do you wanna go now?</p>
<p><a href="#">Radio</a> | <a href="#">TV</a></p>
`