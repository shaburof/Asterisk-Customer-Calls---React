import React from 'react';

const Operator = ({ data }) => {

    const getOperatorName = fio => {
        return fio ? fio : '';
    }

    return <div className="operator-name">
        {data.transfer
            ? <>
                <div className="operator-name_ext">{data.transferInfo.from.ext}</div>
                <div className="operator-name_fio">{getOperatorName(data.transferInfo.from.fio)}</div>
                <div className="operator-transfer">&darr;</div>
                <div className="operator-transfer__title">перевод звонка</div>
                <div className="operator-transfer">&darr;</div>
                <div className="operator-name_ext">{data.transferInfo.to.ext}</div>
                <div className="operator-name_fio">{getOperatorName(data.transferInfo.to.fio)}</div>
            </>
            : <>
                <div className="operator-name_ext">{data.dst}</div>
                <div className="operator-name_fio">{getOperatorName(data.fio)}</div>
            </>}

    </div>
}

export default Operator;