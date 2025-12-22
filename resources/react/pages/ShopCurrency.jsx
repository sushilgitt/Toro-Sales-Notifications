import { useEffect, useState } from "react";

const useShopCurrency = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch("/api/shop/currency");
        const data = await response.json();

        if (data.status === "success") {
          setCurrencyData(data.data);
        } else {
          setError(data.message || "Failed to fetch currency");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  const formatMoney = (amount) => {
    if (!currencyData) return amount;
    let format = currencyData.moneyFormat || "{{amount}}";
    const value = Math.round(amount);
    return format.replace("{{amount}}", value);
  };

  return { currencyData, formatMoney, loading };
};

export default useShopCurrency;
