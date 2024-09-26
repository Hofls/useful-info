// This evolutionary algorithm (genetic algorithm) evolves a population of random symbols to match a target string
// Parameters
const target = "Hello, World!";
const populationSize = 200;
const mutationRate = 0.01;
const generations = 1000;
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ,!"; // Allowed characters

runEvolution();

// Generate a random string of the same length as the target
function randomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Fitness function (measures similarity to the target string)
function calculateFitness(individual) {
  let score = 0;
  for (let i = 0; i < individual.length; i++) {
    if (individual[i] === target[i]) {
      score++;
    }
  }
  return score / target.length;
}

// Crossover function (combines two parents)
function crossover(parentA, parentB) {
  const midpoint = Math.floor(Math.random() * parentA.length);
  return parentA.slice(0, midpoint) + parentB.slice(midpoint);
}

// Mutation function (randomly alters some characters)
function mutate(individual) {
  let mutated = '';
  for (let i = 0; i < individual.length; i++) {
    if (Math.random() < mutationRate) {
      mutated += characters.charAt(Math.floor(Math.random() * characters.length));
    } else {
      mutated += individual[i];
    }
  }
  return mutated;
}

// Main Evolutionary Algorithm function
function runEvolution() {
  let population = initializePopulation(populationSize, target.length);

  for (let gen = 0; gen < generations; gen++) {
    const fitnessScores = calculateFitnessForPopulation(population, target);

    const { maxFitness, bestIndividual } = getBestIndividual(population, fitnessScores);
    console.log(`Generation ${gen}: ${bestIndividual} (fitness: ${maxFitness})`);

    if (bestIndividual === target) {
      console.log("Target reached!");
      break;
    }

    const matingPool = createMatingPool(population, fitnessScores);
    population = createNextGeneration(matingPool, populationSize);
  }
}

// Function to initialize population
function initializePopulation(populationSize, targetLength) {
  const population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(randomString(targetLength));
  }
  return population;
}

// Function to calculate fitness for the entire population
function calculateFitnessForPopulation(population, target) {
  return population.map(ind => calculateFitness(ind, target));
}

// Function to find the best individual based on fitness
function getBestIndividual(population, fitnessScores) {
  let maxFitness = Math.max(...fitnessScores);
  let bestIndividual = population[fitnessScores.indexOf(maxFitness)];
  return { maxFitness, bestIndividual };
}

// Function to create a mating pool based on fitness
function createMatingPool(population, fitnessScores) {
  const matingPool = [];
  for (let i = 0; i < population.length; i++) {
    const fitness = fitnessScores[i];
    const n = Math.floor(fitness * 100); // Probability of selection proportional to fitness
    for (let j = 0; j < n; j++) {
      matingPool.push(population[i]);
    }
  }
  return matingPool;
}

// Function to create the next generation through crossover and mutation
function createNextGeneration(matingPool, populationSize) {
  const newPopulation = [];
  for (let i = 0; i < populationSize; i++) {
    const parentA = matingPool[Math.floor(Math.random() * matingPool.length)];
    const parentB = matingPool[Math.floor(Math.random() * matingPool.length)];
    let child = crossover(parentA, parentB);
    child = mutate(child);
    newPopulation.push(child);
  }
  return newPopulation;
}
