import React, { Fragment } from "react";
import Select, { components } from "react-select";
import '../../css/main.css'

function ColorSelect({ defaultValue, setColor }) {

  const options = [
    {value: 'none', label: 'None', color:'#000000'},
    {value: 'red', label: 'Red', color:'#d42b2d'},
    {value: 'green', label: 'Green', color:'#27d838'},
    {value: 'blue', label: 'Blue', color:'#2570da'},
    {value: 'yellow', label: 'Yellow', color:'#e7b818'},
    {value: 'orange', label: 'Orange', color:'#e5791a'}
  ]

  let savedColor

  options.forEach((color) => color.value === defaultValue ? savedColor = color : null);

  const display = (color) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 15,
    textDecoration: 'none',

    ':before': {
      backgroundColor: color,
      content: '" "',
      marginRight: 6,
      height: 11,
      width: 11,
      borderRadius: 50,
    },
  });

  const style = {
    control: base => ({
      ...base,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 35,
      textDecoration: 'none'
    }),
    option: (style, { data }) => ({ ...style, ...display(data.color) }),
    singleValue: (style, { data }) => ({ ...style, ...display(data.color) }),
  };

  const handleClick = (e) => {
    e.preventDefault();
  }

  return (
    <Select
      onClick={handleClick}
      defaultValue={savedColor}
      options={options}
      styles={style}
      onChange={(e) => setColor(e.value)}
    />
  )
};

export default ColorSelect;
