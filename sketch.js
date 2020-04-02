var allPhrases = null;
var targetPhrase = null;
var stats;
var population = null;

function setup() {
    targetPhrase = createP("Target Phrase:");
    targetPhrase.class("target");
    
    bestPhrase = createP("Best phrase:");
    bestPhrase.class("best");

    allPhrases = createP("All Phrases:");
    allPhrases.position(600,10);
    allPhrases.class("all");

    stats = createP("stats");
    stats.class("stats");

    target = "This is sample text.";
    popmax = 5000;
    mutationRate = 0.01;

    targetPhrase.html("Target Phrase:<br>" + target);

    population = new Population(target, mutationRate, popmax);
}
function draw() {
    // Calculate fitness
    population.calFitness(); 
    // Generate mating pool
    population.naturalSelection();
    // Create next Generation
    population.generate();
    
    population.evaluate();

    if (population.isFinished()) {
        noLoop();
        console.log("Find!");
    }
    displayInfo();
}

function displayInfo() {
    var answer = population.getBest();

    bestPhrase.html("Best phrase:<br>" + answer);

    var statstest = "Total Generation:    " + population.generation + "<br>";
    statstest += "Total Population:      " + popmax + "<br>";
    statstest += "Mutation rate:      " + mutationRate + "<br>";

    stats.html(statstest);

    allPhrases.html("All Phrases:<br>" + population.allPhrases);
}