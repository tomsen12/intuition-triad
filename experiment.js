/*
    Experiment
    author: Matthias Weiler
    date: 2018-11-30
*/


/*
    Instruction block
    Show instructions on several pages.
*/

// General instructions
let instructions = {
    type: 'instructions',
    pages: [
        'First page with general instructions',
        'Second page with general instructions',
    ],
    show_clickable_nav: true,
};


/*
    Practice block
    Show an exclamation mark either on the left or on the right side of the
    screen.
    Number of trials: 20
*/

// Practice block instructions
let practiceBlockInstructions = {
    type: 'instructions',
    pages: [
        'First page with practice block instructions',
        'Second page with practice block instructions',
    ],
    show_clickable_nav: true,
};

// Practice fixation cross
let practiceFixationCross = {
    type: 'html-keyboard-response',
    stimulus: '<div class="fixation">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
};

// Practice stimuli
let practiceStimuli = [
    {practiceStimulus: '<div class="left">!</div>'},
    {practiceStimulus: '<div class="right">!</div>'},
];

// Practice trial
let practiceTrial = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('practiceStimulus'),
    choices: ['s', 'l'],
    trial_duration: 2000,
};

// Warning that reaction is too slow
let practiceTooSlow = {
    type: 'html-keyboard-response',
    stimulus: 'Please respond faster!',
    trial_duration: 1000,
};

// Show warning in case that reaction was too slow
let practiceTooSlowNode = {
    timeline: [practiceTooSlow],
    conditional_function: function() {
        let data = jsPsych.data.get().last(1).values()[0];
        if (data.key_press ==
            jsPsych.pluginAPI.convertKeyCharacterToKeyCode('NULL')) {
            return true;
        } else {
            return false;
        }
    },
};

// Practice procedure
let practiceProcedure = {
    timeline: [practiceFixationCross, practiceTrial, practiceTooSlowNode],
    timeline_variables: practiceStimuli,
    randomize_order: true,
    repetitions: 10,
};

// Practice block debriefing
let practiceBlockDebriefing = {
    type: 'instructions',
    pages: [
        'This is the practice block debriefing',
    ],
    show_clickable_nav: true,
};

// Practice block
let practiceBlock = {
    timeline: [practiceBlockInstructions, practiceProcedure,
        practiceBlockDebriefing],
};

/* TO DO
    stimuli pool for intuition and fluency: 36 coherent and 36 incoherent
    stimuli: ink_01, ..., ink_36 and koh_01, ..., koh_36
    Intuition: take 18 coherent and 18 incoherent stimuli and add .bmp (sampling
    without replacement).
    Fluency:
        - Take 18 coherent and 18 incoherent (aka the rest).
        - Take 9 coherent and 9 incoherent and add 'high'.
        - Take 9 coherent and 9 incoherent and add 'low'.
        - Add either 'r', 'g', or 'b'.
        - Examples: ink_01_high_r, koh_08_low_g, ink_27_low_b, ...
*/


/*
    Intuition block
*/

// Intuition block instructions
let intuitionBlockInstructions = {
    type: 'instructions',
    pages: [
        'First page with intuition block instructions',
        'Second page with intuition block instructions',
    ],
    show_clickable_nav: true,
};

// Intuition fixation cross
let intuitionFixationCross = {
    type: 'html-keyboard-response',
    stimulus: '<div class="fixation">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
};

// Intuition stimuli
let intuitionStimuli = [
    {intuitionStimulus: 'ink_01.bmp'},
    // ...
    {intuitionStimulus: 'ink_18.bmp'},
    {intuitionStimulus: 'koh_01.bmp'},
    // ...
    {intuitionStimulus: 'koh_18.bmp'},
];

// Intuition triade
let intuitionTriade = {
    // type: 'image-keyboard-response',
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('intuitionStimulus'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 1500,
};

// Coherence position
let intuitionCoherencePositions = ['left', 'right'];
let intuitionCoherencePosition =
    jsPsych.randomization.sampleWithReplacement(intuitionCoherencePositions, 1);

// Coherence judgement
// TO DO: zusammenhängend / zusammengewürfelt unten links bzw. unten rechts.
let intuitionCoherenceJudgement = {
    type: 'html-keyboard-response',
    stimulus: function() {
        if (intuitionCoherencePosition == 'left') {
            return 'Press "s" for coherent or "l" for incoherent';
        } else {
            return 'Press "s" for incoherent or "l" for coherent';
        }
    },
    choices: ['s', 'l'],
    trial_duration: 2000,
};

// Warning that reaction is too slow
let intuitionTooSlow = {
    type: 'html-keyboard-response',
    stimulus: 'Please respond faster!',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
};

// Show warning in case that reaction was too slow
let intuitionTooSlowNode = {
    timeline: [intuitionTooSlow],
    conditional_function: function() {
        let data = jsPsych.data.get().last(1).values()[0];
        if (data.key_press ==
            jsPsych.pluginAPI.convertKeyCharacterToKeyCode('NULL')) {
            return true;
        } else {
            return false;
        }
    },
};

// Intuition solution word
let intuitionSolutionWord = {
    type: 'survey-text',
    questions: [{prompt: 'Bitte geben Sie ein X oder ein L&oumlsungswort ein'}],
    trial_duration: 8000,
};

// Only show intuition solution word if not too slow
let intuitionSolutionWordNode = {
    timeline: [intuitionSolutionWord],
    conditional_function: function() {
        let data = jsPsych.data.get().last(1).values()[0];
        if (data.key_press ==
            jsPsych.pluginAPI.convertKeyCharacterToKeyCode('NULL')) {
            return false;
        } else {
            return true;
        }
    },
};

// Intuition procedure
let intuitionProcedure = {
    timeline: [intuitionFixationCross, intuitionTriade,
        intuitionCoherenceJudgement, intuitionTooSlowNode,
        intuitionSolutionWordNode],
    timeline_variables: intuitionStimuli,
    randomize_order: true,
};

// Confidence rating
let scaleConfidenceRating = ['0: Gar nicht', '1', '2', '3', '4', '5',
    '6: Sehr stark'];
let confidenceRating = {
    type: 'survey-likert',
    questions: [{
        prompt: 'Die Aufgabe ist geschafft! Wenn Sie auf die Aufgabe '
            + 'zur&uumlckblicken, wie sehr haben Sie Ihrer Intuition vertraut?',
        labels: scaleConfidenceRating,
    }],
};

// Intuition block
let intuitionBlock = {
    timeline: [intuitionBlockInstructions, intuitionProcedure,
    confidenceRating],
};


// Block Fluency
  // 36 Trials (s. a.)
    // Fixationskreuz (500)
    // Triade: Stimulus (1500) ink_08_high_r.bmp, koh_12_low_g.bmp,
    // (randomisiert)
    // Coherence judgement: Eingabe kohärent/inkohärent (2000) (wie bei
    // intuition)
      // Zu langsam, falls keine Eingabe (wie oben)
    // Solution word: Eingabe des Oberbegriffs (wie oben)

// Rating: Wie sehr haben Sie Ihrer Intuition vertraut?


// Block affektive Stimuli
  // 48 Trials
    // Fixationskreuz (500)
    // Triade: Stimulus (1500) ink_08_neg.bmp, koh_12_pos.bmp, ...
    // Coherence judgement: Eingabe kohärent/inkohärent (2000)
      // Zu langsam, falls keine Eingabe innerhalb 2000 ms (300)
    // Solution word: Eingabe des Oberbegriffs (8000)

// Rating: Wie sehr haben Sie Ihrer Intuition vertraut?


// Manipulationscheck
// Ḱonnten Sie alle Triaden entziffern?
    // Wenn nein: Wie viele Triaden konnten Sie nicht entziffern?


// Debriefing
// Danke! Wenden Sie sich bitte an die Versuchsleiterin.

// Main
jsPsych.init({
    timeline: [instructions, practiceBlock, intuitionBlock],
    // timeline: [intuitionBlock],
    on_finish: function() {
        jsPsych.data.displayData();
    },
});
