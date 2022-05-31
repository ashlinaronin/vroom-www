const playToyBoatEngine = () => {
  // engine noise
  const noise = new Tone.Noise("white").start();
  const bp9Filter = new Tone.Filter({
    frequency: 9,
    Q: 15,
    type: "bandpass",
  });

  const mult600 = new Tone.Multiply(600);

  noise.connect(bp9Filter);
  bp9Filter.connect(mult600);

  // piston sound -- cosine in pd
  const pistonOsc = new Tone.Oscillator(9, "sine");
  pistonOsc.connect(mult600.factor);

  // not sure if this does the same thing as clip~
  const scale = new Tone.Scale(0, 1);
  const hp10Filter = new Tone.Filter({
    frequency: 10,
    type: "highpass",
  });
  const lp30Filter = new Tone.Filter({
    frequency: 30,
    type: "lowpass",
  });

  const formant1Filter = new Tone.Filter({
    frequency: 470,
    Q: 8,
    type: "bandpass",
  });
  const formant2Filter = new Tone.Filter({
    frequency: 780,
    Q: 9,
    type: "bandpass",
  });
  const formant3Filter = new Tone.Filter({
    frequency: 1024,
    Q: 10,
    type: "bandpass",
  });

  const noiseForFormant = new Tone.Noise("white").start();
  const hp1000Filter = new Tone.Filter({
    type: "highpass",
    frequency: 1000,
  });
  const bp590Filter = new Tone.Filter({
    type: "bandpass",
    frequency: 590,
    Q: 4,
  });
  noiseForFormant.connect(hp1000Filter);
  hp1000Filter.connect(bp590Filter);

  const hp100Filter = new Tone.Filter({
    frequency: 100,
    type: "highpass",
  });
  const multBy2 = new Tone.Multiply(2);
  const combine = new Tone.Multiply();

  mult600.connect(scale);
  scale.connect(hp10Filter);
  hp10Filter.connect(lp30Filter);
  lp30Filter.connect(combine);
  bp590Filter.connect(combine.factor);
  combine.fan(formant1Filter, formant2Filter, formant3Filter);

  formant1Filter.connect(hp100Filter);
  formant2Filter.connect(hp100Filter);
  formant3Filter.connect(hp100Filter);

  hp100Filter.connect(multBy2);
  multBy2.toDestination();
};

export default playToyBoatEngine;
