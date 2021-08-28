

export function calcTime(initial, final){
    let dateStart = new Date(initial).getTime()
    let dateEnd = new Date(final).getTime()
    let total =  (dateEnd - dateStart);

    return convertMiliSecond(total)
}

function convertMiliSecond(mili){
    let total = mili / 1000;
    let hour = (total / 3600).toFixed(0) ;
    let min = ((total % 3600) / 60).toFixed(0);
    let seconds = (total % 3600) % 60;
    if(hour > 0)
        return hour + " horas, " +min + " minutos, " +seconds + " segundos";
    if(min > 0)
        return min + " minutos, " +seconds + " segundos";
    return seconds + " segundos"    
}

export function dateFormat(date){
    let data = new Date(date);
    return ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
}
