// class MenuScene extends Phaser.Scene {
//     constructor() {
//         super('Menu');
//     }

//     preload() {
//         // Charger les images ou ressources nécessaires
//     }

//     create() {
//         this.add.text(600, 200, 'Bienvenue dans le jeu !', { fontSize: '32px', fill: '#fff' });

//         const startButton = this.add.text(750, 300, 'Démarrer', { fontSize: '24px', fill: '#00ff00' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 this.scene.start('Game'); // Passer à la scène du jeu
//             });
//     }

//     update() {
//         // Logique pour le menu si nécessaire
//     }
// }

// class GameScene extends Phaser.Scene {
//     constructor() {
//         super('Game');
//     }

//     preload() {

//     }

//     create() {
//         // Créer le texte pour afficher les informations de la salle
//         this.roomInfoText = this.add.text(10, 10, '', { fontSize: '24px', fill: '#fff' });
//         console.log(this.registry)
//         // Index de la salle actuelle (commence à la salle 0)
//         this.roomIndex = this.registry.get('roomIndex') || 0;

//         console.log(this.roomIndex)
    
//         // Liste des salles avec leurs ennemis
//         this.rooms = [
//             { name: 'Salle 1', enemy: { name: 'Goblin', health: 50, attack: 15,spritekey:"goblinSprite"} },
//             { name: 'Salle 2', enemy: { name: 'Orc', health: 80, attack: 20,spritekey:"orcSprite"} },
//             { name: 'Salle 3', enemy: { name: 'Dragon', health: 150, attack: 60,spritekey:"dragonSprite"} }
//         ];
    
//         // Vérifier que la liste des salles a bien été définie
//         if (this.rooms && this.rooms.length > 0) {
//             // Afficher les informations de la salle actuelle
//             this.updateRoomInfo();
//         } else {
//             console.error('Aucune salle définie');
//         }
    
//         // Créer le bouton pour entrer dans la salle
//         this.enterRoomButton = this.add.text(600, 300, 'Entrer dans la salle', { fontSize: '24px', fill: '#00ff00' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 // Vérifier que la salle et l'ennemi existent
//                 if (this.roomIndex <= this.rooms.length && this.rooms[this.roomIndex] && this.rooms[this.roomIndex].enemy) {
//                     // Passer à la scène de combat avec les données de l'ennemi et l'index de la salle
//                     this.scene.start('Combat', { enemy: this.rooms[this.roomIndex].enemy, roomIndex: this.roomIndex, rooms: this.rooms });
//                 } else {
//                     console.error('Aucun ennemi trouvé dans la salle', this.rooms[this.roomIndex]);
//                 }
//             });
//     }

//     // Mise à jour de l'affichage des informations de la salle
//     updateRoomInfo() {
//         if (this.roomIndex <= this.rooms.length) {
//             this.roomInfoText.setText(`Salle: ${this.rooms[this.roomIndex].name}\nEnnemi: ${this.rooms[this.roomIndex].enemy.name}`);
//         }
//     }

//     // Mettre à jour l'index de la salle lorsque le joueur gagne
//     nextRoom() {
//         this.roomIndex++;
//         if (this.roomIndex >= this.rooms.length) {
//             this.scene.start(EndScene)  // Si on dépasse la dernière salle, recommence à la première
//         }
//         this.updateRoomInfo();  // Mettre à jour les infos de la salle
//     }

//     update() {
//         // Logique pour gérer les déplacements entre les salles si nécessaire
//     }
// }
// class CombatScene extends Phaser.Scene {
//     constructor() {
//         super('Combat');
//     }

//     preload() {
//         // Charger les images des personnages
//         this.load.image('player', 'assets/player.png');
//         this.load.image("goblinSprite", "assets/goblin.jpg");
//         this.load.image("orcSprite", "assets/orc.jpg");
//         this.load.image("dragonSprite", "assets/dragon.png");
//     }

//     create(data) {
//         console.log('Données reçues dans Combat:', data);

//         if (!data || !data.enemy) {
//             console.error('L\'ennemi n\'est pas défini.');
//             return;
//         }

//         this.enemy = data.enemy;
//         this.roomIndex = data.roomIndex;
//         this.rooms = data.rooms; // Accéder à rooms ici
//         this.playerHealth = 100;
//         this.enemyHealth = this.enemy.health;
//         this.turn = 'player'; // Le tour commence avec le joueur

//         // Ajouter les images du joueur et de l'ennemi
//         this.playerImage = this.add.image(250, 400, 'player').setScale(0.5);  // Image du joueur avec une taille ajustée
//         this.enemyImage = this.add.image(1350, 400, this.enemy.spritekey).setScale(1.5);  // Image de l'ennemi avec la même taille que celle du joueur

//         // Créer les barres de vie au-dessus des personnages
//         this.playerHealthBar = this.add.graphics();
//         this.enemyHealthBar = this.add.graphics();
//         this.updateHealthBars();

//         // Texte des vies sous forme de label bien placé
//         this.playerHealthText = this.add.text(50, 140, 'Player HP: ' + this.playerHealth, { fontSize: '24px', fill: '#fff' });
//         this.enemyHealthText = this.add.text(1200, 140, this.enemy.name + ' HP: ' + this.enemyHealth, { fontSize: '24px', fill: '#fff' });

//         // Texte d'information sur la salle, centré
//         this.roomInfoText = this.add.text(850, 50, '', { fontSize: '20px', fill: '#fff', align: 'center' }).setOrigin(0.5, 0);

//         // Texte du tour, centré en haut
//         this.turnText = this.add.text(850, 150, "Player's Turn", { fontSize: '30px', fill: '#ff0', fontWeight: 'bold' }).setOrigin(0.5, 0);

//         // Afficher les informations de la salle actuelle
//         this.updateRoomInfo();

//         // Bouton attaquer, à droite de l'image du joueur
//         this.attackButton = this.add.text(20, 550, 'Attack', { fontSize: '24px', fill: '#ff0000' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 if (this.turn === 'player') {
//                     this.attack();
//                 }
//             });

//         // Bouton défendre, juste en dessous du bouton attaquer
//         this.defendButton = this.add.text(150, 550, 'Defend', { fontSize: '24px', fill: '#00ff00' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 if (this.turn === 'player') {
//                     this.defend();
//                 }
//             });

//         // Bouton attaque puissante
//         this.powerAttackButton = this.add.text(280, 550, 'Power Attack', { fontSize: '24px', fill: '#ff4500' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 if (this.turn === 'player') {
//                     this.powerAttack();
//                 }
//             });

//         // Bouton esquiver
//         this.dodgeButton = this.add.text(420, 550, 'Dodge', { fontSize: '24px', fill: '#0000ff' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 if (this.turn === 'player') {
//                     this.dodge();
//                 }
//             });

//         // Bouton soin
//         this.healButton = this.add.text(550, 550, 'Heal', { fontSize: '24px', fill: '#32cd32' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 if (this.turn === 'player') {
//                     this.heal();
//                 }
//             });
//     }

//     update() {
//         // Vérifier si les objets de texte existent avant de les modifier
//         if (this.playerHealthText && this.enemyHealthText) {
//             this.playerHealthText.setText('Player HP: ' + this.playerHealth);
//             this.enemyHealthText.setText(this.enemy.name + ' HP: ' + this.enemyHealth);
//         }

//         // Mettre à jour les barres de vie
//         this.updateHealthBars();
//     }

//     updateHealthBars() {
//         // Effacer les barres de vie précédentes
//         this.playerHealthBar.clear();
//         this.enemyHealthBar.clear();

//         // Dessiner les nouvelles barres de vie
//         this.playerHealthBar.fillStyle(0x00ff00, 1); // Couleur verte pour le joueur
//         this.playerHealthBar.fillRect(50, 120, 200 * (this.playerHealth / 100), 20); // Barre de vie du joueur

//         this.enemyHealthBar.fillStyle(0xff0000, 1); // Couleur rouge pour l'ennemi
//         this.enemyHealthBar.fillRect(1200, 120, 200 * (this.enemyHealth / 100), 20); // Barre de vie de l'ennemi
//     }

//     attack() {
//         const damage = Phaser.Math.Between(10, 20);
//         this.enemyHealth -= damage;
//         this.turnText.setText('You attacked for ' + damage + ' damage!');
//         if (this.enemyHealth <= 0) {
//             this.enemyHealth = 0;
//             this.turnText.setText('You won the fight!');
//             let newRoomIndex = this.roomIndex + 1;
//             this.registry.set('roomIndex', newRoomIndex);
//             this.time.delayedCall(1000, () => {
//                 // Passer à la scène suivante ou terminer le jeu
//                 if (newRoomIndex + 1 <= this.rooms.length) { // Utiliser `this.rooms` maintenant
//                     this.scene.start('Game');
//                 } else {
//                     this.scene.start('EndScene');
//                 }
//             });
//         } else {
//             this.turn = 'enemy';
//             this.turnText.setText('It\'s the enemy\'s turn...');
//             this.time.delayedCall(1000, () => {
//                 this.enemyTurn();
//             });
//         }
//     }

//     defend() {
//         // Défense du joueur
//         this.turnText.setText('You are defending...');
//         this.turn = 'enemy';
    
//         // Activer la défense du joueur
//         this.isDefending = true;
    
//         // Attendre 1 seconde avant que l'ennemi réagisse
//         this.time.delayedCall(1000, () => {
//             this.enemyTurn();
//         });
//     }

//     powerAttack() {
//         // Attaque puissante : charge pendant 1 tour
//         this.turnText.setText('Charging Power Attack...');
//         this.isChargingPowerAttack = true;
//         this.time.delayedCall(1000, () => {
//             this.attack();
//             this.turnText.setText('Power Attack launched!');
//             this.isChargingPowerAttack = false;
//         });
//     }

//     dodge() {
//         // Esquive : 30% de chance de ne pas subir de dégâts
//         const dodgeChance = Phaser.Math.Between(1, 100);
//         if (dodgeChance <= 30) {
//             this.turnText.setText('You dodged the attack!');
//             this.isDodging = true;
//         } else {
//             this.turnText.setText('You failed to dodge!');
//             this.isDodging = false;
//         }
//         this.turn = 'enemy';
//         this.time.delayedCall(1000, () => {
//             this.enemyTurn();
//         });
//     }

//     heal() {
//         // Soin : remise de 10 points de vie
//         this.playerHealth = Math.min(this.playerHealth + 10, 100);  // On ne dépasse pas 100 points de vie
//         this.turnText.setText('You healed for 10 HP!');
//         this.turn = 'enemy';
//         this.time.delayedCall(1000, () => {
//             this.enemyTurn();
//         });
//     }

//     enemyTurn() {
//         // Calculer une action basée sur la santé de l'ennemi et du joueur
//         const enemyAction = Phaser.Math.Between(0, 1); // 0: attaque, 1: défense
//         let actionText = '';
//         let damage = this.enemy.attack;
    
//         // Si le joueur est en défense, réduire les dégâts de l'ennemi
//         if (this.isDefending) {
//             damage = Math.max(this.enemy.attack - 5, 0); // Réduire les dégâts de 5, avec un minimum de 0
//         }
    
//         // Si l'ennemi a plus de 50% de sa vie, il attaque
//         if (this.enemyHealth > this.enemy.maxHealth / 2) {
//             // L'ennemi attaque
//             this.playerHealth -= damage;
//             actionText = `${this.enemy.name} attacks for ${damage} damage!`;
//         } 
//         // Si l'ennemi a moins de 30% de sa vie, il tente de se défendre plus souvent
//         else if (this.enemyHealth <= this.enemy.maxHealth * 0.3) {
//             const defendChance = Phaser.Math.Between(0, 1); // 50% de chance de défendre
//             if (defendChance === 1) {
//                 actionText = `${this.enemy.name} is defending desperately...`;
//                 // L'ennemi essaie de défendre
//             } else {
//                 this.playerHealth -= damage;
//                 actionText = `${this.enemy.name} attacks for ${damage} damage!`;
//             }
//         } 
//         // Si l'ennemi est dans une situation intermédiaire, il décide de se défendre ou attaquer
//         else {
//             if (enemyAction === 0) {
//                 this.playerHealth -= damage;
//                 actionText = `${this.enemy.name} attacks for ${damage} damage!`;
//             } else {
//                 actionText = `${this.enemy.name} is defending...`;
//             }
//         }
    
//         // Réinitialiser la défense du joueur après l'attaque de l'ennemi
//         this.isDefending = false;
    
//         // Afficher l'action de l'ennemi
//         this.turnText.setText(actionText);
    
//         // Temps d'attente avant de terminer le tour de l'ennemi
//         const delay = Phaser.Math.Between(1500, 2500); // Délai aléatoire pour simuler réflexion
    
//         this.time.delayedCall(delay, () => {
//             if (this.playerHealth <= 0) {
//                 this.playerHealth = 0;
//                 this.turnText.setText('You lost!');
//                 this.time.delayedCall(1000, () => this.scene.start('Menu')); // Retour à la scène du jeu après 1 seconde
//             } else {
//                 this.turn = 'player';
//                 this.turnText.setText('It\'s your turn...');
//             }
//         });
//     }

//     // Mettre à jour l'affichage des informations de la salle
//     updateRoomInfo() {
//         const roomInfoText = `Salle: ${this.roomIndex + 1}\nEnnemi: ${this.enemy.name}`;
//         this.roomInfoText.setText(roomInfoText);
//     }
// }

// class EndScene extends Phaser.Scene {
//     constructor() {
//         super('EndScene');
//     }

//     preload() {
//         // Charger des images ou autres ressources si nécessaire
//     }

//     create() {
//         this.add.text(250, 250, 'Félicitations, vous avez terminé le jeu !', { fontSize: '32px', fill: '#fff' });
//         const restartButton = this.add.text(300, 350, 'Recommencer', { fontSize: '24px', fill: '#00ff00' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 this.scene.start('Menu'); // Revenir au menu principal
//             });
//     }
// }
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import CombatScene from './scenes/CombatScene.js';
import EndScene from './scenes/EndScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 600,
    scene: [MenuScene, GameScene, CombatScene, EndScene], // Ajoute EndScene ici
};

const game = new Phaser.Game(config);
