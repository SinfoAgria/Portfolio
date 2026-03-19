class MiElemento3D {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = this.crearEscena();

        this.iniciarRenderLoop();
    }
    
    crearEscena() {
        const scene = new BABYLON.Scene(this.engine);
        
        // Fondo transparente
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
        
        // Cámara (vista frontal)
        this.camera = new BABYLON.ArcRotateCamera(
            "camera", 
            0,                     // frontal
            Math.PI / 2.2,         // leve inclinación
            10.5,                     // distancia
            new BABYLON.Vector3(0, 1, 0), 
            scene
        );

        this.camera.attachControl(this.canvas, true);

        // 🔥 AUTO ROTACIÓN (SOLUCIÓN CLAVE)
        this.camera.useAutoRotationBehavior = true;
        this.camera.autoRotationBehavior.idleRotationSpeed = 0.3; // velocidad suave
        this.camera.autoRotationBehavior.idleRotationWaitTime = 0; // sin espera
        this.camera.autoRotationBehavior.idleRotationSpinupTime = 1000;

        // Luz
        new BABYLON.HemisphericLight(
            "light", 
            new BABYLON.Vector3(0, 1, 0), 
            scene
        );

        return scene;
    }
    
    agregarModelo(ruta, nombre) {
        BABYLON.SceneLoader.ImportMesh("", ruta, nombre, this.scene, 
            (meshes) => {

                console.log("Modelo agregado:", meshes);

                // 👇 opcional: centrar la cámara en el modelo automáticamente
                if (meshes.length > 0) {
                    this.camera.target = meshes[0].position;
                }
            }
        );
    }
    
    iniciarRenderLoop() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}


// ✅ Uso
const mi3D = new MiElemento3D('my-canvas');
mi3D.agregarModelo('./models/MiniTv/', 'MiniTV.glb');