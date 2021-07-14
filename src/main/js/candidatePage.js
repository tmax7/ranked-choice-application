import React from 'react';
import ReactDOM from 'react-dom';

import client from './utils/client';
import follow from './utils/follow';

const root = '/api';

class CandidatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {candidates: [], attributes: [], pageSize: 2, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
    }

    
    
    loadFromServer(pageSize) {
        follow(client, root, [
            {
                rel:'candidates',
                params: {
                    size: pageSize
                }
            }
        ]).then(candidateCollection => {
            return client({
                method: 'GET',
                path: candidateCollection.entity._links.profile.href,
                headers: {
                    'Accept': 'application/schema+json'
                }
            }).then(schema => {
                console.log("SCHEMA !!!!!!!!!!!!!!")
                console.log(schema.entity)
                this.schema = schema.entity;
                return candidateCollection;
            }).then(candidateCollection => {
                this.setState({
                    candidates: candidateCollection.entity._embedded.candidates,
                    attributes: Object.keys(this.schema.properties),
                    pageSize: pageSize,
                    links: candidateCollection.entity._links
                });
            })
        })
    }

    onCreate(newCandidate) {
		follow(client, root, ['candidates']).then(candidateCollection => {
			return client({
				method: 'POST',
				path: candidateCollection.entity._links.self.href,
				entity: newCandidate,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [
				{rel: 'candidates', params: {'size': this.state.pageSize}}]);
		}).then(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}

	onDelete(candidate) {
		client({method: 'DELETE', path: candidate._links.self.href}).then(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	onNavigate(navUri) {
		client({method: 'GET', path: navUri}).then(candidateCollection => {
			this.setState({
				candidates: candidateCollection.entity._embedded.candidates,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				links: candidateCollection.entity._links
			});
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    render() {
		return (
			<div>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				<CandidateList candidates={this.state.candidates}
							  links={this.state.links}
							  pageSize={this.state.pageSize}
							  onNavigate={this.onNavigate}
							  onDelete={this.onDelete}
							  updatePageSize={this.updatePageSize}/>
			</div>
		)
	}
}





class CreateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newCandidate = {};
        this.props.attributes.forEach(attribute => {
            newCandidate[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreate(newCandidate);

        // clear out the dialog's inputs
        this.props.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        // Navigate away from the dialog to hide it.
        window.location = "#";
    }

    render() {
        const inputs = this.props.attributes.map(attribute =>
            <p key={attribute}>
                <input type="text" placeholder={attribute} ref={attribute} className="field"/>
            </p>
        );

        return (
            <div>
                <a href="#createCandidate">Create</a>

                <div id="createCandidate" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new candidate</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

class CandidateList extends React.Component {
    constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

    handleInput(e) {
		e.preventDefault();
		const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value =
				pageSize.substring(0, pageSize.length - 1);
		}
	}
	
	handleNavFirst(e){
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

    render() {
        const candidates = this.props.candidates.map(candidate =>
            <Candidate key={candidate._links.self.href} candidate={candidate} onDelete={this.props.onDelete}/>
        );

        const navLinks = [];
        if ("first" in this.props.links) {
			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
		}

        return (
            <div>
                <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates}
                    </tbody>
                </table>
                <div>
                    {navLinks}
                </div>
            </div>
            
        )
    }
}

class Candidate extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.candidate);
    }

    render() {
        return (
            <tr>
                <td>{this.props.candidate.name.firstName}</td>
                <td>{this.props.candidate.name.lastName}</td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}




ReactDOM.render(
    <CandidatePage />,
    document.getElementById('react')
);