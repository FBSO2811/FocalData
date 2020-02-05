import React from 'react';
import axios from "axios";
import Container from "@material-ui/core/Container";
import Loader from "./Loader";
import Survey from "./Survey";

export default function Surveys() {

    const [surveys, setSurveys] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        async function load() {
            setLoading(true);
            axios.get("https://my-json-server.typicode.com/focaldata/demo/db", {
            })
            .then(function (response){
                const data = response.data
                setSurveys(data["surveys"])
                setLoading(false);
            })
        }
        load()

    },[]);

    return (
        <div style={{marginLeft: "0%", marginTop: "80px"}}>
            <Container>
                {surveys.length > 0  ?
                    surveys.map(survey => <Survey key={survey["surveyId"]} survey={survey}/>) : <Loader loading={loading} />
                }
            </Container>
        </div>
    );
}