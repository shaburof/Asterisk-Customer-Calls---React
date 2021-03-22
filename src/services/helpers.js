import { debug, endpoint } from '../App';

export const prepareData = (data, setDataTotalStatistic) => {
    const _temp = [];
    let totalStatisticDuration = 0;
    let totalStatisticOpinion = 0;
    let totalStatisticCountOpinion = 0;
    let totalStatisticCalls = 0;

    for (const item in data) {
        ////////////////////////////////
        // устанавливаем name объекта как номер звонившева и добавляем vipname если есть
        const call = data[item].items[0];
        const vipName = call.vipsurname ? `${call.vipsurname} ${call.vipfirstname} ${call.vipmiddlename}` : undefined;
        ////////////////////////////////

        ///////////////////////////////
        // подсчет статистики
        const callItems = data[item].items;
        let totalOpinion = 0;
        let totalDuration = 0;
        let countTotalOpinion = 0;
        for (const callItem of callItems) {
            if (callItem.opinion) {
                totalOpinion += parseFloat(callItem.opinion);
                countTotalOpinion++;
            }
            totalDuration += parseFloat(callItem.duration);
        };
        countTotalOpinion > 0 && (totalOpinion = totalOpinion / countTotalOpinion);

        data[item].totalOpinion = parseFloat(totalOpinion.toFixed(1));
        data[item].totalDuration = totalDuration;
        ///////////////////////////

        ////////////////////////////////////////
        // подсчет "итого" для статистики
        totalStatisticDuration += totalDuration;
        if (totalOpinion) {
            totalStatisticOpinion += totalOpinion
            totalStatisticCountOpinion++;
        }
        totalStatisticCalls += data[item].count;
        ///////////////////////////////////////

        /////////////////////////
        // добавляем объект к массиву
        _temp.push({ name: item, data: data[item], vip: vipName });
    }
    const totalLength = _temp.length;
    totalStatisticOpinion = parseFloat((totalStatisticOpinion / totalStatisticCountOpinion).toFixed(1));
    totalStatisticOpinion = Number.isNaN(totalStatisticOpinion) ? 0 : totalStatisticOpinion;
    setDataTotalStatistic({ name: 'TOTAL', totalLength: totalLength, totalStatisticDuration: totalStatisticDuration, totalStatisticOpinion: totalStatisticOpinion, totalStatisticCalls: totalStatisticCalls });

    _temp.sort((a, b) => {
        const aCount = a.data.count;
        const bCount = b.data.count;
        if (aCount < bCount) return 1;
        if (aCount > bCount) return -1;
        return 0;
    })

    for (const calls of _temp) {
        calls.data.items.sort((a, b) => {
            const aData = a.full_date;
            const bData = b.full_date;
            if (aData < bData) return -1;
            if (aData > bData) return 1;
            return 0;
        })
    }
    return _temp;
};

export const splitDurationToDates = duration => {
    let hour = 0;
    let min = Math.floor(duration / 60);
    let sec = duration - (min * 60);
    if (min >= 60) {
        hour = Math.floor(min / 60);
        min = min - (hour * 60);
    }

    return hour ? `${hour}ч: ${min}м :${sec}с` : min ? `${min}м :${sec}с` : `${sec}с`;
}

export const getCurrentDateForInputFormat = () => {
    return (new Date()).toISOString().substring(0, 10);
}

export const getLocaleDateString = date => {
    return (new Date(date)).toLocaleDateString();
}

export const login = () => {
    const Axios = window.axios;
    // const endpoint = 'http://opinion.local/opinion/router/web.php';
    Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'login',
                values: { name: 'belkina_u_d', password: '' }
            }
        },
        withCredentials: true
    }).then((result) => {
        debug && console.log('login result: result: ', result.data);

    }).catch((err) => {
        console.log('login error: ', err);

    });
}

export const logout = () => {
    const Axios = window.axios;
    Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'logout',
            }
        },
        withCredentials: true
    }).then((result) => {
        debug ? console.log('result: ', result.data) : window.location.replace("/opinion/auth.html");

    }).catch((err) => {
        console.log('err: ', err);

    });
}

export const checkSession = () => {
    const Axios = window.axios;
    // const endpoint = 'http://opinion.local/opinion/router/web.php';
    Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'check session',
            }
        },
        withCredentials: true
    }).then((result) => {
        const status = result.data.content;
        if (status.active === false) {
            debug
                ? console.log('session not active REDIRECT TO LOGIN PAGE')
                : window.location.replace("/opinion/auth.html");
        } else debug && console.log('check session: SESSION ACTIVE');
    }).catch((err) => {
        console.log('err: ', err);

    });

}

export const checkPermissions = (permission) => {
    return new Promise((resolve, reject) => {
        const Axios = window.axios;
        // const endpoint = 'http://opinion.local/opinion/router/web.php';
        Axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: endpoint,
            data: {
                params: {
                    param: 'check permissions',
                    values: { permissions: permission }
                }
            },
            withCredentials: true
        }).then((result) => {
            const status = result.data;
            resolve(status.content);

        }).catch((err) => {
            console.log('err: ', err.response);
            resolve(false);
        });
    });
}

export const downloadRecord = (data) => {
    return new Promise((resolve, reject) => {
        const Axios = window.axios;
        // const endpoint = 'http://opinion.local/opinion/router/web.php';
        Axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: endpoint,
            data: {
                params: {
                    param: 'getrecordname',
                    values: { ...data }
                }
            },
            withCredentials: true
        }).then((result) => {
            resolve(result);

        }).catch((err) => {
            console.log('err: ', err.response);
            reject(err.response);
        });
    });
}