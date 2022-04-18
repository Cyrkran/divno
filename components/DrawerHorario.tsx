import { Drawer, Typography } from "@mui/material";
import React from "react";
import Calendar from "./Calendar";


type iHorario = {
    _id?: string;
    userId: string;
    horario: [{ startTime: string; endTime: string }][];
    horaAula: string;
};

const DrawerHorario = (props: {
    open: boolean;
    onClose: any;
    horariosDisponiveis: iHorario;
}) => {
    const { open, onClose, horariosDisponiveis } = props;
    console.log({horariosDisponiveis})
    return (
        <Drawer anchor={"bottom"} open={open} onClose={onClose}>
            {/* <Calendar horariosDisponiveis={props.horariosDisponiveis} /> */}
            {horariosDisponiveis.horario?.map((horario: any) => {
                return (
                    <>
                        <Typography>{horario[0]?.startTime}</Typography>
                        <Typography>{horario[0]?.endTime}</Typography>
                    </>
                )
            })}
        </Drawer>
    );
};


export default DrawerHorario;
