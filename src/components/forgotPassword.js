import React from 'react';
import { Form, Input, Button } from 'antd';

class ForgotPassword extends React.Component {
	/**
	 * onClick to submit
	 */
	onClickToSubmit = values => {
		console.log('Received values of form: ', values);
	};

	render() {		
		return (
			<div className="tr_wrapper">
				<div className="tr_title">Forgot Password?</div>
				<div className="tr_subtitle mb_40">Enter your email to find your account</div>
				<Form onSubmit={this.handleSubmit}>
					<Form.Item name="username" rules={[{ required: true, message: 'Please input your Email!' }]}>
						{/* {getFieldDecorator('username', {
							rules: [{ required: true, message: 'Please input your Email!' }],
						})(<Input placeholder="Enter your email" className="tr_input" />)} */}
						<Input placeholder="Enter your email" className="tr_input" />
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

export default ForgotPassword;
