import { Session } from "@auth0/nextjs-auth0";
import { Class, EventAvailable, MoreVert } from "@mui/icons-material";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
    Alert,
    AlertTitle,
    Button,
    Dialog,
    Drawer,
    FormControl,
    IconButton,
    MenuItem,
    Modal,
    Paper,
    Select,
    SelectChangeEvent,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { format, getDay, getDaysInMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { BaseSyntheticEvent, useState } from "react";
import styled from "styled-components";
import ClassCard from "../../components/classCard";
import DrawerHorario from "../../components/DrawerHorario";
import DrawerNovoCurso from "../../components/DrawerNovoCurso";
import Layout from "../../components/layout";
import TabPanel from "../../components/TabPanel";
import Api from "../../lib/Api";
import auth0 from "../../lib/auth0";
import { useFetchUser } from "../../lib/user";

const listTimeRange = () => {
    const timeRange: string[] = [];

    for (let i = 0; i < 24; i++) {
        let hora = i < 10 ? `0${i}` : i;

        if (i < 12) {
            timeRange.push(`${hora}:00am`);
            timeRange.push(`${hora}:15am`);
            timeRange.push(`${hora}:30am`);
            timeRange.push(`${hora}:45am`);
        } else {
            timeRange.push(`${hora}:00pm`);
            timeRange.push(`${hora}:15pm`);
            timeRange.push(`${hora}:30pm`);
            timeRange.push(`${hora}:45pm`);
        }
    }

    return timeRange;
};

type iCurso = {
    _id: string;
    nome: string;
    descricao: string;
    preco: number;
    img: string;
    professor: string;
};

type iHorario = {
    _id?: string;
    userId: string;
    horario: [[{ startTime: string; endTime: string }]];
    horaAula: string;
};

const AdminCourses = (props: { cursos: iCurso[]; horarios: iHorario }) => {
    const { cursos, horarios } = props;
    const { user, loading } = useFetchUser();

    const [tabIndex, setTabIndex] = useState(0);

    const [modalNovoCurso, setModalNovoCurso] = useState<boolean>(false);
    const [modalHorarios, setModalHorarios] = useState<boolean>(false);
    const [dialogHorario, setDialogHorario] = useState<boolean>(false);

    const [nomeCurso, setNomeCurso] = useState<string>();
    const [descricaoCurso, setDescricaoCurso] = useState<string>();
    const [imagemCurso, setImagemCurso] = useState<string>();
    const [precoCurso, setPrecoCurso] = useState<number>();

    const [tituloEvento, setTituloEvento] = useState<string>();
    const [duracaoAula, setDuracaoAula] = useState<number>();
    const [startTime, setStartTime] = useState<string>();
    const [endTime, setEndTime] = useState<string>();

    const [selectedDay, setSelectedDay] = useState<Date>();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };
    const handleCloseModalNovoCurso = () => {
        setModalNovoCurso(false);
    };

    const submitNovoCurso = () => {
        setNomeCurso("");
        setDescricaoCurso("");
        setImagemCurso("");
        setPrecoCurso(undefined);
    };

    const assignTimePeriod = (event: BaseSyntheticEvent, day: Date) => {
        setDialogHorario(true);
        setSelectedDay(day);
    };

    return (
        <Layout user={user} loading={loading}>
            <CoursesContainer>
                <Alert severity="info">
                    <AlertTitle>3 aulas marcadas</AlertTitle>
                    Você tem 3 aulas marcadas para essa semana
                </Alert>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Meus Cursos" id="1" />
                    <Tab label="Meus Alunos" id="2" />
                </Tabs>
                <TabPanel value={tabIndex} index={0}>
                    <>
                        <div className="meus-cursos">
                            <SpotLightContainer>
                                <SpotLightItem>
                                    <Paper
                                        elevation={2}
                                        style={{
                                            borderRadius: "50%",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        <IconButton
                                            size="large"
                                            onClick={() =>
                                                setModalNovoCurso(true)
                                            }
                                        >
                                            <Class />
                                        </IconButton>
                                    </Paper>
                                    <Typography>Novo Curso</Typography>
                                </SpotLightItem>
                                <SpotLightItem>
                                    <Paper
                                        elevation={2}
                                        style={{
                                            borderRadius: "50%",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        <IconButton
                                            size="large"
                                            onClick={() =>
                                                setModalHorarios(true)
                                            }
                                        >
                                            <EventAvailable />
                                        </IconButton>
                                    </Paper>
                                    <Typography>Meus Horários</Typography>
                                </SpotLightItem>
                            </SpotLightContainer>
                            <CursosContainer>
                                {cursos.map((curso: iCurso) => {
                                    return (
                                        <ClassCard
                                            key={curso._id}
                                            cardTitle={curso.nome}
                                            classId={curso.descricao}
                                            imageHeader={curso.img}
                                            primaryButton={{
                                                label: "Nova Atividade",
                                                action: () => {},
                                            }}
                                            secondaryButton={{
                                                label: "Audio e Video",
                                                action: () => {},
                                            }}
                                        />
                                    );
                                })}
                            </CursosContainer>
                        </div>
                    </>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <>Item Two</>
                </TabPanel>
                <DrawerNovoCurso
                    onClose={() => setModalNovoCurso(false)}
                    onSubmit={() => {}}
                    open={modalNovoCurso}
                    values={{
                        nomeCurso,
                        precoCurso,
                        descricaoCurso,
                        imagemCurso,
                    }}
                />
                <DrawerHorario
                    open={modalHorarios}
                    onClose={() => setModalHorarios(false)}
                    horariosDisponiveis={horarios}
                />

                <Modal
                    open={dialogHorario}
                    onClose={() => {
                        setDialogHorario(false);
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Paper
                        elevation={1}
                        sx={{ padding: "50px", width: "50vw" }}
                    >
                        <Typography
                            variant="h4"
                            style={{ textAlign: "center" }}
                        >
                            Adicionar horário disponível
                        </Typography>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "10px",
                            }}
                        >
                            {selectedDay && (
                                <Typography variant="subtitle2">
                                    {format(
                                        selectedDay,
                                        "dd 'de' MMMM 'de' yyyy",
                                        { locale: ptBR }
                                    )}
                                </Typography>
                            )}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Typography variant="subtitle2">das</Typography>
                                <Select
                                    defaultValue=""
                                    value={startTime}
                                    onChange={(event: SelectChangeEvent) => {
                                        setStartTime(
                                            event.target.value as string
                                        );
                                    }}
                                >
                                    {listTimeRange().map((time) => {
                                        return (
                                            <MenuItem value={time} key={time}>
                                                {time}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <Typography variant="subtitle2">às</Typography>
                                <Select
                                    defaultValue=""
                                    value={endTime}
                                    onChange={(event: SelectChangeEvent) => {
                                        setEndTime(
                                            event.target.value as string
                                        );
                                    }}
                                >
                                    {listTimeRange().map((time) => {
                                        return (
                                            <MenuItem value={time} key={time}>
                                                {time}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </LocalizationProvider>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <Typography variant="subtitle2">
                                Aulas de{" "}
                            </Typography>
                            <StyledInputElement
                                type="number"
                                value={duracaoAula}
                                onChange={(event) => {
                                    setDuracaoAula(+event.target.value);
                                }}
                            />
                            <Typography variant="subtitle2">minutos</Typography>
                        </div>

                        <Button color="secondary" variant="contained">
                            Salvar
                        </Button>
                    </Paper>
                </Modal>
            </CoursesContainer>
        </Layout>
    );
};

const CoursesContainer = styled.div`
    padding: 20px 0px 0px 20px;
    margin-top: 10px;

    .container {
        display: flex;
    }

    .input {
        width: 50%;
        margin-bottom: 30px;
        margin-left: 10px;
    }
`;

const CursosContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const SpotLightContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    margin-top: 10px;
    align-items: center;
    gap: 10px;
`;

const SpotLightItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledInputElement = styled.input`
    width: 30px;
    font-size: 0.875rem;
    height: 30px;
    color: white;
    background-color: ${grey[900]};
    border: 1px solid ${grey[800]};
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
`;

export default AdminCourses;

export const getServerSideProps = auth0.withPageAuthRequired({
    async getServerSideProps({ req, res }) {
        const session: Session | null | undefined = await auth0.getSession(
            req,
            res
        );
        if (!session) return { props: {} };

        const user = session.user;
        const cursos = await Api.getCursoPorProfessor(user.sub);
        const horarios = await Api.getHorarios(user.sub);
        return {
            props: {
                cursos,
                horarios
            },
        };
    },
});
