function funkcja_zwrotna(){
    const poleTxtVal = document.forms[0].elements["pole_tekstowe"].value;
    const poleNumVal = document.forms[0].elements["pole_liczbowe"].value;
    console.log(`${poleTxtVal}:${typeof poleTxtVal}`);
    console.log(`${poleNumVal}:${typeof poleNumVal}`);
}
function funkcja_testowa(){
    for (let i = 0; i < 4; i++) {
        const wczytanaWartosc = window.prompt("Tekst1","Tekst2"); 
        console.log(`${wczytanaWartosc}:${typeof wczytanaWartosc}`);
    }
}

/* funkcja_testowa(); */