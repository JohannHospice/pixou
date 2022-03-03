const TURN_MAX = 1;
const objective = 1000;
class DNA {
  genes: number[];
  fitness: number = 0;
  constructor() {
    this.genes = this.createGenes();
  }

  createGenes() {
    let s = [];
    for (let j = 0; j < 10000; j++) {
      s[j] = getRandomArbitrary(-TURN_MAX, TURN_MAX);
    }
    return s;
  }

  calcFitness() {
    // index is just the gene they were currently on
    // using this as an easy way to calc fitness
    // the higher the index, the further they moved the closer to the finish?
    // this.fitness = map(index, 0, 10000, 0, 1);

    //   this.fitness = Math.map(currentCheckpoint, 0, 20, 0, 1);
    this.fitness = Math.pow(this.fitness, 4);
    return this.fitness;
  }

  crossover(partner: DNA) {
    let child = new DNA();

    let midpoint = Math.floor(Math.random() * this.genes.length);

    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
    }
    return child;
  }

  mutate(mutationRate: number) {
    for (let i = objective - 400; i < this.genes.length; i++) {
      if (getRandomArbitrary(0, 1) < mutationRate) {
        this.genes[i] = getRandomArbitrary(-TURN_MAX, TURN_MAX);
      }
    }
  }
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const population: DNA[] = [];
let matingPool: DNA[] = [];
const mutationRate = 0.03;
function naturalSelection() {
  matingPool = [];
  let bestCount = 0;
  let best: DNA | undefined;
  for (let pop of population) {
    let n = Math.floor(pop.calcFitness() * 100);
    if (n > bestCount) {
      bestCount = n;
      best = pop;
    }
    for (let i = 0; i < n; i++) {
      matingPool.push(pop);
    }
  }

  if (best) {
    for (let i = 0; i < bestCount * 4; i++) {
      matingPool.push(best);
    }
  }

  best = Object.assign({}, best);
}
let best: DNA;
function generate() {
  for (let i = 0; i < population.length; i++) {
    let mummyIndex = Math.floor(getRandomArbitrary(0, matingPool.length));
    let daddyIndex = Math.floor(getRandomArbitrary(0, matingPool.length));

    let mummy = matingPool[mummyIndex];
    let daddy = matingPool[daddyIndex];

    let child = mummy.crossover(daddy);
    child.mutate(mutationRate);
    population[i] = child;
  }
  population[0].genes = best.genes; // always have the previous best with 0 mutations
}
