function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}

var spells = {
  magic_missile: {
    damage: 4,
    turns: 1,
    cost: 53
  },
  drain: {
    damage: 2,
    turns: 1,
    cost: 73,
    heal: 2
  },
  shield: {
    turns: 6,
    cost: 113,
    armor: 7
  },
  poison: {
    damage: 3,
    turns: 6,
    cost: 173
  },
  recharge: {
    turns: 5,
    cost: 229,
    mana: 101
  }
}

var spellsNames = ["magic_missile", "drain", "shield", "poison", "recharge"];

function cleanActiveSpells(gameState) {
  Object.keys(gameState.activeSpells).forEach(function(activeSpellKey) {
    var activeSpellParams = gameState.activeSpells[activeSpellKey];

    if(activeSpellParams === undefined) {
      return;
    }

    if(activeSpellParams.turns === 0) {
      gameState.player.armor = 0;
      gameState.activeSpells[activeSpellKey] = undefined;
    }
  });
}

function castActiveSpells(gameState) {
  Object.keys(gameState.activeSpells).forEach(function(activeSpellKey) {
    var activeSpellParams = gameState.activeSpells[activeSpellKey];

    if(activeSpellParams === undefined) {
      return;
    }

    if(activeSpellParams.turns === 0) {
      gameState.armor = 0;

      gameState.activeSpells[activeSpellKey] = undefined;
    } else {
      castSpell(gameState, activeSpellParams);
      activeSpellParams.turns--;
    }
  });
}

function castSpell(gameState, spellParams) {
  Object.keys(spellParams).forEach(function(param) {
    switch(param) {
      case "damage":
        gameState.boss.hit_points -= spellParams.damage;
        break;
      case "heal":
        gameState.player.hit_points += spellParams.heal;
        break;
      case "mana":
        gameState.player.mana_points += spellParams.mana;
        // console.log("Recharge " + spellParams.mana + " timer: " + (spellParams.turns - 1))
        break;
      case "armor":
        gameState.player.armor = spellParams.armor;
        // console.log("Shield " + spellParams.armor + " timer: " + (spellParams.turns - 1))
        break;
    }
  });
}

function makeTurn(gs, castedSpell) {
  var gameState = deepClone(gs);

  // player turn
  // console.log("\nPlayer turn");
  // console.log(player);
  // console.log(boss);
  // console.log("Player casted " + spellsNames[castedSpell]);
  var spellParams = spells[spellsNames[castedSpell]];

  gameState.player.hit_points -= 1;
  if(gameState.player.hit_points <= 0) {
    gameState.status = "lost";
    return gameState;
  }

  gameState.player.mana_points -= spellParams.cost;

  castActiveSpells(gameState);

  if(gameState.boss.hit_points <= 0) {
    gameState.status = "win";
    return deepClone(gameState);
  }

  if(spellParams.turns === 1) {
    castSpell(gameState, spellParams);
  } else {
    gameState.activeSpells[castedSpell] = deepClone(spellParams);
  }

  cleanActiveSpells(gameState)

  if(gameState.boss.hit_points <= 0) {
    gameState.status = "win";
    return deepClone(gameState);
  }
  // boss turn
  castActiveSpells(gameState);

  // player's spells on bosses turn
  // console.log("\nBoss turn")
  // console.log(player)
  // console.log(boss)

  if(gameState.boss.hit_points <= 0) {
    gameState.status = "win";
    return deepClone(gameState);
  }

  var bossDamage = (gameState.boss.damage - gameState.player.armor) > 0 ? (gameState.boss.damage - gameState.player.armor) : 1;

  gameState.player.hit_points -= bossDamage;

  if(gameState.player.hit_points <= 0) {
    gameState.status = "lost";
    return gameState;
  }

  cleanActiveSpells(gameState);

  return gameState;
}

function countMana(play) {
  var result = 0
  play.split("").forEach(function (castedSpell) {
    var spellParams = spells[spellsNames[castedSpell]]
    result += spellParams.cost;
  })

  return result;
}

function generateNextSolutions(key) {
  // console.log(key)
  var currentState = gameStates[key];

  // console.log(currentState)

  for(var i = 0; i < spellsNames.length; i++) {
    var spellParams = spells[spellsNames[i]];
    var playersMana = currentState.player.mana_points;

    if(currentState.activeSpells[4]) {
      playersMana += currentState.activeSpells[4].mana;
    }

    var spellToCast = currentState.activeSpells[i];
    if((!spellToCast || (spellToCast && spellToCast.turns === 1)) && playersMana > spellParams.cost) {
      pendingPlays.push(key + i.toString());
    }
  }
}

var pendingPlays = [];
var gameStates = {};

var initialState = {
  // boss: {
  //   hit_points: 14,
  //   damage: 8
  // },
  // player: {
  //   hit_points: 10,
  //   mana_points: 250,
  //   armor: 0
  // },
  boss: {
    hit_points: 51,
    damage: 9
  },
  player: {
    hit_points: 50,
    mana_points: 500,
    armor: 0
  },
  status: "pending",
  activeSpells: {}
}

// generate initial states
for(var i = 0; i < spellsNames.length; i++) {
  pendingPlays.push(i.toString());
}

var winningPlays = [];

var numberOfIteration = 0;

// var spellsNames = ["magic_missile", "drain", "shield", "poison", "recharge"];
// pendingPlays = ["4", "42", "421", "4213", "42130"]
// pendingPlays = ["3", "30"]

while(pendingPlays.length > 0) {
  numberOfIteration += 1;

  var currentPlay = pendingPlays.shift();

  // console.log(currentPlay)

  var prevPlay = currentPlay.slice(0, currentPlay.length - 1);
  var castedSpell = currentPlay[currentPlay.length - 1];

  var prevState = gameStates[prevPlay] ? deepClone(gameStates[prevPlay]) : deepClone(initialState);

  // console.log(prevState)

  var currentPlayState = makeTurn(prevState, castedSpell);

  // console.log("CURR PLAY STATE")
  // console.log(currentPlayState)

  if(currentPlayState.status === "pending") {
    gameStates[currentPlay] = currentPlayState;
    generateNextSolutions(currentPlay);
  } else if (currentPlayState.status === "win") {
    gameStates[currentPlay] = deepClone(currentPlayState);
    winningPlays.push(currentPlay);
    // console.log("win: " + currentPlay);
    var mana = countMana(currentPlay);
    console.log(countMana(currentPlay));
  } else if (currentPlayState.status === "lost") {
    gameStates[currentPlay] = deepClone(currentPlayState);
    // console.log("lost: " + currentPlay);
  }

  if(numberOfIteration % 1000 === 0) {
    // console.log(numberOfIteration);
  }
}

var winningManaSpents = winningPlays.map(function (play) {
  return countMana(play);
}).sort(function (a, b) {
  return a - b;
})

// console.log(pendingPlays)
console.log(winningManaSpents[0]);

function printPlay(play) {
  console.log(initialState)

  for(var i = 1; i <= play.length; i++) {
    console.log("\nplayer casts " + spellsNames[play[i-1]] + "\n")
    console.log(gameStates[play.slice(0, i)]);
  }
}

// printPlay("42130")
// 900 too low
// 1242 too high
// 1216 too high
