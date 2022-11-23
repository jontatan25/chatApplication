import React from 'react'


const CountryOption = ({countryName}) => {
  return (
    <option className="register__option" value={countryName}>
    {countryName}
  </option>
  )
}

export default CountryOption