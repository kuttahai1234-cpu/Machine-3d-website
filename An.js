// --- Scene Setup (Similar to before) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias for smoother edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x1a1a1a); // Dark background
document.body.appendChild(renderer.domElement);

// --- Lighting ---
// Add ambient light to softly illuminate everything
const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
scene.add(ambientLight);

// Add directional light for shadows and definition
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// --- Camera Position ---
camera.position.set(0, 2, 8); // Slightly above and further back

// --- Variables for Model and Animation ---
let engineModel; // This will hold your loaded 3D engine model
const loader = new THREE.GLTFLoader();
const loadingScreen = document.getElementById('loading-screen');
let animationTimeline; // GSAP timeline for sequencing animations

// --- Load the 3D Model ---
loader.load(
    'path/to/your/supercar_engine.gltf', // IMPORTANT: Replace with your model path!
    function (gltf) {
        engineModel = gltf.scene;
        scene.add(engineModel);

        // Position and scale the model as needed
        engineModel.position.set(0, -1, 0); // Adjust origin
        engineModel.scale.set(0.5, 0.5, 0.5); // Adjust size

        // Hide loading screen once model is loaded
        loadingScreen.style.display = 'none';

        // Initialize and start complex animations
        initComplexAnimation();
    },
    // Optional: called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        loadingScreen.innerText = `Loading Engine... ${Math.round(xhr.loaded / xhr.total * 100)}%`;
    },
    // Optional: called when there's an error
    function (error) {
        console.error('An error happened loading the GLTF model:', error);
        loadingScreen.innerText = 'Error loading engine!';
    }
);

// --- Function to Setup Complex Animations ---
function initComplexAnimation() {
    animationTimeline = gsap.timeline({
        repeat: -1, // Loop indefinitely
        yoyo: true, // Play animation forwards then backwards
        defaults: { ease: "power1.inOut", duration: 2 }
    });

    // Example: Animate the camera
    animationTimeline.to(camera.position, { x: 2, y: 0, z: 5, duration: 4 }, 0);
    animationTimeline.to(camera.rotation, { y: Math.PI / 4, duration: 4 }, 0);

    // --- Placeholder for Model-Specific Animations ---
    // This is where you would access individual parts of your loaded engine model
    // and animate them using GSAP. You'd need to know the names of the 3D parts.
    // Example (conceptual):
    // const piston = engineModel.getObjectByName('piston_1');
    // if (piston) {
    //     animationTimeline.to(piston.position, { y: "+=0.5", duration: 1 }, "start");
    //     animationTimeline.to(piston.rotation, { x: Math.PI / 2, duration: 1 }, "start");
    // }

    // --- Dynamic engine part rotation (if not part of a timeline) ---
    // Example: Always slowly rotate the entire engine (or a specific sub-group)
    // if (engineModel) {
    //     gsap.to(engineModel.rotation, {
    //         y: Math.PI * 2, // Full rotation
    //         duration: 60, // Over 60 seconds
    //         repeat: -1, // Loop indefinitely
    //         ease: "none" // Linear rotation
    //     });
    // }

    // Trigger the initial play of the timeline
    // animationTimeline.play(); // No need if repeat: -1 is used
}


// --- Animation Loop (Render Scene) ---
function animate() {
    requestAnimationFrame(animate);

    // Rotate the entire loaded engine model slightly for a dynamic feel
    if (engineModel) {
        // engineModel.rotation.y += 0.005; // Manual rotation if not using GSAP for it
    }

    renderer.render(scene, camera);
}

// --- Handle Window Resizing ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the rendering loop
animate();
