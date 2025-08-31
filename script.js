// Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        }

        // Mobile menu toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        // Idea form modal
        function showIdeaForm() {
            document.getElementById('ideaModal').classList.remove('hidden');
        }

        function hideIdeaForm() {
            document.getElementById('ideaModal').classList.add('hidden');
        }

        function submitIdea(event) {
            event.preventDefault();
            // Here you would normally send the form data to a server
            alert('Thank you for sharing your idea! We\'ll review it and get back to you soon.');
            hideIdeaForm();
            event.target.reset();
        }

        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        // Add interactive hover effects to impact cards
        document.querySelectorAll('.impact-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-bg');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add click animation to timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('click', function() {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });

        // Dynamic year counter for future section
        function animateCounter(element, target) {
            let current = 2024;
            const increment = (target - current) / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 20);
        }

        // Initialize counters when future section is visible
        const futureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const yearElements = entry.target.querySelectorAll('.future-card h3');
                    yearElements.forEach(el => {
                        const year = parseInt(el.textContent);
                        animateCounter(el, year);
                    });
                    futureObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const futureSection = document.querySelector('#future');
        if (futureSection) {
            futureObserver.observe(futureSection);
        }

        // Interactive AI Demo Functions
        function generateImage() {
            const prompt = document.getElementById('imagePrompt').value;
            const imageContainer = document.getElementById('generatedImage');
            
            if (!prompt) {
                imageContainer.innerHTML = '<p class="text-red-500">Please enter a description</p>';
                return;
            }
            
            // Simulate image generation with a placeholder
            imageContainer.innerHTML = `
                <div class="relative w-full h-full">
                    <img src="https://picsum.photos/seed/${encodeURIComponent(prompt)}/400/300.jpg" alt="Generated image" class="w-full h-full object-cover rounded-lg">
                    <div class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                        <p class="text-white text-center px-4">AI Generated: "${prompt}"</p>
                    </div>
                </div>
            `;
            
            // Add particle effect
            createParticles(imageContainer);
        }

        function generateText() {
            const prompt = document.getElementById('textPrompt').value;
            const textContainer = document.getElementById('generatedText');
            
            if (!prompt) {
                textContainer.innerHTML = '<p class="text-red-500">Please enter a question or request</p>';
                return;
            }
            
            // Simulate AI response
            const responses = [
                `That's an interesting question about "${prompt}". Based on current AI capabilities, I can tell you that this is an area of active research and development.`,
                `Regarding "${prompt}", AI systems are becoming increasingly sophisticated in handling such tasks. The future looks promising for these applications.`,
                `"${prompt}" is a fascinating topic! AI technology continues to evolve rapidly, opening new possibilities in this domain.`,
                `When it comes to "${prompt}", we're seeing remarkable progress in AI applications. The potential impact on daily life is significant.`
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            textContainer.innerHTML = `<p class="text-gray-700">${randomResponse}</p>`;
            
            // Add typing effect
            textContainer.style.opacity = '0';
            setTimeout(() => {
                textContainer.style.transition = 'opacity 0.5s';
                textContainer.style.opacity = '1';
            }, 100);
        }

        // Particle effect function
        function createParticles(container) {
            const rect = container.getBoundingClientRect();
            const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c'];
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * rect.width + 'px';
                particle.style.top = Math.random() * rect.height + 'px';
                particle.style.width = particle.style.height = Math.random() * 10 + 5 + 'px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.setProperty('--x', (Math.random() - 0.5) * 100 + 'px');
                particle.style.setProperty('--y', (Math.random() - 0.5) * 100 + 'px');
                
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }
        }

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideIdeaForm();
                toggleMobileMenu();
            }
        });

        // Lazy loading for images
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });