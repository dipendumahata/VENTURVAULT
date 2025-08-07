import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BriefcaseIcon } from '../assets/icons.jsx'; // Assuming icons are in this file

// This component will handle the canvas animation
const AnimatedBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particlesArray;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Particle class
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(148, 163, 184, 0.5)'; // Slate-400 with opacity
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        // Create particle array
        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                let color = '#8C8C8C';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Animation loop
        let animationFrameId;
        function animate() {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        }

        // Connect particles
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(148, 163, 184, ${opacityValue})`; // Slate-400 with opacity
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Resize event
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        window.addEventListener('resize', handleResize);

        init();
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

// A dedicated Navbar for the Homepage
const HeroNavbar = () => {
    return (
        <motion.nav 
            className="absolute top-0 left-0 right-0 z-30 py-6 px-4 sm:px-6 lg:px-8"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <BriefcaseIcon className="h-8 w-8 text-teal-400" />
                    <span className="font-bold text-2xl text-white">VENTURVAULT</span>
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/about" className="text-slate-300 hover:text-white transition-colors font-medium">About</Link>
                    <Link to="/careers" className="text-slate-300 hover:text-white transition-colors font-medium">Careers</Link>
                    <Link to="/contact" className="text-slate-300 hover:text-white transition-colors font-medium">Contact</Link>
                </div>
                <div>
                    <Link to="/login" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all">
                        Log In
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};


const HomePage = () => {
    return (
        <div className="relative bg-slate-900 h-screen flex items-center justify-center overflow-hidden">
            <AnimatedBackground />
            <HeroNavbar />
            
            {/* Overlay to darken the background and improve text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900 z-10"></div>

            <div className="relative z-20 text-center px-4">
                <motion.h1 
                    className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-7xl"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <span className="block">Where Indian</span>
                    <span className="block text-teal-400">Innovation Meets Capital</span>
                </motion.h1>
                <motion.p 
                    className="mt-3 max-w-md mx-auto text-base text-slate-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    A unified ecosystem designed for India's founders, investors, and advisors. Raise funds, find mentors, and build the future.
                </motion.p>
                <motion.div 
                    className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <div className="rounded-md shadow">
                        <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105">
                            Start a Proposal
                        </Link>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                        <Link to="/proposals" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                            Explore Investments
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HomePage;
