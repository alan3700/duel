import { Spells } from '../spells/spells.js'; 

class CombatScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CombatScene' });
        console.log('CombatScene chargé');
    }

    preload() {
        console.log('Chargement des assets...');
        this.load.image('player', '../assets/player.png');
        this.load.image("goblinSprite", "../assets/goblin.jpg");
        this.load.image("orcSprite", "../assets/orc.jpg");
        this.load.image("dragonSprite", "../assets/dragon.png");
    }

    create(data) {
        console.log('Données reçues dans Combat:', data);
    
        if (!data || !data.enemy) {
            console.error('L\'ennemi n\'est pas défini.');
            return;
        }
    
        this.enemy = data.enemy;
        console.log(this.enemy);
        this.roomIndex = data.roomIndex;
        this.rooms = data.rooms;
    
        // Initialiser le joueur avec ses points de vie
        this.player = {
            health: 100,  // Valeur initiale des points de vie du joueur
        };
    
        this.enemyHealth = this.enemy.health;
        this.turn = 'player';
    
        // Ajouter les images du joueur et de l'ennemi
        this.playerImage = this.add.image(250, 400, 'player').setScale(0.5);
        this.enemyImage = this.add.image(1350, 400, this.enemy.spritekey).setScale(1.5);
    
        // Créer les barres de vie
        this.playerHealthBar = this.add.graphics();
        this.enemyHealthBar = this.add.graphics();
        this.updateHealthBars(); // Appeler pour afficher les barres de vie initiales
    
        // Texte des vies
        this.playerHealthText = this.add.text(50, 140, 'Player HP: ' + this.player.health, { fontSize: '24px', fill: '#fff' });
        this.enemyHealthText = this.add.text(1200, 140, this.enemy.name + ' HP: ' + this.enemyHealth, { fontSize: '24px', fill: '#fff' });
    
        // Informations supplémentaires sur la salle
        this.roomInfoText = this.add.text(850, 50, '', { fontSize: '20px', fill: '#fff', align: 'center' }).setOrigin(0.5, 0);
        this.turnText = this.add.text(850, 150, "Player's Turn", { fontSize: '30px', fill: '#ff0', fontWeight: 'bold' }).setOrigin(0.5, 0);
    
        this.updateRoomInfo(); // Appel de la méthode pour afficher les infos sur la salle
        this.createSpellButton(100, 100, 'Expelliarmus', Spells.Expelliarmus);
        this.createSpellButton(100, 150, 'Fireball', Spells.Fireball);
        this.createSpellButton(100, 200, 'Ice', Spells.Ice);
        this.createSpellButton(100, 250, 'Lightning Strike', Spells.LightningStrike);
        this.createSpellButton(100, 300, 'Healing Charm', Spells.HealingCharm);
    }

    // Méthode pour mettre à jour les informations sur la salle
    updateRoomInfo() {
        const roomInfo = `Room ${this.roomIndex + 1} of ${this.rooms.length}`; // Exemple d'info de la salle
        this.roomInfoText.setText(roomInfo); // Met à jour le texte affiché
    }

    createSpellButton(x, y, spellName, spell) {
        this.add.text(x, y, spellName, { font: '16px Arial', fill: '#ff0' })
            .setInteractive()
            .on('pointerdown', () => this.castSpell(spell));
    }

    castSpell(spell) {
        if (this.turn !== 'player') return; // Vérifie que c'est bien au tour du joueur
    
        if (spell === Spells.HealingCharm) {
            spell.effect(this.player); // Soigne le joueur
            this.playerHealthText.setText(`Player HP: ${this.player.health}`); // Mise à jour affichage
        } else {
            spell.effect(this.enemy); // Applique le sort à l'ennemi
            this.enemyHealthText.setText(`Enemy HP: ${this.enemy.health}`);
        }
    
        this.updateHealthBars(); // Mise à jour visuelle
    
        // Vérifier si l'ennemi est mort
        if (this.enemy.health <= 0) {  // Utilise this.enemy.health au lieu de this.enemyHealth
            let currentRoomIndex = this.registry.get('roomIndex') || 0;
            
            if (currentRoomIndex < this.rooms.length - 1) {
                let newRoomIndex = currentRoomIndex + 1;
                this.registry.set('roomIndex', newRoomIndex);
                this.endCombat("Player wins!");
            } else {
                this.scene.start('EndScene'); // Retour au menu si c'était la dernière salle
            }
            return;
        }
    
        // Passer au tour de l'ennemi
        this.turn = 'enemy';
        this.turnText.setText("Enemy's Turn");
    
        // Lancer le tour de l'ennemi avec un délai
        this.time.delayedCall(1000, () => this.enemyTurn());
    }
    
    
    updateHealthBars() {
        // Redessiner la barre de santé du joueur
        this.playerHealthBar.clear();
        this.playerHealthBar.fillStyle(0x00ff00, 1);  // Couleur verte pour la santé
        this.playerHealthBar.fillRect(50, 120, 200 * (this.playerHealth / 100), 20); // Taille proportionnelle à la santé
    
        // Redessiner la barre de santé de l'ennemi
        this.enemyHealthBar.clear();
        this.enemyHealthBar.fillStyle(0xff0000, 1);  // Couleur rouge pour la santé
        this.enemyHealthBar.fillRect(1200, 120, 200 * (this.enemyHealth / 100), 20); // Taille proportionnelle à la santé
    }
    

    enemyTurn() {
        if (this.enemyHealth > 0 && this.player.health > 0) {
            // Exemple d'attaque de l'ennemi
            const spell = Spells.Fireball;  // Choisir un sort de l'ennemi
            spell.effect(this.player);  // Appliquer le sort au joueur
    
            // Mettre à jour les PV du joueur
            this.playerHealth = this.player.health;  // Assurez-vous que la variable `this.playerHealth` est mise à jour avec les nouvelles valeurs
    
            // Mettre à jour les barres de vie et les textes
            this.updateHealthBars();
            this.playerHealthText.setText(`Player HP: ${this.player.health}`); // Mettre à jour le texte pour le joueur
    
            // Vérifier si le joueur est mort
            if (this.player.health <= 0) {
                this.endCombat("Enemy wins!");
                return;
            }
    
            // Passer au tour du joueur
            this.turn = 'player';
            this.turnText.setText("Player's Turn"); // Afficher le texte pour le tour du joueur
        }
    }
    
    

    endCombat(message) {
        // Afficher un message de fin de combat
        this.turnText.setText(message);
        this.playerHealth = 0;
        this.enemyHealth = 0;
    
        // Désactiver les boutons de sorts (empêcher de jouer)
        this.input.removeAllListeners();
    
        // Vous pouvez ajouter un délai avant de revenir à la scène suivante ou une autre action
        this.time.delayedCall(2000, () => {
            this.scene.start('Game'); 
        });
    }
    

    enemyAttack() {
        // L'ennemi attaque avec un sort
        const spell = Spells.Fireball;  // Exemple, l'ennemi attaque avec Fireball
        spell.effect(this.player);

        // Mettre à jour les PV
        this.updateHealthBars(); // Mettre à jour les barres de vie
    }
}

export default CombatScene;
