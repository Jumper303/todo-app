import React, { useState } from "react";

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