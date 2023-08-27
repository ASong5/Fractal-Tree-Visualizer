class LSystem {
    constructor(axiom, productions){
      this.axiom = axiom;
      this.productions = productions;
    }
  };
  
  const grammarToString = (grammar, depth) => {
    const generate = (axiom, productions, currDepth) => {
      if(currDepth === 0) return axiom;
      let newAxiom = "";
      for(char of axiom){
        if(productions[char]){
          newAxiom += productions[char];
        }
        else newAxiom += char;
      }
      return generate(newAxiom, productions, currDepth - 1);
    }
    return generate(grammar.axiom, grammar.productions, depth);
  }
  
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
  
    const lSystem = new LSystem("0", {
      "0": "1[0]0",
      "1": "11"
    });
  
    grammarToString(lSystem, 4);
  
    ctx.strokeStyle = "white";
    ctx.fillStyle = "green";
  
    ctx.translate(canvas.width / 2, canvas.height-canvas.height / 6);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height / 6);
    ctx.stroke();
    ctx.save();
  
    let branchSize = 50;
    ctx.moveTo(0,0)
  
    ctx.save();
    ctx.rotate(Math.PI / 6);
    ctx.lineTo(0, -branchSize);
    ctx.stroke();
  
    ctx.moveTo(0,0)
    ctx.restore();
    ctx.rotate(-Math.PI / 6);
    ctx.lineTo(0, -branchSize);
    ctx.stroke();
  
  }