/**
 * Exercise class keeps data from exercise together in one place
 */
class Exercise {
    constructor(name){
        this.name = name;
        this._dates = [];
        this._weights = [];
    }

    get dates(){
        return this._dates;
    }

    get weights(){
        return this._weights;
    }
}

/**
 * Load the exercises and their data already store
 */
let loadedExercises = JSON.parse(localStorage.getItem('savedExercises'))

function getExercises () { loadedExercises.forEach((loadedExercise) => {
    console.log(loadedExercise)
    let exercise = new Exercise(loadedExercise.name)
    exercise._dates = loadedExercise._dates
    exercise._weights = loadedExercise._weights
    Exercises.exercises.push(exercise)
    let name = exercise.name
    let div = document.createElement('div');
    div.classList.add('exercise-list-item');
    div.innerHTML = name;
    // 4)
    let li = document.createElement('li');
    let list = document.querySelector('.exercise-list');
    list.appendChild(li);
    li.appendChild(div);
    // 5)
    let selector = document.getElementById('exercises');
    let option = document.createElement('option');
    option.innerHTML = name;
    selector.appendChild(option);
    console.log(Exercises.exercises)
})
}

window.addEventListener('load', getExercises)


/**
 * Exercises class is an array of Exercises used to find an Exercise when
 * its time to chart it
 */
class Exercises {
    static exercises = [];
}

// Add Exercise 
/** 1) Get input from input add-exercise
 *  2) Create a new Exercise object
 *  3) Create a div with name of exercise
 *  4) push the div onto the list 
 *  5) push exercise onto select list
 */

function addExercise(event){
    event.preventDefault();
    // 1)
    let name = document.getElementById('add-exercise').value;
    // 2)
    let exercise = new Exercise(name);
    Exercises.exercises.push(exercise);
    // 3)
    let div = document.createElement('div');
    div.classList.add('exercise-list-item');
    div.innerHTML = name;
    // 4)
    let li = document.createElement('li');
    let list = document.querySelector('.exercise-list');
    list.appendChild(li);
    li.appendChild(div);
    // 5)
    let selector = document.getElementById('exercises');
    let option = document.createElement('option');
    option.innerHTML = name;
    selector.appendChild(option);
    // Clear value
    document.getElementById('add-exercise').value = '';
    
}

const addExerciseSubmit = document.getElementById('add-exercise-submit');
addExerciseSubmit.addEventListener('click', addExercise);

// Add data
/**
 * 1) Get the value from exercises selector
 * 2) Get value from weight-moved input
 * 3) Push of weight moved with current date/time to exercise object
 */
function addData(event) {
    event.preventDefault();
    // 1)
    let exercise = document.getElementById('exercises').value;
    // 2)
    let weightMoved = document.getElementById('weight-moved').value;
    // 3)
    let object = Exercises.exercises.find(ele => ele.name === exercise);
    //object.data.push({x: new Date().toString(), y: weightMoved});
    object.dates.push(new Date().toDateString());
    object.weights.push(weightMoved);
    console.log(object);
    console.log(object.dates);
    console.log(object.weights);
    document.getElementById('weight-moved').value = '';
    let jsonExercises = JSON.stringify(Exercises.exercises)
    let savedExercises1 = localStorage.setItem('savedExercises', JSON.stringify(Exercises.exercises))
}

const addDataSubmit = document.getElementById('add-data-submit');
addDataSubmit.addEventListener('click', addData);

//Chart from chart.js
var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Weight moved',
            data: [],
            backgroundColor: 
                'rgba(255, 99, 132, 0.2)',
             
            borderColor:
                'rgba(255, 99, 132, 1)',
            
            borderWidth: 1,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
                }
            }
        }
    });

    
/**
 * How the chart is updated and displayed
 * @param {*} event 
 */
function drawChart(event){
    event.preventDefault();
    //Get exercise and its data
    let exercise = document.getElementById('exercises').value;
    let object = Exercises.exercises.find(ele => ele.name === exercise);
    let labels = object.dates;
    let data = object.weights;
    //Clear chart
    myChart.data.labels = [];
    for(let i = 0; i< data.length; i++) {
        myChart.data.datasets.forEach(dataset => {
            dataset.data.pop();
        });;
    }
    myChart.update();
    //push data on chart
    for(let i = 0; i< data.length; i++) {
        myChart.data.datasets.forEach(dataset => {
            dataset.data.push(data[i]);
        });;
    }
    myChart.data.labels = labels;
    myChart.update();

}

const graphButton = document.getElementById('graph');
graphButton.addEventListener('click', drawChart);

