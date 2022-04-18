import {
    Button,
    Card,
    CardActions,
    CardContent, CardMedia,
    Typography
} from "@mui/material";
import { MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";

type card = {
    imageHeader: string;
    cardTitle: string;
    classId: string;
    primaryButton: {
        label: string;
        action: MouseEventHandler<HTMLButtonElement>;
    };
    secondaryButton?: {
        label: string;
        action: MouseEventHandler<HTMLButtonElement>;
    };
    cardHeaderAction?: ReactElement;
};

const ClassCard = (props: card) => {
    const {
        imageHeader,
        cardTitle,
        classId,
        secondaryButton,
        primaryButton,
    } = props;
    return (
        <CardHolder>
            <Card sx={{ width: 280, maxHeight: 300 }} elevation={3}>
                <CardMedia
                    component="img"
                    height="140"
                    src={imageHeader}
                    alt="Cabeçalho Curso"
                />
                <CardContent sx={{ whiteSpace: "nowrap" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {cardTitle}
                    </Typography>
                    <Typography variant="subtitle2" >
                        {classId}
                    </Typography>
                </CardContent>
                <CardActions>
                    {secondaryButton ? (
                        <Button
                            size="small"
                            onClick={secondaryButton.action}
                            color="secondary"
                            variant='outlined'
                        >
                            {secondaryButton.label}
                        </Button>
                    ) : (
                        <></>
                    )}
                    <Button
                        hidden={!primaryButton}
                        size="small"
                        onClick={primaryButton.action}
                        color="primary"
                        variant="contained"
                    >
                        {primaryButton.label}
                    </Button>
                </CardActions>
            </Card>
        </CardHolder>
    );
};

const CardHolder = styled.div`
    padding: 15px;
    max-height: 290px;
`;

export default ClassCard;
