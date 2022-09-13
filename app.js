//These variables are used to grab an element for manipulation.
const launchButtonElement = document.querySelector('#launch');
const dialogueElement = document.querySelector('#dialogue');
const contentElement = document.querySelector('#content');
const choiceButtonElements = document.querySelector('#choices');
const choiceBtnsElement = document.querySelectorAll('.choice');
const characterButtonElement = document.querySelector('#character')


document.onclick = function () {
    audio.play();
}

let characterState = {};

function startGame() {
    characterState = {};
    showDialogue(1);
}

function showDialogue(storyNodeIndex) {
    const storyNode = story.find(storyNodeDialogue => storyNodeDialogue.id === storyNodeIndex)
    dialogueElement.innerText = storyNode.dialogue

    while (choiceButtonElements.firstChild) {
        choiceButtonElements.removeChild(choiceButtonElements.firstChild);
    }

    storyNode.options.forEach((option) => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text
            button.classList.add('choice')
            button.addEventListener('click', () => selectOption(option))
            choiceButtonElements.appendChild(button);
        } else {
            const button = document.createElement('button');
            button.innerText = option.text
            button.classList.add('choice')
            button.addEventListener('click', () => failedRequirement(option))
            choiceButtonElements.appendChild(button);
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(characterState);
}
function selectOption(option) {
    const nextStoryNode = option.nextText;
    characterState = Object.assign(characterState, option.setState)
    const click = new Audio("Sounds/click.wav");
    click.play();
    showDialogue(nextStoryNode)
}
function failedRequirement(option) {
    const click = new Audio("Sounds/neg.wav");
    click.play();
    dialogueElement.innerHTML = option.requirementText;
}

launchButtonElement.addEventListener('click', () => {
    for (let ea of choiceBtnsElement) { ea.classList.toggle('invisible'); }
    launchButtonElement.classList.toggle('invisible');
    startGame();
})

characterButtonElement.addEventListener('click', () => {
    contentElement.innerHTML = `Class: ${characterState.class.name}<br>
                        agility: ${characterState.class.agility}<br>
                        strength: ${characterState.class.strength}<br>
                        intelligence: ${characterState.class.intelligence}<br>
                        speed: ${characterState.class.speed}<br>
                        luck: ${characterState.class.luck}<br>
    `;
})
// // this adds and event listener to wait for the launch button click
// launchButtonElement.addEventListener('click', () => {
//     //this for of loop is simply causing the 3 choice buttons on the bottom to appear
//     for (let ea of choiceBtnsElement) { ea.classList.toggle('invisible'); }
//     //This toggle simply makes the launch button invisible.
//     launchButtonElement.classList.toggle('invisible');
//     dialogueElement.innerText = story[contents[chapter]]['step' + count]['dia']
//     optionElement1.innerText = story[contents[chapter]]['step' + count]['option1']['text'];
//     optionElement2.innerText = story[contents[chapter]]['step' + count]['option2']['text'];
//     optionElement3.innerText = story[contents[chapter]]['step' + count]['option3']['text'];

//     counter++
//     count = counter.toString();
// })

// option2.addEventListener('click', () => {
//     if (story[contents[chapter]]['step' + count] === 'next') {
//         chapter++
//         counter = 1
//     }
//     dialogueElement.innerText = story[contents[chapter]]['step' + count]['dia']
//     optionElement1.innerText = story[contents[chapter]]['step' + count]['option1']['text'];
//     optionElement2.innerText = story[contents[chapter]]['step' + count]['option2']['text'];
//     optionElement3.innerText = story[contents[chapter]]['step' + count]['option3']['text'];
//     counter++
//     count = counter.toString();

// })

const story = [
    {
        id: 1,
        dialogue: 'It is night fall. After a long journey through the country of purus, after fighting off fiends and enemies alike you find yourself tired, famished and low on water. You see a dimly lit town in the distance and decide to seek shelter for the night.',
        options: [
            {

                text: 'disabled'
            },
            {
                text: 'Enter The Town',
                nextText: 2
            },
            {
                text: 'disabled'
            }
        ]
    },
    {
        id: 2,
        dialogue: 'As you enter the town, you see what looks like a tavern. You say to yourself "Thank the heavens". as you stumble up the steps, you walk through the door. as you walk up to the bar, you see a fair maiden serving tables and can feel the gaze of the patrons upon you.',
        options: [
            {

                text: 'disabled'
            },
            {
                text: 'Sit at the bar',
                nextText: 3
            },
            {
                text: 'disabled'
            }
        ]
    },
    {
        id: 3,
        dialogue: 'The bartender walks toward you, "woah, you look Horrible, let me get you drink, here it\'s on the house." so tell me, where are you from stranger?',
        options: [
            {

                text: 'disabled'
            },
            {
                text: 'Choose Your Race',
                nextText: 4
            },
            {
                text: 'disabled'
            }
        ]
    },
    {
        id: 4,
        dialogue: 'The Famours Raven Trainers, Home to some of the worlds most lethal assassins. Masters of the shadow and stealth arts. This tribe relies on Agility to take down their foes as quick as possible, while mitigating the damage they receive.',
        options: [
            {

                text: 'previous',
                nextText: 6
            },
            {
                text: 'Select Kage Clan',
                setState: {
                    class: {
                        name: 'assassin',
                        assassin: true,
                        agility: 15,
                        strength: 5,
                        intelligence: 8,
                        speed: 10,
                        luck: 10
                    }
                },
                nextText: 7

            },
            {
                text: 'next',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        dialogue: 'A clan of Tough warriors, with elite strength and defensive abilities, they use their battle cries to instill fear in their enemies.',
        options: [
            {

                text: 'previous',
                nextText: 4
            },
            {
                text: 'Select Tusk Clan!',
                setState: {
                    class: { warrior: true }
                },
                nextText: 7
            },
            {
                text: 'next',
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        dialogue: 'TBD',
        options: [
            {

                text: 'previous',
                nextText: 5
            },
            {
                text: 'Coming Soon!',
                // nextText: 7
            },
            {
                text: 'next',
                nextText: 4
            }
        ]
    },
    {
        id: 7,
        dialogue: 'Welcome Warrior to Text Game Online',
        options: [
            {

                text: 'disabled',

            },
            {
                text: 'Step Forth',
                nextText: 8
            },
            {
                text: '(assassin) pick pocket the bartender',
                requirementText: 'You do not meet the requirement for this choice',
                requiredState: (currentState) => currentState.class.assassin,
                nextText: 8
            }
        ]
    },
    {
        id: 8,
        dialogue: 'test',
        options: [
            {

                text: 'disabled',
                // nextText: 6
            },
            {
                text: 'disabled',
                // nextText: 7
            },
            {
                text: 'disabled',
                // nextText: 5
            }
        ]
    }
];


// const story = {
//     intro: {

//         step1: {
//             dia: 'It is night fall. After a long journey through the country of purus, after fighting off fiends and enemies alike you find yourself tired, famished and low on water. You see a dimly lit town in the distance and decide to seek shelter for the night.',
//             option1: {
//                 text: 'disabled'

//             },
//             option2: {
//                 text: 'Enter The Town',
//                 value: 'proceed'

//             },
//             option3: {
//                 text: 'disabled'
//             }
//         },
//         step2: {
//             dia: 'As you enter the town, you see what looks like a tavern. You say to yourself "Thank the heavens". as you stumble up the steps, you walk through the door. as you walk up to the bar, you see a fair maiden serving tables and can feel the gaze of the patrons upon you.',
//             option1: {
//                 text: 'disabled',
//                 value: 1
//             },
//             option2: {
//                 text: 'Sit at the bar',
//                 value: 'proceed'
//             },
//             option3: {
//                 text: 'disabled',
//                 value: 3
//             }
//         },
//         step3: {
//             dia: 'The bartender walks toward you, "woah, you look horrid, let me get you drink, here it\'s on the house." so tell me, where are you from stranger?',
//             option1: {
//                 text: 'disabled',
//                 value: 1
//             },
//             option2: {
//                 text: 'Choose Your Race',
//                 value: 'proceed'
//             },
//             option3: {
//                 text: 'disabled',
//                 value: 3
//             }
//         },
//         step4: 'next'

//     },
//     creation: {
//         step1: {
//             dia: 'Home to some of the worlds most lethal assassins. Masters of the shadow and stealth arts. This tribe relies on Agility to take down their foes as quick as possible, while mitigating the damage they receive.',
//             option1: 'prev',
//             option2: 'The Raven Tribe',
//             option3: 'next'
//         },
//         step2: {
//             dia: '',
//             option1: '',
//             option2: '',
//             option3: ''
//         },
//         step3: {
//             dia: '',
//             option1: '',
//             option2: '',
//             option3: ''
//         }
//     }

// }
//const charTribe = {
    //     raven: 'The Raven Tribe',
    //     description: 'Home to some of the worlds most lethal assassins. Masters of the shadow and stealth arts. This tribe relies on Agility to take down their foes as quick as possible, while mitigating the damage they receive.'
    // }


// const character = {
//     name: Donyuns,
//     level: 1,
//     tribe: 'unknown',
//     strength: 'unknown',
//     intelligence: 'unknown',
//     agility: 'unknown',
// };

// option2.addEventListener('click', () => {
//     dialogue.innerText = charTribe.description;
//     option1.innerText = "prev";
//     option2.innerText = charTribe.raven;
//     option3.innerText = "next";
// })