const DATA_VERSION = "0.1";

window.addEventListener('load', main);

function main() {
    const textDiv = document.querySelector('#text');
    const input = document.querySelector('#word');

    loadData((data) => {
        const word = input.value;
        textDiv.innerHTML = word === '' ? randomSentence(data) : sentenceWith(word, data);

    });
}

const getPart = (data, part) => data[part][getRand(0, data[part].length - 1)].text;
const randomSentence = (data) => `${getPart(data, 0)} ${getPart(data, 1)} ${getPart(data, 2)} ${getPart(data, 3)} ${getPart(data, 4)} ${getPart(data, 5)}`
const getRand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

async function loadData(callback) {
    let data = JSON.parse(window.localStorage.getItem('korwinSpeechData'));
    if (!data || data.version !== DATA_VERSION) {
        const resp = await fetch("./source/data.json");
        data = await resp.json();
        window.localStorage.setItem('korwinSpeechData', JSON.stringify(data));
        console.log("loaded from the web");
    }
    return callback(data);
}


function sentenceWith(word = "", data) {
    if (word === "") return randomSentence(data);

    let register = [];
    for (const column in data) {
        if (column === "version") continue;
        data[column].forEach(({ text }, index) => {
            if (text.includes(word)) {
                register.push({ col: Number(column), index: index });
            }
        });
    }

    function generate(cord = null, result, i = 0) {
        if (i <= 5) {
            const arr = cord.filter(obj => i === obj.col);
            if (arr.length === 0) {
                result.push(data[i][getRand(0, data[i].length - 1)].text);
            } else {
                result.push(data[i][arr[0].index].text);
            }
            generate(cord, result, i + 1);
        }
    }

    const result = [];
    generate(register, result)
    return result.join(' ');
}

// ============ handling disclaimer ================
window.addEventListener('load', () => {
    let info = document.querySelector('.info');

    if (!window.localStorage.getItem('disclaimer')) {
        setTimeout(() => handleDisclaimer(info), 2000);
        window.localStorage.setItem('disclaimer', 'true');
    }
})

function handleDisclaimer(info) {
    let disclaimerStyle = document.querySelector('.disclaimer').style;
    const opacity = disclaimerStyle.opacity;

    disclaimerStyle.opacity = (opacity == "1") ? '0' : '1';
    info.style.backgroundColor = (opacity == '1') ? "var(--main)" : "var(--accent)";
}