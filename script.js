const questions = [
    {
        question: "Determine \\( f'(x) \\) from first principles if \\( f(x) = -3x^2 \\).",
        options: ["\\( f'(x) = -3x \\)", "\\( f'(x) = -6x \\)", "\\( f'(x) = 6x \\)", "\\( f'(x) = -x^2 \\)"],
        answer: 1,
        explanation: "Using the definition: \\( f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h} \\). After expanding \\( -3(x+h)^2 \\) and simplifying, we get \\( -6x \\)."
    },
    {
        question: "For \\( g(x) = -2x^3 - 3x^2 + 12x + 20 \\), what is the derivative \\( g'(x) \\)?",
        options: ["\\( -6x^2 - 6x + 12 \\)", "\\( -2x^2 - 3x + 12 \\)", "\\( -6x^2 - 3x + 12 \\)", "\\( 6x^2 + 6x - 12 \\)"],
        answer: 0,
        explanation: "Apply the Power Rule: \\( \\frac{d}{dx}(ax^n) = anx^{n-1} \\). Each term is reduced by one power and multiplied by its original exponent."
    },
    {
        question: "Find the x-coordinates of the stationary points for \\( f(x) = x^3 - 3x + 5 \\).",
        options: ["\\( x = 0 \\)", "\\( x = 1, x = -1 \\)", "\\( x = 3, x = -3 \\)", "\\( x = 1, x = 5 \\)"],
        answer: 1,
        explanation: "Stationary points occur when \\( f'(x) = 0 \\). \\( 3x^2 - 3 = 0 \\implies x^2 = 1 \\), giving \\( x = 1 \\) and \\( x = -1 \\)."
    },
    {
        question: "What is the gradient of the tangent to the curve \\( f(x) = 2x^2 - 4x \\) at \\( x = 3 \\)?",
        options: ["\\( m = 4 \\)", "\\( m = 6 \\)", "\\( m = 8 \\)", "\\( m = 12 \\)"],
        answer: 2,
        explanation: "The gradient \\( m \\) is the derivative evaluated at that point. \\( f'(x) = 4x - 4 \\). Plugging in 3: \\( 4(3) - 4 = 8 \\)."
    },
    {
        question: "Calculate the second derivative \\( f''(x) \\) if \\( f(x) = 4x^3 - 5x^2 + 2 \\).",
        options: ["\\( 12x^2 - 10x \\)", "\\( 12x - 10 \\)", "\\( 24x - 10 \\)", "\\( 24x^2 - 10 \\)"],
        answer: 2,
        explanation: "First derivative: \\( f'(x) = 12x^2 - 10x \\). Differentiating again gives \\( f''(x) = 24x - 10 \\)."
    }
];

let currentIdx = 0;

function loadQuestion() {
    // Update Progress
    document.getElementById('progress').innerText = `Step ${currentIdx + 1} of ${questions.length}`;
    
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
    
    // Refresh MathJax rendering
    if (window.MathJax && MathJax.typeset) {
        MathJax.typeset();
    }
}

function checkAnswer(selected) {
    const q = questions[currentIdx];
    const btns = document.querySelectorAll('.option-btn');
    
    // Disable all buttons after selection
    btns.forEach(btn => btn.disabled = true);

    if (selected === q.answer) {
        btns[selected].classList.add('correct');
    } else {
        btns[selected].classList.add('wrong');
        btns[q.answer].classList.add('correct');
    }

    document.getElementById('explanation-text').innerHTML = q.explanation;
    document.getElementById('explanation-box').classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
    
    if (window.MathJax && MathJax.typeset) {
        MathJax.typeset();
    }
}

document.getElementById('next-btn').onclick = () => {
    currentIdx++;
    if (currentIdx < questions.length) {
        document.getElementById('explanation-box').classList.add('hidden');
        document.getElementById('next-btn').classList.add('hidden');
        loadQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = `
            <div style="text-align: center;">
                <h2>Mission Complete</h2>
                <p>All derivatives verified. You are ready for the next level.</p>
                <button onclick="location.reload()" id="next-btn">Restart Quiz</button>
            </div>
        `;
    }
};

// Start the application
window.onload = loadQuestion;