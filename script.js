class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}

let players = [];

function randomizer() {
    return Math.random() > 0.5;
}

function startRound(playerList, attempts = 5) {
    playerList.forEach(player => {
        player.score = 0;
        for (let i = 0; i < attempts; i++) {
            if (randomizer()) {
                player.score++;
            }
        }
    });
}

function displayRankings(playerList, roundTitle = "Rankings") {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML += `<h2>${roundTitle}</h2>`;
    playerList.forEach((player, index) => {
        resultsDiv.innerHTML += `${index + 1}. ${player.name} - ${player.score} points<br>`;
    });
}

function handleGameResult(playerList, round = 1) {
    playerList.sort((a, b) => b.score - a.score);
    let highestScore = playerList[0].score;
    let tiedPlayers = playerList.filter(player => player.score === highestScore);

    if (tiedPlayers.length === 1) {
        document.getElementById("results").innerHTML += `<h3>🏆 The champion is ${tiedPlayers[0].name} with ${tiedPlayers[0].score} points!</h3>`;
        return;
    }

    document.getElementById("results").innerHTML += `<h3>🔥 Tie-breaker Round ${round} ${tiedPlayers.map(p => p.name).join(", ")}</h3>`;
    startRound(tiedPlayers, 3);
    displayRankings(tiedPlayers, `Tie-Breaker Round ${round} Results`);
    handleGameResult(tiedPlayers, round + 1);
}


document.getElementById("addPlayerBtn").addEventListener("click", () => {
    const playerName = document.getElementById("playerName").value;
    if (playerName.trim()) {
        players.push(new Player(playerName));
        document.getElementById("playerList").innerHTML += `<p>${playerName}</p>`;
        document.getElementById("playerName").value = '';
    } else {
        alert("Please enter the player's name.");
    }
});

document.getElementById("playBtn").addEventListener("click", () => {
    if (players.length > 1) {
        document.getElementById("results").innerHTML = '';
        startRound(players);
        players.sort((a, b) => b.score - a.score);
        displayRankings(players);
        handleGameResult(players);
    } else {
        alert("Add at least two players to start the game.");
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    players = [];
    document.getElementById("playerList").innerHTML = '';
    document.getElementById("results").innerHTML = '';
});
