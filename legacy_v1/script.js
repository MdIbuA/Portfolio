document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Premium Custom Cursor (Dot + Lagging Outline) ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const cursorGlow = document.getElementById('cursor-glow');

    // Variables for smoothing
    let mouseX = 0, mouseY = 0; // Actual mouse position
    let outlineX = 0, outlineY = 0; // Current outline position

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot moves instantly
        if (cursorDot) {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }
        // Glow also moves instantly (background ambient)
        if (cursorGlow) {
            cursorGlow.style.left = mouseX + 'px';
            cursorGlow.style.top = mouseY + 'px';
        }
    });

    // Animation Loop for Smooth Outline
    const animateCursor = () => {
        // Lerp (Linear Interpolation) formula: current + (target - current) * factor
        const speed = 0.15;

        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;

        if (cursorOutline) {
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
        }

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Interactive Hover States
    // Select all things that should trigger the cursor expansion
    const clickableSelectors = 'a, button, .bento-item, .social-link, .project-tile, .glass-card, input';
    const clickables = document.querySelectorAll(clickableSelectors);

    clickables.forEach(el => {
        el.style.cursor = 'none'; // Ensure CSS hasn't missed any

        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

    // --- 2. Advanced Three.js Animation (Particles + Grid) ---
    const initThreeJS = () => {
        const canvas = document.querySelector('#bg-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050510, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Grid Floor
        const gridHelper = new THREE.GridHelper(200, 50, 0x444444, 0x222222);
        scene.add(gridHelper);

        // Floating Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 300;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50; // Spread x, y, z
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x7ee787,
            transparent: true,
            opacity: 0.5,
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 10;
        camera.position.y = 5;
        camera.rotation.x = -0.2;

        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        const animate = () => {
            requestAnimationFrame(animate);

            // Subtle rotation based on mouse
            particlesMesh.rotation.y += 0.001;
            camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
            camera.position.y += (5 + mouseY * 2 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };
    if (typeof THREE !== 'undefined') initThreeJS();

    // --- 3. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.glass-card, .big-project-card');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for reveal logic (JS-driven to avoid CSS clutter if JS fails)
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);

    // --- 4. Vanilla Tilt ---
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".bento-item, .glass-card, .big-project-card, .hud-panel"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
            scale: 1.01
        });
    }

    // --- 6. Certifications World (Hex-Hive Mode) ---
    // No heavy JS needed here! The Hex structure is handled purely by CSS for performance.
    // VanillaTilt is already applied to .hex-item via the initial tilt init above.

    // --- 5. Chat Bot (Updated) ---
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            // User Msg
            const userDiv = document.createElement('div');
            userDiv.className = 'message message-user';
            userDiv.innerHTML = `<div class="message-content" style="background:#7ee787; color:#000">${text}</div>`;
            chatMessages.appendChild(userDiv);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Bot Response
            setTimeout(() => {
                const botDiv = document.createElement('div');
                botDiv.className = 'message message-bot';
                let reply = "I can discuss Mohamed's Projects (Crisis AI, Crypto) or Experience (Infosys, Edunet).";

                const t = text.toLowerCase();
                if (t.includes('crisis') || t.includes('triage') || t.includes('rag')) reply = "The Crisis Response Coordinator uses RAG (Retrieval Augmented Generation) to speed up emergency protocols by ~40%.";
                else if (t.includes('crypto') || t.includes('forecasting') || t.includes('lstm')) reply = "The Crypto Engine uses LSTM networks trained on live market data to predict trends.";
                else if (t.includes('infosys') || t.includes('intern')) reply = "At Infosys, Mohamed built ML pipelines on AWS/GCP, ensuring high model correctness.";
                else if (t.includes('skill') || t.includes('stack')) reply = "Core Stack: Python, Java, REST APIs, AWS, Docker.";

                botDiv.innerHTML = `<div class="message-content">${reply}</div>`;
                chatMessages.appendChild(botDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
        });
    }
});
