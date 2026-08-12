const ringtones = [
["01-Synthwave-Lead.wav","Synthwave Lead"],
["02-Marimba-Bounce.wav","Marimba Bounce"],
["03-Vibraphone-Call.wav","Vibraphone Call"],
["04-Electric-Guitar.wav","Electric Guitar"],
["05-Organ-Pulse.wav","Organ Pulse"],
["06-Flute-Morning.wav","Flute Morning"],
["07-Brass-Signal.wav","Brass Signal"],
["08-Warm-Strings.wav","Warm Strings"],
["09-Bassline-Alert.wav","Bassline Alert"],
["10-Harp-Cascade.wav","Harp Cascade"],
["11-Saxophone.wav","Saxophone"],
["12-Celesta.wav","Celesta"],
["13-Oboe.wav","Oboe"],
["14-Synth-Brass.wav","Synth Brass"],
["15-Final-Bell.wav","Final Bell"]
];

const list=document.getElementById("ringtone-list");
let currentAudio=null;

ringtones.forEach((item,i)=>{
  const file=item[0];
  const name=item[1];
  const url="WAV/"+encodeURIComponent(file);

  const row=document.createElement("div");
  row.className="ringtone";

  const num=document.createElement("div");
  num.className="num";
  num.textContent=String(i+1).padStart(2,"0");

  const info=document.createElement("div");
  info.className="info";

  const title=document.createElement("div");
  title.className="name";
  title.textContent=name;

  const desc=document.createElement("div");
  desc.className="desc";
  desc.textContent="Original ringtone • WAV";

  info.appendChild(title);
  info.appendChild(desc);

  const buttons=document.createElement("div");
  buttons.className="buttons";

  const preview=document.createElement("button");
  preview.textContent="Preview";

  preview.onclick=()=>{
    if(currentAudio){
      currentAudio.pause();
      currentAudio.currentTime=0;
    }
    currentAudio=new Audio(url);
    currentAudio.play().catch(console.error);
  };

  const download=document.createElement("a");
  download.className="download";
  download.href=url;
  download.download=file;
  download.textContent="Download";

  buttons.appendChild(preview);
  buttons.appendChild(download);

  row.appendChild(num);
  row.appendChild(info);
  row.appendChild(buttons);

  list.appendChild(row);
});
