const pathway = [
  {
    step: 1,
    stage: 'Stage 1: Investment',
    sub: 'Glucose',
    prod: 'Glucose 6-phosphate (G-6-P)',
    enzyme: 'Hexokinase',
    in: 'ATP',
    out: 'ADP + H+',
  },
  {
    step: 2,
    stage: 'Stage 1: Investment',
    sub: 'Glucose 6-phosphate (G-6-P)',
    prod: 'Fructose 6-phosphate (F-6-P)',
    enzyme: 'Phosphoglucose isomerase',
    in: 'None',
    out: 'None',
  },
  {
    step: 3,
    stage: 'Stage 1: Investment',
    sub: 'Fructose 6-phosphate (F-6-P)',
    prod: 'Fructose 1,6-bisphosphate (F-1,6-BP)',
    enzyme: 'Phosphofructokinase (PFK)',
    in: 'ATP',
    out: 'ADP + H+',
  },
  {
    step: 4,
    stage: 'Stage 1: Investment',
    sub: 'Fructose 1,6-bisphosphate (F-1,6-BP)',
    prod: 'DHAP + GAP',
    enzyme: 'Aldolase',
    in: 'None',
    out: 'None',
  },
  {
    step: 5,
    stage: 'Stage 1: Investment',
    sub: 'Dihydroxyacetone phosphate (DHAP)',
    prod: 'Glyceraldehyde 3-phosphate (GAP)',
    enzyme: 'Triose phosphate isomerase',
    in: 'None',
    out: 'None',
  },
  {
    step: 6,
    stage: 'Stage 2: Payoff',
    sub: 'Glyceraldehyde 3-phosphate (GAP)',
    prod: '1,3-Bisphosphoglycerate (1,3-BPG)',
    enzyme: 'Glyceraldehyde 3-phosphate dehydrogenase',
    in: 'NAD+ + Pi',
    out: 'NADH + H+',
  },
  {
    step: 7,
    stage: 'Stage 2: Payoff',
    sub: '1,3-Bisphosphoglycerate (1,3-BPG)',
    prod: '3-Phosphoglycerate (3-PG)',
    enzyme: 'Phosphoglycerate kinase',
    in: 'ADP',
    out: 'ATP',
  },
  {
    step: 8,
    stage: 'Stage 2: Payoff',
    sub: '3-Phosphoglycerate (3-PG)',
    prod: '2-Phosphoglycerate (2-PG)',
    enzyme: 'Phosphoglycerate mutase',
    in: 'None',
    out: 'None',
  },
  {
    step: 9,
    stage: 'Stage 2: Payoff',
    sub: '2-Phosphoglycerate (2-PG)',
    prod: 'Phosphoenolpyruvate (PEP)',
    enzyme: 'Enolase',
    in: 'None',
    out: 'H2O',
  },
  {
    step: 10,
    stage: 'Stage 2: Payoff',
    sub: 'Phosphoenolpyruvate (PEP)',
    prod: 'Pyruvate',
    enzyme: 'Pyruvate kinase',
    in: 'ADP + H+',
    out: 'ATP',
  },
];

let currentIndex = 0;
let quizScore = 0;
let quizTotal = 0;

function renderCard(idx) {
  const item = pathway[idx];
  document.getElementById(
    'stepBadge'
  ).innerText = `Step ${item.step} • ${item.stage}`;
  document.getElementById(
    'reactionHeader'
  ).innerText = `${item.sub} ➔ ${item.prod}`;

  ['boxEnzyme', 'boxCosub', 'boxCoprod'].forEach((id) => {
    document.getElementById(id).classList.remove('revealed');
  });
  document.getElementById('valEnzyme').innerText = '???';
  document.getElementById('valCosub').innerText = '???';
  document.getElementById('valCoprod').innerText = '???';
}

function revealItem(boxId) {
  const item = pathway[currentIndex];
  const box = document.getElementById(boxId);
  box.classList.add('revealed');
  if (boxId === 'boxEnzyme')
    document.getElementById('valEnzyme').innerText = item.enzyme;
  if (boxId === 'boxCosub')
    document.getElementById('valCosub').innerText = item.in;
  if (boxId === 'boxCoprod')
    document.getElementById('valCoprod').innerText = item.out;
}

function revealAll() {
  ['boxEnzyme', 'boxCosub', 'boxCoprod'].forEach(revealItem);
}

function nextStep() {
  currentIndex = (currentIndex + 1) % pathway.length;
  renderCard(currentIndex);
}

function prevStep() {
  currentIndex = (currentIndex - 1 + pathway.length) % pathway.length;
  renderCard(currentIndex);
}

function switchMode(mode) {
  if (mode === 'flash') {
    document.getElementById('flashcardView').style.display = 'block';
    document.getElementById('quizView').style.display = 'none';
    document.getElementById('tabFlash').classList.add('active');
    document.getElementById('tabQuiz').classList.remove('active');
  } else {
    document.getElementById('flashcardView').style.display = 'none';
    document.getElementById('quizView').style.display = 'block';
    document.getElementById('tabFlash').classList.remove('active');
    document.getElementById('tabQuiz').classList.add('active');
    generateQuizQuestion();
  }
}

function generateQuizQuestion() {
  document.getElementById('quizNextBtn').style.display = 'none';
  const item = pathway[Math.floor(Math.random() * pathway.length)];
  const qType = Math.floor(Math.random() * 3); // 0: enzyme, 1: cosubstrate, 2: coproduct

  let qText = '';
  let correct = '';
  let choices = new Set();

  if (qType === 0) {
    qText = `What enzyme catalyzes Step ${item.step}: "${item.sub} ➔ ${item.prod}"?`;
    correct = item.enzyme;
    choices.add(correct);
    while (choices.size < 4) {
      choices.add(pathway[Math.floor(Math.random() * pathway.length)].enzyme);
    }
  } else if (qType === 1) {
    qText = `What is the co-substrate / input consumed in Step ${item.step} (${item.enzyme})?`;
    correct = item.in;
    choices.add(correct);
    ['ATP', 'ADP', 'NAD+ + Pi', 'None'].forEach((c) => choices.add(c));
  } else {
    qText = `What is the co-product / output released in Step ${item.step} (${item.enzyme})?`;
    correct = item.out;
    choices.add(correct);
    ['ADP + H+', 'ATP', 'NADH + H+', 'H2O', 'None'].forEach((c) =>
      choices.add(c)
    );
  }

  document.getElementById('quizBadge').innerText = `Step ${item.step} Question`;
  document.getElementById('quizQuestion').innerText = qText;

  const optContainer = document.getElementById('quizOptions');
  optContainer.innerHTML = '';

  const shuffled = Array.from(choices).sort(() => Math.random() - 0.5);
  shuffled.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerText = choice;
    btn.onclick = () => checkQuiz(btn, choice, correct);
    optContainer.appendChild(btn);
  });
}

function checkQuiz(btn, selected, correct) {
  const allBtns = document.querySelectorAll('.quiz-option');
  allBtns.forEach((b) => (b.disabled = true));
  quizTotal++;
  if (selected === correct) {
    btn.classList.add('correct');
    quizScore++;
  } else {
    btn.classList.add('incorrect');
    allBtns.forEach((b) => {
      if (b.innerText === correct) b.classList.add('correct');
    });
  }
  document.getElementById(
    'scoreDisplay'
  ).innerText = `Score: ${quizScore} / ${quizTotal}`;
  document.getElementById('quizNextBtn').style.display = 'inline-block';
}

// Initial render
renderCard(0);
