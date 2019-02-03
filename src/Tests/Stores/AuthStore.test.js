import AuthStore from '../../Stores/AuthStore.js';
//import { deepGet, deepSetObj } from '../../Components/Forms/FormHOC.jsx';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import moment from '../../TimeshifterMoment';
import sinon from 'sinon';

describe(" AuthStore tests", function () {
    
    it('checks for Authentication Token refresh from server', () => {
        let changeSpy = sinon.spy();
        AuthStore.on('change', changeSpy);
        dispatch('AUTH_TOKEN_REFRESH_FROM_SERVER', null);
        expect(changeSpy.called).toBe(false);
        expect(AuthStore.loggedIn()).toBe(false);
        expect(AuthStore.login()).toBe(undefined);
        expect(AuthStore.parseJwt()).toBe(null);
        expect(AuthStore.getToken()).toBe(null);
        expect(AuthStore.getApiKey()).toBe("8KZVeTeuB66y3CGkZLbMm3og3n7D08qq9W8d8eJg");
      //  expect(AuthStore.getUserId()).toBe(null);
        //expect(AuthStore.userHasRole()).toBe(false);
        //expect(AuthStore.getPendingAppId()).toBe(null);
        expect(AuthStore.logout()).toBe(undefined);
        AuthStore.removeListener('change', changeSpy);
    });
      
   it('checks for Authentication Token refresh ', () => {
        let changeSpy = sinon.spy();
        AuthStore.on('change', changeSpy);
        dispatch('AUTH_TOKEN_REFRESH_FROM_SERVER',null);
        expect(changeSpy.called).toBe(false);
        expect(changeSpy.called).toBe(false);
        AuthStore.removeListener('change', changeSpy);
       
    });

    it('login function', () => {
        let changeSpy = sinon.spy();
        let token='{"name":"John"}."age":30';
        AuthStore.on('change', changeSpy);
        AuthStore.parseJwt = jest.genMockFunction().mockReturnValue({roles:['GROUP_Individual'],additionalClaims:{pendingAppId:2361783617,personId:5778}});
        AuthStore.login('545454544.dfdfdfdfdff');
        AuthStore.removeListener('change', changeSpy);


        
    });
    

    });

  
let jwt = null,
    personId = null,
    pendingAppId = null,
    authRoles = [],
    effectiveUserRoles = [];

const USER_ROLE_MAPPINGS = {
    'GROUP_Individual':                 'consumer',
    'GROUP_AuthorisedRepresentative':   'consumer',
    'GROUP_SCRSupervisorEnhanced':      'admin',
    'GROUP_SCRSupervisorOperations':    'admin',
    'GROUP_ReportingAdministrator':     'admin',
    'GROUP_CountyEligibilityWorker':    'admin',
    'GROUP_ADMIN_Supervisor':           'admin',
    'GROUP_Admin_verification':         'admin',
    'GROUP_Supervisor_announcement':    'admin',
    'GROUP_Admin_announcement':         'admin',
    'GROUP_Admin_Notices':              'admin',
    'GROUP_Supervisor_Notices':         'admin',
    'SCRSupervisorOperations':          'admin',
    'GROUP_SCR_Read_Only_Role':         'admin',
    'GROUP_Assister':                   'cec',
    'GROUP_Agent':                      'agent',
    'GROUP_Agency_Manager':             'agent',
    'GROUP_Production_Support_Supervisor': 'admin',
    'GROUP_Production_Support_Team_Member': 'admin',
    'GROUP_DHCS_Softpause_Lift':         'admin'
};

let dispatch = (actionType, payload) => {
    AppDispatcher.dispatch({
        action: {
            type:    actionType,
            payload: payload
        }
    });
};


