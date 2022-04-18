import {
    ChevronLeft,
    ChevronRight
} from "@mui/icons-material";
import {
    Box, IconButton,
    Paper,
    Typography
} from "@mui/material";
import { purple } from "@mui/material/colors";
import {
    add,
    format,
    getDay,
    getDaysInMonth,
    getMonth,
    getYear,
    isSameDay,
    isToday,
    lastDayOfMonth
} from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import DayEvent from "./DayEvent";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const getListOfDaysOfTheMonth = (month: number, year: number) => {
    let DaysOfTheMonth: (Date | null)[] = [];
    const daysInMonth: number = getDaysInMonth(new Date(year, month, 1)),
        firstDate: Date = new Date(year, month, 1),
        lastDate: any = lastDayOfMonth(firstDate),
        getFirstDay: number = getDay(firstDate),
        getLastDay: number = 6 - getDay(lastDate);

    for (let i = 0; i < getFirstDay; i++) {
        DaysOfTheMonth.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        DaysOfTheMonth.push(new Date(year, month, i));
    }

    for (let i = 0; i < getLastDay; i++) {
        DaysOfTheMonth.push(null);
    }
    return DaysOfTheMonth;
};

const mountHorariosDisponiveis = (month: number, year: number, horarios: [{startTime: string, endTime:string}][]) => {
    const daysInMonth: number = getDaysInMonth(new Date(year, month, 1));
    const pills = []
    if(!horarios) return [];

    for (let i = 0; i <= daysInMonth; i++) {
        const date = new Date(year, month, i),
            day = getDay(date),
            events = []
        
        for(let j = 0; j < horarios[day].length; j++){
            events.push({
                className: "Horários Disponíveis",
                type: "horario-disponivel",
                horario: horarios[day][j]
            });
        }
        
        pills.push({
            date,
            events
        })
    }
    return pills;
};

type CalendarProps = {
    onClickEachDay?: (event: BaseSyntheticEvent, day: Date) => any;
    horariosDisponiveis?: any;
};

const Calendar = (props: CalendarProps) => {
    const { onClickEachDay, horariosDisponiveis } = props;
    const today = new Date();
    const [DaysOfTheMonth, setDaysofTheMonth] = useState<(Date | null)[]>([]);
    const [DisplayDate, setDisplayDate] = useState(today);
    
    const pills = horariosDisponiveis ? mountHorariosDisponiveis(getMonth(DisplayDate), getYear(DisplayDate), horariosDisponiveis.horarios) : undefined;
    
    useEffect(() => {
        setDaysofTheMonth(
            getListOfDaysOfTheMonth(getMonth(DisplayDate), getYear(DisplayDate))
        );
    }, [DisplayDate]);

    const onClickPrevMonth = () => {
        setDisplayDate(add(DisplayDate, { months: -1 }));
    };
    const onClickNextMonth = () => {
        setDisplayDate(add(DisplayDate, { months: 1 }));
    };

    return (
        <CalendarContainer>
            <div
                style={{
                    margin: "10px 0px 10px 0px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <IconButton onClick={onClickPrevMonth}>
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h4" className="display-month">
                    {format(DisplayDate, "MMMM, yyyy", { locale: ptBR })}
                </Typography>
                <IconButton onClick={onClickNextMonth}>
                    <ChevronRight />
                </IconButton>
            </div>
            <WeekDaysContainer>
                {weekDays.map((day: string, index: number) => {
                    return (
                        <Typography
                            variant="body1"
                            key={index}
                            className="days"
                        >
                            {day}
                        </Typography>
                    );
                })}
            </WeekDaysContainer>
            <WeekDaysContainer>
                {DaysOfTheMonth.map((day: Date | null, index: number) => {
                    const currentEvents = pills?.find((events: any) => {
                        return day === null
                            ? false
                            : isSameDay(events.date, day);
                    });
                    return (
                        <Paper
                            elevation={1}
                            className="box"
                            style={{ width: "13.6%" }}
                            key={index}
                        >
                            {day !== null && (
                                <>
                                    <Typography
                                        variant="body2"
                                        className={`dayNumber ${
                                            isToday(day) ? "today" : ""
                                        } ${
                                            onClickEachDay !== undefined
                                                ? "clickable"
                                                : ""
                                        }`}
                                        onClick={(
                                            event: BaseSyntheticEvent
                                        ) => {
                                            if (onClickEachDay)
                                                onClickEachDay(event, day);
                                        }}
                                    >
                                        {format(day, "dd", { locale: ptBR })}
                                    </Typography>
                                    <Box hidden={currentEvents === undefined}>
                                        {currentEvents?.events.map(
                                            (event: any, index: number) => {
                                                return (
                                                    <DayEvent
                                                        key={day.toString()+index}
                                                        event={event}
                                                        day={day}
                                                    />
                                                );
                                            }
                                        )}
                                    </Box>
                                </>
                            )}
                        </Paper>
                    );
                })}
            </WeekDaysContainer>
        </CalendarContainer>
    );
};

const CalendarContainer = styled.div`
    .days {
        width: 13.6%;
        text-align: center;
    }

    .display-month {
        text-align: center;
        text-transform: capitalize;
    }
`;
const WeekDaysContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-end;
    flex-direction: row;
    align-content: center;
    gap: 5px;
    padding: 10px;

    .box {
        height: 100px;

        .dayNumber {
            width: 20px;
            margin: 5px 0px 0px auto;
            text-align: center;
        }
    }

    *:empty {
        box-shadow: none;
        background-color: rgba(0, 0, 0, 0.12);
    }

    .today {
        background-color: ${purple[600]};
        border-radius: 50%;
        color: white;
    }

    .clickable {
        cursor: pointer;
    }
`;

export default Calendar;
