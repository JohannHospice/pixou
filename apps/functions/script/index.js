const PERIOD = 10000;
const BLUEPRINT_BUYER = 0;
const BLUEPRINT_SELLER = 1;

function main() {
  const mockRSI = [generateCurve(PERIOD), generateCurve(PERIOD)];

  const spots = findSpot(mockRSI[BLUEPRINT_BUYER], mockRSI[BLUEPRINT_SELLER]);

  console.log(spots);
}

function findSpot(buyer, seller) {
  const spots = [];

  for (let i = 0; i < PERIOD; i++) {
    if (buyer[i] > seller[i]) {
      const trameIndex = spots.findIndex(([from, to]) => from <= i && i >= to);

      const trame = spots[trameIndex];

      if (!trame) {
        spots.push([i, i]);
      } else {
        if (i > trame[1]) { 
          spots[trameIndex] = [trame[0], i];
        }
      }
    }
  }
  return spots;
}

function generateCurve(length) {
  const plots = [];

  for (let i = 0; i < length; i++) {
    const rand = Math.random();
    plots.push(i > 0 ? getCoordinate(plots[i - 1], rand) : rand);
  }

  return plots;
}

function getCoordinate(old, rand) {
  const factor = rand / 10;
  const x =
    old + factor > 1
      ? old - factor
      : old - factor < 0
      ? old + factor
      : old - factor;
  return x;
}

function printCurve(curve) {
  console.log(curve);
}

main();
