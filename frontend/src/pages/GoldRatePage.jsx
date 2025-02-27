import React, { useEffect, useState } from "react";
import { FiDollarSign, FiMapPin } from "react-icons/fi";

const GoldRatesPage = () => {
  const [usGoldRate, setUsGoldRate] = useState(null);
  const [indiaGoldRate, setIndiaGoldRate] = useState(null);
  const apiKey = "goldapi-iusm7nurkld-io"; // Your GoldAPI Key

  useEffect(() => {
    const fetchGoldRates = async () => {
      try {
        // Fetch gold rate in USD per ounce
        const goldResponse = await fetch("https://www.goldapi.io/api/XAU/USD", {
          headers: {
            "x-access-token": apiKey,
            "Content-Type": "application/json",
          },
        });

        // Fetch USD to INR exchange rate
        const exchangeResponse = await fetch("https://www.goldapi.io/api/XAU/INR", {
          headers: {
            "x-access-token": apiKey,
            "Content-Type": "application/json",
          },
        });

        if (goldResponse.ok && exchangeResponse.ok) {
          const goldData = await goldResponse.json();
          const exchangeData = await exchangeResponse.json();

          const goldPricePerOunceUSD = goldData.price; // Gold price in USD per ounce
          const goldPricePerOunceINR = exchangeData.price; // Gold price in INR per ounce

          setUsGoldRate(goldPricePerOunceUSD.toFixed(2)); // Store gold price in USD per ounce

          // Convert to INR per 10 grams using live data
          const goldPricePerGramINR = goldPricePerOunceINR / 31.1035;
          const goldPricePer10GramINR = (goldPricePerGramINR * 10).toFixed(2);

          setIndiaGoldRate(goldPricePer10GramINR);
        } else {
          console.error("Failed to fetch gold rates.");
        }
      } catch (error) {
        console.error("Error fetching gold rates:", error);
      }
    };

    fetchGoldRates();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-400 w-full px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Current Gold Rates</h1>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-center">
          <FiMapPin className="text-blue-300 text-3xl mb-2" />
          <h2 className="text-2xl font-bold text-white mb-4">US Gold Rate</h2>
          {usGoldRate ? (
            <p className="text-blue-100 text-xl">
              <FiDollarSign className="inline text-blue-300" />
              {usGoldRate} USD/oz
            </p>
          ) : (
            <p className="text-blue-100">Loading...</p>
          )}
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-center">
          <FiMapPin className="text-blue-300 text-3xl mb-2" />
          <h2 className="text-2xl font-bold text-white mb-4">India Gold Rate</h2>
          {indiaGoldRate ? (
            <p className="text-blue-100 text-xl">
              <FiDollarSign className="inline text-blue-300" />
              {indiaGoldRate} INR/10g
            </p>
          ) : (
            <p className="text-blue-100">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoldRatesPage;
