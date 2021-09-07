import React from 'react';
import {connect} from 'react-redux'

/**
 * A square is one small rectangle, it contains relatively little logic. The only thing is does is turn blue when either
 * 1) The user is in admin mode and the number in this square has been rolled
 * 2) The user is not in admin mode and he clicked on the square
 */
class Square extends React.Component {

    constructor(props) {
        super(props);

        this.state = {checked: false}
    }

    render() {

        let classNames = 'board_col';

        if (this.props.admin && this.props.numbers.includes(this.props.number))
        {
            classNames += ' board_col_checked';
        }

        if (!this.props.admin && this.state.checked)
        {
            classNames += ' board_col_checked';
        }

        return <td className={classNames} onClick={this.toggleCheck.bind(this)}>
            <h3>{this.props.number}</h3>
        </td>;
    }

    toggleCheck() {

        if (this.props.admin)
        {
            return;
        }

        this.setState({checked: !this.state.checked})
    }
}

const mapStateToProps = function(store) {
    return {
        numbers: store.numbers
    };
};

export default connect(mapStateToProps)(Square);