function createV0Loader() {
    // Create style element
    const style = document.createElement('style');
    style.textContent = `
    .v0_supreme_loader_container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.98);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999999;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .v0_supreme_loader_content {
        position: relative;
        width: 120px;
        height: 120px;
        transform-style: preserve-3d;
        perspective: 1000px;
    }

    .v0_supreme_loader_ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 4px solid transparent;
        animation: v0_supreme_rotate 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    }

    .v0_supreme_loader_ring:nth-child(1) {
        border-top-color: #000;
        border-width: 4px;
    }

    .v0_supreme_loader_ring:nth-child(2) {
        border-right-color: #000;
        width: 80%;
        height: 80%;
        top: 10%;
        left: 10%;
        border-width: 3px;
    }

    .v0_supreme_loader_ring:nth-child(3) {
        border-bottom-color: #000;
        width: 60%;
        height: 60%;
        top: 20%;
        left: 20%;
        border-width: 2px;
    }

    .v0_supreme_loader_text {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        font-weight: 500;
        color: #000;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .v0_supreme_progress {
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        height: 2px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
    }

    .v0_supreme_progress_bar {
        width: 0%;
        height: 100%;
        background: #000;
        transition: width 0.3s ease;
    }

    .v0_supreme_particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #000;
        border-radius: 50%;
        pointer-events: none;
    }

    @keyframes v0_supreme_rotate {
        0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
        100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
    }

    @media (prefers-color-scheme: dark) {
        .v0_supreme_loader_container {
            background: rgba(0, 0, 0, 0.98);
        }
        .v0_supreme_loader_ring:nth-child(1) { border-top-color: #fff; }
        .v0_supreme_loader_ring:nth-child(2) { border-right-color: #fff; }
        .v0_supreme_loader_ring:nth-child(3) { border-bottom-color: #fff; }
        .v0_supreme_loader_text { color: #fff; }
        .v0_supreme_progress { background: rgba(255, 255, 255, 0.1); }
        .v0_supreme_progress_bar { background: #fff; }
        .v0_supreme_particle { background: #fff; }
    }
`;
    document.head.appendChild(style);

    // Create loader elements
    const container = document.createElement('div');
    container.className = 'v0_supreme_loader_container';
    
    const content = document.createElement('div');
    content.className = 'v0_supreme_loader_content';
    
    // Create rings
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.className = 'v0_supreme_loader_ring';
        content.appendChild(ring);
    }

    // Create text and progress
    const text = document.createElement('div');
    text.className = 'v0_supreme_loader_text';
    text.textContent = 'Loading...';
    
    const progress = document.createElement('div');
    progress.className = 'v0_supreme_progress';
    const progressBar = document.createElement('div');
    progressBar.className = 'v0_supreme_progress_bar';
    progress.appendChild(progressBar);

    content.appendChild(text);
    content.appendChild(progress);
    container.appendChild(content);
    document.body.appendChild(container);

    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'v0_supreme_particle';
        content.appendChild(particle);

        const angle = (Math.random() * Math.PI * 2);
        const radius = 50 + Math.random() * 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        particle.style.animation = `
            v0_supreme_particle${i} ${2 + Math.random() * 2}s infinite ease-in-out ${Math.random()}s
        `;

        const particleKeyframes = `
            @keyframes v0_supreme_particle${i} {
                0% { transform: translate(${x}px, ${y}px) scale(0); opacity: 0; }
                50% { transform: translate(${-x}px, ${-y}px) scale(1); opacity: 0.8; }
                100% { transform: translate(${x}px, ${y}px) scale(0); opacity: 0; }
            }
        `;
        style.textContent += particleKeyframes;
    }

    let progressValue = 0;
    let progressInterval;

    // Return control functions
    return {
        show: function(customText) {
            if (customText) text.textContent = customText;
            container.style.visibility = 'visible';
            container.style.opacity = '1';
            
            // Reset and start progress
            progressValue = 0;
            progressBar.style.width = '0%';
            clearInterval(progressInterval);
            
            progressInterval = setInterval(() => {
                if (progressValue < 98) {
                    progressValue += Math.random() * 15;
                    if (progressValue > 98) progressValue = 98;
                    progressBar.style.width = `${progressValue}%`;
                }
            }, 200 + Math.random() * 300);
        },
        hide: function() {
            progressValue = 100;
            progressBar.style.width = '100%';
            
            setTimeout(() => {
                container.style.opacity = '0';
                setTimeout(() => {
                    container.style.visibility = 'hidden';
                    clearInterval(progressInterval);
                }, 300);
            }, 200);
        },
        setProgress: function(value) {
            progressValue = Math.min(100, Math.max(0, value));
            progressBar.style.width = `${progressValue}%`;
        },
        setText: function(newText) {
            text.textContent = newText;
        }
    };
}

// Initialize the loader
const v0Loader = createV0Loader();

 // Show loader
 v0Loader.show();
    
//  // Show with custom text
//  v0Loader.show("Please wait...");
 
//  // Hide loader
//  v0Loader.hide();
 
//  // Set specific progress
//  v0Loader.setProgress(50);
 
//  // Change text
//  v0Loader.setText("Processing...");