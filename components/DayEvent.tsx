import { Class, EventAvailable } from "@mui/icons-material";
import { Chip, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useState } from "react";

const mapTypeComponents = (eventType: string) => {
    const components = {
        "horario-disponivel": <EventAvailable />,
        aula: <Class />,
    };

    return components[eventType as keyof typeof components];
};

const DayEvent = (props: {event: any, day: Date}) => {
    const {event, day} = props;
    const [openedDialog, setOpenedDialog] = useState<string|undefined>();
    return (
        <>
            <Chip
                color="primary"
                size="small"
                icon={mapTypeComponents(event.type)}
                label={event.className}
                onClick={() => {
                    setOpenedDialog(
                        event.className +
                            format(day, "dd/MMMM/yyyy", { locale: ptBR })
                    );
                }}
            />
            <Dialog
                onClose={() => {
                    setOpenedDialog(undefined);
                }}
                open={
                    openedDialog ===
                    event.className +
                        format(day, "dd/MMMM/yyyy", { locale: ptBR })
                }
            >
                <DialogTitle>
                    <Typography variant="body1">{`Horário disponível de ${event.horario.startTime} às ${event.horario.endTime}`}</Typography>
                </DialogTitle>
            </Dialog>
        </>
    );
};

export default DayEvent;
