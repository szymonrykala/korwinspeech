const DATA_VERSION = "0.1";

window.addEventListener('load', main);

function main() {
    const textDiv = document.querySelector('#text');

    loadData((data) => {
        const sentenceData = getRandomText(data);
        let sentence = '';
        sentenceData.forEach(text => sentence += ` ${text.text}`);
        
        textDiv.innerHTML = sentence;
    });
}

async function loadData(callback) {
    let data = JSON.parse(window.localStorage.getItem('korwinSpeechData'));
    if (!data || data.version !== DATA_VERSION) {
        const resp = await fetch("./data.json");
        data = await resp.json();
        window.localStorage.setItem('korwinSpeechData', JSON.stringify(data));
        console.log("loaded from the web");
    }
    
    return callback(data);
}

function getRandomText(data) {
    const getPart = (data, part) => data[part][getRand(0, data[part].length-1)];

    const sentence = [
        getPart(data, 0),
        getPart(data, 1),
        getPart(data, 2),
        getPart(data, 3),
        getPart(data, 4),
        getPart(data, 5)
    ];
    return sentence;
}

function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}