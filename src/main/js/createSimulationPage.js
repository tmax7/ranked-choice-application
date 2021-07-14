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
        });
    }

    render() {
        const candidates = this.state.candidates.map((currentCandidate, index, candidates) => {
            const remainingCandidates = candidates.filter(otherCandidate => {
                return otherCandidate._links.self.href !== currentCandidate._links.self.href;
            });
            return (
                <ShareOfVotesTree key={currentCandidate._links.self.href} currentCandidate={currentCandidate} remainingCandidates={remainingCandidates}  />
            );
        });
        return (
            <ul id="myUL">
               {candidates}
            </ul>
        );
    }
}

class ShareOfVotesTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shouldShowChildren: false}
    }

    handleClick() {
        this.setState(prevState => ({
            shouldShowChildren: !prevState.shouldShowChildren
        }))
    }
    render() {
        const currentCandidate = this.props.currentCandidate;
        const remainingCandidates = this.props.remainingCandidates

        const children = remainingCandidates.map((remainingCandidate, index, remainingCandidates) => {
            const currentCandidate = remainingCandidate;
            remainingCandidates = remainingCandidates.filter((otherCandidate) => {
                return otherCandidate._links.self.href !== currentCandidate._links.self.href;
            });

            if(remainingCandidates.length === 0) {
                return (
                    <div key={currentCandidate._links.self.href}>
                    </div>
                );
            } else {
                return (
                    <ShareOfVotesTree key={currentCandidate._links.self.href} currentCandidate={currentCandidate} remainingCandidates={remainingCandidates}/>
                );
            }
            
        });

        return (
            <li>
                <div className={"container-sm border border-dark" + " " + this.calculateSpanClass()} onClick={() => this.handleClick()}>
                    <CandidateRange candidate={currentCandidate}/>
                </div> 
                <ul className={this.calculateUlClass()}>
                    {children}
                </ul>
            </li> 
        );
    }

    calculateSpanClass() {
        const baseClassName = "caret"

        if (this.state.shouldShowChildren) {
            return baseClassName +  " " + "caret-down";
        } else {
            return baseClassName;
        }
    }

    calculateUlClass() {
        const baseClassName = "nested"

        if (this.state.shouldShowChildren) {
            return baseClassName + " " + "active";
        } else {
            return baseClassName;
        }
    }
}


function toggleShow(e) {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
}

class CandidateRange extends React.Component {
    render() {
        const fullNameString = fullNameStringFrom(this.props.candidate.name);
        return (
            <>
                <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">
                        Percentage of votes for <strong> {fullNameString}</strong>: 
                    </label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control"></input>
                    </div>
                </div>
            </> 
        )
    }
}

ReactDOM.render(
    <CreateSimulationPage />,
    document.getElementById('react')
)