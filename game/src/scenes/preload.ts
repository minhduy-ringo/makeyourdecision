import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Preload',
};

/**
 * The initial scene that loads all necessary assets to the game and displays a loading bar.
 */
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    const halfWidth = getGameWidth(this) * 0.5;
    const halfHeight = getGameHeight(this) * 0.5;

    const progressBarContainer = this.add.image(
      halfWidth,
      halfHeight,
      'progress-bar'
    ).setScale(0.3, 0.3);

    const progressBar = this.add.sprite(
      halfWidth,
      halfHeight,
      'progress-bar-texture'
    ).setScale(0.3, 0.3);
    progressBar.setCrop(0, 0, 0, progressBar.height);

    var loadingTextStyle = {
      fontSize: "16px",
      color: "#000000",
      align: "center"
    }

    // const loadingText = this.add.text(halfWidth, halfHeight - 100, 'Loading...', loadingTextStyle).setOrigin(0.5, 0);
    const percentText = this.add.text(halfWidth - 25, halfHeight - 10, '0%').setFontSize(20);
    const assetText = this.add.text(halfWidth, halfHeight + 40, '', loadingTextStyle).setOrigin(0.5, 0);

    this.load.on('progress', (value:number) => {
      progressBar.setCrop(0, 0, progressBar.width * value, progressBar.height);

      const percent = value * 100;
      percentText.setText(Math.trunc(percent).toString() + '%');
    });

    this.load.on('fileprogress', (file:Phaser.Loader.File) => {
      assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      // loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      progressBar.destroy();
      progressBarContainer.destroy();

      this.scene.start('MainMenu');
    });
    

    this.loadAssets();
  }

  /**
   * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)
   * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene
   * is currently active, so they can be accessed anywhere.
   */
  private loadAssets() {
    // Load GUI
    this.load.pack({
      key: "gui",
      url: "src/data/gui.json"
    });
    // Background
    // Designed by tartila / Freepik
    this.load.image('menu-bg', 'assets/images/background/seamless-space.jpg')
    // Source: Open Game Art
    this.load.image('man', 'assets/sprites/character.png');

  }
}
