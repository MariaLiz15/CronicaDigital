const books = [
  {
    id: 'uso-irresponsable-ia',
    title: 'El uso irresponsable de la inteligencia artificial',
    shortTitle: 'Uso irresponsable de la IA',
    author: 'Marializ Ramírez',
    topic: 'Inteligencia Artificial, ética digital y responsabilidad tecnológica',
    problem: 'Uso de IA para crear contenido falso, dañar reputaciones y tomar decisiones sin medir consecuencias.',
    synopsis: `Después de que se descubriera que él fue el responsable de crear el video falso que arruinó temporalmente la vida de Xander, Rodrigo debe enfrentar las consecuencias de sus acciones. Consumido por la culpa, el rechazo y el arrepentimiento, inicia un difícil camino de reflexión que lo llevará a descubrir que el verdadero problema nunca fue la tecnología, sino las decisiones que tomó al utilizarla. Mientras intenta reconstruir su vida, Rodrigo aprende sobre los peligros de la Inteligencia Artificial cuando se usa sin ética, pero también descubre su enorme potencial para ayudar a las personas y transformar el mundo de manera positiva. Decidido a convertir una experiencia negativa en algo útil para los demás, Rodrigo crea un proyecto educativo llamado Pantallas con Verdad.`,
    cover: '../assets/covers/uso-irresponsable-ia.png',
    pdf: '../assets/books/uso-irresponsable-ia.pdf',
    accent: 'blue',
    pages: ['Rodrigo enfrenta las consecuencias de haber creado un video falso.', 'El verdadero problema no fue la tecnología, sino la decisión de usarla sin ética.', 'Pantallas con Verdad nace para enseñar a verificar información y usar la tecnología responsablemente.'],
    trivia: { question: '¿Cuál es el mensaje central de este libro?', options: ['Que la IA siempre es peligrosa', 'Que la tecnología debe usarse con ética y responsabilidad', 'Que no se debe usar internet'], correct: 1 }
  },
  {
    id: 'deepfakes-desinformacion-digital',
    title: 'El peligro de los Deepfakes y la Desinformación Digital',
    shortTitle: 'Deepfakes y desinformación',
    author: 'Marializ Ramírez',
    topic: 'Deepfakes, desinformación digital y verificación de contenido',
    problem: 'Videos manipulados que pueden engañar, destruir reputaciones y convertir una mentira digital en juicio público.',
    synopsis: `Todo comienza cuando un video viral sacude la tranquilidad de un colegio. En las imágenes aparece Xander, el estudiante más popular, realizando acciones vergonzosas que rápidamente destruyen su reputación. Mientras la mayoría de sus compañeros lo juzga sin cuestionar la autenticidad del contenido, Ethan, un joven observador y apasionado por las historias de detectives, decide investigar antes de sacar conclusiones. Entre deepfakes, desinformación, ciberacoso y secretos ocultos, Ethan y Xander deberán demostrar la inocencia de quien fue condenado por la opinión pública.`,
    cover: '../assets/covers/deepfakes-desinformacion-digital.png',
    pdf: '../assets/books/deepfakes-desinformacion-digital.pdf',
    accent: 'green',
    pages: ['Un video viral acusa a Xander y cambia su vida en cuestión de minutos.', 'Ethan decide investigar antes de juzgar lo que todos dan por cierto.', 'La historia demuestra que una publicación falsa puede viajar más rápido que la verdad.'],
    trivia: { question: '¿Qué actitud ayuda a prevenir la desinformación digital?', options: ['Compartir rápido antes que otros', 'Verificar antes de creer o publicar', 'Creer todo lo que aparece en video'], correct: 1 }
  }
];

function coverPathForHome(book) { return book.cover.replace('../', ''); }

function renderHomeBooks() {
  const shelf = document.getElementById('bookGrid');
  if (!shelf) return;
  shelf.innerHTML = `
    <div class="shelf-back">
      ${books.map((book, index) => `
        <a class="shelf-book ${book.accent}" href="pages/${book.id}.html" aria-label="Abrir ${book.title}" style="--delay:${index * .12}s">
          <span class="book-spine-title">${book.shortTitle}</span>
          <span class="book-spine-author">${book.author}</span>
          <img src="${coverPathForHome(book)}" alt="Portada de ${book.title}">
          <span class="book-tooltip"><strong>${book.title}</strong><br>${book.topic}<br><em>Clic para abrir micrositio</em></span>
        </a>
      `).join('')}
    </div>
    <div class="shelf-base"></div>
  `;
}

function renderBookPage() {
  const page = document.querySelector('[data-book-id]');
  if (!page) return;
  const book = books.find(b => b.id === page.dataset.bookId);
  if (!book) return;
  document.body.classList.add(`theme-${book.accent}`);
  document.title = `${book.title} | Crónica Digital`;
  document.getElementById('bookTitle').textContent = book.title;
  document.getElementById('bookAuthor').textContent = book.author;
  document.getElementById('bookTopic').textContent = book.topic;
  document.getElementById('bookProblem').textContent = book.problem;
  document.getElementById('bookSynopsis').textContent = book.synopsis;
  document.getElementById('bookCover').src = book.cover;
  document.getElementById('downloadPdf').href = book.pdf;
  document.getElementById('pdfPreview').data = book.pdf;
  const flip = document.getElementById('flipbookPages');
  flip.innerHTML = book.pages.map((text, i) => `<div class="flip-page ${i === 0 ? 'active' : ''}"><span>Página ${i + 1}</span><p>${text}</p></div>`).join('');
  document.getElementById('triviaQuestion').textContent = book.trivia.question;
  document.getElementById('triviaOptions').innerHTML = book.trivia.options.map((option, i) => `<button onclick="checkTrivia(this, ${i === book.trivia.correct})">${option}</button>`).join('');
}

let currentPage = 0;
function nextFlipPage() {
  const pages = document.querySelectorAll('.flip-page');
  if (!pages.length) return;
  pages[currentPage].classList.remove('active');
  currentPage = (currentPage + 1) % pages.length;
  pages[currentPage].classList.add('active');
}

function checkTrivia(button, correct) {
  const result = document.getElementById('triviaResult');
  result.textContent = correct ? '¡Correcto! Verificar y actuar con responsabilidad ayuda a protegernos en línea.' : 'Inténtalo de nuevo. La clave está en verificar, pensar y actuar con responsabilidad.';
}

function showThanks(event) {
  event.preventDefault();
  document.getElementById('formMsg').textContent = 'Gracias. Tu mensaje fue registrado en esta demo.';
  event.target.reset();
  return false;
}

function initAnimations() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
  }, { threshold: 0.1 });
  items.forEach(item => observer.observe(item));
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    let value = 0;
    const target = Number(counter.dataset.count);
    const interval = setInterval(() => {
      value += Math.ceil(target / 30);
      if (value >= target) { value = target; clearInterval(interval); }
      counter.textContent = value;
    }, 40);
  });
}

document.querySelector('.menu-btn')?.addEventListener('click', () => document.querySelector('.nav').classList.toggle('open'));
renderHomeBooks();
renderBookPage();
initAnimations();
