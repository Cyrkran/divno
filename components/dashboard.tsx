import styled from "styled-components";
import React, { ReactElement, useEffect, useState } from "react";
import ClassCard from "./classCard";
import { useRouter } from "next/router";
import Api from "../lib/Api";
import { Backdrop, CircularProgress } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";
import { useUser } from "@auth0/nextjs-auth0";
import { useFetchUser } from "../lib/user";

interface iClasses {
    _id: number,
    preco: number,
    nome: string;
    descricao: string;
    img: string;
    matriculado?: true
}

const Dashboard = (props: { classes: iClasses[] }) => {
    const { classes } = props;
    const { user } = useFetchUser();
    const Router = useRouter();
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [contentBackdrop, setContentBackdrop] = useState<ReactElement>(<CircularProgress color="inherit" />);

    const requestMatriculas = async (userId: string) => {
        const matriculas = await Api.getMatriculaByAluno(userId);
    }

/*     useEffect(() => {

        if(!user) return;

        requestMatriculas(user.sub as string);
    }, [user]); */

    const onClickCardActionButton = (aula: iClasses) => {
        if(aula.matriculado) { Router.push(`/courses/${aula.nome}?idAula=${aula._id}`, {
            pathname: `/courses/${aula.nome}`
        }); return; }

        setOpenBackdrop(true);
        Api.matricular(1, aula._id)
        .then(res => {
            setTimeout(() => {
                setContentBackdrop(<CheckCircle color="inherit" />);
                Router.push(`/courses/${aula.nome}`);
            }, 3000)
        })
        .catch(err => {
            setTimeout(() => {
                setContentBackdrop(<Error color="inherit" />);
            }, 3000);
        });
    };

    return (
        <DashboardContainer>
            {classes.map((availableClass: iClasses) => {
                return (
                    <ClassCard
                        cardTitle={availableClass.nome}
                        classId={availableClass.descricao}
                        key={availableClass._id}
                        imageHeader={availableClass.img}
                        primaryButton={{
                            label: availableClass.matriculado ? "Acessar" : "Matricular",
                            action: () => {onClickCardActionButton(availableClass)},
                        }}
                    />
                );
            })}
            <Backdrop
                sx={{color: '#fff', zIndez: 999}}
                open={openBackdrop}
            >
                    
                {contentBackdrop}
                
            </Backdrop>

        </DashboardContainer>
    );
};


const DashboardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 25px;
    width: 100%;
    margin-top: 10px;
    margin: auto;
`;

export default Dashboard;
