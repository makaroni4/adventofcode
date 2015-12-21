var fs = require("fs");
var input = fs.readFileSync("boss").toString().trim().split("\n");
var rawShop = fs.readFileSync("shop").toString().trim();

var boss = {};
input.forEach(function(rawParam) {
  var array = rawParam.split(": "),
      name = array[0],
      value = parseInt(array[1]);

  boss[name] = value;
});

var shop = {};
rawShop.split("\n\n").forEach(function(rawCategoryGoods) {
  var array = rawCategoryGoods.split("\n"),
      rawName = array[0],
      goods = array.slice(1, array.length);

  var categoryName = rawName.split(":").shift();

  shop[categoryName] = [];

  goods.forEach(function(rawGood) {
    var array = rawGood.split(/\s+/);
    var weapon = {};

    weapon["name"] = array.shift();
    weapon["cost"] = parseInt(array.shift());
    weapon["damage"] = parseInt(array.shift());
    weapon["armor"] = parseInt(array.shift());

    shop[categoryName].push(weapon);
  });
})

function isPlayerWins(player, boss) {
  var bossSteps = Math.floor(boss.hit_points / ((player.damage - boss.armor) > 0 ? (player.damage - boss.armor) : 1));
  var playerSteps = Math.floor(player.hit_points / ((boss.damage - player.armor) > 0 ? (boss.damage - player.armor) : 1));

  if(bossSteps === playerSteps) {
    if(player.hit_points % (boss.damage - player.armor) > 0) {
      return true;
    }
  }

  return playerSteps > bossSteps ? true : false;
}

function isPlayerLoose(player, boss) {
  var bossSteps = Math.floor(boss.hit_points / ((player.damage - boss.armor) > 0 ? (player.damage - boss.armor) : 1));
  var playerSteps = Math.floor(player.hit_points / ((boss.damage - player.armor) > 0 ? (boss.damage - player.armor) : 1));

  if(bossSteps === playerSteps) {
    if(player.hit_points % (boss.damage - player.armor) === 0) {
      return true;
    }
  }

  return bossSteps > playerSteps ? true : false;
}

var player = {
  hit_points: 100,
  damage: 5,
  armor: 6
};

var boss = {
  hit_points: 103,
  damage: 9,
  armor: 2
};

console.log(isPlayerLoose(player, boss))

var costs = [];
var WRONG_MIN_COST = 213;
// weapon
shop.weapons.forEach(function (weapon) {
  var player = {
    hit_points: 100,
    armor: 0,
    damage: weapon.damage
  }

  if(isPlayerLoose(player, boss)) {
    var totalCost = weapon.cost;
    costs.push(totalCost);
  }
})

// weapon + armor
shop.weapons.forEach(function (weapon) {
  shop.armor.forEach(function (armorItem) {
    var player = {
      hit_points: 100,
      armor: armorItem.armor,
      damage: weapon.damage
    }

    if(isPlayerLoose(player, boss)) {
      var totalCost = weapon.cost + armorItem.cost;

      if(totalCost === WRONG_MIN_COST) {
        console.log(weapon)
        console.log(armorItem)
      }

      costs.push(totalCost);
    }
  });
});

var combine = function(a, min) {
  var fn = function(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  var all = [];
  for (var i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }

  all.push(a);

  return all;
}

var ringCombinations = combine(shop.rings, 1).filter(function (combo) {
  return combo.length <= 2;
});

var applyRing = function(player, ring) {
  var ringName = ring.name.split("+");
  if(ringName[0] === "Damage") {
    player.damage += parseInt(ringName[1]);
  } else {
    player.armor += parseInt(ringName[1]);
  }
}

// weapon + ring
shop.weapons.forEach(function (weapon) {
  ringCombinations.forEach(function (ringCombination) {
    var ringsCost = 0;

    var player = {
      hit_points: 100,
      damage: weapon.damage,
      armor: 0
    }

    ringCombination.forEach(function (ring) {
      applyRing(player, ring);
      ringsCost += ring.cost;
    })

    if(isPlayerLoose(player, boss)) {
      var totalCost = weapon.cost + ringsCost;

      if(totalCost === WRONG_MIN_COST) {
        console.log(weapon)
        console.log(ringCombination)
      }

      costs.push(totalCost);
    }
  });
});

// weapon + ring + armor
shop.weapons.forEach(function (weapon) {
  shop.armor.forEach(function (armorItem) {
    ringCombinations.forEach(function (ringCombination) {
      var ringsCost = 0;

      var player = {
        hit_points: 100,
        damage: weapon.damage,
        armor: armorItem.armor,
      };

      ringCombination.forEach(function (ring) {
        applyRing(player, ring);
        ringsCost += ring.cost;
      })

      if(isPlayerLoose(player, boss)) {
        var totalCost = weapon.cost + ringsCost + armorItem.cost;

        if(totalCost === WRONG_MIN_COST) {
          console.log(weapon)
          console.log(armorItem)
          console.log(ringCombination)
        }

        costs.push(totalCost);
      }
    });
  });
});

costs = costs.sort(function (a, b) {
  return a - b;
})

console.log(costs);

// 213 too high
