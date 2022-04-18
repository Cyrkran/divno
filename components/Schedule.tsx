import { InputLabel } from "@material-ui/core";
import {
    LocalizationProvider,
    PickersDay,
    PickersDayProps,
    StaticDatePicker,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
    Button,
    FormControl,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { isAfter, isBefore, isEqual, isToday } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";

const Schedule = () => {
    const [day, setDay] = useState<Date | null>(null);
    const [hourRange, setHourRange] = useState();

    const availableDates = [
        new Date(2022, 2, 20),
        new Date(2022, 2, 21),
        new Date(2022, 2, 22),
        new Date(2022, 2, 23),
        new Date(2022, 2, 27),
        new Date(2022, 2, 28),
        new Date(2022, 2, 31),
    ];

    const availableHours = [
        "10:00 às 10:50",
        "11:00 às 11:50",
        "13:00 às 13:50",
        "14:00 às 14:50",
        "15:00 às 15:50",
        "16:00 às 16:50",
        "17:00 às 17:50",
    ];

    const renderAvailableDates = (
        day: Date,
        selectedDates: Array<Date | null>,
        dayProps: PickersDayProps<Date>
    ) => {
        const available = availableDates.some((date: Date) => {
            return (
                isEqual(day, date) &&
                (isAfter(date, new Date()) || isToday(date))
            );
        });

        return <PickersDay {...dayProps} disabled={!available} />;
    };

    return (
        <ScheduleContainer>
            <Typography variant="h4">Fulano de Tal da Silva</Typography>
            <Typography variant="subtitle2">
                Especialidade - Dolor Sit Amet
            </Typography>
            <Paper elevation={2} sx={{ marginTop: "10px", paddingBottom: '10px' }}>
                <Typography variant="subtitle1">
                    Agende uma data disponível
                </Typography>

                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            value={day}
                            onChange={(newValue) => {
                                setDay(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            renderDay={renderAvailableDates}
                        />
                    </LocalizationProvider>
                    {
                        day ? 
                        <>
                            <InputLabel id="hour-range">Selecione um horário</InputLabel>
                            <Select
                                labelId="hour-range"
                                id="horario"
                                value={hourRange}
                                label="horario"
                                onChange={(newValue: any) => setHourRange(newValue)}
                            >
                                {availableHours.map((hours: string) => {
                                    return (
                                        <MenuItem value={hours} key={hours}>
                                            {hours}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <Button variant="contained" className="botao-agendar">Agendar</Button>
                        </> : 
                        <></>
                    }
                    
                </FormControl>
            </Paper>
        </ScheduleContainer>
    );
};

const ScheduleContainer = styled.div`
    text-align: center;
    padding-top: 10px;

    .botao-agendar{
        margin-top: 20px;
    }
`;

export default Schedule;
