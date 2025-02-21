export default class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    preload() {
        // Charger des images ou autres ressources si nécessaire
    }

    create() {
        this.add.text(250, 250, 'Félicitations, vous avez terminé le jeu !', { fontSize: '32px', fill: '#fff' });
        const restartButton = this.add.text(300, 350, 'Recommencer', { fontSize: '24px', fill: '#00ff00' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Menu'); // Revenir au menu principal
            });
    }
}
