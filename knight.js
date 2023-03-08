const DEF_GAMEBOARD_SIZE = 8;

function Knight() {
  function buildStepsTree(start) {
    const root = stepFactory(start, null);
    if (start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7) {
      throw new Error('Invalid starting position');
    }
    const queue = [root];
    const visited = [];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      visited.push(currentNode.current);

      // console.log('Current Node:', currentNode.current);

      const nextSteps = calculateSteps(currentNode.current);

      const nextStepNodes = [];
      for (let i = 0; i < nextSteps.length; i += 1) {
        const nextStep = nextSteps[i];
        const includesTarget = visited.some((subArr) =>
          subArr.every((val, i) => val === nextStep[i])
        );
        if (includesTarget) {
          continue;
        }

        const nextStepNode = stepFactory(nextStep, currentNode);
        nextStepNodes.push(nextStepNode);
        queue.push(nextStepNode);
      }
      if (nextStepNodes.length === 0) {
        currentNode.next = null;
      } else {
        currentNode.next = nextStepNodes;
      }
    }

    return root;
  }

  function calculateSteps(standingAt) {
    const nextPossibleSteps = [
      [standingAt[0] + 2, standingAt[1] + 1],
      [standingAt[0] + 1, standingAt[1] + 2],
      [standingAt[0] - 2, standingAt[1] - 1],
      [standingAt[0] - 1, standingAt[1] - 2],
      [standingAt[0] + 1, standingAt[1] - 2],
      [standingAt[0] - 1, standingAt[1] + 2],
      [standingAt[0] + 2, standingAt[1] - 1],
      [standingAt[0] - 2, standingAt[1] + 1],
    ];
    // * Filtering the illegal steps out
    const nextLegalSteps = nextPossibleSteps.filter(
      ([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7
    );
    return nextLegalSteps;
  }

  // * Create step nodes
  function stepFactory(current, prev, next) {
    return {
      prev: prev || null,
      current,
      next: next || null,
    };
  }

  function knightMoves(start, end) {
    const root = buildStepsTree(start);
    console.log(root);

    const queue = [root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (
        currentNode.current[0] === end[0] &&
        currentNode.current[1] === end[1]
      ) {
        let currentStep = currentNode;
        const steps = [];

        while (currentStep !== null) {
          steps.unshift(currentStep.current);
          currentStep = currentStep.prev;
        }
        return `You made it in ${
          steps.length - 1
        } steps! The path taken was: ${steps.join(' => ')}`;
      }

      if (currentNode.next !== null) {
        currentNode.next.forEach((nextNode) => queue.push(nextNode));
      }
    }
  }
  // * Return knight
  return {
    knightMoves,
  };
}

/*
      // * Returning if the tile has been visited
      if (stepsTaken.includes(tiles) && stepsTaken.size > 64) return null;
      // * Push for the common steps array for duplicate checking
      nextLegalSteps.forEach((step) => {
        stepsTaken.push(step);
      });

      const nextSteps = [];
      for (let i = 0; i < nextLegalSteps.length; i += 1) {
        const stepNode = stepFactory(
          nextLegalSteps[i],
          currentPosition,
          getNextSteps(nextLegalSteps[i])
        );
        nextSteps.push(stepNode);
      }
      return nextSteps;
    }
    return currentPosition;

*/

class Gameboard {
  constructor(boardSize) {
    this.gameboard = this.createBoard(boardSize);
    this.knight = new Knight();
  }

  createBoard(boardSize = DEF_GAMEBOARD_SIZE) {
    const board = [];
    for (let i = 0; i < boardSize; i += 1) {
      for (let k = 0; k < boardSize; k += 1) {
        board.push([i, k]);
      }
    }
    return board;
  }
}

const boardInst = new Gameboard();
console.log(boardInst.knight.knightMoves([0, 0], [7, 7]));
