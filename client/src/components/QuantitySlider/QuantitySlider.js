import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

const QuantitySlider = (props) => {
  let { quantity } = props.product;

  const [value, setValue] = React.useState(quantity);
  function valueLabelFormat(value) {
    const units = ["PC", "PCS"];

    let unitIndex = 0;
    let scaledValue = value;
    while (scaledValue >= 2 && unitIndex < units.length - 1) {
      unitIndex = 1;
      scaledValue /= 1;
    }

    return `${scaledValue} ${units[unitIndex]}`;
  }

  function calculateValue(value) {
    return value;
  }

  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
      // let singlePrice = newValue * props.product.price;
      // let totalAmount = 0;
      // totalAmount = singlePrice + totalAmount;
      // let tax = (totalAmount * 0.1).toFixed(2);
      // tax = tax * 1;
      // let totalAfterIncrement = totalAmount + tax;

      props.product.quantity = newValue;
      props.handlePriceAfterIncrement(props.product);
    }
  };

  return (
    <Box sx={{ width: 200 }}>
      <Typography
        style={{ fontSize: "12px", marginBottom: "-5px", marginLeft: "25px" }}
        id="non-linear-slider"
        gutterBottom
      >
        Quantity: {valueLabelFormat(calculateValue(value))}
      </Typography>
      <Slider
        value={value}
        min={1}
        step={1}
        max={20}
        scale={calculateValue}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </Box>
  );
};

export default QuantitySlider;
