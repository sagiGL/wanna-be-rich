import React, { Component } from 'react';
import Question from "./Questions";
import {Consumer, Provider} from "./GameContext";
import ProgressBar from "./ProgressBar";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            data: [],
            progress: 0,
            updateProgress: this.updateProgress
        };
    }
    updateProgress = () => {
        if(this.state.progress<9){
            this.setState(
                {
                    progress: this.state.progress + 1
                }
            );
        } else {
            console.log("Congrats You Won!");
        }

    };

    componentWillMount() {
        fetch('https://opentdb.com/api.php?amount=10&type=multiple')
            .then(function(response) {
                return response.json();
            })
            .then((myJson) => {
                this.setState({
                    loading: false,
                    data: myJson,
                    questions: myJson.results
                });
            });

    }

    render() {
        let currentQuestion ={};
        let questionElement;
        if(!this.state.loading){
            currentQuestion = this.state.questions[this.state.progress];
            questionElement = (
                <Question
                    correct_answer= {currentQuestion.correct_answer}
                    incorrect_answers={currentQuestion.incorrect_answers}
                    question={currentQuestion.question}
                    id={this.state.progress}
                />
            );
        }

        return (
            <Provider value={this.state}>
                <div className="game">
                    { this.state && this.state.questions && questionElement}
                    <ProgressBar progress={this.state.progress}/>
                </div>
            </Provider>
        );
    }
}

export default function GameWithContext(props) {
    return (
        <Consumer>
            {context => <Game {...props} gameParams={context} />}
        </Consumer>
    );
}
