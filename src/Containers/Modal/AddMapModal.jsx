import React, { Component } from 'react';
import ReactModal from 'react-modal';

const ModalHeader = props => {
	var requestBack = e => {
			e.preventDefault();
			props.onRequestBack();
		},
		requestClose = e => {
			e.preventDefault();
			props.onRequestClose();
		};
		let backgroundColor = props.noBackgroundColor === true  ? 'no-color' : 'apply-color',
		noBackgroundColorForMobile = props.noBackgroundColorForMobile === true ? 'no-color-mobile' : '',
		borderBottom = props.borderBottom === true ? 'border-bottom' : '';
	return (
		<div className={`modal-header ${backgroundColor} ${noBackgroundColorForMobile} ${borderBottom}`}>
			{
				props.warningIcon
				? <div className="ic-warning-block"/>
				: null
			}
			{
				props.backButton
				? <button className="btn btn-back" onClick={requestBack} id={props.id + "-back"}><FormattedMessage id="modals.header.back" /></button>
				: null
			}
			<h2>{props.children}</h2>
			{
				props.closeButton
				? <button className="btn btn-close" onClick={requestClose} id={props.id + "-close"}><FormattedMessage id="modals.header.close" /></button>
				: null
			}
		</div>
	);
}

class AddMapModal extends Component {

	constructor(props) {
		super(props);
    }
    
	render() {	
        var className = ['calheers-modal'].concat(
            this.props.fullScreenMobile === true ? 'fullscreen-mobile' : [],
            this.props.className ? this.props.className.split(' ') : []
        ),
        overlayClassName = ['calheers-modal-overlay'].concat(
            this.props.overlayClassName ? this.props.overlayClassName.split(' ') : [],
            this.props.hideOverlay ? 'hide-overlay': [],
            this.props.hideOverlayMobile ? 'hide-overlay-mobile': []
        ),
        header = this.props.header || (this.props.title ? <ModalHeader warningIcon={this.props.warningIcon} id={this.props.id}>{this.props.title}</ModalHeader> : null);
        var footer = this.props.footer? this.props.buttons:null
    if(header) {
        header = React.cloneElement(header, {
            onRequestClose: this.props.onRequestClose
        });
    }

		return (
			<ReactModal
            ref="modal"
            role="dialog"
            {...this.props}
            className={className.join(' ')}
            overlayClassName={overlayClassName.join(' ')}
            ariaHideApp={true}
            appElement={document.querySelectorAll('#app-container')[0]}
                >
				<div 
					className="modal-content"
					id={this.props.id}
				>
					
					<div className="modal-body" ref="content">
						{this.props.children}
					</div>					
				</div>
			</ReactModal>
		)
	}
}

AddMapModal.propTypes = {
	onRequestConfirm: React.PropTypes.func,
	cancelText: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	confirmText: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	confirmButtonClassName: React.PropTypes.string,
	cancelButtonClassName: React.PropTypes.string,
	confirmDisabled: React.PropTypes.bool,
	cancelDisabled: React.PropTypes.bool,
	modalId: React.PropTypes.string
};

AddMapModal.defaultProps = {
	className: '',
	overlayClassName: '',
	onRequestConfirm: () => {},
	confirmButtonClassName: 'btn-primary',
	cancelButtonClassName: 'btn-default',
	confirmDisabled: false,
	cancelDisabled: false,
	modalId: 'modal'
};


export default AddMapModal;