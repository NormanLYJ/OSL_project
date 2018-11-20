import React from 'react';
import style from './index.scss';

class LabelItem extends React.Component {
    render() {
        return (
            <span className={style.labelItemWrapper}>
            {this.props.text?this.props.text:<span className={style.noName}>No name in database</span>}
            </span>
        )
    }
}
export default LabelItem;

