import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SummaryAnswer from "./SummaryAnswer";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: "10px",
        marginBottom: "20px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontWeight: 600
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function Summary({question, totalReplies}) {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            {question["questionTitle"]}
            {question["answerOptions"].map(answer => <SummaryAnswer key={answer["answerOption"]} answer={answer} totalReplies={totalReplies}/>)}
        </div>
    );
}
