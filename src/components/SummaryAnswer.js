import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: "4px",
        marginBottom: "2px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontWeight: 600
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        marginBottom: "5px",
        marginLeft: "20px"
    },
}));

export default function SummaryAnswer({answer, totalReplies}) {

    let answerPercentage = (answer["selectedByRespondents"]/totalReplies)* 100;

    const classes = useStyles();
    return (
        <div className={classes.secondaryHeading}>
            <li>
                {answer["text"]}: {answerPercentage}%
            </li>
        </div>
    );
}
