import { AudioNode } from "tone";

class FourStrokeEngine extends AudioNode {
  _blabla = "sdf";

  startingNoise = new Tone.Noise("white");
  lp20One = new Tone.Filter({ frequency: 20, type: "lowpass" });
  lp20Two = new Tone.Filter({ frequency: 20, type: "lowpass" });
  noiseLineA = new Tone.Multiply(0.5);
  noiseLineB = new Tone.Multiply(10);

  cylinder1 = null;
  cylinder2 = null;
  cylinder3 = null;
  cylinder4 = null;

  input = new GainNode({ context: this.context });
  output = this._blabla;
  outputs = [];

  createCylinder(index) {
    // create a delay that will read the noise offset for this cylinder
    const delayA = new Tone.Delay((index + 1) * 5); // 5, 10, 15, 20
    const delayB = new Tone.Delay((index + 1) * 5); // 5, 10, 15, 20
    const add = new Tone.Add();
    const mult = new Tone.Multiply(1 - (index + 1) * 0.25); // 0.75, 0.5, 0.25, 0
    const cosine = new Tone.Oscillator({ type: "sine", phase: 90 }); // cosine is sine 90deg out of phase

    const mult2 = new Tone.Multiply();
    const mult3 = new Tone.Multiply();
    const add9999 = new Tone.Add();
    const add1 = new Tone.Add(1);

    const sig1 = new Tone.Signal(1);
    const div = new Tone.Expr("$0 / $1"); // Tone.Divide doesn't exist

    // we will add delayed noise to incoming signal
    noiseLineA.connect(delayA);
    noiseLineB.connect(delayB);
    this.input.connect(add, 0, 0);
    delayA.connect(add, 0, 1);

    add.connect(mult);
    mult.connect(cosine);
    cosine.connect(mult2, 0, 0);

    delayB.connect(add9999, 0, 1);
    add9999.connect(mult2, 0, 1);

    mult2.connect(mult3, 0, 0);
    mult2.connect(mult3, 0, 1);
    mult3.connect(add1);
    sig1.connect(div, 0, 0);
    add1.connect(div, 0, 1);
    return div1;
  }

  constructor(options) {
    super(options);

    // todo: didn't do the inlet swap 1 - 32, thing yet (top left of patch going into envelope)
    const speed = 3;

    // connections
    this.startingNoise.start();
    this.startingNoise.chain(lp20One, lp20Two);
    this.lp20Two.fan(noiseLineA, noiseLineB);

    const cylinder1 = this.createCylinder(0);
    const cylinder2 = this.createCylinder(1);
    const cylinder3 = this.createCylinder(2);
    const cylinder4 = this.createCylinder(3);
    outputs = [cylinder1, cylinder2, cylinder3, cylinder4];
  }

  dispose() {
    super.dispose();

    // etc
  }
}

export default FourStrokeEngine;
