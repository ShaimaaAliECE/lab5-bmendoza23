const express   = require ('express');
let jobsJSON    = require ('./jobs.json');

const app = express();

//Serving Static Contents
app.use(express.static('static'));

/*
Question 1: Get all the categories mentioned in all the jobs and how many times each category was mentioned
*/

app.get('/categories', (req,res) => {
        let cats = {};      //Create empty object

        //For each job in jobsJSON
        for (let j in jobsJSON)
        {   //For each category in the job
            for (let c of jobsJSON[j].categories)
                //If the job is not the same job at index c of cats
                if (!cats[c])
                {
                    cats[c] = 1;    //The count of the category = 1
                }
                //Category already in object, adds to count
                else
                    cats[c]++;
        }

        //Convert cats to json for the response
        res.json(cats);
    
    });

/**
 * Question 3: All jobs in a given city (sent in querystring)
 */

app.get('/jobsCity', (req,res)=> {
    let jobsCity = [];      //Array to hold jobs

    for (let j in jobsJSON)
    {
        //Job's title has city name in it
        if (jobsJSON[j].title.includes(req.query.city))
        {
             jobsCity.push(j);   //Push city into array
        }
           
    }

    //Sending jobs as a json in the response
    res.json(
        {
            jobs: jobsCity
        }
    );
});

/**
 * Question 2: All the jobs within a given category (sent as a parameter)
 */

app.get('/:category', (req,res) =>{
    let jobsInCat =[];  //Array to hold jobs in category

    //Loops over jobsJSON
    for(let j in jobsJSON)
    {
        //If the jobsJSON category includes the parameter
        if(jobsJSON[j].categories.includes(req.params.category))
        {
            
            jobsInCat.push(j);  //Adds the job to the array
        }
    }

    //Sends jobsInCat as a json object
    res.json({
        jobs: jobsInCat
    })
});

app.listen(80);   //App listening on port 80