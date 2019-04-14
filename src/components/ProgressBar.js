import React, { Component } from 'react';

class ProgressBar extends Component {

    render() {
        let progressbar = [];

        for(let i = 0; i < 10; i++){
            progressbar.push((i === this.props.progress)
                ? <input key={i} type="radio" name="radio" className="current-radio" disabled/>
                : <input key={i} type="radio" name="radio" disabled/>);
        }
        return (
            <div className="progress-bar">
                {progressbar.map(radio => {return radio})}
            </div>
        );
    }
}
export default ProgressBar;
