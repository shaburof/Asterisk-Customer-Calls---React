import React from 'react';
import Table from '../table/table';

const Call = (props) => {
    const data = props.data;
    const count = data.data.count;
    const calls = data.data.items;

    return <>
        <section className="dcall-table">
            <div className="col-sm-12">
                <div className="dcall-description">
                    <h1 className="dcall-description__tabledescription">номер <span className="dcall-description__clientnumber">{data.name}</span></h1>
                    {data.vip
                        ? <div className="dcall-description__vipname">
                            <img className="dcall-description__vipimg" src="/opinion/images/vip.png" />
                            <span>{data.vip}</span>
                        </div>
                        : ''}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2 dcall-table__count">
                    <div className="dcall-table__countfield">{count}</div>
                </div>
                <div className="col-sm-10">
                    <Table calls={calls} permissions={props.permissions} />
                </div>
            </div>
        </section>
    </>
}

export default Call;