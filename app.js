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
    info: {
        note: 'You have no character info yet'
    },
    inventory: {
        note: 'You have no items in your inventory'
    },
    abilities: {
        note: 'You have not learned any abilities yet'
    }
};

function startGame() {
    characterState = {
        info: {
            note: 'You have no character info yet'
        },
        inventory: {
            note: 'You have no items in your inventory'
        },
        abilities: {
            note: 'You have not learned any abilities yet'
        }
    };
    showSlide('img1.jpg')
    showDialogue(1);
}

function showSlide(storySlide) {
    const createStorySlide = document.createElement('img');
    createStorySlide.classList.add('storyImg')
    createStorySlide.src = `images/${storySlide}`;
    contentElement.removeChild(contentElement.firstChild);
    contentElement.appendChild(createStorySlide);
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
    const nextStoryImage = option.imgSlide;
    characterState = Object.assign(characterState, option.setState)
    const click = new Audio("Sounds/click.wav");
    click.play(); const createStorySlide = document.createElement('img')

    showSlide(nextStoryImage)
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
    const click = new Audio("Sounds/launch.wav");
    const song = new Audio("Sounds/launchSong.mp3");
    let volume = document.querySelector('#volume-knob');

    volume.addEventListener('change', (e) => {
        song.volume = e.currentTarget.value / 100;
    })
    click.play();
    song.play();
    startGame();
})

//This is the event listener for everything in the menu

menuButtonElement.addEventListener('click', () => {
    const click = new Audio("Sounds/menu.wav");
    click.play();
    //this creates the menu interface
    const menu = document.createElement('div');
    menu.classList.add('menu-ui');
    // this creates the menu escape button
    const createBackButton = document.createElement('button')
    createBackButton.innerText = 'Back'
    createBackButton.addEventListener('mouseover', () => {
        const click = new Audio("Sounds/click.wav");
        click.play();
    })
    createBackButton.addEventListener('click', () => {
        const click = new Audio("Sounds/click2.wav");
        click.play();
        menu.remove();
    })
    menu.appendChild(createBackButton)


    // this creates the 3 options to view your characters info
    for (let key in characterState) {
        const button = document.createElement('button');
        button.innerText = key;
        button.addEventListener('mouseover', () => {
            const click = new Audio("Sounds/click.wav");
            click.play();
        })
        button.addEventListener('click', () => {
            const click = new Audio("Sounds/click2.wav");
            click.play();
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
    createResetButton.addEventListener('mouseover', () => {
        const click = new Audio("Sounds/click.wav");
        click.play();
    })
    createResetButton.addEventListener('click', () => {
        const click = new Audio("Sounds/click2.wav");
        click.play();
        const resetWarning = document.createElement('div');
        resetWarning.innerHTML = '<p>Are you sure you want to Reset? All progress will be lost.</p>'
        resetWarning.classList.add('reset')
        menu.appendChild(resetWarning)

        const yesBtn = document.createElement('button')
        yesBtn.innerText = 'Yes'
        yesBtn.addEventListener('mouseover', () => {
            const click = new Audio("Sounds/click.wav");
            click.play();
        })
        yesBtn.addEventListener('click', () => {
            const click = new Audio("Sounds/menu.wav");
            showSlide("img1.jpg")
            click.play();
            menu.remove()
            startGame()

        })
        resetWarning.appendChild(yesBtn)

        const noBtn = document.createElement('button')
        noBtn.addEventListener('mouseover', () => {
            const click = new Audio("Sounds/click.wav");
            click.play();
        })
        noBtn.innerText = 'No'
        noBtn.addEventListener('click', () => {
            const click = new Audio("Sounds/click2.wav");
            click.play();
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
        dialogue: 'It is nightfall. After a long journey through the country of Purus, after fighting off fiends and enemies alike, you find yourself tired, hungry, and low on water. You see a dimly lit town in the distance and decide to seek shelter for the night.',
        options: [
            {

                text: 'Introduction',
                imgSlide: 'img1.jpg'
            },
            {
                text: 'Enter the town',
                nextText: 2,
                imgSlide: 'img2.jpg'
            },
            {
                text: 'Introduction',
                imgSlide: 'img1.jpg'
            }
        ]
    },
    {
        id: 2,
        dialogue: 'As you enter the town, you see what looks like a tavern. You say to yourself "Thank the heavens" as you stumble up the steps.',
        options: [
            {

                text: 'Introduction',
                imgSlide: 'img2.jpg'
            },
            {
                text: 'Walk into the tavern',
                nextText: 3,
                imgSlide: 'img3.jpg'
            },
            {
                text: 'Introduction',
                imgSlide: 'img2.jpg'
            }
        ]
    },
    {
        id: 3,
        dialogue: 'You walk through the door, as you walk up to the bar, you see a fair maiden serving tables and can feel the gaze of the patrons upon you.',
        options: [
            {

                text: 'Introduction',
                imgSlide: 'img3.jpg'
            },
            {
                text: 'Sit at the bar',
                nextText: 4,
                imgSlide: 'img4.jpg'
            },
            {
                text: 'Introduction',
                imgSlide: 'img3.jpg'
            }
        ]
    },
    {
        id: 4,
        dialogue: 'The bartender walks toward you. "Greetings traveller, you look worse for wear, let me get you a drink, it\'s on the house. So tell me, where are you from stranger?"',
        options: [
            {

                text: 'Introduction',
                imgSlide: 'img4.jpg'
            },
            {
                text: 'Choose Your Race',
                nextText: 5,
                imgSlide: 'assassin.jpg'
            },
            {
                text: 'Introduction',
                imgSlide: 'img4.jpg'
            }
        ]
    },
    {
        id: 5,
        dialogue: 'The Shadows Ember, an elite class of assassins known for their cunning and prowess. They train bird of prey, and use their stealth to bring their enemies down swiftly.',
        options: [
            {

                text: 'Luna Fox',
                nextText: 7,
                imgSlide: 'mage.jpg'
            },
            {
                text: 'Select Shadows Ember',
                setState: {
                    info: {
                        class: 'Assassin',
                        health: 120,
                        agility: 10,
                        strength: 5,
                        intelligence: 5,
                        speed: 7,
                        luck: 8,
                        charisma: 5
                    },
                    inventory: {
                        note: 'You have no items in your inventory'
                    },
                    abilities: {
                        note: 'You have not learned any abilities yet'
                    }
                },
                nextText: 8,
                imgSlide: 'img4.jpg'

            },
            {
                text: 'Dragon Knight',
                nextText: 6,
                imgSlide: 'warrior.jpg'
            }
        ]
    },
    {
        id: 6,
        dialogue: 'The Dragon Knights, An elite class of warriors known for their strength and fearlessness. They use their battle cries to instill fear in their enemies and turn the tides of battle.',
        options: [
            {

                text: 'Shadows Ember',
                nextText: 5,
                imgSlide: 'assassin.jpg'
            },
            {
                text: 'Dragon Knights (Unavailable)',
                setState: {
                    info: {
                        class: 'Warrior',
                        health: 150,
                        agility: 7,
                        strength: 10,
                        intelligence: 5,
                        speed: 6,
                        luck: 4,
                        charisma: 8
                    },
                    inventory: {
                        note: 'You have no items in your inventory'
                    },
                    abilities: {
                        note: 'You have not learned any abilities yet'
                    }
                },
                nextText: 6,
                imgSlide: 'warrior.jpg'

            },
            {
                text: 'Luna Fox',
                nextText: 7,
                imgSlide: 'mage.jpg'
            }
        ]
    },
    {
        id: 7,
        dialogue: 'The Luna Fox, A mysterious class mages known for their intelligence and magical ability, They wield the power of the elements to bring a quick end to their enemies. There are few that would oppose them.',
        options: [
            {

                text: 'Dragon Knight',
                nextText: 6,
                imgSlide: 'warrior.jpg'
            },
            {
                text: 'Luna Fox (Unavailable)',
                setState: {
                    info: {
                        class: 'Mage',
                        health: 100,
                        agility: 5,
                        strength: 5,
                        intelligence: 10,
                        speed: 6,
                        luck: 7,
                        charisma: 7
                    },
                    inventory: {
                        note: 'You have no items in your inventory'
                    },
                    abilities: {
                        note: 'You have not learned any abilities yet'
                    }
                },
                nextText: 7,
                imgSlide: 'mage.jpg'

            },
            {
                text: 'Shadows Ember',
                nextText: 5,
                imgSlide: 'assassin.jpg'
            }
        ]
    },
    {
        id: 8,
        dialogue: 'Interesting, a member of the famous assassins guild? you must be quite skilled. My name is Daria, what is yours?',
        options: [
            {

                text: 'Introduction',
                imgSlide: 'img4.jpg'

            },
            {
                text: 'Enter Name (Unavailable)',
                nextText: 8,
                imgSlide: 'img4.jpg'
            },
            {
                text: 'Introduction',
                imgSlide: 'img4.jpg'
                // text: '(assassin) pick pocket the bartender',
                // requirementText: 'You do not meet the requirement for this choice',
                // requiredState: (currentState) => currentState.info.class === "Assassin",

            }
        ]
    },
    {
        id: 9,
        dialogue: 'Welcome Warrior, This is a hero\'s Tale',
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
