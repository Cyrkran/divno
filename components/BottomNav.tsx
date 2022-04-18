import MenuBookIcon from "@mui/icons-material/MenuBook";
import TranslateOutlined from "@mui/icons-material/TranslateOutlined";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";

const BottomNav = () => {
    const [value, setValue] = useState(0);
    const router = useRouter();

    return (
        <>
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}
                elevation={4}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label="Aulas"
                        icon={<TranslateOutlined />}
                    />
                    <BottomNavigationAction
                        label="Apostila"
                        icon={<MenuBookIcon />}
                        onClick={() => router.push(`/books/1`)}
                    />
                </BottomNavigation>
            </Paper>
        </>
    );
}

export default BottomNav;