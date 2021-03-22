import React from 'react';
import Operator from './operator/operator';
import Opinion from '../opinion/opinion';
import { getLocaleDateString, downloadRecord } from '../../services/helpers';
import { debug } from '../../App';

const Table = (props) => {

    const calls = props.calls;
    const permissions = props.permissions;

    const downloadHandler = (obj) => {
        (async () => {
            const data = { getRecord: 'true', ...obj };
            let response = await downloadRecord(data);
            if (response.data.error === false) {
                console.log('ERROR GET RECORDING FILENAME');
            } else {
                const filename = response.data.data;
                debug
                    ? console.log('/opinion/helpers/downloadRecord.php?file=' + filename + '&extension=' + data.who)
                    : window.location = '/opinion/helpers/downloadRecord.php?file=' + filename + '&extension=' + data.who;
            }
        })();

    }

    return <>
        <table className="table table-striped" style={{ backgroundColor: 'rgba(255,255,255,0.68)' }}>
            <thead>
                <tr>
                    <th>дата</th>
                    <th>время</th>
                    <th>оператор</th>
                    <th>длительность</th>
                    <th>оценка</th>
                    {permissions.download && <th style={{ width: '30px' }}>послушать</th>}
                </tr>
            </thead>
            <tbody>
                {calls.map((call, i) => {
                    return <tr key={call.id}>
                        <td>{getLocaleDateString(call.calldate)}</td>
                        <td>{call.time}</td>
                        <td><Operator data={call} /></td>
                        <td>{(call.durationmin > 0 ? call.durationmin + 'м' : '') + ((call.durationmin > 0 && call.durationsec > 0) ? ': ' : '') + (call.durationsec > 0 ? call.durationsec + 'с' : '')}</td>
                        <td className="dcall__opinion-place"><Opinion call={call} /></td>
                        {permissions.download &&
                            <td >
                                <img src="/opinion/images/download.png" width='30'
                                    style={{ width: '30px', cursor: 'pointer' }}
                                    onClick={() => downloadHandler({
                                        record: call.recordingfile, date: call.calldate, who: call.dst
                                    })} />
                            </td>
                        }
                    </tr>
                })}
            </tbody>
        </table>
    </>
}

export default Table;