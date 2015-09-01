var times = [1, 2, 5, 10, 20];
var passed = [];


var maxCall = 20;
var sequence = [];
console.log("total time: " + JSON.stringify(pass(times, passed, -1, sequence)));

// var turns = [];
// console.log(turns);

function pass(lefts, rights, turn, sequence) {
  maxCall--;
  if (maxCall < 0) {
    // return;
  }
  var cloneLeft;
  var cloneRight;
  turn++;
  var min = 1000, current, i, j;
  if (turn % 2 === 0) {
    switch(lefts.length) {
      case 2:
        return {
          value: Math.max(lefts[0], lefts[1]),
          sequence: ["Turn 4 {", lefts[0], lefts[1], "} end turn 4"]
        };
      default:
        var minNext;
        for (i = 0; i < lefts.length - 1; i++) {
          for (j = i + 1; j < lefts.length; j++) {
            cloneLeft = JSON.parse(JSON.stringify(lefts));
            cloneRight = JSON.parse(JSON.stringify(rights));
            var c1 = cloneLeft[i];
            var c2 = cloneLeft[j];
            var currentTurn = turn;
            current = Math.max(c1, c2);
            cloneLeft.splice(j, 1);
            cloneLeft.splice(i, 1);
            cloneRight.push(c1, c2);
            var sequenceClone = JSON.parse(JSON.stringify(sequence));
            var next = pass(cloneLeft, cloneRight, currentTurn, sequenceClone);
            if (next.value + current < min) {
              minNext = next;
              minNext.current = [c1, c2];
              min = next.value + current;
            }
          }
        }
        // console.log(minArray);
        sequence.push("Turn " + turn + "{");
        for (var i = 0; i < minNext.sequence.length; i++) {
          sequence.push(minNext.sequence[i]);
        }
        for (var i = 0; i < minNext.current.length; i++) {
          sequence.push(minNext.current[i]);
        }
        sequence.push("} end turn" + turn);
        return {
          value: min,
          sequence: sequence
        };
      }
    } else {
      switch (rights.length) {
        case 0:
          return {
            value: 0,
            sequence: []
          };
        case 1:
          return {
            value: rights[0],
            sequence: [rights[0]]
          };
        case 2:
          var minNext;
          for (i = 0; i < rights.length; i++) {
            cloneLeft = JSON.parse(JSON.stringify(lefts));
            cloneRight = JSON.parse(JSON.stringify(rights));
            current = cloneRight[i];
            cloneRight.splice(i, 1);
            cloneLeft.push(current);
            var currentTurn = turn;
            var sequenceClone = JSON.parse(JSON.stringify(sequence));
            var next = pass(cloneLeft, cloneRight, currentTurn, sequenceClone);
            if (current + next.value < min) {
              minNext = next;
              minNext.current = current;
              min = next.value + current;
            }
          }
          // console.log(minArray);
          sequence.push("Turn " + turn + "{");
          for (var i = 0; i < minNext.sequence.length; i++) {
            sequence.push(minNext.sequence[i]);
          }
          sequence.push(minNext.current);
          sequence.push("} end turn" + turn);
          return {
            value: min,
            sequence: sequence
          };
        default:
          var minArray;
          for (i = 0; i < rights.length; i++) {
            cloneLeft = JSON.parse(JSON.stringify(lefts));
            cloneRight = JSON.parse(JSON.stringify(rights));
            current = cloneRight[i];
            cloneRight.splice(i, 1);
            cloneLeft.push(current);
            var sequenceClone = JSON.parse(JSON.stringify(sequence));
            var next = pass(cloneLeft, cloneRight, turn, sequenceClone);
            if (next.value + current < min) {
              minNext = next;
              minNext.current = current;
              min = next.value + current;
            }
          }
          sequence.push("Turn " + turn + "{");
          for (var i = 0; i < minNext.sequence.length; i++) {
            sequence.push(minNext.sequence[i]);
          }
          sequence.push(minNext.current);
          sequence.push("} end turn" + turn);
          return {
            value: min,
            sequence: sequence
          };
      }
    }
}
