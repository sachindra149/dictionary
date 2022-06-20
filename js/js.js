let arr = [
    "vexillology",
    "volplane",
    "inamorata",
    "zooid",
    "churrasco",
    "cygnet",
    "hokum",
    "rathskeller",
    "stravage",
    "hypnopedia",
    "pagoda",
    "caterwaul",
    "poached",
    "plummy",
    "Saturnian",
    "sardonic",
    "teapoy",
    "guerdon",
    "euxinia",
    "paludal",
    "caoutchouc",
    "ultramafic",
    "rebec",
    "uxorious",
    "ungainly",
    "uncouth",
    "unction",
    "tumuli",
    "tout",
    "tirade",
    "torpid",
    "temerity",
    "taciturn",
    "secession",
    "sardonic",
    "squabble",
    "soporific",
    "spurious",
    "sedentary",
    "renegade",
    "revulsion",
    "repudiate",
    "recalcitrant",
    "recidivism",
    "relegate",
    "refutation",
    "rebuke",
    "quip",
    "quietude",
    "quay",
    "quaff",
    "placid",
    "penitent",
    "paucity",
    "pacifist",
    "occult",
    "obloquy",
    "occlude",
    "obdurate",
    "obeisance",
    "obdurate",
    "necromancy",
    "noxious",
    "nascent",
    "nimble",
    "nadir",
    "narcissist",
    "nebulous",
    "mollify",
    "maverick",
    "macabre",
    "malestrom",
    "maul",
    "mellifluous",
    "meticulous",
    "mundane",
    "maculate",
    "malice",
    "malaise",
    "languid",
    "levee",
    "laconic",
    "labile",
    "knell",
    "knoll",
    "knead",
    "klazomania",
    "kleptomania",
    "kennel",
    "jocular",
    "jeer",
    "jinx",
    "jejune",
    "jettison",
    "jaded",
    "jovial",
    "juxtapose",
    "jest",
    "irreverent",
    "impunity",
    "ineffable",
    "impromptu",
    "imbroglio",
    "impasse",
    "hiatus",
    "hackneyed",
    "herculean",
    "halcyon",
    "hyperbole",
    "hysteric",
    "hearsay",
    "heave",
    "hermetic",
    "harangue",
    "hapless",
    "glut",
    "giddy",
    "glean",
    "garish",
    "genteel",
    "gullible",
    "genial",
    "galvanize",
    "glum",
    "germane",
    "gird",
    "gamut",
    "fidelity",
    "forfeit",
    "frolic",
    "fluster",
    "finicky",
    "foible",
    "fatuous",
    "fallible",
    "feign",
    "efface",
    "emancipate",
    "exhort",
    "entice",
    "elude",
    "enunciate",
    "dispel",
    "didactic",
    "dearth",
    "doleful",
    "disinter",
    "diaboloical",
    "chimera",
    "acumen",
];

if (document.getElementById("word-of-the-day")) {
    let wordoftheday = arr[Math.ceil(Math.random() * (arr.length - 1))];
    let parent = document.getElementById("word-of-the-day");
    parent.children[1].innerText = wordoftheday;
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + wordoftheday)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let updatedDOM = [];
            for (let i = 0; i < data[0].meanings.length; i++) {
                updatedDOM.push(
                    "<h4>" + data[0].meanings[i].partOfSpeech + "</h4><ul>"
                );
                for (
                    let j = 0;
                    j < data[0].meanings[i].definitions.length;
                    j++
                ) {
                    updatedDOM.push(
                        "<li>" +
                            data[0].meanings[i].definitions[j].definition +
                            "</li>"
                    );
                }
                updatedDOM.push("</ul>");
            }
            document.getElementById("word-meanings").innerHTML =
                updatedDOM.join(" ");
        });
}

function validateForm() {
    let searchText = document.forms["SearchForm"]["searchText"].value;
    let wordMeaningDOM = [];
    let randomNumber = new Date().getTime();
    if (searchText.length > 0) {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + searchText)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                wordMeaningDOM.push(
                    "<div class='p-3' id='" +
                        randomNumber +
                        "-items'><h3>" +
                        searchText +
                        "</h3>"
                );
                for (let i = 0; i < data[0].meanings.length; i++) {
                    wordMeaningDOM.push(
                        "<h4>" + data[0].meanings[i].partOfSpeech + "</h4><ul>"
                    );
                    for (
                        let j = 0;
                        j < data[0].meanings[i].definitions.length;
                        j++
                    ) {
                        wordMeaningDOM.push(
                            "<li>" +
                                data[0].meanings[i].definitions[j].definition +
                                "</li>"
                        );
                    }
                    wordMeaningDOM.push("</ul>");
                }
                localStorage.setItem(randomNumber, wordMeaningDOM);
                document.getElementById("word-meaning").innerHTML =
                    wordMeaningDOM.join(" ");
            });

        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': 'ceacefbd48msh639564c6a77b084p16fb66jsnbcc34fdc78ae',
        //         'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        //     }
        // };

        // fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err));
    }
    document.forms["SearchForm"]["searchText"].value = "";
    return false;
}

if (document.getElementById("list-items") && localStorage.length > 0) {
    let listItems = document.getElementById("list-items");
    let localArray = Object.entries(localStorage);
    let ListItemsDOM = [];
    for (let i = 0; i < localArray.length; i++) {
        ListItemsDOM.push(
            "<div class='list-items' id='" +
                localArray[i][0] +
                "'>" +
                localArray[i][1] +
                "</div></div>"
        );
    }
    document.getElementById("list-items").innerHTML = ListItemsDOM.toString()
        .split(",")
        .join(" ");
}
