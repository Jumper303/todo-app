import React, { useState } from "react";

// TODO: create a custom component which wraps an item input field, the completion checkbox, and the remove item button
export default function CustomInput(props) {
    const {
        defaultValue
    } = props;
    const [value, setValue] = useState(defaultValue);

    return (<input type='text'
        onChange={(e) => {
            setValue(e.target.value);
        }}
        value={value} />);
}