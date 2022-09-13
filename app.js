//These variables are used to grab an element for manipulation.
const launchButtonElement = document.querySelector('#launch');
const dialogueElement = document.querySelector('#dialogue');
const wrapElement = document.querySelector('#wrap');
const contentElement = document.querySelector('#content');
const choiceButtonElements = document.querySelector('#choices');
const choiceBtnsElement = document.querySelectorAll('.choice');
const characterButtonElement = document.querySelector('#character')
const menuButtonElement = document.querySelector('#menu');


let characterState = {
    info: {},
    inventory: {},
    abilities: {}
};

function startGame() {
    characterState = {
        info: {},
        inventory: {},
        abilities: {}
    };
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

//This is the event listener for the original Launch button
launchButtonElement.addEventListener('click', () => {
    for (let ea of choiceBtnsElement) { ea.classList.toggle('invisible'); }
    launchButtonElement.classList.toggle('invisible');
    document.querySelector('.cover').remove();
    startGame();
})

//This is the event listener for everything in the menu
menuButtonElement.addEventListener('click', () => {
    //this creates the menu interface
    const menu = document.createElement('div');
    menu.classList.add('menu-ui');
    // this creates the menu escape button
    const createBackButton = document.createElement('button')
    createBackButton.innerText = 'Back'
    createBackButton.addEventListener('click', () => {
        menu.remove();
    })
    menu.appendChild(createBackButton)


    // this creates the 3 options to view your characters info
    for (let key in characterState) {
        const button = document.createElement('button');
        button.innerText = key;
        button.addEventListener('click', () => {
            const infoWindow = document.createElement('div');
            infoWindow.classList.add('info-window');

            for (let ea in characterState[key]) {
                infoWindow.innerHTML += `<p class='stat-style'>${ea}: ${characterState[key][ea]}</p>`
            }

            menu.appendChild(infoWindow)
        })
        menu.appendChild(button)
    }

    //this creates the reset button
    const createResetButton = document.createElement('button');
    createResetButton.innerText = 'Reset Game';
    createResetButton.addEventListener('click', () => {
        const resetWarning = document.createElement('div');
        resetWarning.innerHTML = '<p>Are you sure you want to Reset? All progress will be lost.</p>'
        resetWarning.classList.add('reset')
        menu.appendChild(resetWarning)

        const yesBtn = document.createElement('button')
        yesBtn.innerText = 'Yes'
        yesBtn.addEventListener('click', () => {
            menu.remove()
            startGame()

        })
        resetWarning.appendChild(yesBtn)

        const noBtn = document.createElement('button')
        noBtn.innerText = 'No'
        noBtn.addEventListener('click', () => {
            resetWarning.remove()
        })
        resetWarning.appendChild(noBtn)

    })
    menu.appendChild(createResetButton)

    wrapElement.appendChild(menu)

})

// characterButtonElement.addEventListener('click', () => {
//     contentElement.innerHTML = `Class: ${characterState.class.name}<br>
//                         agility: ${characterState.class.agility}<br>
//                         strength: ${characterState.class.strength}<br>
//                         intelligence: ${characterState.class.intelligence}<br>
//                         speed: ${characterState.class.speed}<br>
//                         luck: ${characterState.class.luck}<br>`;
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
                text: 'Select Shadow Embers',
                setState: {
                    info: {
                        class: 'Assassin',
                        agility: 15,
                        strength: 5,
                        intelligence: 8,
                        speed: 10,
                        luck: 8,
                        charisma: 8
                    },
                    inventory: {},
                    abilities: {}
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
                text: 'Select Iron Dragon Knights',
                setState: {
                    info: {
                        class: 'Warrior',
                        agility: 15,
                        strength: 5,
                        intelligence: 8,
                        speed: 10,
                        luck: 8,
                        charisma: 8
                    },
                    inventory: {},
                    abilities: {}
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
        dialogue: 'A clan of Mystery, with the power to wield fire, ice, lightning, and wind. There are few that would oppose them.',
        options: [
            {

                text: 'previous',
                nextText: 5
            },
            {
                text: 'Select Luna Fox',
                setState: {
                    info: {
                        class: 'Mage',
                        agility: 15,
                        strength: 5,
                        intelligence: 8,
                        speed: 10,
                        luck: 8,
                        charisma: 8
                    },
                    inventory: {},
                    abilities: {}
                },
                nextText: 7

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
                requiredState: (currentState) => currentState.info.class === "Assassin",
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
