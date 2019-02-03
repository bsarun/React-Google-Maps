import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {shallow, mount, render} from 'enzyme';
import { Form } from 'formsy-react';
import Accordion, {Panel} from '../../Components/Accordion';

it('Renders a Accordion', () => {
	const onToggle = sinon.spy();
	const onRequestToggle = sinon.spy();
	var output = mount(
		<div>
			<Accordion activeRow = {1} onToggle = {onToggle}> 
		<div>
			<Panel key = {1} open = {true} onRequestToggle ={onRequestToggle} index= {1}>
				<p>This is a test panel</p>
			</Panel>
		</div>
		</Accordion>
		</div>
	);
	expect(output.length).toEqual(1);
	//expect(output.find('.numeric-input')).toHaveLength(1);
});

it('Checks the behaviour of componentWillReceiveProps on Accordion', () => {
	var accordion = mount(<Accordion />),
	newProps = {
		activeRow: 1
	};
	accordion.setProps(newProps);
	expect(accordion.props().activeRow).toEqual(newProps.activeRow);
});

it('Renders a panel', () => {
	const onRequestToggle = sinon.spy();
	var output = mount(<Panel open = {true} onRequestToggle ={onRequestToggle} index= {1}/>);
	expect(output.length).toEqual(1);
});
it('tests the onRequestToggle of Panel', () => {
	const onRequestToggle = sinon.spy();
	var output = mount(
		<div>
			<Accordion activeRow = {1}> 
		<div>
			<Panel key = {1} open = {true} onRequestToggle ={onRequestToggle} index= {1}>
				<p>This is a test panel</p>
			</Panel>
		</div>
		</Accordion>
		</div>
	);
	expect(output.length).toEqual(1);
	expect(output.find('a').length).toEqual(1);
	output.find('a').simulate('click');
	expect(onRequestToggle.called).toBe(true);
});

