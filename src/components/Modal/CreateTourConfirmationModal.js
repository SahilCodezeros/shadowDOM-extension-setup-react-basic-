import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import $ from 'jquery';

class CreateTourConfirmationModal extends Component {
    render() {
        const { data, onModalClose, onTourSelect } = this.props;
        const { show, tourType } = data;

        $(() => {
			const modalDiv = document.getElementById('extension-div').shadowRoot.querySelector('.tr_modal');
            
			if (modalDiv) {
                if (!modalDiv.parentNode.parentNode.parentNode.getAttribute("class")) {
                    modalDiv.parentNode.parentNode.parentNode.setAttribute('class', 'trial_modal_show trial_create_modal_main');
				}
            }
		});	

        return (
            <Modal
                centered={ true }
                toggle={ onModalClose } 
                isOpen={ show } 
                className="tr_modal trail_create_modal"
                container={ document.getElementById('extension-div').shadowRoot }
            >
                <ModalHeader toggle={ onModalClose } className="tr_modal_trail_modal_header" closeButton>
                    Confirmation Alert
                </ModalHeader>
                <ModalBody>
                    <p className="trailit_DeleteText">                        
                        Please select step type
                    </p>
                    <div className="trailButtonsWrapper">
                        <button 
                            type="button" 
                            className="ant-btn ant-btn-primary trail_add_step_btn"
                            onClick={ (e) => onTourSelect(tourType, `${tourType} Modal`) }
                        >
                            { tourType } Modal
                        </button>
                        <button 
                            type="button" 
                            className="ant-btn ant-btn-primary trail_add_step_btn"
                            onClick={ (e) => onTourSelect(tourType, `${tourType} Bubble`) }
                        >
                            { tourType } Bubble
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
};

export default CreateTourConfirmationModal;