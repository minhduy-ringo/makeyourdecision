import { MenuButton } from '../ui/menu-button';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MainMenu',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  bg:Phaser.GameObjects.TileSprite;

  public create(): void {
    const halfWidth = getGameWidth(this) * 0.5;
    const halfHeight = getGameHeight(this) * 0.5;
    // Add background
    this.bg = this.add.tileSprite (
      halfWidth,
      halfHeight,
      0,
      0,
      'menu-bg'
    )
    this.bg.setDisplaySize(halfWidth * 2, halfHeight * 2);
    this.bg.setAlpha(0.8);

    // new MenuButton(this, 100, 150, 'Start Game', () => {
    //   this.scene.start('Game');
    // });

    // new MenuButton(this, 100, 250, 'Settings', () => console.log('settings button clicked'));

    // new MenuButton(this, 100, 350, 'Help', () => console.log('help button clicked'));
  }

  public update(): void{
    this.bg.tilePositionX-= 0.4;
  }
}
