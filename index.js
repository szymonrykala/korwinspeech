window.addEventListener('load', main);

function main() {
    const textDiv = document.querySelector('#text');

    loadData((data) => {
        // console.log(data);

        const sentenceData = getRandomText(data);
        let sentence = '';

        sentenceData.forEach(text => sentence += ` ${text.text}`);
        // console.log(sentence, sentenceData);
        textDiv.innerHTML = sentence;
    });
}

async function loadData(callback) {
    const resp = await fetch("./data.json");
    const data = await resp.json();
    return callback(data);
}

function getRandomText(data) {
    // think the bug is here 
    const getPart = (data, part) => data[part][getRand(0, data[part].length)];
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