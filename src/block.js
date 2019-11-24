import React, { Component } from 'react'

class Block extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visited: false,

        }
    }

    handleClick = () => {

    }
    render() {
        return (
            <>
                <td onClick={this.handleClick} className={this.props.visit ? 'td vis' : 'td'} >{this.props.elem}</td>
            </>
        )
    }
}

export default Block;