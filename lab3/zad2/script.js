const setButton = document.querySelector('#setButton')
const deleteButton = document.querySelector('#deleteButton')
const addButton = document.querySelector('#addButton')

const koncertWojskiego = ["Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi,cętkowany, kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdąłpoliczki jak banię, w oczach krwią zabłysnął, Zasunął wpół powieki,wciągnął w głąb pół brzucha I do płuc wysłał z niego cały zapasducha, I zagrał: róg jak wicher, wirowatym dechem Niesie w puszczę muzykę i podwaja echem.",
"Umilkli strzelcy, stali szczwacze zadziwieni Mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt, którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w nie wpuścił i rozpoczął łowy.",
"Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki po jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: to strzelanie."
]

const main = document.querySelector('main');

let currentPatagraphIdx = 0;

addButton.addEventListener('click',()=>{
    if(currentPatagraphIdx >= koncertWojskiego.length){
        return;
    }

    const paragraph = document.createElement('blockquote');
    const text = document.createTextNode(koncertWojskiego[currentPatagraphIdx]);

    paragraph.appendChild(text);
    main.appendChild(paragraph);
    currentPatagraphIdx++;

    if(currentPatagraphIdx >= koncertWojskiego.length){
        addButton.disabled = true;
    }

});




deleteButton.addEventListener('click',()=>{

    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        element.removeAttribute('style');
    });

    const style = document.querySelectorAll('style');
    style.forEach(element => {
        element.remove();
    });
});




const keyframes = `
@keyframes changeColors {
    from {
        color: var(--text-color-initial);
    }
    to {
        color: var(--text-color-final);
    }
}`;

setButton.addEventListener('click',()=>{

    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);


    //azure
    const azures = document.querySelectorAll('.azure');

    azures.forEach(element => {
        element.style.backgroundColor = '#F0FFFF';
        element.style.borderColor = '#3c393';
        element.style.borderWidth = '2px';
        element.style.borderStyle = 'solid';
        element.style.boxShadow = '0 0 10px #A8A8A8';
        
    });

    //body
    const body = document.querySelector('body');

    body.style.fontFamily = 'Arial, sans-serif';
    body.style.boxSizing = 'border-box';
    body.style.fontSize = '0.7rem';

    //flexpanel
    const flexpanel = document.querySelector('.flexpanel');

    flexpanel.style.display = 'block';
    flexpanel.style.margin = '0';
    flexpanel.style.padding = '0';
    flexpanel.style.display = 'flex';
    flexpanel.style.flexDirection = 'row';
    flexpanel.style.justifyContent = 'space-between';
    flexpanel.style.alignItems = 'flex-start';
    flexpanel.style.margin = '1rem';

    //main
    const main = document.querySelector('main');

    main.style.margin = '0';
    main.style.padding = '0';
    main.style.width = 'unset';

    // nav
    const nav = document.querySelector('nav');

    nav.style.margin = '0';
    nav.style.padding = '0';
    nav.style.width = 'unset';

    // header
    const header = document.querySelector('header');

    header.style.margin = '0';
    header.style.padding = '0';
    header.style.display = 'flex';
    header.style.justifyContent = 'center';

    // nav ul
    const navUl = document.querySelector('nav ul');

    navUl.style.display = 'flex';
    navUl.style.flexDirection = 'column';
    navUl.style.justifyContent = 'center';
    navUl.style.alignItems = 'center';
    navUl.style.padding = '0';

    // Main h1, blockquote
    const mainH1 = document.querySelector('main h1');
    const blockquote = document.querySelectorAll('blockquote');

    blockquote.forEach(element => {
        element.style.textAlign = 'center';
    })

    mainH1.style.textAlign = 'center';
    mainH1.style.margin = '1rem';
    mainH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Aside h1, h2
    const asideH1 = document.querySelector('aside h1');
    const asideH2 = document.querySelector('aside h2');

    asideH1.style.textAlign = 'center';
    asideH1.style.animation = 'changeColors 2s alternate infinite ease-in';
    asideH2.style.textAlign = 'center';

    // Aside
    const aside = document.querySelector('aside');

    aside.style.margin = '0';
    aside.style.padding = '0';

    // Aside ul
    const asideUl = document.querySelector('aside ul');

    asideUl.style.display = 'flex';
    asideUl.style.flexDirection = 'column';
    asideUl.style.justifyContent = 'center';
    asideUl.style.alignItems = 'center';
    asideUl.style.padding = '0';

    // Footer
    const footer = document.querySelector('footer');

    footer.style.padding = '0';
    footer.style.margin = '0';
    footer.style.display = 'flex';
    footer.style.justifyContent = 'center';
    footer.style.paddingTop = '0.5rem';
    footer.style.paddingBottom = '0.5rem';

    document.documentElement.style.setProperty('--text-color-initial', 'lightgreen');
    document.documentElement.style.setProperty('--text-color-final', 'red');

    const headerH1 = document.querySelector('header h1');

    headerH1.style.margin = '1rem';
    headerH1.style.animation = 'changeColors 2s alternate infinite ease-in';



    if(window.matchMedia('(max-width: 10000px)').matches){

        stylesForMaxWidth10000px();
    }

    if(window.matchMedia('(max-width: 1440px)').matches){

        stylesForMaxWidth1440px();

    }

    if(window.matchMedia('(max-width: 1280px)').matches){

        stylesForMaxWidth1280px();

    }

    if(window.matchMedia('(max-width: 1024px)').matches){

        stylesForMaxWidth1024px();

    }

    if(window.matchMedia('(max-width: 920px)').matches){

        stylesForMaxWidth920px();

    }

    if(window.matchMedia('(max-width: 768px)').matches){

        stylesForMaxWidth768px();

    }

    if(window.matchMedia('(max-width: 580px)').matches){
            
        stylesForMaxWidth580px();

    }

    if(window.matchMedia('(max-width: 480px)').matches){

        stylesForMaxWidth480px();

    }

    if(window.matchMedia('(max-width: 270px)').matches){
            
        stylesForMaxWidth270px();

    }


    

    

});

const stylesForMaxWidth270px = () => {

    // Flexpanel
    const flexpanel = document.querySelector('.flexpanel');
    flexpanel.style.height = 'unset';
    flexpanel.style.minHeight = '100vh';

    // Footer
    const footer = document.querySelector('footer');
    footer.style.flexShrink = '0';

};

const stylesForMaxWidth480px = () => {
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.boxSizing = 'border-box';
    document.body.style.fontSize = '0.7rem';

    // Flexpanel
    const flexpanel = document.querySelector('.flexpanel');
    flexpanel.style.display = 'block';
    flexpanel.style.margin = '0';
    flexpanel.style.padding = '0';

    // Main
    const main = document.querySelector('main');
    main.style.width = 'unset';

    // Nav
    const nav = document.querySelector('nav');
    nav.style.margin = '0';
    nav.style.padding = '0';
    nav.style.width = 'unset';

    // Header
    const header = document.querySelector('header');
    header.style.margin = '0';
    header.style.padding = '0';
    header.style.display = 'flex';
    header.style.justifyContent = 'center';

    // Nav ul
    const navUl = document.querySelector('nav ul');
    navUl.style.display = 'flex';
    navUl.style.flexDirection = 'column';
    navUl.style.justifyContent = 'center';
    navUl.style.alignItems = 'center';
    navUl.style.padding = '0';

    // Main h1, blockquote
    const mainH1 = document.querySelector('main h1');
    const blockquote = document.querySelectorAll('blockquote');
    mainH1.style.textAlign = 'center';

    blockquote.forEach(element => {
        element.style.textAlign = 'center';
    });

    // Aside h1, h2
    const asideH1 = document.querySelector('aside h1');
    const asideH2 = document.querySelector('aside h2');
    asideH1.style.textAlign = 'center';
    asideH2.style.textAlign = 'center';

    // Aside
    const aside = document.querySelector('aside');
    aside.style.margin = '0';
    aside.style.padding = '0';

    // Aside ul
    const asideUl = document.querySelector('aside ul');
    asideUl.style.display = 'flex';
    asideUl.style.flexDirection = 'column';
    asideUl.style.justifyContent = 'center';
    asideUl.style.alignItems = 'center';
    asideUl.style.padding = '0';

    // Footer
    const footer = document.querySelector('footer');
    footer.style.padding = '0';
    footer.style.margin = '0';
    footer.style.display = 'flex';
    footer.style.justifyContent = 'center';
    footer.style.paddingTop = '0.5rem';
    footer.style.paddingBottom = '0.5rem';
    footer.style.flexShrink = '1';
};


const stylesForMaxWidth580px = () => {
    const main = document.querySelector('main');
    main.style.width = '15rem';

    // Aside
    const aside = document.querySelector('aside');
    aside.style.paddingRight = '3rem';
    aside.style.marginLeft = '0.5rem';
};

const stylesForMaxWidth768px = () => {
     // Body
    document.body.style.fontSize = '0.8rem';

    // Aside
    const aside = document.querySelector('aside');
    aside.style.paddingRight = '6rem';
    aside.style.marginLeft = '2rem';

    // Aside h1, h2
    const asideH1 = document.querySelector('aside h1');
    const asideH2 = document.querySelector('aside h2');
    asideH1.style.margin = '0';
    asideH2.style.margin = '0';
    asideH1.style.marginLeft = '0.2rem';

    // Aside h1 animation
    asideH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Footer
    const footer = document.querySelector('footer');
    footer.style.marginLeft = '0.5rem';

    // Footer, a
    const footerA = document.querySelectorAll('footer, a');
    footerA.forEach(element => {
        element.style.paddingLeft = '0.2rem';
        element.style.paddingBottom = '0.5rem';
        element.style.paddingTop = '0.5rem';
    });

    // Header
    const header = document.querySelector('header');
    header.style.margin = '0.5rem';

    // Header h1 animation
    const headerH1 = document.querySelector('header h1');
    headerH1.style.margin = '0.2rem';
    headerH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Main
    const main = document.querySelector('main');
    main.style.width = '18rem';

    // Main blockquote
    const blockquote = document.querySelectorAll('main blockquote');
    blockquote.forEach(element => {
        element.style.fontSize = '0.78rem';
        element.style.margin = '0.2rem';
        element.style.marginRight = '1rem';
        element.style.fontFamily = 'monospace';
    });

    // Main h1 animation
    const mainH1 = document.querySelector('main h1');
    mainH1.style.margin = '0.5rem';
    mainH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Nav
    const nav = document.querySelector('nav');
    nav.style.width = '7rem';
    nav.style.marginBottom = '1rem';

    // Flexpanel
    const flexpanel = document.querySelector('.flexpanel');
    flexpanel.style.display = 'flex';
    flexpanel.style.flexDirection = 'row';
    flexpanel.style.justifyContent = 'space-between';
    flexpanel.style.alignItems = 'flex-start';
    flexpanel.style.margin = '0.5rem';
};


const stylesForMaxWidth920px = () => {
    // Aside
    const aside = document.querySelector('aside');
    aside.style.paddingRight = '10rem';
    aside.style.marginLeft = '4rem';
};



const stylesForMaxWidth1024px = () => {
    document.body.style.fontSize = '1rem';

    // Aside
    const aside = document.querySelector('aside');
    aside.style.paddingRight = '17rem';
    aside.style.marginLeft = '5rem';

    // Aside h1, h2
    const asideH1 = document.querySelector('aside h1');
    const asideH2 = document.querySelector('aside h2');
    asideH1.style.margin = '0';
    asideH2.style.margin = '0';
    asideH1.style.marginLeft = '0.2rem';

    // Aside h1 animation
    asideH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Footer
    const footer = document.querySelector('footer');
    footer.style.marginLeft = '0.5rem';

    // Footer, a
    const footerA = document.querySelectorAll('footer, a');
    footerA.forEach(element => {
        element.style.paddingLeft = '0.2rem';
        element.style.paddingBottom = '0.5rem';
        element.style.paddingTop = '0.5rem';
    });

    // Header
    const header = document.querySelector('header');
    header.style.margin = '0.5rem';

    // Header h1 animation
    const headerH1 = document.querySelector('header h1');
    headerH1.style.margin = '0.2rem';
    headerH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Main
    const main = document.querySelector('main');
    main.style.width = '24rem';
    main.style.paddingBottom = '2rem';

    // Main blockquote
    const blockquote = document.querySelectorAll('main blockquote');
    blockquote.forEach(element => {
        element.style.fontSize = '0.9rem';
        element.style.margin = '0.2rem';
        element.style.marginRight = '1rem';
        element.style.fontFamily = 'monospace';
    });

    // Main h1 animation
    const mainH1 = document.querySelector('main h1');
    mainH1.style.margin = '0.5rem';
    mainH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Nav
    const nav = document.querySelector('nav');
    nav.style.width = '7rem';
    nav.style.marginBottom = '1rem';

    // Flexpanel
    const flexpanel = document.querySelector('.flexpanel');
    flexpanel.style.display = 'flex';
    flexpanel.style.flexDirection = 'row';
    flexpanel.style.justifyContent = 'space-between';
    flexpanel.style.alignItems = 'flex-start';
    flexpanel.style.margin = '0.5rem';
};

const stylesForMaxWidth1280px = () => {
    // Body
    document.body.style.fontSize = '1rem';

    // Aside
    const aside = document.querySelector('aside');
    aside.style.paddingRight = '16rem';
    aside.style.marginLeft = '2rem';

    // Aside h1, h2
    const asideH1 = document.querySelector('aside h1');
    const asideH2 = document.querySelector('aside h2');
    asideH1.style.margin = '0';
    asideH2.style.margin = '0';
    asideH1.style.marginLeft = '0.2rem';

    // Aside h1 animation
    asideH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Footer
    const footer = document.querySelector('footer');
    footer.style.marginLeft = '0.5rem';

    // Footer, a
    const footerA = document.querySelectorAll('footer, a');
    footerA.forEach(element => {
        element.style.paddingLeft = '0.2rem';
        element.style.paddingBottom = '0.5rem';
        element.style.paddingTop = '0.5rem';
    });

    // Header
    const header = document.querySelector('header');
    header.style.margin = '0.5rem';

    // Header h1 animation
    const headerH1 = document.querySelector('header h1');
    headerH1.style.margin = '0.2rem';
    headerH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Main
    const main = document.querySelector('main');
    main.style.width = '28rem';
    main.style.paddingBottom = '2rem';

    // Main blockquote
    const blockquote = document.querySelectorAll('main blockquote');
    blockquote.forEach(element => {
        element.style.fontSize = '0.9rem';
        element.style.margin = '0.2rem';
        element.style.marginRight = '1rem';
        element.style.fontFamily = 'monospace';
    });

    // Main h1 animation
    const mainH1 = document.querySelector('main h1');
    mainH1.style.margin = '0.5rem';
    mainH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Nav
    const nav = document.querySelector('nav');
    nav.style.width = '9rem';
    nav.style.marginBottom = '1rem';

    // Flexpanel
    const flexpanel = document.querySelector('.flexpanel');
    flexpanel.style.display = 'flex';
    flexpanel.style.flexDirection = 'row';
    flexpanel.style.justifyContent = 'space-between';
    flexpanel.style.alignItems = 'flex-start';
    flexpanel.style.margin = '0.5rem';
};



const stylesForMaxWidth1440px = () => {
    document.body.style.fontSize = '1.1rem';

    // Aside
    const aside = document.querySelector('aside');
    aside.style.paddingRight = '24rem';
    aside.style.marginLeft = '4rem';

    // Footer
    const footer = document.querySelector('footer');
    footer.style.marginLeft = '0.8rem';

    // Footer, a
    const footerA = document.querySelectorAll('footer, a');
    footerA.forEach(element => {
        element.style.paddingLeft = '0.2rem';
        element.style.paddingBottom = '0.5rem';
        element.style.paddingTop = '0.5rem';
    });

    // Header
    const header = document.querySelector('header');
    header.style.margin = '0.8rem';

    // Header h1 animation
    const headerH1 = document.querySelector('header h1');
    headerH1.style.margin = '0.8rem';
    headerH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Main
    const main = document.querySelector('main');
    main.style.width = '40rem';
    main.style.paddingBottom = '2rem';

    // Main blockquote
    const blockquote = document.querySelectorAll('main blockquote');
    blockquote.forEach(element => {
        element.style.fontSize = '0.95rem';
        element.style.margin = '0.3rem';
        element.style.marginRight = '1.8rem';
        element.style.fontFamily = 'monospace';
    });


    // Main h1 animation
    const mainH1 = document.querySelector('main h1');
    mainH1.style.margin = '0.5rem';
    mainH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Nav
    const nav = document.querySelector('nav');
    nav.style.width = '9rem';
    nav.style.marginBottom = '1rem';

    // Flexpanel
    const flexpanel = document.querySelector('.flexpanel');
    flexpanel.style.display = 'flex';
    flexpanel.style.flexDirection = 'row';
    flexpanel.style.justifyContent = 'space-between';
    flexpanel.style.alignItems = 'flex-start';
    flexpanel.style.margin = '0.8rem';
};



const stylesForMaxWidth10000px = () => {
    document.body.style.fontSize = '1rem';

    // Aside
    const aside = document.querySelector('aside');
    aside.style.paddingRight = '27rem';
    aside.style.marginLeft = '5rem';

    // Aside h1, h2
    const asideH1 = document.querySelector('aside h1');
    const asideH2 = document.querySelector('aside h2');
    asideH1.style.margin = '0';
    asideH2.style.margin = '0';
    asideH1.style.marginLeft = '0.5rem';

    // Aside h1 animation
    asideH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Footer
    const footer = document.querySelector('footer');
    footer.style.marginLeft = '1rem';

    // Footer, a
    const footerA = document.querySelectorAll('footer, a');
    footerA.forEach(element => {
        element.style.paddingLeft = '0.2rem';
        element.style.paddingBottom = '0.5rem';
        element.style.paddingTop = '0.5rem';
    });

    // Header
    const header = document.querySelector('header');
    header.style.margin = '1rem';

    // Header h1 animation
    const headerH1 = document.querySelector('header h1');
    headerH1.style.margin = '0.2rem';
    headerH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Main
    const main = document.querySelector('main');
    main.style.width = '43rem';
    main.style.paddingBottom = '2rem';

    // Main blockquote
    const blockquote = document.querySelectorAll('main blockquote');
    blockquote.forEach(element => {
        element.style.fontSize = '1rem';
        element.style.margin = '0.5rem';
        element.style.marginRight = '2rem';
        element.style.fontFamily = 'monospace';
        element.style.letterSpacing = '0.01px';
    });

    // Main h1 animation
    const mainH1 = document.querySelector('main h1');
    mainH1.style.margin = '1rem';
    mainH1.style.animation = 'changeColors 2s alternate infinite ease-in';

    // Nav
    const nav = document.querySelector('nav');
    nav.style.width = '9rem';
    nav.style.marginBottom = '1rem';

    // Flexpanel
    const flexpanel = document.querySelector('.flexpanel');
    flexpanel.style.display = 'flex';
    flexpanel.style.flexDirection = 'row';
    flexpanel.style.justifyContent = 'space-between';
    flexpanel.style.alignItems = 'flex-start';
    flexpanel.style.margin = '1rem';
};