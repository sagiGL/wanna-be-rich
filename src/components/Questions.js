import React, { Component } from 'react';
import {Consumer} from "./GameContext";

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            question: "",
            stage: 'pre',
            selectedAnswer:-1,
            answerClass:[
                {btnClass:"answer-btn",imgClass:"img-hidden"},
                {btnClass:"answer-btn",imgClass:"img-hidden"},
                {btnClass:"answer-btn",imgClass:"img-hidden"},
                {btnClass:"answer-btn",imgClass:"img-hidden"}]
        };
    }

    onClickAnswer = (index) =>{
        this.setState({
            stage: 'selected',
            selectedAnswer:index
        });
    };
    checkAnswer = () =>{
        let answerClass = this.state.answerClass.slice();
        let stage="check";
        for(let i=0; i<answerClass.length;i++){
            if(this.state.selectedAnswer === i){
                if(this.state.selectedAnswer===3){
                    stage="continue";
                }
                answerClass[this.state.selectedAnswer].imgClass="btn-img";
                answerClass[this.state.selectedAnswer].btnClass=(this.state.selectedAnswer===3)
                    ? "answer-btn correct-selection"
                    : "answer-btn incorrect-selection";
            }else {
                answerClass[i].btnClass="answer-btn";
                answerClass[i].imgClass="img-hidden";
            }
        }
        this.setState({
            answerClass,
            stage
        })
    };
    resetSelectedAnswers = () => {
        this.setState({
            stage: 'pre',
            answerClass:[
                {btnClass:"answer-btn",imgClass:"img-hidden"},
                {btnClass:"answer-btn",imgClass:"img-hidden"},
                {btnClass:"answer-btn",imgClass:"img-hidden"},
                {btnClass:"answer-btn",imgClass:"img-hidden"}]})
    };

    render() {
        const { question, correct_answer, incorrect_answers, id } = this.props;
        let answersArr = [];
        incorrect_answers.forEach((answer, index) => {
            answersArr.push(
                <button className={this.state.answerClass[index].btnClass} key={index} onClick={this.onClickAnswer.bind(this,index)}>
                    <img className={this.state.answerClass[index].imgClass} alt="x" src={require('../assets/x.png')} />{answer}
                </button>)
        });
        answersArr.push(
            <button className={this.state.answerClass[3].btnClass} key={3} onClick={this.onClickAnswer.bind(this,3)}>
                <img className={this.state.answerClass[3].imgClass} alt="v" src={require('../assets/v.png')} />{correct_answer}
            </button>);

        let nextBtn;
        if(this.state.stage === 'pre'){
            nextBtn = (<button className='submit-btn ok-btn' disabled>OK</button>)
        }
        if(this.state.stage === 'selected' || this.state.stage === 'check'){
            nextBtn = (<button className='submit-btn ok-btn' onClick={this.checkAnswer}>OK</button>)
        }
        if(this.state.stage === 'continue'){
            nextBtn = (
                <Consumer>
                    {context => (<button className='submit-btn continue-btn' onClick={()=>{ context.updateProgress(); this.resetSelectedAnswers()}} >Continue</button>)}
                </Consumer>)
        }

        return (
            <div className="question-window">
                <div className="question">
                    <h2>{`Q:${id + 1}`}</h2>
                    <p style={{marginLeft:'10px'}}> {question}</p>
                </div>
                <div className="answers-box">
                    {answersArr.map(answer => {return answer})}
                </div>
                {nextBtn}
            </div>
        );
    }
}
export default Questions;
