import React from 'react';
import { splitDurationToDates } from '../../services/helpers';

const Statistic = ({ data, dataTotalStatictic }) => {

    const getVip = item => {
        if (item.vip) return <div className="dcall__statistic_vipfield">
            <img className="dcall__statistic_vipimage" src="/opinion/images/vip.png" alt="" />
            <p className="dcall__statistic_vipname">{item.vip}</p>
            <p className="dcall__statistic_vipnumber">{item.name}</p>
        </div>;
        return item.name
    }

    return <>
        <table className="table table-striped" style={{ backgroundColor: 'rgba(255,255,255,0.68)' }}>
            <thead>
                <tr>
                    <th scope="col">номер</th>
                    <th scope="col">всего обращений</th>
                    <th scope="col">средняя оценка</th>
                    <th scope="col">общее время разговора</th>
                </tr>
            </thead>
            <tbody>
                <tr style={{ fontWeight: 'bold', borderBottom: '2px solid #888' }}>
                    <td>ИТОГО: {dataTotalStatictic.totalLength}</td>
                    <td>{dataTotalStatictic.totalStatisticCalls}</td>
                    <td>{dataTotalStatictic.totalStatisticOpinion}</td>
                    <td>{splitDurationToDates(dataTotalStatictic.totalStatisticDuration)}</td>
                </tr>
                {data.map(item => {
                    return <tr key={item.name}>
                        <td>{getVip(item)}</td>
                        <td>{item.data.count}</td>
                        <td>{item.data.totalOpinion > 0 && item.data.totalOpinion}</td>
                        <td>{splitDurationToDates(item.data.totalDuration)}</td>
                    </tr>
                })}
                <tr style={{ fontWeight: 'bold', borderTop: '2px solid #888' }}>
                    <td>ИТОГО: {dataTotalStatictic.totalLength}</td>
                    <td>{dataTotalStatictic.totalStatisticCalls}</td>
                    <td>{dataTotalStatictic.totalStatisticOpinion}</td>
                    <td>{splitDurationToDates(dataTotalStatictic.totalStatisticDuration)}</td>
                </tr>
            </tbody>
        </table>
    </>
}

export default Statistic;