function Population(p, m, num) {

    this.generation = 0;
    this.finished = false;
    this.perfectScore = 1;
    this.mutationRate = m;
    this.allPhrases = "";
    this.target = p;
    this.best = "";
    this.population = [];

    for (var i = 0; i < num; i++) {
        this.population[i] = new DNA(this.target.length);        
    }
    this.matingPool = [];


    this.calFitness = function() {
        for (var i = 0; i < num; i++) {
            this.population[i].calFitness(target);
        }
    }

    this.calFitness();

    this.naturalSelection = function() {
        this.matingPool = [];
        var maxFitness = 0;
        for (var i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }

        for (var i = 0; i < this.population.length; i++) {
            // map the fitness score between 0-1
            var fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
            var n = floor(fitness * 100);
            for (var j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);                
            }            
        }
    }

    this.generate = function() {
        for (var i = 0; i < this.population.length; i++) {
            var a = floor(random(this.matingPool.length));
            var b = floor(random(this.matingPool.length));

            var partnerA = this.matingPool[a];
            var partnerB = this.matingPool[b];

            var child = partnerA.crossover(partnerB);
            
            child.mutate(this.mutationRate);

            this.population[i] = child;
        }
        this.generation++;
    }

    this.getBest = function() {        
        return this.best;
    }

    this.evaluate = function() {
        var max = 0;
        var index = 0;
        this.best = ""; 
        this.allPhrases = "";       
        for (var i = 0; i < this.population.length; i++) {            
            this.allPhrases += this.population[i].genes + "<br>";
            if (max < this.population[i].fitness) {
                max = this.population[i].fitness;
                index = i;
            }        
        }
        for (var j = 0; j < this.population[index].genes.length; j++) {
            this.best +=  this.population[index].genes[j];
        }
    }

    this.isFinished = function() {            
        if(this.best === this.target) return true;
        else return false;
    }
    
    
}