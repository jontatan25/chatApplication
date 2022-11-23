import axios from "axios";

 async function getCountriesInfo() {
  const res = await axios.get(
   " https://countriesnow.space/api/v0.1/countries/flag/images"
  );
  return res.data.data;
};
 export {getCountriesInfo};