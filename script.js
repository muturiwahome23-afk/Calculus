const questions = [
    {
        question: "Determine \\( f'(x) \\) from first principles if \\( f(x) = -3x^2 \\).",
        options: [
            "\\( f'(x) = -3x \\)",
            "\\( f'(x) = -6x \\)",
            "\\( f'(x) = 6x \\)",
            "\\( f'(x) = -x^2 \\)"
        ],
        answer: 1,
        explanation: "1. Use the definition: \\( f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h} \\). <br> 2. Substitute: \\( \\frac{-3(x+h)^2 - (-3x^2)}{h} \\). <br> 3. Expand: \\( \\frac{-3x^2 - 6xh - 3h^2 + 3x^2}{h} \\). <br> 4. Simplify: \\( \\frac{h(-6x - 3h)}{h} \\). <br> 5. As \\( h \\to 0 \\), the result is \\( -6x \\)."
    },
    {
        question: "For the function \\( g(x) = -2x^3 - 3x^2 + 12x + 20 \\), what is the derivative \\( g'(x) \\)?",
        options: [
            "\\( -6x^2 - 6x + 12 \\)",
            "\\( -2x^2 - 3x + 12 \\)",
            "\\( -6x^2 - 3x + 12 \\)",
            "\\( 6x^2 + 6x - 12 \\)"
        ],
        answer: 0,
        explanation: "Using the Power Rule: <br> - Multiply the exponent by the coefficient: \\( 3 \\times -2 = -6 \\). <br> - Subtract 1 from the exponent: \\( x^{3-1} = x^2 \\). <br> - Repeat for all terms: \\( -2x^3 \\to -6x^2 \\), \\( -3x^2 \\to -6x \\), \\( 12x \\to 12 \\)."
    }
];

let currentIdx = 0;

function loadQuestion() {
    const q = questions[currentIdx];
    document.getElementById('question-text').innerHTML = q.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = opt;
        btn.onclick = () => checkAnswer(i);
        optionsContainer.appendChild(btn);
    });
    
    // Refresh MathJax to render new formulas
    MathJax.typeset();
}

function checkAnswer(selected) {
    const q = questions[currentIdx];
    const btns = document.querySelectorAll('.option-btn');
    
    if (selected === q.answer) {
        btns[selected].classList.add('correct');
    } else {
        btns[selected].classList.add('wrong');
        btns[q.answer].classList.add('correct');
    }

    document.getElementById('explanation-text').innerHTML = q.explanation;
    document.getElementById('explanation-box').classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
    MathJax.typeset();
}

document.getElementById('next-btn').onclick = () => {
    currentIdx++;
    if (currentIdx < questions.length) {
        document.getElementById('explanation-box').classList.add('hidden');
        document.getElementById('next-btn').classList.add('hidden');
        loadQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = "<h2>Mission Complete. All parameters within range.</h2>";
    }
};

// Start the app
loadQuestion();
