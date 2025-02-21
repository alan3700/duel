export const Spells = {
    Expelliarmus: {
        name: "Expelliarmus",
        effect: (enemy) => {
            if (enemy && enemy.health > 0) {
                enemy.health -= 20;
                enemy.disarmed = true; // Désarme l'ennemi pour un tour
                console.log(`L'ennemi a perdu 20 HP et est désarmé pour un tour.`);
            }
        },
    },
    Fireball: {
        name: "Fireball",
        effect: (enemy) => {
            if (enemy && enemy.health > 0) {
                enemy.health -= 30;
                enemy.burning = 3; // Brûle l'ennemi pendant 3 tours
                console.log(`L'ennemi a perdu 30 HP et brûlera pendant 3 tours.`);
            }
        },
    },
    Ice: {
        name: "Ice",
        effect: (enemy) => {
            if (enemy && enemy.health > 0) {
                enemy.health -= 15;
                enemy.slowed = 2; // Ralentit l'ennemi pendant 2 tours
                console.log(`L'ennemi a perdu 15 HP et est ralenti.`);
            }
        },
    },
    LightningStrike: {
        name: "Lightning Strike",
        effect: (enemy) => {
            if (enemy && enemy.health > 0) {
                enemy.health -= 40;
                if (Math.random() < 0.3) { // 30% de chance d'étourdir l'ennemi
                    enemy.stunned = 1;
                    console.log("L'ennemi est étourdi !");
                }
                console.log(`L'ennemi a perdu 40 HP.`);
            }
        },
    },
    HealingCharm: {
        name: "Healing Charm",
        effect: (player) => {
            if (player && player.health > 0) {
                player.health += 25;
                console.log(`Le joueur récupère 25 HP.`);
            }
        },
    }
};
