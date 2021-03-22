import React from 'react';

const Form = (props) => {

    const onClickHandler = props.onClickHandler;
    const loading = props.loading;

    return <>
        <form id="dcall">
            <div className="col-sm-12">
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="inputDate">Начальная дата:</label>
                            <input value={props.date_at} onChange={(e) => props.setDate_at(e.target.value)}
                                type="date"
                                className="form-control text-center" />
                            <div className="errorF" id="firstDateError">начальная дата больше конечной</div>
                            <div className="errorF" id="firstDateEmptyError">выберете дату</div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="inputDate">Конечная дата:</label>
                            <input value={props.date_to} onChange={(e) => props.setDate_to(e.target.value)}
                                type="date"
                                className="form-control text-center" />
                            <div className="errorF" id="lastDateEmptyError">выберете дату</div>
                            <div className="errorF" id="restrictError">максимальная выборка не более 30 дней</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 centered" style={{ marginTop: '35px' }}>
                        <input onClick={onClickHandler} type="submit" className={'btn btn-sm ' + (loading ? 'btn-secondary' : 'btn-primary')} value="ПОИСК" />
                        {/*  className={'btn btn-sm '+loading?'btn-secondary':'btn-primary'} */}
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default Form;