import { AddBox, AssignmentRounded, AttachFile, AttachMoney, AudioFile, CalendarMonthRounded, ChevronRightSharp, ExpandMore, MonetizationOn, Videocam, VideoFile } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Badge,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Paper,
    Tooltip,
    Typography
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import Appointments from "./Appointments";
import Schedule from "./Schedule";

interface iAula {
    id: string,
    nomeCurso: string,
    idCurso: string,
    idAluno: string,
}


const Courses = (props: { Aula: iAula }) => {
    const { Aula } = props;
    const [expanded, setExpanded] = useState<false|string>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<undefined|ReactElement>();

    const handleChange = (aula: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? aula : false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setModalContent(undefined);
    }

    const getModalContent = (contentType: string) => {
        const contentList = {
            'tasks': <>a</>,
            'calendar': <Appointments />,
            'schedule': <Schedule />,
            'purchase': <>Faz o pix</>
        };
        const [key, value]: any = Object.entries(contentList).find((el) => {
            return el[0] == contentType
        });
        
        setModalContent(value);
        setOpenModal(true);
    }

    return (
        <CoursesContainer>
            <Typography variant="h2" sx={{width: '-webkit-fill-available'}}>{Aula.nomeCurso}</Typography>
            <SpotLightContainer>
                <SpotLightItem>
                    <Paper elevation={2} style={{borderRadius: '50%', marginBottom: '5px'}}>
                        <IconButton size="large" onClick={() => getModalContent('purchase')} color="primary">
                            <MonetizationOn />
                        </IconButton>
                    </Paper>
                    <Typography>Tickets</Typography>
                </SpotLightItem>
                <SpotLightItem>
                    <Paper elevation={2} style={{borderRadius: '50%', marginBottom: '5px'}}>
                        <IconButton size="large" onClick={() => getModalContent('tasks')}>
                            <Badge badgeContent={1} color='primary'><AssignmentRounded /></Badge>
                        </IconButton>
                    </Paper>
                    <Typography>Tarefas</Typography>
                </SpotLightItem>
                <SpotLightItem>
                    <Paper elevation={2} style={{borderRadius: '50%', marginBottom: '5px'}}>
                        <IconButton size="large"  onClick={() => getModalContent('calendar')}>
                            <CalendarMonthRounded />
                        </IconButton>
                    </Paper>
                    <Typography>Calendario</Typography>
                </SpotLightItem>
                <SpotLightItem>
                    <Paper elevation={2} style={{borderRadius: '50%', marginBottom: '5px'}}>
                        <IconButton size="large" onClick={() => getModalContent('schedule')}>
                            <Tooltip title="Você tem 3 aulas disponíveis" arrow >
                                <Badge badgeContent={3} color='primary' showZero>
                                    <AddBox />
                                </Badge>
                            </Tooltip>
                        </IconButton>
                    </Paper>
                    <Typography>Agendar</Typography>
                </SpotLightItem>
            </SpotLightContainer>

            <div style={{width: '100%', marginTop: '20px'}}>
                <Accordion expanded={expanded === 'aula1'} onChange={handleChange('aula1')}>
                    <AccordionSummary expandIcon={<ExpandMore />} aria-controls="Aula 1" id={`Aula ${1}`}>
                        <Typography>Aula 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItem secondaryAction={
                                <IconButton edge="end">
                                    <ChevronRightSharp />
                                </IconButton>
                            }>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AttachFile />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Material da aula 1" />
                            </ListItem>
                            <ListItem secondaryAction={
                                <IconButton edge="end">
                                    <ChevronRightSharp />
                                </IconButton>
                            }>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AudioFile />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Exercicios de Audio" />
                            </ListItem>
                            <ListItem secondaryAction={
                                <IconButton edge="end">
                                    <ChevronRightSharp />
                                </IconButton>
                            }>
                                <ListItemAvatar>
                                    <Avatar>
                                        <VideoFile />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Video Aulas" />
                            </ListItem>
                            <ListItem secondaryAction={
                                <IconButton edge="end">
                                    <ChevronRightSharp />
                                </IconButton>
                            } disabled>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Videocam />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Aula ao vivo" secondary="17/03/2022" />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Modal 
                open={openModal}
                onClose={handleCloseModal}
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
                <Paper elevation={2} sx={{width: '80%'}}   >
                    {modalContent}
                </Paper>    
            </Modal>

        </CoursesContainer>
    );
};

const CoursesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    padding: 20px;
`;

const SpotLightContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const SpotLightItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default Courses;
