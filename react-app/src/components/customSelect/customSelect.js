import React from "react";
import Select from "react-select";
import '../../css/main.css'

function ColorSelect({ defaultValue, setColor }) {

  const options = [
    {value: '#a9a8a8', label: 'None', color:'#a9a8a8'},
    {value: '#ce3d3d', label: 'Red', color:'#ce3d3d'},
    {value: '#ff7700', label: 'Orange', color:'#ff7700'},
    {value: '#ffc400', label: 'Yellow', color:'#ffc400'},
    {value: '#00ff00', label: 'Lime Green', color:'#00ff00'},
    {value: '#008000', label: 'Green', color:'#008000'},
    {value: '#008080', label: 'Teal', color:'#008080'},
    {value: '#87ceeb', label: 'Sky Blue', color:'#87ceeb'},
    {value: '#add8e6', label: 'Light Blue', color:'#add8e6'},
    {value: '#2929ff', label: 'Blue', color:'#2929ff'},
    {value: '#6f056f', label: 'Grape', color:'#6f056f'},
    {value: '#ff00ff', label: 'Magenta', color:'#ff00ff'},
    {value: '#fa8072', label: 'Salmon', color:'#fa8072'}
  ]

  let savedColor

  options.forEach((color) => color.value === defaultValue ? savedColor = color : '#a9a8a8');

  const display = (color) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    textDecoration: 'none',
    padding: 2,
    margin: 0,

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
      height: 2,
      textDecoration: 'none',
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
      className='ColorPicker'
    />
  )
};

export default ColorSelect;
