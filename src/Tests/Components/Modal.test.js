import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import { Form } from 'formsy-react';
import {Modal, DeleteModal, ConfirmModal, DynamicConfirmModal, NoticeModal, ProgressModal, CancelModal, ModalHeader} from '../../Components/Modal';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import i18n from '../../i18n.en.json';
import App from '../../Containers/App.jsx';

it('Renders a Div with className member-box', () => {
	let props = {
		className:'item',
		hideOverlay :true,
		hideOverlayMobile :true,
		onRequestClose: jest.fn(),
		location : {pathname: 'review-application'}
	}
	var confirmModal  = mount( 
        <IntlProvider locale="en" messages={i18n} >
        
        <Formsy.Form>
            <ConfirmModal  i18nValues={props.i18nValues} i18nPrefix={props.i18nPrefix} />
        </Formsy.Form>
        
		</IntlProvider>);

	var cancelModal  = mount( 
		<IntlProvider locale="en" messages={i18n} >
		
		<Formsy.Form>
			<CancelModal  i18nValues={props.i18nValues} i18nPrefix={props.i18nPrefix} />
		</Formsy.Form>
		
		</IntlProvider>);	


	var modalHeade1  = mount( 
		<IntlProvider locale="en" messages={i18n} >
		
		<Formsy.Form>
			<ModalHeader {...props}  i18nValues={props.i18nValues} i18nPrefix={props.i18nPrefix} />
	</Formsy.Form>
	
	</IntlProvider>);	


	var deleteModal  = mount( 
		<IntlProvider locale="en" messages={i18n} >
		
		<Formsy.Form>
			<DeleteModal  i18nValues={props.i18nValues} i18nPrefix={props.i18nPrefix} />
		</Formsy.Form>
		
		</IntlProvider>);	

	
	
	var noticeModal  = mount( 
		<IntlProvider locale="en" messages={i18n} >
		
		<Formsy.Form>
			<NoticeModal  i18nValues={props.i18nValues} i18nPrefix={props.i18nPrefix} />
		</Formsy.Form>
		
		</IntlProvider>);	
	//	const mockedEvent = { target: {} ,preventDefault:()=>{}};
	//var confirmModalNode = noticeModal.find('NoticeModal').getNode();
	
	//confirmModalNode.requestConfirm = jest.fn(mockedEvent);
	//confirmModalNode.requestClose(mockedEvent);

	var progressModal  = mount( 
		<IntlProvider locale="en" messages={i18n} >
		
		<Formsy.Form>
			<ProgressModal  i18nValues={props.i18nValues} i18nPrefix={props.i18nPrefix} />
		</Formsy.Form>
		
		</IntlProvider>);		
		
		
	// expect(output.find('.member-box')).toHaveLength(0);
	
	const mockedEvent = { target: {} ,preventDefault:()=>{}};
	var confirmModalNode = confirmModal.find('ConfirmModal').getNode();
	
	//confirmModalNode.requestConfirm = jest.fn(mockedEvent);
	confirmModalNode.requestConfirm(mockedEvent);
	confirmModalNode.requestClose(mockedEvent);


	
	var confirmModalNode1 = modalHeade1.find('ModalHeader').getNode();
	
	//confirmModalNode.requestConfirm = jest.fn(mockedEvent);
	confirmModalNode1.requestBack(mockedEvent);
	confirmModalNode1.requestBack(mockedEvent);
		
	
}); 


