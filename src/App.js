import React, { useEffect, useState } from 'react';
import { response } from './development/test';
import { prepareData, getCurrentDateForInputFormat, login, checkSession, checkPermissions, logout } from './services/helpers';
import Call from './components/call/call';
import Form from './components/form/form';
import Message from './components/message/message';
import Spinner from './components/spinner/spinner';
import Logout from './components/logout/logout';
import Statistic from './components/statistic/statistic';
const Axios = window.axios;

function App() {

    const dateNow = new Date();
    const [data, setDate] = useState();
    const [dataTotalStatictic, setDataTotalStatistic] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [date_at, setDate_at] = useState(getCurrentDateForInputFormat());
    const [date_to, setDate_to] = useState(getCurrentDateForInputFormat());
    const [allowDcall, setAllowDcall] = useState(false);
    const [allowDownload, setDownload] = useState(false);

    useEffect(() => {
        // login();
        (async () => {
            await checkSession();
            const dcalls = await checkPermissions('dcalls');
            setAllowDcall(dcalls);
            if (!dcalls) {
                debug
                    ? console.log('section dcalls not allow for current user: REDIRECT TO LOGIN PAGE')
                    : window.location.replace("/opinion/auth.html");
            }
            setDownload(await checkPermissions('download'));
            setAllowDcall(await checkPermissions('dcalls'));
        })();
    }, []);

    // useEffect(() => {
    //     if (!loading && data) {
    //         const statisticData = [];
    //         for (const call of data) {
    //             console.log(call);
    //             const obj = {
    //                 name: call.name,
    //                 totalCalls: call.data.count
    //             };
    //             statisticData.push(obj);
    //         }
    //         console.log('statisticData: ', statisticData);
    //     }
    // });

    const setDate_toWithCheck = (date) => {
        if (new Date(date) > (new Date())) {
            setDate_to(getCurrentDateForInputFormat());
        }
        else setDate_to(date);
    }

    const setDate_atWithCheck = (date) => {
        if (new Date(date) > (new Date())) {
            setDate_at(getCurrentDateForInputFormat());
        }
        else setDate_at(date);
    }

    const onClickHandler = e => {
        e.preventDefault();
        !loading && getDoubleCalls();
    }

    const getDoubleCalls = () => {
        setLoading(true);
        let testEndpoint2 = 'http://opinion.local/opinion/test.php';
        Axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: endpoint,
            data: {
                params: {
                    param: 'doublecalls',
                    values: { data_at: date_at, data_to: date_to }
                }
            },
            withCredentials: true
        }).then((response) => {
            setDate(prepareData(response.data, setDataTotalStatistic));
            setLoading(false);
        }).catch((err) => {
            console.log('err: ', err);
            console.log('err: ', err.repsonse);
            setError(true);
            setLoading(false);
        });
    }

    const Calls = () => {
        let rendering;
        if (loading !== true && error !== true && data && (data.length === 0)) {
            rendering = <h1 className="dcall__empty">за выбранный период повторных обращений не найдено</h1>
        } else if (loading !== true && error !== true && data) {
            rendering = data.map(call => {
                return <Call key={call.name} data={call} permissions={{ dcall: allowDcall, download: allowDownload }} />
            });
        }
        else if (error !== true && loading) {
            rendering = <Spinner />;
        }
        return rendering;
    }

    return (
        <>
            <Logout />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 centered" style={{ marginTop: '35px', marginBottom: '50px' }}>
                        <h2>Обращение клиентов более одно раза за выбранный период</h2>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="container">
                <Form date_at={date_at} setDate_at={setDate_atWithCheck}
                    date_to={date_to} setDate_to={setDate_toWithCheck}
                    onClickHandler={onClickHandler} loading={loading} />
                <div className="col-sm-12 centered" id="result" style={{ marginTop: '35px' }}>
                    {(loading !== true && error !== true && data && data.length > 0)
                        && <section className="dcall__statistic"><Statistic data={data} dataTotalStatictic={dataTotalStatictic} /></section>}
                    {Calls()}
                    {error && <Message message="что-то пошло не так" />}
                </div>
            </div>
        </>
    );
}

export default App;
export const debug = true;
const productionEndpoint = '/opinion/router/web.php';
const devEndpoint = 'http://opinion.local/opinion/router/web.php';
const testEndpoint = 'http://opinion.local/opinion/test.php';
export const endpoint = debug ? devEndpoint : productionEndpoint;
