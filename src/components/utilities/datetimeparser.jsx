const DateTimeParser = (props) => {

    var startTime = new Date(props );
    startTime =   new Date( startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 ) );
    var date = startTime.toISOString().split('T')[0];
    var time = startTime.toISOString().split('T')[1].split('.')[0];
    return {date, time};
}

export default DateTimeParser;
