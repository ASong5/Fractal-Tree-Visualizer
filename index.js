class LSystem {
  grammar = {
    fractalBTree: {
      id: 0,
      axiom: "0",
      productions: {
        0: "1[0]0",
        1: "11",
      },
      //   instructions: {
      //     "0":
      //   }
    },
    fractalPlant: {
      id: 1,
      axiom: "X",
      productions: {
        X: "F+[[X]-X]-F[-FX]+X",
        F: "FF",
      },
    },
    algae: undefined,
    sierpinski: undefined,
  };

  grammarToString = (grammar, depth) => {
    const generate = (axiom, productions, currDepth = 0) => {
      if (currDepth === 0) return axiom;
      let newAxiom = "";
      for (const char of axiom) {
        if (productions[char]) {
          newAxiom += productions[char];
        } else newAxiom += char;
      }
      return generate(newAxiom, productions, currDepth - 1);
    };
    return generate(grammar.axiom, grammar.productions, depth);
  };

  generateFractal(ctx, id, sentence, branchSize) {
    if (id === 0) {
      ctx.translate(canvas.width / 2, canvas.height);
      ctx.shadowColor = "brown";
      ctx.shadowBlur = 14;
      ctx.strokeStyle = "#573E30";
      let idx = 0;
      while (idx < sentence.length) {
        const symbol = sentence[idx];

        if (symbol === "1" || symbol === "0") {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -branchSize);
          if (symbol === "0") ctx.strokeStyle = "green";
          ctx.stroke();
          ctx.translate(0, -branchSize);
          ctx.closePath();
        } else if (symbol === "[") {
          ctx.save();
          ctx.rotate(-Math.PI / 4);
        } else if (symbol === "]") {
          ctx.restore();
          ctx.rotate(Math.PI / 4);
        }

        idx++;
      }
    } else if (id === 1) {
      ctx.translate(canvas.width / 2, canvas.height);
      ctx.shadowColor = "green";
      ctx.shadowBlur = 14;
      ctx.strokeStyle = "#573E30";
      ctx.rotate(Math.PI / 16);

      let idx = 0;
      let len = branchSize;
      while (idx < sentence.length) {
        const symbol = sentence[idx];

        if (symbol === "F") {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -len);
          ctx.stroke();
          ctx.translate(0, -len);
          ctx.closePath();
        } else if (symbol === "+") {
          ctx.rotate(-(5 * Math.PI) / 36);
        } else if (symbol === "-") {
          ctx.rotate((5 * Math.PI) / 36);
        } else if (symbol === "[") {
          ctx.strokeStyle = "#573E30";
          ctx.save();
          ctx.strokeStyle = "green";
        } else if (symbol === "]") {
          ctx.restore();
        }
        idx++;
      }
    }
  }
}

const canvas = document.getElementById("canvas");
if (canvas.getContext) {
  const ctx = canvas.getContext("2d");

  const lSystem = new LSystem();
  const sentence = lSystem.grammarToString(lSystem.grammar.fractalBTree, 8);
  lSystem.generateFractal(ctx, 0, sentence, 2.4);

  // const sentence = lSystem.grammarToString(lSystem.grammar.fractalPlant, 7);
  // lSystem.generateFractal(ctx, 1, sentence, 1.8);
}
