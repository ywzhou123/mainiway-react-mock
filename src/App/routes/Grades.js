import React from 'react';

class Grades extends React.Component {
    // shouldComponentUpdate() {
    //   console.log(this.props.params.cid);
    //   console.log(this.props.params.cid == 2);
    //   if (this.props.params.cid == 2)
    //     return false;  
    //   return true;
    // }

    render() {
    // console.log("hello i m grades"+this.props.params.cid);
        return (
            <div>
                <h2>Grades</h2>
                <input />
            </div>
        );
    }
}

module.exports = Grades;
