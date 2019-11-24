import React, { Component } from 'react';
import Input from './input';

import Confetti from 'react-confetti'

class Boggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: 'ABCDEFGHIJKLMNOPQRSTUVXYZ',
            boggle: null,
            msg: "",
            visited: false,
            mAr: [],
            word: "",
            win: false
        };

    };

    // getLongestWord = () => {
    //     let wordArray = this.state.boggle.map(el => {
    //         if (this.state.boggle.indexOf(el) == 0 || this.state.boggle.indexOf(el) % 2 == 0) {
    //             // console.log("el 1", el.join(''))
    //             // return (el);
    //             let a = el.join("");
    //             console.log("a", a)
    //             return a
    //         } else {
    //             // console.log("el 2", el.reverse().join(''))
    //             // return (el.reverse());
    //             let b = el.reverse().join("")
    //             console.log("b", b)
    //             return b
    //         }
    //     })
    //     let longWord = wordArray.join('')
    //     console.log("word", longWord);
    //     this.setState({ word: longWord })
    // }

    componentDidMount = () => {
        var matrix = [];
        for (var i = 0; i < 4; i++) {
            matrix[i] = new Array(4)
            for (var j = 0; j < 4; j++) {
                matrix[i][j] = this.generateRandomNumber();
            }
        }
        this.setState({ boggle: matrix })
    }

    generateRandomNumber = () => {
        var random = parseInt(Math.random() * this.state.characters.length);
        var letter = this.state.characters.charAt(random);
        return letter;
    }

    //Returns an array of all occurences of an element in boggle
    getIndex = (el) => {
        let ar = []
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.state.boggle[i][j] === el) {
                    let ar_new = []
                    ar_new.push(i);
                    ar_new.push(j);
                    ar.push(ar_new)
                }
            }
        }
        return ar
    }

    //Returns array of index for given element from the surrounding array
    getIndexFromSurrArr = (el, surr) => {
        let ar = surr.filter(elem => {
            if (elem[0] === el) {
                return elem[1]
            }
        })
        return ar

    }

    rec = (nextEl, ar) => {
        var val = null;
        val = ar.filter(el => {
            if (el[0] === nextEl) {
                return el[1]
            }
        })
        if (val) {
            return true;
        }
        else {
            return false;
        }
    }

    getInput = (text) => {
        let matchArr = []
        this.setState({ mAr: matchArr }, () => {
        })

        let textArray = text.split('');
        let len = textArray.length;
        if (len <= 2) {
            let matchArr = []
            let msg = "Word is too short  "
            this.setState({ win: false })
            this.matchColor(matchArr, msg)
            return;
        }
        var indArr = this.getIndex(textArray[0])
        if (indArr.length) {
            for (let x = 0; x < indArr.length; x++) {
                matchArr.length = 0;
                var surAr = this.findSurroundingElements(indArr[x])
                matchArr.push(indArr[x])
                let patternMatch;
                for (let i = 1; i < textArray.length; i++) {
                    var indx = this.getIndexFromSurrArr(textArray[i], surAr)
                    if (indx.length) {
                        for (let y = 0; y < indx.length; y++) {
                            surAr = this.findSurroundingElements(indx[y][1])
                            let found = this.rec(textArray[i], surAr);
                            if (found) {
                                patternMatch = true
                                if (matchArr.length) {
                                    for (let k = 0; k < matchArr.length; k++) {
                                        if (JSON.stringify(matchArr[k]) === JSON.stringify(indx[y][1])) {
                                            patternMatch = false
                                        }
                                    }
                                    if (patternMatch) {
                                        matchArr.push(indx[y][1])
                                        break;
                                    }

                                }
                            }
                            else {
                                matchArr.length = 0
                                break;
                            }
                        }
                    }
                    else {
                        let matchArr = []
                        let msg = "Try again "
                        this.setState({ win: false })
                        this.matchColor(matchArr, msg)
                        break;
                    }
                }

                if (patternMatch) {
                    let msg = "Match found "
                    this.setState({ win: true });
                    setTimeout(() => this.setState({ win: false }), 3000);
                    if (textArray.length === matchArr.length) {
                        this.matchColor(matchArr, msg)
                    }
                    break;
                }
                else {
                    continue;
                }
            }

        }
        else {
            let matchArr = []
            let msg = "Try again "
            this.setState({ win: false })
            this.matchColor(matchArr, msg)
        }

    }


    //Return all surrounding elements according to the index given
    findSurroundingElements = (ind) => {
        var unit_x = ind[0];
        var unit_y = ind[1];
        let tempArray = [];
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                if (!(x === 0 && y === 0) && ((unit_x + x) >= 0 && (unit_y + y) >= 0 && (unit_x + x) < 4 && (unit_y + y) < 4)) {
                    tempArray.push([this.state.boggle[unit_x + x][unit_y + y], [unit_x + x, unit_y + y]])
                }
            }
        }
        return tempArray;
    }

    matchColor = (matchArr, message) => {
        this.setState({ msg: message, mAr: matchArr }, () => {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    document.getElementById("myTable").rows[i].cells[j].classList.remove('vis')
                }
            }
            this.state.mAr.map(el => {
                if (document.getElementById("myTable").rows[el[0]].cells[el[1]]) {
                    document.getElementById("myTable").rows[el[0]].cells[el[1]].className = " td vis"
                }

            })

        })
    }

    render() {
        return (
            <div>
                {this.state.win && <Confetti />}
                <div >
                    <div>
                        <h1>Boggle Solver</h1>
                    </div>
                    <div>
                        <div>Word you are looking for ?</div>
                        <br />
                        <div><Input getInput={(text) => this.getInput(text)} /></div>
                    </div>
                    <br />
                    <div className="message">
                        {this.state.msg}
                    </div>
                    <div className="box">
                        <table id="myTable" className="table">
                            {this.state.boggle && <tbody>
                                {this.state.boggle.map((el, index) => {
                                    return <tr key={index}>
                                        {el.map((ele, ind) => {
                                            return <td className='td' key={ind}>{ele}</td>
                                        })}
                                    </tr>
                                })}
                            </tbody>}
                        </table>
                    </div>
                    <br />
                    <div>
                        {/* <button onClick={this.getLongestWord} className="button"> Longest possible word</button>
                        <div>{this.state.word}</div> */}
                    </div>
                </div>

            </div>
        );
    }
}

export default Boggle