const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const entry = require("./entry.js");
const time = require('./time.js');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    console.log("GET route triggered");
    const items = entry.getEntry();

    console.log(items);

    res.render("main", {items: items, simArr: [], TotalWaitingTime: "", TotalIdealTime: "", avgWT: ""});
});


app.post("/", function(req, res){
    console.log("POST route triggered");

    if(req.body.hasOwnProperty("removeBtn")){
        console.log("Remove button triggered.");
        entry.removeEntry(req.body.removeBtn);
        res.redirect("/");

    }else if(req.body.hasOwnProperty("simulateBtn")){
        console.log("simulate button triggered");

        let WaitingTime=0;
        let IdealTime=0;

        const items = entry.getEntry();

        let a = req.body.startTime;
        let b = req.body.endTime;
        let c = parseInt(req.body.avgTime);

        let x = time.toDate(a);
        let y = time.toDate(b);


        if (time.diff_time(x,y)>0){
            let totalDuration = time.diff_time(x,y);
            let simTime = 0;
            let simArr = [];

            let cNo = 0;
            let cArrival;
            let rand;
            let findItem;
            let sStartTime = x;
            let sEndTime;
            let cWaitTime;
            let cIdealTime;
            while(simTime < totalDuration){
                cNo++;
                cArrival = time.add_minutes(x,simTime);
                simTime += c;
                rand = Math.floor(Math.random() * 100);
                findItem = items.find(function(item) {
                    return (item.rStart<=rand && rand <= item.rEnd);
                })
                sEndTime = time.add_minutes(sStartTime, findItem.prepTime);
                
                let aa = time.diff_time(cArrival, sStartTime);
                cWaitTime = aa<0?0:aa;
                
                let bb = time.diff_time(sEndTime, time.add_minutes(x,simTime));
                cIdealTime = bb<0?0:bb;
                
                let cc = time.add_minutes(x,simTime);
                
                WaitingTime += cWaitTime;
                IdealTime += cIdealTime;

                let simObj = {
                    customerNo: cNo,
                    scheduleArrival: time.display12(cArrival),
                    randomNumberGen: rand,
                    selectedDish: findItem.dishName,
                    serviceStart:  time.display12(sStartTime),
                    serviceDuration: findItem.prepTime,
                    serviceEnd: time.display12(sEndTime),
                    waitingTime: cWaitTime,
                    idealTime: cIdealTime,
                };
                
                simArr.push(simObj);

                sStartTime = time.diff_time(cc, sEndTime)<0? cc : sEndTime;
            }
            // console.log(simArr);
            res.render("main", {items: items, simArr: simArr, TotalWaitingTime: WaitingTime, TotalIdealTime: IdealTime, avgWT: WaitingTime/cNo});
        }else{
            console.log("Select proper start/end time.")
        }

        
    }else if(req.body.hasOwnProperty("addBtn")){
        console.log("add button triggered");
        entry.addEntry(
            req.body.dishName,
            req.body.dishTime,
            req.body.dishOrder
            );
            res.redirect("/");
    }
    
})

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}

app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
})