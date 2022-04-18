import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, grey, purple } from "@mui/material/colors";
import { UserProvider } from "@auth0/nextjs-auth0";

const theme = createTheme({
    palette: {
        primary: {
            light: purple[900],
            main: purple[600],
            dark: purple[300]
        },
        secondary: {
            light: blueGrey[900],
            main: blueGrey[600],
            dark: blueGrey[300]
        },
        background: {
            paper: grey[900],
            default: grey[900]
        },
        mode: "dark",
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </ThemeProvider>
    );
}

export default MyApp;
