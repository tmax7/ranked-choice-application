import React from 'react';
import ReactDOM from 'react-dom';
import client from './utils/client';
import fullNameStringFrom from './utils/fullNameStringFrom';

class CreateSimulationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {candidates: []};
    }

    componentDidMount() {
        client({
            method: 'GET',
            path: '/api/candidates'
        }).then(response => {
            this.setState({
                candidates: response.entity._embedded.candidates
            })
        })
    }

    render() {
        let page = [];
        this.state.candidates.forEach((candidate, index, candidates) => {
            page.push(<ChoiceTier key={index} roundNumber={index + 1} candidates={this.state.candidates} />)
        })
        return (
            <>
                {page}
            </>
        )
    }
}

class ChoiceTier extends React.Component {
    render() {
        let roundNumber = this.props.roundNumber;
        console.log(roundNumber);
        const candidates = this.props.candidates.map(candidate => 
            <CandidateRange key={candidate._links.self.href} candidate={candidate} roundNumber={roundNumber}/>
        );
        console.log(candidates)
        return (
            <div>
                <h2>Choice {this.props.roundNumber}</h2>
                {candidates}
                <hr />
            </div>
        );
    }
}

class CandidateRange extends React.Component {
    render() {
        const fullNameString = fullNameStringFrom(this.props.candidate.name);
        const id = fullNameString + "Round" + this.props.roundNumber;
        return (
            <div className="container-sm">
                <div className="mb-3 row">
                    <label htmlFor={id} className="col-sm-4 col-form-label">
                        Percentage of votes for <strong> {fullNameString}</strong>: 
                    </label>
                    <div className="col-sm-1">
                        <input type="number" className="form-control" id={id}></input>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-5">
                        <input type="range" className="form-range"></input> 
                    </div>
                </div>
            </div> 
        )
    }
}


ReactDOM.render(
    <CreateSimulationPage />,
    document.getElementById('react')
);