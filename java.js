function pm(){
    var text = document.getElementsByTagName("input")[0];
    var val = text.value;
    if(val == '010110'){
        alert('Подсказка 1: Пустая — стоит, Полная — ходит. ');
    }else if(val == '001110'){
        alert('Подсказка 2: Если ты открыл замок, Спрячь свой ключик в теремок. Ключик будет под рукой, А в дому всегда покой.');
    }else if(val == '010001'){
        alert('Подсказка 3: Ищи под автобусом');
    }else if(val == '101011'){
        alert('Подсказка 4: ');
    }else if(val == '110010'){
        alert('Подсказка 5: На столе стоит сундук В сундуке окошко, Можно видеть чудеса, Если знать немножко…');
    }else if(val == '110100'){
        alert('Подсказка 6: Найди того, кто холоден и одинок в нашем доме');
    }
}