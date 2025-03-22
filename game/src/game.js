import Phaser from 'phaser';

const depthOfFieldShader = {
    uniforms: {
        'uSampler': { type: 'sampler2D', value: null },
        'blurAmount': { type: '1f', value: 1.0 },
    },

    fragmentShader: `
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform float blurAmount;

        void main() {
            vec4 color = texture2D(uSampler, vTextureCoord);
            gl_FragColor = color * blurAmount;
        }
    `,
};
class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('ermine', 'assets/images/ermine.png'); // Load your ermine image
        this.load.image('snowflake', 'assets/images/snowflake.png'); // Snowflake image
    }

    create() {
        this.ermine = this.add.sprite(100, 100, 'ermine');
        this.ermine.setPipeline('PostFX');
        // Add background snow using particle emitter
        this.snowEmitter = this.add.particles('snowflake').createEmitter({
            x: { min: 0, max: 800 },
            y: 0,
            speedY: { min: 50, max: 100 },
            lifespan: 4000,
            quantity: 1,
            scale: { start: 0.1, end: 0.5 },
            frequency: 100,
        });
    }

    update() {
        // Game loop: Update player movement and other actions
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MainScene,
    pixelArt: true,
    postFX: { shader: depthOfFieldShader },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
};

const game = new Phaser.Game(config);