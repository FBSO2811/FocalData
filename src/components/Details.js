import React from 'react';
import LeftDrawerDetail from "./LeftDrawerDetail";
import {useHistory} from "react-router-dom";



function Details(){
    const history = useHistory();
    const survey = history.location.state.location
    return(
        <LeftDrawerDetail survey={survey} />
    )
}

export default Details;
