// Quiz Data Kota - 10 Pertanyaan Tentang Kota Jawa Timur
const quizDataKota = [
    {
        question: "Apa julukan Kota Surabaya?",
        options: ["Kota Santri", "Kota Pahlawan", "Kota Wisata", "Kota Tua"],
        correct: 1
    },
    {
        question: "Kota mana di Jawa Timur yang terkenal dengan wisata Gunung Bromo?",
        options: ["Kota Malang", "Kota Blitar", "Kota Probolinggo", "Kota Batu"],
        correct: 2
    },
    {
        question: "Kota di Jawa Timur yang dikenal sebagai penghasil apel terbesar adalah…",
        options: ["Kota Malang", "Kota Kediri", "Kota Madiun", "Kota Batu"],
        correct: 3
    },
    {
        question: "Kota mana yang menjadi pusat industri rokok besar seperti Gudang Garam?",
        options: ["Kota Surabaya", "Kota Kediri", "Kota Jember", "Kota Lamongan"],
        correct: 1
    },
    {
        question: "Kota di Jawa Timur yang terkenal dengan batik khasnya, yaitu Batik Tulis adalah…",
        options: ["Kota Ponorogo", "Kota Pacitan", "Kota Trenggalek", "Kota Tulungagung"],
        correct: 3
    },
    {
        question: "Kota mana yang dikenal sebagai Kota Santri karena banyaknya pondok pesantren?",
        options: ["Kota Kediri", "Kota Jombang", "Kota Malang", "Kota Surabaya"],
        correct: 1
    },
    {
        question: "Kota di Jawa Timur yang memiliki julukan \"Kota Reog\" adalah…",
        options: ["Kota Tulungagung", "Kota Ponorogo", "Kota Blitar", "Kota Ngawi"],
        correct: 1
    },
    {
        question: "Kota mana yang menjadi pusat perdagangan dan pelabuhan penting di Pulau Madura?",
        options: ["Kota Bangkalan", "Kota Sampang", "Kota Pamekasan", "Kota Sumenep"],
        correct: 3
    },
    {
        question: "Kota di Jawa Timur yang terkenal dengan wisata air panas dan pegunungan adalah…",
        options: ["Kota Ponorogo", "Kota Pacitan", "Kota Tulungagung", "Kota Trenggalek"],
        correct: 1
    },
    {
        question: "Kota mana yang dikenal sebagai penghasil kerajinan kulit terbesar di Jawa Timur?",
        options: ["Kota Lamongan", "Kota Tuban", "Kota Magetan", "Kota Bojonegoro"],
        correct: 2
    }
];

// Quiz Data Makanan - 10 Pertanyaan Tentang Kuliner Jawa Timur
const quizDataMakanan = [
    {
        question: "Apa bahan utama yang membuat kuah Rawon berwarna hitam pekat?",
        options: ["Kluwek", "Kemiri", "Kunyit", "Jahe"],
        correct: 0
    },
    {
        question: "Kuliner khas Madura yang terkenal dengan bumbu kacang dan daging bakar adalah…",
        options: ["Sate Ayam", "Sate Kambing", "Sate Madura", "Sate Padang"],
        correct: 2
    },
    {
        question: "Bakso Malang biasanya disajikan dengan campuran apa saja?",
        options: ["Bakso, tahu bakso, mie kuning, bihun, pangsit kukus, dan gorengan", "Bakso, tahu, mie, bihun, dan sayur", "Bakso, mie, pangsit, dan kuah", "Bakso, tahu, mie, dan gorengan"],
        correct: 0
    },
    {
        question: "Apa nama makanan khas Lamongan yang berupa soto dengan koya dan sambal petis?",
        options: ["Soto Kudus", "Soto Betawi", "Soto Lamongan", "Soto Madura"],
        correct: 2
    },
    {
        question: "Kuliner khas Banyuwangi yang berbahan dasar ikan laut dan dimasak dengan bumbu kuning adalah…",
        options: ["Pecel Lele", "Bandeng Presto", "Sego Cawuk", "Ikan Bakar"],
        correct: 2
    },
    {
        question: "Apa nama makanan khas Kediri yang berupa nasi dengan lauk pecel dan sambal tumpang?",
        options: ["Nasi Gudeg", "Nasi Liwet", "Nasi Pecel", "Nasi Rawon"],
        correct: 1
    },
    {
        question: "Kuliner khas Jember yang terkenal sebagai oleh-oleh manis adalah…",
        options: ["Klepon", "Suwar-suwir", "Tape", "Onde-onde"],
        correct: 1
    },
    {
        question: "Apa nama makanan khas Madiun yang berupa nasi pecel dengan rempeyek kacang?",
        options: ["Nasi Gudeg", "Nasi Liwet", "Pecel Madiun", "Nasi Rawon"],
        correct: 2
    },
    {
        question: "Kuliner khas Blitar yang berupa nasi dengan lauk tempe, tahu, dan sambal terasi adalah…",
        options: ["Nasi Gudeg", "Nasi Liwet", "Nasi Ampok", "Nasi Rawon"],
        correct: 2
    },
    {
        question: "Apa nama makanan khas Tuban yang berupa lontong dengan kuah santan dan taburan serundeng?",
        options: ["Lontong Balap", "Lontong Kupang", "Lontong Sayur", "Lontong Kari"],
        correct: 1
    }
];

// Set quiz data based on quizType
let quizData;
if (typeof quizType !== 'undefined' && quizType === 'makanan') {
    quizData = quizDataMakanan;
} else {
    quizData = quizDataKota;
}

// Game State
let currentQuestionIndex = 0;
let score = 0;
let userName = '';
let selectedAnswer = null;

// Start Quiz
function startQuiz(event) {
    event.preventDefault();
    userName = document.getElementById('userName').value.trim();

    if (userName.length < 3) {
        alert('Nama harus minimal 3 karakter!');
        return;
    }

    document.getElementById('welcomeCard').style.display = 'none';
    document.getElementById('quizCard').style.display = 'block';
    document.getElementById('totalQuestions').textContent = quizData.length;

    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    selectedAnswer = null;

    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionNumberText').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('nextBtn').style.display = 'none';
}

// Select Option
function selectOption(index, button) {
    if (selectedAnswer !== null) return; // Already answered

    selectedAnswer = index;
    const question = quizData[currentQuestionIndex];
    const allButtons = document.querySelectorAll('.option-btn');

    // Disable all buttons
    allButtons.forEach(btn => btn.disabled = true);

    // Check if correct
    if (index === question.correct) {
        button.classList.add('correct');
        score += 10;
        document.getElementById('scoreDisplay').textContent = score;
    } else {
        button.classList.add('incorrect');
        allButtons[question.correct].classList.add('correct');
    }

    // Show next button
    document.getElementById('nextBtn').style.display = 'block';
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showCertificate();
    }
}

// Show Certificate
function showCertificate() {
    document.getElementById('quizCard').style.display = 'none';
    document.getElementById('certificateContainer').style.display = 'block';

    document.getElementById('certificateName').textContent = userName;
    document.getElementById('certificateScore').textContent = `Skor: ${score} / ${quizData.length * 10}`;

    const today = new Date();
    const dateStr = today.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('certificateDate').textContent = `Diterbitkan pada: ${dateStr}`;


}



// Download Certificate
function downloadCertificate() {
    const certificate = document.getElementById('certificate');

    html2canvas(certificate, {
        scale: 2,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Sertifikat_${userName.replace(/\s+/g, '_')}_JatimEksplor.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}

// Download Sticker for WhatsApp
function downloadSticker() {
    const canvas = document.getElementById('stickerCanvas');
    const link = document.createElement('a');
    link.download = `Stiker_${userName.replace(/\s+/g, '_')}_JatimEksplor.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Show instruction
    setTimeout(() => {
        alert('✅ Stiker berhasil diunduh!\n\n📱 Cara menggunakan di WhatsApp:\n1. Buka WhatsApp\n2. Pilih chat\n3. Klik ikon lampiran (📎)\n4. Pilih Galeri/Photo Library\n5. Pilih stiker yang baru diunduh\n6. Kirim! 🎉');
    }, 300);
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userName = '';
    selectedAnswer = null;

    document.getElementById('certificateContainer').style.display = 'none';
    document.getElementById('welcomeCard').style.display = 'block';
    document.getElementById('userName').value = '';
    document.getElementById('scoreDisplay').textContent = '0';
}
