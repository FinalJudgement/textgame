const contents = ['intro', 'creation'];
const launch = document.querySelector('#launch');
const dialogue = document.querySelector('#dialogue');
const choiceBtns = document.querySelectorAll('.choices');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
let chapter = 0;
let counter = 1;
let count = counter.toString();

// function startGame(1){

// }

launch.addEventListener('click', () => {
    for (let ea of choiceBtns) { ea.classList.toggle('invisible'); }
    launch.classList.toggle('invisible');
    dialogue.innerText = story[contents[chapter]]['step' + count]['dia']
    option1.innerText = story[contents[chapter]]['step' + count]['option1']['text'];
    option2.innerText = story[contents[chapter]]['step' + count]['option2']['text'];
    option3.innerText = story[contents[chapter]]['step' + count]['option3']['text'];

    counter++
    count = counter.toString();
})

option2.addEventListener('click', () => {
    if (story[contents[chapter]]['step' + count] === 'next') {
        chapter++
        counter = 1
    }
    dialogue.innerText = story[contents[chapter]]['step' + count]['dia']
    option1.innerText = story[contents[chapter]]['step' + count]['option1']['text'];
    option2.innerText = story[contents[chapter]]['step' + count]['option2']['text'];
    option3.innerText = story[contents[chapter]]['step' + count]['option3']['text'];
    counter++
    count = counter.toString();

})



const story = {
    intro: {

        step1: {
            dia: 'It is night fall. After a long journey through the country of purus, after fighting off fiends and enemies alike you find yourself tired, famished and low on water. You see a dimly lit town in the distance and decide to seek shelter for the night.',
            option1: {
                text: 'disabled'

            },
            option2: {
                text: 'Enter The Town',
                value: 'proceed'

            },
            option3: {
                text: 'disabled'
            }
        },
        step2: {
            dia: 'As you enter the town, you see what looks like a tavern. You say to yourself "Thank the heavens". as you stumble up the steps, you walk through the door. as you walk up to the bar, you see a fair maiden serving tables and can feel the gaze of the patrons upon you.',
            option1: {
                text: 'disabled',
                value: 1
            },
            option2: {
                text: 'Sit at the bar',
                value: 'proceed'
            },
            option3: {
                text: 'disabled',
                value: 3
            }
        },
        step3: {
            dia: 'The bartender walks toward you, "woah, you look horrid, let me get you drink, here it\'s on the house." so tell me, where are you from stranger?',
            option1: {
                text: 'disabled',
                value: 1
            },
            option2: {
                text: 'Choose Your Race',
                value: 'proceed'
            },
            option3: {
                text: 'disabled',
                value: 3
            }
        },
        step4: 'next'

    },
    creation: {
        step1: {
            dia: 'Home to some of the worlds most lethal assassins. Masters of the shadow and stealth arts. This tribe relies on Agility to take down their foes as quick as possible, while mitigating the damage they receive.',
            option1: 'prev',
            option2: 'The Raven Tribe',
            option3: 'next'
        },
        step2: {
            dia: '',
            option1: '',
            option2: '',
            option3: ''
        },
        step3: {
            dia: '',
            option1: '',
            option2: '',
            option3: ''
        }
    }

}
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