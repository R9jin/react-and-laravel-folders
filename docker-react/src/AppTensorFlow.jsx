import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import "./InventoryPredictor.css";

export default function InventoryPredictor() {
    const [products, setProducts] = useState([]);
    const [predictions, setPredictions] = useState([]);

    // Fetch real product names
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("https://fakestoreapi.com/products?limit=100");
                const data = await res.json();
                // Map API data to include inventory, avgSales, leadTime
                const transformed = data.map((p) => ({
                    name: p.title, // actual product name
                    inventory: Math.floor(Math.random() * 100), // simulate inventory
                    avgSales: Math.floor(Math.random() * 50), // simulate weekly sales
                    leadTime: Math.floor(Math.random() * 10) + 1, // simulate days to replenish
                }));
                setProducts(transformed);
            } catch (error) {
                console.error("Error fetching products:", error);
                // fallback dummy data with names
                const dummy = Array.from({ length: 100 }, (_, i) => ({
                    name: `Dummy Product ${i + 1}`,
                    inventory: Math.floor(Math.random() * 100),
                    avgSales: Math.floor(Math.random() * 50),
                    leadTime: Math.floor(Math.random() * 10) + 1,
                }));
                setProducts(dummy);
            }
        }
        fetchProducts();
    }, []);

    const handlePredict = async () => {
        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [3], units: 8, activation: "relu" }));
        model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

        model.compile({
            optimizer: "adam",
            loss: "binaryCrossentropy",
            metrics: ["accuracy"],
        });

        // Example training data
        const trainingData = tf.tensor2d([
            [20, 50, 3],
            [5, 30, 5],
            [15, 40, 4],
            [8, 60, 2],
        ]);
        const outputData = tf.tensor2d([[0], [1], [0], [1]]);

        await model.fit(trainingData, outputData, { epochs: 200, shuffle: true });

        const results = await Promise.all(
            products.map(async (p) => {
                const input = tf.tensor2d([[p.inventory, p.avgSales, p.leadTime]]);
                const value = (await model.predict(input).data())[0];
                return value > 0.5 ? "Reorder" : "No Reorder";
            })
        );

        setPredictions(results);
    };

    return (
        <div className="dashboard-container">
            <h1>Inventory Reorder Dashboard</h1>
            <button onClick={handlePredict}>Predict Reorders</button>

            <div className="product-grid">
                {products.map((p, i) => (
                    <div key={i} className="product-card">
                        <h3>{p.name}</h3>
                        <p>Inventory: {p.inventory}</p>
                        <p>Avg Sales: {p.avgSales}</p>
                        <p>Lead Time: {p.leadTime} days</p>
                        {predictions[i] && (
                            <p className={`prediction ${predictions[i] === "Reorder" ? "reorder" : "ok"}`}>
                                {predictions[i]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
