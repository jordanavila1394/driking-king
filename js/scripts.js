//Creare uno stack di carte
//pescare una carta quando click draw
//aggiornare UI.

var deck;
deck = {
  cards: [],
  length: 0,
  generateDeck: function () {
    var code = 0;
    for (var i = 1; i <= 13; i++) {
      for (var j = 1; j <= 4; j++) {
        var card = {
          id: "",
          code: "",
          seed: "",
          seedN: "",
          number: "",
          createCard: function (number, seedN) {
            this.number = number;
            this.seedN = seedN;
            var seedChar = "";
            switch (seedN) {
              case 1:
                seedChar = "D";
                break;
              case 2:
                seedChar = "C";
                break;
              case 3:
                seedChar = "H";
                break;
              case 4:
                seedChar = "S";
                break;
            }
            this.seed = seedChar;
            this.id = this.number + this.seed;
            this.code = code;
            console.log(
              "%c Card " + this.id + " was created!",
              "background-color: yellow;color: #eb4d4d"
            );

            code++;
          },
        };
        card.createCard(i, j);
        this.cards.push(card);
      }
    }
    this.length = this.cards.length;
  },
  shuffleCards: function () {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  },
  pickCard: function () {
    var cardPicked = this.cards[Math.floor(Math.random() * this.cards.length)];
    var index = this.cards.indexOf(cardPicked);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
    this.length = this.cards.length;
    console.log(
      "%c We have " + this.cards.length + " cards !",
      "background-color: yellow;color: #green"
    );

    return cardPicked;
  },
};

init();
var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.querySelector("#img-card-back").addEventListener("click", function () {
  card.classList.toggle("is-flipped");

  playSound();
  if (deck.length > 0) {
    var cardPicked = deck.pickCard();
    console.log(
      "%c Card Picked " + cardPicked.id + "!",
      "background-color: #94fc09;color: #red"
    );
    document.querySelector("#img-card").src =
      "assets/cards/" + cardPicked.id + ".png";
    document.querySelector(".rule-container").style.display = "block";
    modal.style.display = "block";

    ruleGenerator(cardPicked);
    document.getElementById("counter-cards").textContent = deck.length;
  }
});

function init() {
  deck.generateDeck();
  console.log("deck lengh init " + deck.length);
  document.getElementById("counter-cards").textContent = deck.length;
}
function ruleGenerator(cardPicked) {
  var ruleTitle = "";
  var ruleText = "";
  var cardNumber = cardPicked.number;
  switch (cardNumber) {
    case 1:
      ruleTitle = "Ace";
      ruleText =
        "Cascata: per eseguire una cascata, ogni giocatore inizia a bere il proprio drink contemporaneamente alla persona alla sua sinistra. Nessun giocatore può smettere di bere fino a quando il giocatore prima di lui smette.";
      break;
    case 2:
      ruleTitle = "Two for you";
      ruleText =
        "Scegli un giocatore. Questo giocatore beve 2 sorsi. Oppure scegli 2 giocatori e ognuno di questi giocatori deve prendere 1 sorso.";
      break;
    case 3:
      ruleTitle = "Three for me";
      ruleText = "Se scegli questa carta, bevi 1 sorso!";
      break;
    case 4:
      ruleTitle = "Hit the floor";
      ruleText =
        "L'ultima persona che tocca il pavimento con le mani deve bere.";
      break;
    case 5:
      ruleTitle = "Five's Guys";
      ruleText = "Tutti gli uomini che giocano bevono qualcosa.";
      break;
    case 6:
      ruleTitle = "Six's chicks	";
      ruleText = "Tutte le donne che giocano bevono qualcosa.";
      break;
    case 7:
      ruleTitle = "Heaven";
      ruleText = "L'ultima persona che alza la mano deve bere.";
      break;
    case 8:
      ruleTitle = "Mate";
      ruleText =
        "Il giocatore che ha pescato la carta sceglie un altro giocatore che deve bere insieme a lui.";
      break;
    case 9:
      ruleTitle = "Rhyme Time";
      ruleText =
        "Il giocatore che ha pescato la carta dice una parola, con i giocatori che vanno in senso orario dicendo parole che fanno rima con l'originale. La prima persona che non riesce a trovare una parola in rima che non è stata usata deve bere.";
      break;
    case 10:
      ruleTitle = "Categories";
      ruleText =
        "Il giocatore che ha pescato la carta sceglie una categoria, con i giocatori che vanno in senso orario per nominare le cose che rientrano nella categoria. La prima persona che non riesce a inventare qualcosa che non è stato detto deve bere.";
      break;
    case 11:
      ruleTitle = "Social";
      ruleText = "Tutti devono bere.";
      break;
    case 12:
      ruleTitle = "Never have I ever ";
      ruleText =
        'Il giocatore che ha pescato la carta inizia a fare 3 affermazioni a tutti i giocatori. Il giocatore deve enunciare un\'affermazione che cominci con "Non ho mai". Tutti i giocatori che hanno fatto ciò che il giocatore enuncia con la frase "non ha mai fatto" devono bere, e se nessuno beve il giocatore che ha enunciato la frase deve bere lui stesso. Una regola comune afferma che, nel caso in cui una sola persona beva in seguito alla frase enunciata, tale persona deve spiegare dettagliamente il motivo per cui beve.';
      break;
    case 13:
      ruleTitle = "King's Cup";
      ruleText =
        "Il giocatore che ha pescato la carta beve la coppa del Re'; che puo' essere un bicchiere pieno di un drink oppure uno shoot di un superalcolico.";
      break;
  }
  document.getElementById("rule-title").textContent = ruleTitle;
  document.getElementById("rule-text").textContent = ruleText;
}
var card = document.querySelector(".card");
card.addEventListener("click", function () {});
document.querySelector("#img-card").addEventListener("click", function () {
  document.querySelector(".rule-container").style.display = "none";
  card.classList.toggle("is-flipped");
  playSound();
  if (deck.length == 0) {
    init();
  }
});

var sound = new Audio(); // create the audio
sound.src = "assets/sounds/flip-effect.mp3"; // set the resource location
sound.oncanplaythrough = function () {
  // When the sound has completely loaded
  sound.readyToRock = true; // flag sound is ready to play
  // I just made it up and can be anything
};

function playSound() {
  if (sound && sound.readyToRock) {
    // check for the sound and if it has loaded
    sound.currentTime = 0; // seek to the start
    sound.play(); // play it till it ends
  }
}
