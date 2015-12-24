function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
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
var spellsCombos = [];

// http://rosettacode.org/wiki/Combinations_with_repetitions#JavaScript
function permutations_with_repetitions (array, length) {
  if(array.length === 0 || length === 0) {
    return [[]];
  }

  var res = [];

  array.forEach(function (el) {
    var subArrays = permutations_with_repetitions(array, length - 1);

    var result = subArrays.forEach(function (subArray) {
      subArray.unshift(el)
      res.push(subArray);
    })
  })

  return res;
}



var maxPlayerTurns = Math.floor(50 / (9 - 7));
// 50 - player hit points
// 9 - boss damage
// 7 – max armor player could have
var minTurns = 10

for(var i = minTurns; i <= minTurns; i++) {
  spellsCombos.concat(permutations_with_repetitions([0,1,2,3,4], i));
}

var wonManaSpents = [];

function cleanActiveSpells(player, activeSpells) {
  Object.keys(activeSpells).forEach(function(activeSpellKey) {
    var activeSpellParams = activeSpells[activeSpellKey];

    if(activeSpellParams === undefined) {
      return;
    }

    if(activeSpellParams.turns === 0) {
      player.armor = 0;
      activeSpells[activeSpellKey] = undefined;
    }
  });
}

function castActiveSpells(player, boss, activeSpells) {
  Object.keys(activeSpells).forEach(function(activeSpellKey) {
    var activeSpellParams = activeSpells[activeSpellKey];

    if(activeSpellParams === undefined) {
      return;
    }

    if(activeSpellParams.turns === 0) {
      player.armor = 0;

      activeSpells[activeSpellKey] = undefined;
    } else {
      castSpell(player, boss, activeSpellParams);
      activeSpellParams.turns--;
    }
  });
}

function castSpell(player, boss, spellParams) {
  Object.keys(spellParams).forEach(function(param) {
    switch(param) {
      case "damage":
        boss.hit_points -= spellParams.damage;
        break;
      case "heal":
        player.hit_points += spellParams.heal;
        break;
      case "mana":
        player.mana_points += spellParams.mana;
        console.log("Recharge " + spellParams.mana + " timer: " + (spellParams.turns - 1))
        break;
      case "armor":
        player.armor = spellParams.armor;
        console.log("Shield " + spellParams.armor + " timer: " + (spellParams.turns - 1))
        break;
    }
  });
}

function fight(spellsCombo) {
  var boss = {
    hit_points: 51,
    damage: 9
  }

  var player = {
    hit_points: 50,
    mana_points: 500,
    armor: 0
  }

  // var boss = {
  //   hit_points: 14,
  //   damage: 8
  // }

  // var player = {
  //   hit_points: 10,
  //   mana_points: 250,
  //   armor: 0
  // }

  var activeSpells = {};
  var castedSpells = [];
  var playerWon = false;

  while(player.hit_points >= 0 && boss.hit_points >= 0 && !playerWon) {
    var castedSpell = spellsCombo.shift();

    // not enough spells in combo
    if(castedSpell === undefined) {
      console.log("FUCK")
      return;
    }

    var spellParams = spells[spellsNames[castedSpell]];

    while(activeSpells[castedSpell] || player.mana_points < spellParams.cost) {
      castedSpell = spellsCombo.shift();

      // not enough spells in combo
      if(castedSpell === undefined) {
        return;
      }

      spellParams = spells[spellsNames[castedSpell]];
    }

    castedSpells.push(castedSpell);

    // player turn
    console.log("\nPlayer turn");
    console.log(player);
    console.log(boss);
    console.log("Player casted " + spellsNames[castedSpell]);

    player.mana_points -= spellParams.cost;

    castActiveSpells(player, boss, activeSpells);

    if(spellParams.turns === 1) {
      castSpell(player, boss, spellParams);
    } else {
      activeSpells[castedSpell] = clone(spellParams);
    }

    cleanActiveSpells(player, activeSpells)

    if(boss.hit_points <= 0) {
      playerWon = true;
      console.log("WIN")
    } else {
      // boss turn
      castActiveSpells(player, boss, activeSpells);

      // player's spells on bosses turn
      console.log("\nBoss turn")
      console.log(player)
      console.log(boss)

      if(boss.hit_points <= 0) {
        playerWon = true;
        console.log("WIN")
      } else {
        var bossDamage = (boss.damage - player.armor) > 0 ? (boss.damage - player.armor) : 1;

        player.hit_points -= bossDamage;

        if(player.hit_points <= 0) {
          // player lost
        }
      }
    }

    cleanActiveSpells(player, activeSpells);
  }

  if(playerWon) {
    var manaSpent = 0;
    castedSpells.forEach(function(castedSpell) {
      var spellParams = spells[spellsNames[castedSpell]]
      manaSpent += spellParams.cost;
    })

    wonManaSpents.push(manaSpent);
  }
}

// var spellsNames = ["magic_missile", "drain", "shield", "poison", "recharge"];
// spellsCombos = [[3, 0]];
// spellsCombos = [[2, 4, 3, 0, 2, 4, 3, 0, 2, 4, 3, 0, 0]];

spellsCombos.forEach(function(spellsCombo) {
  fight(spellsCombo);
})

wonManaSpents = wonManaSpents.sort(function(a, b) {
  return a - b;
})

console.log(wonManaSpents)

// Too low 159
// Too high 1584
