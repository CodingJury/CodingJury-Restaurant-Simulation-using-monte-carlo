const { notEqual } = require('assert');
const fs = require('fs');


const getEntry = function(){
    const items = loadEntry();

    let total = 0;
    items.forEach(function(item){
        total += parseInt(item.totalOrder);
    });

    let commulative = 0;
    let rStart = 0;
    let rEnd;
    items.forEach(function(item){
        let a = parseInt(item.totalOrder);
        item.probability = Math.round(a/total*100)/100;
        commulative += item.probability;
        item.commulative = commulative;
        rEnd = Math.floor(commulative*100);
        item.rStart = rStart;
        item.rEnd = rEnd;

        rStart = rEnd;
    });

    return items;
}

const addEntry = function(dishName, prepTime, totalOrder){
    const entry = loadEntry();

    const duplicateEntry = entry.filter(function(item){
        return item.dishName === dishName;
    })

    if (duplicateEntry.length === 0) {
        entry.push({
            dishName: dishName,
            prepTime: prepTime,
            totalOrder: totalOrder
        })
        saveEntry(entry);
        console.log("new dish added");
    }else{
        console.log("dish already exist");
    }   
}


const removeEntry = function(index){
    const entry = loadEntry();
    const removedItem = entry.splice(index,1);

    saveEntry(entry);
}


/////////////Helper functions/////////////////////

const saveEntry = function(entry){
    const dataJSON = JSON.stringify(entry);
    fs.writeFileSync('data.json', dataJSON);
}

const loadEntry = function(){
    try{
        const dataBufer = fs.readFileSync('data.json');
        const dataJSON = dataBufer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return []
    }
}

module.exports = {
    getEntry: getEntry,
    addEntry: addEntry,
    removeEntry: removeEntry
}