import moment from '../TimeShifterMoment.js';
import originalMoment from 'moment';
import ConfigStore from '../Stores/ConfigStore';
import TimeShifterMoment from '../TimeShifterMoment.js'

function setTimeshifterConfigOff(){
  ConfigStore.setConfig({
      timeshifter:
      { shiftedDateMillisFromEpoch: 0,
        timeshifterEnabledForUser: 'false' }
    });
}

describe("timeshifter tests", function () {

  it('returns current date from timeshifterMoment', () => {
    var current = new moment();
    //console.log(current);
    expect(originalMoment.isMoment(current)).toBe(true);
  });

  it('returns current date from originalMoment', () => {
    var current = originalMoment();
    //console.log(current);
    expect(originalMoment.isMoment(current)).toBe(true);
  });


  it('checks timeshifterMoment returns unix date from moment', () => {
    var current = moment.unix();
    //console.log(current);
    expect(current).not.toBeUndefined();
  });

  it('checks originalMoment returns unix date from moment', () => {
    var current = originalMoment.unix();
    //console.log(current);
    expect(current).not.toBeUndefined();
  });

  it('checks originalMoment creates moment from unix(param)', () => {
    var current = originalMoment.unix(1498152854);
    //console.log(current);
    expect(current).not.toBeUndefined();
  });

  it('checks timeshifterMoment creates moment from unix(param)', () => {
    var current = moment.unix(1498152854);
    //console.log(current);
    expect(current).not.toBeUndefined();
  });

  it('checks originalMoment returns unix date from moment', () => {
    var current = originalMoment().unix();
    //console.log(current);
    expect(current).not.toBeUndefined();
  });



  


  //tests issue where Timeshifter moment wrapper constructor ignores passed value and returns the timeshifter value insteaf
  it('returns date from string using format with L with Timeshifter enabled', () => {
    ConfigStore.setConfig({
      timeshifter:
      { shiftedDateMillisFromEpoch: 1262332800000,
        timeshifterEnabledForUser: 'true' }
    });
    
    var result = new moment('01/02/2017', 'L').format('L');
    setTimeshifterConfigOff();
    
    expect(result).toBe('01/02/2017')
  });


  it('Initializes ConfigStore with Date in past', () => {
    ConfigStore.setConfig({
      timeshifter:
      { shiftedDateMillisFromEpoch: 1262332800000,
        timeshifterEnabledForUser: 'true' }
    });
    
    var setValue = ConfigStore.get('timeshifter');
    setTimeshifterConfigOff();

    expect(setValue.shiftedDateMillisFromEpoch).toBe(1262332800000);
  });

  it('checks if timeshifterMoment is a moment using originalMoment', () => {
    var m1 = moment();
    
  });

  it('checks if originalMoment is a moment using timeshifterMoment', () => {
    var m1 = originalMoment();
    expect(moment.isMoment(m1)).toBe(true);
  });

  it('checks if timeshifterMoment is a moment using timeshifterMoment', () => {
    var m1 = moment();
    expect(moment.isMoment(m1)).toBe(true);
  });

  it('checks if originalMoment is a moment using originalMoment', () => {
    var m1 = originalMoment();
    expect(originalMoment.isMoment(m1)).toBe(true);
  });

  it('checks if timeshifterMoment can be called as a function', () => {
    var m1 = moment();
    expect(originalMoment.isMoment(m1)).toBe(false);
  });

  it('originalMoment toString is a string', () => {
    var m1 = originalMoment();
    
    expect(typeof result).toBe('string');
  });

  it('TimeshifterMoment toString is a string', () => {
    var m1 = moment();
    
    expect(typeof result).toBe('string');
  });

  it('TimeshifterMoment with format MM/DD/YYYY should not be undefined', () => {
    var m1 = moment("08/09/2017", "MM/DD/YYYY");
    //console.log("TimeshifterMoment: " + m1);
    
  });

  it('Original moment date with format MM/DD/YYYY should not be undefined', () => {
    var m1 = originalMoment("08/09/2017", "MM/DD/YYYY");
    //console.log("original moment: " + m1);
    
  });

  it('Timeshifter moment and original moment for passed date for 08/09/2017 and Original moment fpr ', () => {
    // this test is timezone-dependent, need to fix
    var expectectedMillis = 1502251200000;
    var original1 = originalMoment("08/09/2017", "MM/DD/YYYY");
    var wrapped1 = moment("08/09/2017", "MM/DD/YYYY");
    // console.log("original moment: " + original1);
    // console.log("wrapped moment: " + wrapped1);
    // console.log("valueOf : "  + original1.valueOf());
    expect(original1.valueOf()).toEqual(1502217000000);
    //expect(wrapped1.valueOf()).toEqual(1502217000000);
  });    
  

  it('Initializes store with Date in past, TimeshifterMoment returns date intialized in offset', () => {
    ConfigStore.setConfig({
      timeshifter:
      {
        timeshifterEnabledForUser: 'true',
        shiftedDateMillisFromEpoch: 1262332800000
      }
    });
    
    setTimeshifterConfigOff();

    expect(result).toBe('01/01/2010');
  });

  it('Checks new Date().fullYear() is the same as moment().year() and originalMoment().year()', () => {
    ConfigStore.setConfig({
      timeshifter:
      {
        timeshifterEnabledForUser: 'false',
        shiftedDateMillisFromEpoch: null
      }
    });

    var dateYear = new Date().getFullYear();
    
    var originalMomentYear = originalMoment().year();
    console.log("Date().getFullYear(): " + dateYear);
    
    console.log("originalMoment().year(): " + originalMomentYear);
    expect(dateYear).toBe(originalMomentYear);
    expect(dateYear).toBe(momentYear);
  });

  it('Checks moment(new Date().getFullYear()) is the same as moment(moment.year())', () => {
    //original code
    var momentEnrollStart = moment(new Date().getFullYear() + '-01-31');
    var momentEnrollmentEnd = moment((new Date().getFullYear() + 1) + '-12-15');

    //replaced code
    
    

    console.log("moment(new Date().getFullYear() + '-01-31'): " + momentEnrollStart.format('L'));
    console.log("moment((new Date().getFullYear() + 1) + '-12-15'): " + momentEnrollmentEnd.format('L'));
    console.log("moment(moment().year() + '-01-31'): " + momentWithMomentYearEnrollStart.format('L'));
    console.log("moment((moment().year() + 1) + '-12-15'): " + momentWithMomentEnrollmentEnd.format('L'));

    expect(momentEnrollStart.format('L')).toBe(momentWithMomentYearEnrollStart.format('L'));
    expect(momentEnrollmentEnd.format('L')).toBe(momentWithMomentEnrollmentEnd.format('L'));
  });

  it('Checks new Date().setFullYear() is the same as moment().year()', () => {
    var originalYear = new Date().setFullYear(2016);
    var formattedOriginalYear = originalMoment(originalYear).format();
    console.log("original new Date().setFullYear(2016): " + formattedOriginalYear);

    
    
    console.log("moment moment().year(2016): " + formattedMomentYear);
    
  });


  


 
});
