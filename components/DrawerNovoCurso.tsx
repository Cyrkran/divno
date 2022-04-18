import {
    Button,
    Drawer,
    FormControl,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

type DrawerType = {
    onSubmit: () => any;
    open: boolean;
    onClose: () => any;
    values: {
        nomeCurso: string | undefined;
        descricaoCurso: string | undefined;
        precoCurso: number | undefined;
        imagemCurso: string | undefined;
    };
};

const DrawerNovoCurso = (props: DrawerType) => {
    const { onSubmit, open, onClose, values } = props;
    return (
        <Drawer
            anchor={"bottom"}
            open={open}
            onClose={onClose}
        >
            <FormControl>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        paddingTop: "20px",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            width: "100%",
                            textAlign: "center",
                            marginBottom: "10px",
                        }}
                    >
                        Cadastrar novo curso
                    </Typography>
                    <TextField
                        sx={{
                            width: "40%",
                            marginBottom: "10px",
                        }}
                        className="input"
                        type="text"
                        label="Nome do Curso"
                        value={values.nomeCurso}
                    />
                    <TextField
                        sx={{
                            width: "40%",
                            marginBottom: "10px",
                        }}
                        className="input"
                        type="text"
                        label="Descricao do Curso"
                        value={values.descricaoCurso}
                    />
                    <TextField
                        sx={{
                            width: "40%",
                            marginBottom: "10px",
                        }}
                        className="input"
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        }}
                        label="Valor por aula"
                        value={values.precoCurso}
                    />
                    <TextField
                        sx={{
                            width: "40%",
                            marginBottom: "10px",
                        }}
                        className="input"
                        type="string"
                        label="Imagem"
                        value={values.imagemCurso}
                    />

                    <Button
                        sx={{ width: "100%" }}
                        variant="contained"
                        onSubmit={onSubmit}
                    >
                        Enviar
                    </Button>
                </div>
            </FormControl>
        </Drawer>
    );
};

export default DrawerNovoCurso;
