import { StaticDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from "@mui/material";
import { format } from 'date-fns';
import React, { useState } from 'react';
import Calendar from "./Calendar";


const Appointments = () => {
    const [value, setValue] = useState(format(new Date(), 'dd/MM/Y'));
    const handleChangeDate = (newValue: any) => {
        setValue(newValue);
    }
    return (
        <>
            <Calendar />
        </>
    )
}  

export default Appointments;