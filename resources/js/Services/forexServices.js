// services/forexService.js
import axios from "axios";

export const fetchForexData = async (fromCurrency, toCurrency) => {
    const response = await axios.get("/api/forex", {
        params: {
            from: fromCurrency,
            to: toCurrency,
        },
    });
    console.log("Error checkos", response);
    return response.data.quotes;
};
