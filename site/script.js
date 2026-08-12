const ringtones = [
    ["Synthwave Lead", "01-Synthwave-Lead"],
    ["Marimba Bounce", "02-Marimba-Bounce"],
    ["Vibraphone Call", "03-Vibraphone-Call"],
    ["Electric Guitar", "04-Electric-Guitar"],
    ["Organ Pulse", "05-Organ-Pulse"],
    ["Flute Morning", "06-Flute-Morning"],
    ["Brass Signal", "07-Brass-Signal"],
    ["Warm Strings", "08-Warm-Strings"],
    ["Bassline Alert", "09-Bassline-Alert"],
    ["Harp Cascade", "10-Harp-Cascade"],
    ["Saxophone", "11-Saxophone"],
    ["Celesta", "12-Celesta"],
    ["Oboe", "13-Oboe"],
    ["Synth Brass", "14-Synth-Brass"],
    ["Final Bell", "15-Final-Bell"]
];

const list = document.getElementById("ringtone-list");

let currentFilter = "all";

function render(items = ringtones) {

    list.innerHTML = "";

    items.forEach((ringtone, index) => {

        const name = ringtone[0];
        const file = ringtone[1];

        const card = document.createElement("div");

        card.className = "ringtone";

        card.dataset.name = name.toLowerCase();

        card.innerHTML = `
            <div class="ringtone-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="ringtone-icon">
                ♪
            </div>

            <div class="ringtone-name">
                ${name}
            </div>

            <div class="ringtone-format">
                Original ringtone
            </div>

            <div class="ringtone-actions">

                <button
                    class="preview"
                    onclick="previewRingtone()">
                    Preview
                </button>

                <a
                    href="../WAV/${file}.wav"
                    download>
                    WAV
                </a>

                <a
                    href="../MIDI/${file}.mid"
                    download>
                    MIDI
                </a>

            </div>
        `;

        list.appendChild(card);
    });
}

let audio = null;

function previewRingtone(file) {

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    audio = new Audio(`../WAV/${file}.wav`);

    audio.play().catch(() => {
        console.log("Audio playback was blocked.");
    });
}

function searchRingtones() {

    const query =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();

    const results =
        ringtones.filter(ringtone =>
            ringtone[0]
                .toLowerCase()
                .includes(query)
        );

    render(results);
}

function showAll() {

    currentFilter = "all";

    document.getElementById("search").value = "";

    render(ringtones);
}

function filterFormat(format) {

    currentFilter = format;

    const items =
        ringtones.filter(() => true);

    render(items);
}

render();
