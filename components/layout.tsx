import { Paper } from "@mui/material";
import React, { ReactElement } from "react";
import Header from "./header";

const Layout = (props: { children: ReactElement, user: any, loading: boolean, isProfessor?: boolean}) => {
    const { children, user, loading, isProfessor } = props;
    return (
        <div style={{ minHeight: "100vh"}}>
            <Paper sx={{ width: "100%", minHeight: "100vh" }}>
                <Header user={user} isProfessor={isProfessor || false}/>
                <div style={{maxWidth: '1096px', margin: 'auto'}}>
                    {children}
                </div>
            </Paper>
        </div>
    );
};

export default Layout;
