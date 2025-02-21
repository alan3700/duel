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
                this.scene.start('Game'); // Passer à la scène du jeu
            });
    }

    update() {
        // Logique pour le menu si nécessaire
    }
}