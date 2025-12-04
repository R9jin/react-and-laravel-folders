import * as tf from "@tensorflow/tfjs";
import { useState } from "react";
import "./InventoryPredictor.css";

export default function App() {
  const [prediction, setPrediction] = useState(null);

  const trainingData = tf.tensor2d([
    [20, 50, 3],
    [5, 30, 5],
    [15, 40, 4],
    [8, 60, 2],
  ]);

  const outputData = tf.tensor2d([[0], [1], [0], [1]]);

  const handlePredict = async () => {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        inputShape: [3],
        units: 8,
        activation: "relu",
      })
    );
    model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

    model.compile({
      optimizer: "adam",
      loss: "binaryCrossentropy",
      metrics: ["accuracy"],
    });

    await model.fit(trainingData, outputData, {
      epochs: 200,
      shuffle: true,
    });

    const newProduct = tf.tensor2d([[10, 45, 3]]);
    const result = model.predict(newProduct);
    const value = (await result.data())[0];

    setPrediction(value > 0.5 ? "Reorder" : "No Reorder");
  };

  return (
    <div className="inventory-container">
      <h2>Inventory Reorder Predictor</h2>
      <button onClick={handlePredict}>Predict</button>
      {prediction && <p className="prediction">Prediction: {prediction}</p>}
    </div>
  );
}
