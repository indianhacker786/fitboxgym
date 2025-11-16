/* MOBILE NAVIGATION TOGGLE */
document.addEventListener("DOMContentLoaded", function () {

    const navToggle = document.querySelector(".nav-toggle");
    const navRight = document.querySelector(".nav-right");

    if (navToggle) {
        navToggle.addEventListener("click", function () {
            if (navRight.style.display === "flex") {
                navRight.style.display = "none";
            } else {
                navRight.style.display = "flex";
                navRight.style.flexDirection = "column";
                navRight.style.position = "absolute";
                navRight.style.top = "60px";
                navRight.style.right = "20px";
                navRight.style.background = "rgba(0,0,0,0.8)";
                navRight.style.padding = "14px";
                navRight.style.borderRadius = "10px";
                navRight.style.gap = "14px";
            }
        });
    }

    /* CONTACT FORM → SEND TO WHATSAPP */
    const sendBtn = document.getElementById("sendBtn");
    const waBtn = document.getElementById("waBtn");

    if (sendBtn) {
        sendBtn.addEventListener("click", function () {

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || phone === "" || message === "") {
                alert("Please fill all fields");
                return;
            }

            const ownerNumber = "917983691817";
            const text =
                "New Enquiry From Website%0A" +
                "Name: " + encodeURIComponent(name) + "%0A" +
                "Phone: " + encodeURIComponent(phone) + "%0A" +
                "Message: " + encodeURIComponent(message);

            const url = "https://wa.me/" + ownerNumber + "?text=" + text;

            window.open(url, "_blank");
        });
    }

    if (waBtn) {
        waBtn.addEventListener("click", function () {
            const url = "https://wa.me/917983691817?text=Hello%20Fitbox%20Gym";
            window.open(url, "_blank");
        });
    }

    /* FLOATING BUTTON DEFAULT */
    const waFloating = document.getElementById("whatsappFloating");
    if (waFloating) {
        waFloating.href = "https://wa.me/917983691817?text=Hello%20Fitbox%20Gym";
    }

});

/* PARTICLE ANIMATION (NEON THEME) */
const canvas = document.getElementById("particles-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray;

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;
            this.color = "rgba(0, 234, 255, 0.8)";
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#00eaff";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = Math.max(60, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });

        connectLines();
        requestAnimationFrame(animateParticles);
    }

    function connectLines() {
        let opacity = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const dist = dx * dx + dy * dy;

                if (dist < 9000) {
                    opacity = 1 - dist / 9000;
                    ctx.strokeStyle = "rgba(0, 234, 255," + opacity + ")";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    initParticles();
    animateParticles();
}
