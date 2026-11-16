// Mobile nav toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('flex');
        mobileMenu.classList.toggle('hidden');
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            iconOpen.classList.remove('hidden');
            iconClose.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Scroll-spy: highlight the nav link for the section in view
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('a[data-nav]');

const setActiveLink = (id) => {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('text-amber-300', isActive);
        link.classList.toggle('text-slate-400', !isActive);
    });
};

if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
}

// Recipe viewer
const RECIPES = [
    { key: 'plant', name: 'Plant Stone', color: 'emerald', icon: 'Plant_Stone.png' },
    { key: 'lightning', name: 'Lightning Stone', color: 'yellow', icon: 'Lightning_Stone.png' },
    { key: 'shadow', name: 'Shadow Stone', color: 'purple', icon: 'Shadow_Stone.png' },
    { key: 'melee', name: 'Melee Stone', color: 'red', icon: 'Melee_Stone.png' },
    { key: 'water', name: 'Water Stone', color: 'blue', icon: 'Water_Stone.png' },
    { key: 'fire', name: 'Fire Stone', color: 'orange', icon: 'Fire_Stone.png' },
    { key: 'earth', name: 'Earth Stone', color: 'stone', icon: 'Earth_Stone.png' },
    { key: 'speed', name: 'Speed Stone', color: 'cyan', icon: 'Speed_Stone.png' },
    { key: 'health', name: 'Health Stone', color: 'pink', icon: 'Health_Stone.png' },
    { key: 'escaper', name: 'Escaper Stone', color: 'violet', icon: 'Escaper_Stone.png' },
    { key: 'miner', name: 'Miner Stone', color: 'amber', icon: 'Miner_Stone.png' },
    { key: 'mischief', name: 'Mischief Stone', color: 'fuchsia', icon: 'Mischief_Stone.png' },
    { key: 'wealth', name: 'Wealth Stone', color: 'lime', icon: 'Wealth_Stone.png' },
    { key: 'blood', name: 'Blood Stone', color: 'rose', icon: 'Blood_Stone.png' },
    { key: 'air', name: 'Air Stone', color: 'sky', icon: 'Air_Stone.png' },
];

const STONE_ICON_BASE = 'Static/Assets/Images/Stones/';
const RECIPE_IMAGE_BASE = 'Static/Assets/Images/stone_crafting_recipes/';

const recipePicker = document.getElementById('recipe-picker');
const recipeTitleIcon = document.getElementById('recipe-title-icon');
const recipeTitleText = document.getElementById('recipe-title-text');
const recipeImage = document.getElementById('recipe-image');
const recipePrev = document.getElementById('recipe-prev');
const recipeNext = document.getElementById('recipe-next');
const recipeImageBtn = document.getElementById('recipe-image-btn');
const recipeLightbox = document.getElementById('recipe-lightbox');
const recipeLightboxImg = document.getElementById('recipe-lightbox-img');
const recipeLightboxClose = document.getElementById('recipe-lightbox-close');

if (recipePicker && recipeImage) {
    let activeIndex = 0;

    const tabClasses = (recipe, isActive) =>
        `recipe-tab inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            isActive
                ? `border-${recipe.color}-400/50 bg-${recipe.color}-500/10 text-${recipe.color}-200`
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/10'
        }`;

    const tabButtons = RECIPES.map((recipe, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = tabClasses(recipe, false);
        button.innerHTML = `<img src="${STONE_ICON_BASE}${recipe.icon}" alt="" class="h-4 w-4 flex-none [image-rendering:pixelated]"><span>${recipe.name.replace(' Stone', '')}</span>`;
        button.addEventListener('click', () => setActiveRecipe(index));
        recipePicker.appendChild(button);
        return button;
    });

    function setActiveRecipe(index) {
        activeIndex = (index + RECIPES.length) % RECIPES.length;
        const recipe = RECIPES[activeIndex];

        tabButtons.forEach((button, i) => {
            button.className = tabClasses(RECIPES[i], i === activeIndex);
        });

        recipeTitleIcon.src = `${STONE_ICON_BASE}${recipe.icon}`;
        recipeTitleIcon.alt = `${recipe.name} icon`;
        recipeTitleText.textContent = recipe.name;
        recipeImage.src = `${RECIPE_IMAGE_BASE}${recipe.key}.png`;
        recipeImage.alt = `${recipe.name} recipe`;
    }

    recipePrev?.addEventListener('click', () => setActiveRecipe(activeIndex - 1));
    recipeNext?.addEventListener('click', () => setActiveRecipe(activeIndex + 1));

    recipeImageBtn?.addEventListener('click', () => {
        recipeLightboxImg.src = recipeImage.src;
        recipeLightboxImg.alt = recipeImage.alt;
        recipeLightbox.classList.remove('hidden');
        recipeLightbox.classList.add('flex');
    });

    const closeLightbox = () => {
        recipeLightbox.classList.add('hidden');
        recipeLightbox.classList.remove('flex');
    };

    recipeLightboxClose?.addEventListener('click', closeLightbox);
    recipeLightbox?.addEventListener('click', (event) => {
        if (event.target === recipeLightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeLightbox();
    });

    setActiveRecipe(0);
}

// Back-to-top button; for some reason the AI made this a manual scroller instead of something that links to ID top
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        const show = window.scrollY > 600;
        backToTop.classList.toggle('hidden', !show);
        backToTop.classList.toggle('flex', show);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
