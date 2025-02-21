import CombatScene from './CombatScene.js';  // Assure-toi d'importer CombatScene


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {

    }

    create() {
        // Créer le texte pour afficher les informations de la salle
        this.roomInfoText = this.add.text(10, 10, '', { fontSize: '24px', fill: '#fff' });
        console.log(this.registry)
        // Index de la salle actuelle (commence à la salle 0)
        this.roomIndex = this.registry.get('roomIndex') || 0;

        console.log(this.roomIndex)
    
        // Liste des salles avec leurs ennemis
        this.rooms = [
            { name: 'Salle 1', enemy: { name: 'Goblin', health: 50, attack: 15,spritekey:"goblinSprite"} },
            { name: 'Salle 2', enemy: { name: 'Orc', health: 80, attack: 20,spritekey:"orcSprite"} },
            { name: 'Salle 3', enemy: { name: 'Dragon', health: 100, attack: 20,spritekey:"dragonSprite"} }
        ];
    
        // Vérifier que la liste des salles a bien été définie
        if (this.rooms && this.rooms.length > 0) {
            // Afficher les informations de la salle actuelle
            this.updateRoomInfo();
        } else {
            console.error('Aucune salle définie');
        }
    
        // Créer le bouton pour entrer dans la salle
        this.enterRoomButton = this.add.text(600, 300, 'Entrer dans la salle', { fontSize: '24px', fill: '#00ff00' })
            .setInteractive()
            .on('pointerdown', () => {
                // Vérifier que la salle et l'ennemi existent
                if (this.roomIndex <= this.rooms.length && this.rooms[this.roomIndex] && this.rooms[this.roomIndex].enemy) {
                    // Passer à la scène de combat avec les données de l'ennemi et l'index de la salle
                    this.scene.start('CombatScene', { enemy: this.rooms[this.roomIndex].enemy, roomIndex: this.roomIndex, rooms: this.rooms });
                } else {
                    console.error('Aucun ennemi trouvé dans la salle', this.rooms[this.roomIndex]);
                }
            });
    }

    // Mise à jour de l'affichage des informations de la salle
    updateRoomInfo() {
        if (this.roomIndex <= this.rooms.length) {
            this.roomInfoText.setText(`Salle: ${this.rooms[this.roomIndex].name}\nEnnemi: ${this.rooms[this.roomIndex].enemy.name}`);
        }
    }

    // Mettre à jour l'index de la salle lorsque le joueur gagne
    nextRoom() {
        this.roomIndex++;
        if (this.roomIndex >= this.rooms.length) {
            this.scene.start(EndScene)  // Si on dépasse la dernière salle, recommence à la première
        }
        this.updateRoomInfo();  // Mettre à jour les infos de la salle
    }

    update() {
        // Logique pour gérer les déplacements entre les salles si nécessaire
    }
}