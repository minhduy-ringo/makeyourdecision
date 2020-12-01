const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Boot',
  };

/**
 * Load the progress bar asset
 */
export class BootState extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    };

    public preload(): void {
        // Load progress bar box
        this.load.image('progress-bar', '/assets/gui/bar box.png');
        // Load progress bar texture
        this.load.image('progress-bar-texture', '/assets/gui/bar.png');
        
        this.load.on('complete', () => {
            this.scene.start('Preload');
        });
    }
}