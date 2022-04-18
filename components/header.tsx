import { School } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function Header(props: { user: any; isProfessor: boolean }) {
    const Router = useRouter();
    const { user, isProfessor } = props;

    return (
        <Paper elevation={4} sx={{ width: "100%", height: "fit-content" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: "pointer" }}
                        onClick={() => Router.push("/")}
                    >
                        Idiomas
                    </Typography>
                    {isProfessor && (
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            onClick={() => Router.push("/courses")}
                        >
                            <School />
                        </IconButton>
                    )}
                    {user ? (
                        <IconButton
                            onClick={() => {
                                Router.push("/api/logout");
                            }}
                            edge="end"
                        >
                            <Badge badgeContent={5} color="primary">
                                <Avatar
                                    alt={user.nickname}
                                    src={user.picture}
                                />
                            </Badge>
                        </IconButton>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={() => {
                                Router.push("/api/auth/login");
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Paper>
    );
}
