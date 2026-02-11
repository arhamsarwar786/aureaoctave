import { fetchForexData } from "@/Services/forexServices";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ForexChart = ({ fromCurrency, toCurrency }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: `${fromCurrency}/${toCurrency}`,
                data: [],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    });
    const [currentPrice, setCurrentPrice] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchForexData(fromCurrency, toCurrency);
                const rate = data[`${fromCurrency}${toCurrency}`];
                const timestamp = new Date().toLocaleTimeString();

                setCurrentPrice(rate);

                setChartData((prevState) => ({
                    ...prevState,
                    labels: [...prevState.labels, timestamp],
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: [...prevState.datasets[0].data, rate],
                        },
                    ],
                }));
            } catch (err) {
                setError("Failed to fetch forex data");
                console.error(err);
            }
        };

        getData(); // Fetch initial data
        const intervalId = setInterval(getData, 10000); // Update every 10 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [fromCurrency, toCurrency]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-white shadow-sm sm:rounded-lg p-5">
            <div className="text-black space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Chart</h2>
                    <div className="flex items-center">
                        <div className="text-lg font-bold">{currentPrice}</div>
                    </div>
                </div>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default ForexChart;
