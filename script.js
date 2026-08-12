const list = document.getElementById("ringtone-list");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");

let files = [];
let audio = null;


/*
    These are the ONLY ringtone files that belong
    to this project.

    We deliberately keep the list explicit so that
    random WAV files can never appear on the website.
*/

const ringtoneFiles = [
    "01-Synthwave-Lead.wav",
    "02-Marimba-Bounce.wav",
    "03-Vibraphone-Call.wav",
    "04-Electric-Guitar.wav",
    "05-Organ-Pulse.wav",
    "06-Flute-Morning.wav",
    "07-Brass-Signal.wav",
    "08-Warm-Strings.wav",
    "09-Bassline-Alert.wav",
    "10-Harp-Cascade.wav",
    "11-Saxophone.wav",
    "12-Celesta.wav",
    "13-Oboe.wav",
    "14-Synth-Brass.wav",
    "15-Final-Bell.wav"
];


function displayName(filename) {

    return filename
        .replace(/\.wav$/i, "")
        .replace(/^\d+-/, "")
        .replace(/-/g, " ");
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


        const url =
            "WAV/" +
            encodeURIComponent(filename);


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
                    download="${filename}">
                    Download
                </a>

            </div>
        `;


        const preview =
            row.querySelector("button");


        preview.addEventListener("click", () => {

            if (audio) {

                audio.pause();

                audio.currentTime = 0;
            }


            audio =
                new Audio(url);


            audio.play().catch(error => {

                console.error(
                    "Unable to play ringtone:",
                    error
                );

            });

        });


        list.appendChild(row);

    });

}


function searchRingtones() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    const filtered =
        files.filter(filename =>
            displayName(filename)
                .toLowerCase()
                .includes(query)
        );


    render(filtered);
}


searchInput.addEventListener(
    "input",
    searchRingtones
);

searchButton.addEventListener(
    "click",
    searchRingtones
);


files = ringtoneFiles;

render(files);
