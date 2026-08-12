const list = document.getElementById("ringtone-list");

let audio = null;

let files = [];


async function loadRingtones() {

    list.innerHTML =
        '<div class="loading">Loading ringtones...</div>';

    try {

        const response =
            await fetch("../WAV/");

        if (!response.ok) {
            throw new Error("WAV folder returned HTTP " + response.status);
        }

        const html =
            await response.text();

        const parser =
            new DOMParser();

        const documentHTML =
            parser.parseFromString(html, "text/html");

        files = [];

        documentHTML
            .querySelectorAll("a")
            .forEach(link => {

                const href =
                    link.getAttribute("href");

                if (!href) return;

                const decoded =
                    decodeURIComponent(href);

                if (
                    decoded
                        .toLowerCase()
                        .endsWith(".wav")
                ) {

                    files.push(
                        decoded
                            .split("/")
                            .pop()
                    );

                }

            });


        render(files);

    } catch (error) {

        console.error(error);

        list.innerHTML = `
            <div class="error">
                Could not read the WAV folder.<br>
                Make sure WAV/ exists and contains .wav files.
            </div>
        `;

    }

}


function displayName(filename) {

    return filename

        .replace(/\.[^/.]+$/, "")

        .replace(/[-_]+/g, " ")

        .replace(/^\d+\s*/, "")

        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );

}


function render(items) {

    list.innerHTML = "";

    if (items.length === 0) {

        list.innerHTML =
            '<div class="empty">No ringtones found.</div>';

        return;

    }


    items.forEach((filename, index) => {

        const row =
            document.createElement("div");

        row.className = "ringtone";


        const encoded =
            encodeURIComponent(filename);


        const url =
            "../WAV/" + encoded;


        row.innerHTML = `

            <div class="number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="ringtone-info">

                <div class="ringtone-name">
                    ${displayName(filename)}
                </div>

                <div class="ringtone-type">
                    WAV ringtone
                </div>

            </div>

            <div class="actions">

                <button type="button">
                    Preview
                </button>

                <a
                    href="${url}"
                    download>
                    Download
                </a>

            </div>

        `;


        const preview =
            row.querySelector("button");


        preview.onclick = () => {

            if (audio) {

                audio.pause();

                audio.currentTime = 0;

            }


            audio =
                new Audio(url);


            audio
                .play()
                .catch(error =>
                    console.error(error)
                );

        };


        list.appendChild(row);

    });

}


function searchRingtones() {

    const query =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();


    const filtered =
        files.filter(filename =>
            displayName(filename)
                .toLowerCase()
                .includes(query)
        );


    render(filtered);

}


loadRingtones();
