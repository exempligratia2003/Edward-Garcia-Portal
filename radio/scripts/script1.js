document.addEventListener('DOMContentLoaded', () => {
    // toggle menu function (keeps previous behavior)
    window.toggleMenu = function () {
        document.getElementById('nav-menu').classList.toggle('show');
    };

    // load JSON and render
    fetch('scripts/home-lists.json')
        .then(resp => {
            if (!resp.ok) throw new Error(`HTTP ${resp.status} while fetching JSON`);
            return resp.json();
        })
        .then(data => {
            if (data.latest_releases) renderSpotifyEmbeds('latest_releases', data.latest_releases);
            if (data.playlists) renderSpotifyEmbeds('playlists', data.playlists);
            if (data.albums) renderSpotifyEmbeds('albums', data.albums);
            if (data.latest_videos) renderYouTubeEmbeds('latest_videos', data.latest_videos);
        })
        .catch(err => {
            console.error('Error loading JSON or rendering embeds:', err);
        });
});


// ---------- Utilities ---------- //

function spotifyEmbedFromUrl(url) {
    // handle common spotify URL formats and return embed url or null
    // examples:
    // https://open.spotify.com/track/<id>
    // https://open.spotify.com/album/<id>
    // https://open.spotify.com/playlist/<id>
    try {
        const u = new URL(url);
        if (!u.hostname.includes('spotify.com')) return null;

        // path like /track/<id> or /album/<id> or /playlist/<id>
        const parts = u.pathname.split('/').filter(Boolean);
        if (parts.length < 2) return null;

        const type = parts[0]; // track|album|playlist
        const id = parts[1].split('?')[0]; // remove query if present
        return `https://open.spotify.com/embed/${type}/${id}`;
    } catch (e) {
        console.warn('spotifyEmbedFromUrl: invalid url', url);
        return null;
    }
}

function youtubeEmbedFromUrl(url) {
    // supports:
    // https://www.youtube.com/watch?v=<id>
    // https://youtu.be/<id>
    // https://www.youtube.com/<id> (sometimes provided)
    try {
        const u = new URL(url);
        // watch?v= style
        if (u.searchParams.has('v')) {
            const id = u.searchParams.get('v').split('&')[0];
            return `https://www.youtube.com/embed/${id}`;
        }

        // youtu.be/<id>
        if (u.hostname === 'youtu.be') {
            const id = u.pathname.split('/').filter(Boolean)[0];
            return `https://www.youtube.com/embed/${id}`;
        }

        // path with id at the end: /<id> or /embed/<id>
        const parts = u.pathname.split('/').filter(Boolean);
        const id = parts.pop();
        if (id) return `https://www.youtube.com/embed/${id}`;

        return null;
    } catch (e) {
        console.warn('youtubeEmbedFromUrl: invalid url', url);
        return null;
    }
}


// ---------- Renderers ---------- //

function renderSpotifyEmbeds(containerId, items = []) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('renderSpotifyEmbeds: container not found', containerId);
        return;
    }
    container.innerHTML = '';

    items.forEach(item => {
        const embed = spotifyEmbedFromUrl(item.link);
        if (!embed) {
            console.warn('renderSpotifyEmbeds: could not convert', item.link);
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'embed-item';

        const iframe = document.createElement('iframe');
        iframe.src = embed;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
        iframe.loading = 'lazy';
        iframe.style.borderRadius = '12px';
        iframe.style.display = 'block';

        wrapper.appendChild(iframe);
        container.appendChild(wrapper);
    });
}


function renderYouTubeEmbeds(containerId, items = []) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('renderYouTubeEmbeds: container not found', containerId);
        return;
    }
    container.innerHTML = '';

    items.forEach(item => {
        const embed = youtubeEmbedFromUrl(item.link);
        if (!embed) {
            console.warn('renderYouTubeEmbeds: could not convert', item.link);
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'embed-item';

        const iframe = document.createElement('iframe');
        iframe.src = embed;
        iframe.width = '100%';            // responsive width; CSS can set max-width
        iframe.height = '315';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.loading = 'lazy';
        iframe.style.borderRadius = '12px';
        iframe.style.display = 'block';

        wrapper.appendChild(iframe);
        container.appendChild(wrapper);
    });
}
