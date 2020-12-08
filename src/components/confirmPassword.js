import React from 'react';
import { Form, Input, Button, Avatar } from 'antd';
import Icon from '@ant-design/icons';

class ConfirmPassword extends React.Component {
	/**
	 * onClick to submit
	 */
	onClickToSubmit = values => {
		console.log('Received values of form: ', values);
	};

	render() {		
		return (
			<div className="tr_wrapper">
				<div className="tr_title">Set Password</div>
				<div className="tr_subtitle mb_40">Please enter your password to login into the Trailit account.</div>
				<div className="tr_label">Enter Password</div>
				<Form onSubmit={this.onClickToSubmit}>
					<Form.Item name="password" rules={[{ required: true, message: 'Please input Password!' }]}>
						<Input placeholder="Enter your email" className="tr_input" />
						{/* {getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input Password!' }],
						})(<Input placeholder="Enter your email" className="tr_input" />)} */}
					</Form.Item>
					<Form.Item name="ConfirmPassword" rules={[{ required: true, message: 'Please input Confirm Password!' }]}>
						{/* {getFieldDecorator('ConfirmPassword', {
							rules: [{ required: true, message: 'Please input Confirm Password!' }],
						})(<Input type="password" placeholder="Confirm Password" className="tr_input" />)} */}
						<Input type="password" placeholder="Confirm Password" className="tr_input" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="tr_button">
							Continue
						</Button>
					</Form.Item>
				</Form>
				<a href="" className="tr_link back">
					BACK
				</a>
			</div>
		);
	}
}

export default ConfirmPassword;