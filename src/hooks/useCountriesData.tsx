import { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";

export interface Country {
  name: string;
  region: string;
  area: number;
  independent: boolean;
}

const useCountriesData = () => {
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [errorMsg, setErrorMsg] = useState<
    "Error in uploading countries, please try again later" | null
  >(null);
  const [loading, setLoading] = useState<"Loading..." | null>(null);
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading("Loading...");
      try {
        const data = await fetchData("v2/all?fields=name,region,area");
        setCountriesData(data);
      } catch (error) {
        setErrorMsg("Error in uploading countries, please try again later");
      } finally {
        setLoading(null);
      }
    };

    fetchCountries();
  }, []);

  return { countriesData, errorMsg, loading };
};

export default useCountriesData;
