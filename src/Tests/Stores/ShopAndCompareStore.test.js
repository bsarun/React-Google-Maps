
import ShopAndCompareStore from '../../Stores/ShopAndCompareStore';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import sinon from 'sinon';
describe("ShopAndCompareStore tests", function () {	
    
    it('ShopAndCompareStore test', () => {
		let changeSpy = sinon.spy();
		ShopAndCompareStore.on('change', changeSpy);
	    expect(changeSpy.called).toBe(false);
        expect(ShopAndCompareStore.getHouseHoldList()).toEqual(houseHoldList);
        expect(ShopAndCompareStore.getAllUnarchivedmessage()).toEqual( {});
       // expect(ShopAndCompareStore.getBacktheData()).toEqual(undefined);
        expect(ShopAndCompareStore.getCounty()).toEqual([]);
        //expect(ShopAndCompareStore.loginStatus()).toEqual([]);
        expect(ShopAndCompareStore.getLoggedInStatus()).toEqual("anonymous");
        expect(ShopAndCompareStore.getAllSavedData()).toEqual({});
        expect(ShopAndCompareStore.loginStatus()).toEqual(undefined);
        //expect(ShopAndCompareStore.getAgeofPeopleLength()).toEqual(undefined);
        dispatch('COVERAGE_ENDPOINT', 'abcd');
        ShopAndCompareStore.removeListener('change', changeSpy);
		
    });


    it('ShopAndCompareStore test1', () => {
		let changeSpy = sinon.spy();
		ShopAndCompareStore.on('change', changeSpy);
		
        expect(ShopAndCompareStore.getIncome()).toEqual(undefined);
        dispatch('LOADING_DONE', 'abcd');
        ShopAndCompareStore.removeListener('change', changeSpy);
		//ShopAndCompareStore.removeListener('change', changeSpy);
    });
    it('ShopAndCompareStore test2', () => {
		let changeSpy = sinon.spy();
		ShopAndCompareStore.on('change', changeSpy);
		
       // expect(ShopAndCompareStore.getAgeofPeopleLength()).toEqual({});
        dispatch('SAVE_PAYLOAD_DATA', 'abcd');
        ShopAndCompareStore.removeListener('payloadchange', changeSpy);
        //ShopAndCompareStore.loginStatus();
        ShopAndCompareStore.getLoggedInStatus();

		//ShopAndCompareStore.removeListener('change', changeSpy);
    });
    it('ShopAndCompareStore test3', () => {
		let changeSpy = sinon.spy();
		ShopAndCompareStore.on('change', changeSpy);
		
        expect(ShopAndCompareStore.getIncome()).toEqual(undefined);
        dispatch('SAVE_DATA', 'abcd');
        ShopAndCompareStore.removeListener('change', changeSpy);
		//ShopAndCompareStore.removeListener('change', changeSpy);
    });
    it('ShopAndCompareStore test4', () => {
		let changeSpy = sinon.spy();
		ShopAndCompareStore.on('change', changeSpy);
		
        expect(ShopAndCompareStore.getIncome()).toEqual(undefined);
        dispatch('GET_DATE', 'abcd');
        ShopAndCompareStore.removeListener('getthedata', changeSpy);
		//ShopAndCompareStore.removeListener('change', changeSpy);
    })
    it('ShopAndCompareStore test5', () => {
		let changeSpy = sinon.spy();
		ShopAndCompareStore.on('change', changeSpy);
		
        expect(ShopAndCompareStore.getIncome()).toEqual(undefined);
        dispatch('ZIPCODE_LOOKUP_MULTIPLE_COUNTIES', 'abcd');
        ShopAndCompareStore.removeListener('getthedata', changeSpy);
		//ShopAndCompareStore.removeListener('change', changeSpy);
    })
    it('ShopAndCompareStore test6', () => {
		let changeSpy = sinon.spy();
		ShopAndCompareStore.on('change', changeSpy);
		
        expect(ShopAndCompareStore.getIncome()).toEqual(undefined);
        dispatch('ZIPCODE_LOOKUP_SINGLE_COUNTY', 'abcd');
        ShopAndCompareStore.removeListener('getthedata', changeSpy);
		//ShopAndCompareStore.removeListener('change', changeSpy);
    })

    it('ShopAndCompareStore test7', () => {
		let changeSpy = sinon.spy();
		ShopAndCompareStore.on('change', changeSpy);
		
        expect(ShopAndCompareStore.getIncome()).toEqual(undefined);
        dispatch('ZIPCODE_LOOKUP_SINGLE_COUNTY', 'abcd');
        ShopAndCompareStore.removeListener('getthedata', changeSpy);
        ShopAndCompareStore.getAgeofPeopleLength();
		//ShopAndCompareStore.removeListener('change', changeSpy);
    })

    it('ShopAndCompareStore test7', () => {
		let changeSpy = sinon.spy();
		ShopAndCompareStore.on('change', changeSpy);
		
        expect(ShopAndCompareStore.getIncome()).toEqual(undefined);
        dispatch('ZIPCODE_LOOKUP_SINGLE_COUNTY', 'abcd');
        ShopAndCompareStore.removeListener('getthedata', changeSpy);
        ShopAndCompareStore.getIndividualCountyCode();
		//ShopAndCompareStore.removeListener('change', changeSpy);
    })

    let dispatch = (actionType, payload) => {
        AppDispatcher.dispatch({
            action: {
                type:    actionType,
                payload: payload
            }
        });
    };
    
});

var storage = {};
var countyStorage = ["2016","2015"];
var archiveStorage = {};
var location = {};
var messageStorage = {};
var accoridianstate = 0;


let houseHoldList = {
	"-3a" : "1",
	"-3b": "2",
	"-3c": "3",
	"-3d": "4",
	"-3e": "5",
	"-3f": "6",
	"-3g": "7",
	"-3h": "8",
	"-3i": "9",
	"-3j": "10",
	"-3k": "11",
	"-3l": "12",
	"-3m": "13",
	"-3n": "14",
	"-3o": "15",
	"-3p": "16",
	"-3q": "17",
	"-3r": "18",
	"-3s": "19",
	"-3t": "20",
	"-3u": "21",
	"-3v": "22",
	"-3w": "23",
	"-3x": "24",
	"-3y": "25"
};
