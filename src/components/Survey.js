import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Summary from "./Summary";
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useHistory} from "react-router-dom";



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: "4px",
        marginBottom: "2px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        flexBasis: '70%',
        flexShrink: 0,
        fontWeight: 500,
        display: "flex",
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function Survey({survey}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [surveyPage, isSurvey] = React.useState(false)
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    function getTotalReplies(survey) {
        let totalReplies = survey["questions"].map(i => i["answerOptions"]).map(x => x.map(x => x['selectedByRespondents'])).map( v => v.reduce((acc, x) => acc + x));
        return totalReplies[0]
    }


    function buttonClicked(survey) {
        isSurvey(true)
    }

    if (surveyPage === true) {
        return <Redirect to={{
            pathname: '/detail',
            state: { location: survey }
        }}
        />
    }

    return (

        <div className={classes.root}>

            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>
                            {survey["title"]}
                            {/*{<Button size="small" variant="contained" color="primary" style={{margintBottom: "30px"}} onClick={(e)=>buttonClicked(e, survey)}>Learn More</Button>}*/}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {<Button size="small" variant="contained" color="primary" style={{margintBottom: "30px"}} onClick={()=>buttonClicked(survey)}>Learn More</Button>}
                        {
                            survey["questions"].map(question => <Summary key={question["questionId"]} question={question} totalReplies={getTotalReplies(survey)}/>)
                        }
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
