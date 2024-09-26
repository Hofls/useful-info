// This evolutionary algorithm (genetic algorithm) evolves a population virtual creatures

class Creature {
  constructor(genes = null) {
    // Genes: [size, speed]
    this.genes = genes || [Math.random(), Math.random()];
    this.fitness = 0;
  }

  // Calculate fitness: The goal is to maximize both size and speed
  calculateFitness() {
    // Fitness is simply the sum of the genes for this simple example
    this.fitness = this.genes[0] + this.genes[1];
  }

  // Crossover: Produces an offspring with genes from two parents
  static crossover(parent1, parent2) {
    // Mix genes: take half from parent1 and half from parent2
    let newGenes = [
      (parent1.genes[0] + parent2.genes[0]) / 2,
      (parent1.genes[1] + parent2.genes[1]) / 2,
    ];
    return new Creature(newGenes);
  }

  // Mutate: Small random mutation to genes
  mutate(mutationRate = 0.01) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        this.genes[i] += Math.random() * 0.2 - 0.1; // Small random change
      }
    }
  }
}

// Create initial population
function createInitialPopulation(size) {
  let population = [];
  for (let i = 0; i < size; i++) {
    population.push(new Creature());
  }
  return population;
}
// Calculate fitness for the entire population
function calculatePopulationFitness(population) {
  population.forEach(creature => creature.calculateFitness());
}

// Sort population by fitness in descending order
function sortPopulationByFitness(population) {
  population.sort((a, b) => b.fitness - a.fitness);
}

// Select top survivors (e.g., top 50%)
function selectSurvivors(population, survivorCount) {
  return population.slice(0, survivorCount);
}

// Generate the next generation by crossover and mutation
function generateNextGeneration(survivors, populationSize, mutationRate) {
  let nextGeneration = [];
  for (let i = 0; i < populationSize / 2; i++) {
    let parent1 = survivors[Math.floor(Math.random() * survivors.length)];
    let parent2 = survivors[Math.floor(Math.random() * survivors.length)];
    let offspring = Creature.crossover(parent1, parent2);
    offspring.mutate(mutationRate);
    nextGeneration.push(offspring);
  }
  return nextGeneration;
}

// Main evolutionary loop
function evolve(populationSize, generations, mutationRate) {
  let population = createInitialPopulation(populationSize);

  for (let generation = 0; generation < generations; generation++) {
    calculatePopulationFitness(population);
    sortPopulationByFitness(population);

    console.log(
      `Generation ${generation} - Best Fitness: ${population[0].fitness}`
    );

    let survivors = selectSurvivors(population, populationSize / 2);
    let nextGeneration = generateNextGeneration(survivors, populationSize, mutationRate);

    // Replace old population with survivors and their offspring
    population = survivors.concat(nextGeneration);
  }

  return population;
}

// Run the algorithm
let populationSize = 20;
let generations = 50;
let mutationRate = 0.05;

evolve(populationSize, generations, mutationRate);
