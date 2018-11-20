import React from 'react';
import style from './index.scss';
import LabelItem from '../LabelItem';

class InfoTable extends React.Component {
    render() {
        let {tableData} = this.props;
        let rows=[];
        for (let key in tableData){
            if (tableData[key] && key!=='relations'){
                if (Array.isArray(tableData[key])){
                    let labels = tableData[key].map(item=><LabelItem text={item.name}/>);
                    rows.push(<tr key={key}><td>{key}</td><td>{labels}</td></tr>)
                }
                else {
                    rows.push(<tr key={key} style={key=='name'?{'backgroundColor': '#dcba8d'}:{}}><td>{key}</td><td>{tableData[key]}</td></tr>)
                }
            }
            
        }
        return (
            <div className={style.infoTableWrapper}>
                <table className='table table-striped'>
                    <tbody>
                        {rows}
                </tbody>
                </table>
            </div>
        
        );

    }
}
export default InfoTable;

