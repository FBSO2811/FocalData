import React from 'react';
import Paper from "@material-ui/core/Paper";
import { Doughnut } from 'react-chartjs-2';


export default function Graphs({question}){
    const title = question["questionTitle"]
    const labels = []
    const answers = []

    function getTotalReplies(question) {
        let totalReplies = question["answerOptions"].map(x => x["selectedByRespondents"]).reduce((acc, x) => acc + x)
        return totalReplies
    }


    function getData(question) {
        question["answerOptions"].map((text) => labels.push(text["text"]))
        question["answerOptions"].map((number) => answers.push((number["selectedByRespondents"]/getTotalReplies(question))*100))
    }

    getData(question)


    const data = {
        datasets: [{
            data: answers,
            backgroundColor: [
                '#50E3C2',
                '#3F4D67',
                '#A8C6F5',
                '#FF0000',
                '#666666',
            ],
            hoverBackgroundColor: [
                '#50E3C2',
                '#3F4D67',
                '#A8C6F5',
                '#FF0000',
                '#666666',
            ]
        }],
        labels: labels
    };

    const option = {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                    var total = meta.total;
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = parseFloat((currentValue/total*100).toFixed(1));
                    return currentValue + ' (' + percentage + '%)';
                },
                title: function(tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        }
    }

    return (
        <div>
            <div style={{marginLeft: '5%'}}>
                <div>
                    <h3>{title}</h3>
                </div>
                <Doughnut
                    data={data}
                    options={option}
                />
            </div>
        </div>
    )


}
