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

function startRound(attempts = 5) {
    players.forEach(player => {
        player.score = 0;
        for (let i = 0; i < attempts; i++) {
            if (randomizer()) {
                player.score++;
            }
        }
    });
}

function rankingDisplay() {
    players.sort((a, b) => b.score - a.score);
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Rankings after this round:</h2>";
    
    players.forEach((player, index) => {
        resultsDiv.innerHTML += `${index + 1}. ${player.name} - ${player.score} points <br>`;
    });

    tieBreaker();
}

function tieBreaker(round = 1) {
    let highestScore = players[0].score;
    let tiedPlayers = players.filter(player => player.score === highestScore);

    if (tiedPlayers.length === 1) {
        document.getElementById("results").innerHTML += `<h3>The champion is ${tiedPlayers[0].name} with ${tiedPlayers[0].score} points!</h3>`;
        return;
    }

    let tiebreakerMessage = `Tie-breaker needed between: ${tiedPlayers.map(p => p.name).join(", ")}`;
    document.getElementById("results").innerHTML += `<h3>${tiebreakerMessage}</h3>`;
    startRound(3);
    rankingDisplay();
}

document.getElementById("addPlayerBtn").addEventListener("click", () => {
    const playerName = document.getElementById("playerName").value;
    
    if (playerName) {
        players.push(new Player(playerName));
        document.getElementById("playerList").innerHTML += `<p>${playerName}</p>`;
        document.getElementById("playerName").value = ''; 
    } else {
        alert("Please enter both the player's name.");
    }
});

document.getElementById("playBtn").addEventListener("click", () => {
    if (players.length > 0) {
        startRound();
        rankingDisplay();
    } else {
        alert("Please add players before starting a round.");
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    players = [];
    document.getElementById("playerList").innerHTML = '';
    document.getElementById("results").innerHTML = '';
});