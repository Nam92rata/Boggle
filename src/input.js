import React, { Component } from 'react'

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
        }
    }
    handleChange = (evt) => {
        this.setState({ input: evt.target.value.toUpperCase() })
    }

    onSubmitHandler = (e) => {
        e.preventDefault(e)
        this.props.getInput(this.state.input);
        this.setState({ input: "" });
    }
    render() {
        return (
            <>
                <form onSubmit={e => this.onSubmitHandler(e)}>
                    <input className="input" value={this.state.input} onChange={(evt) => this.handleChange(evt)} />
                    <br />
                    <br />
                    <button className="button" onClick={e => this.onSubmitHandler(e)}>Search</button>
                </form>
            </>
        )
    }
}

export default Input;