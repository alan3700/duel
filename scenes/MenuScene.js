export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        // Charger les images ou ressources nécessaires
    }

    create() {
        this.add.text(600, 200, 'Bienvenue dans le jeu !', { fontSize: '32px', fill: '#fff' });

        const startButton = this.add.text(750, 300, 'Démarrer', { fontSize: '24px', fill: '#00ff00' })
            .setInteractive()
            .on('pointerdown', () => {
                this.startNewGame(); // Appelle la fonction pour réinitialiser les valeurs et démarrer
            });
    }

    startNewGame() {
        // Réinitialiser les valeurs du jeu
        this.registry.set('roomIndex', 0);  // Revenir à la première salle
        this.registry.set('playerHealth', 100); // Remettre la vie du joueur à 100
        this.registry.set('enemyHealth', 100);  // Remettre la vie de l'ennemi à 100

        // Démarrer la scène du jeu proprement
        this.scene.start('Game');
    }

    update() {
        // Logique pour le menu si nécessaire
    }
}
