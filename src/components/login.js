/* eslint-disable react/jsx-no-target-blank */
import React, { useRef, createRef } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

import { getAllNotification } from '../common/axios';
import { keyPairGenerate } from '../code/generateKey';

const chrome = window.chrome;
// let bkg = chrome.extension.getBackgroundPage();

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: "",
			isAuth: false,
			isLoading: false
		}
	}

	// Antd form reference
	formRef = React.createRef();
	
	// Facebook response function
	responseFacebook = (response) => {
		console.log(response);
	}

	// On click to submit function
	onClickToSubmit = values => {
		this.setState({ isLoading: true });

		axios.post(`${process.env.REACT_APP_MS1_URL}user/login`, values, { withCredentials: true })
			.then((res, err) => {
				if (res.status === 200) {

					const { responseCode, responseMessage } = res.data.data.response;
					
					if (responseCode === 208 || responseCode === 404) {

						this.setState({errors: responseMessage});

						setTimeout(() => {
							this.setState({ errors: "" });
						}, 3000);
						
					} else {
						
						const { jwt, user } = res.data.data.response.data;
						
						chrome.storage.local.set({ isAuth: true, auth_Tokan: jwt, userData: user, reload: true, keypair: keyPairGenerate() }, function() {
							// bkg.console.log("JWT, USER", jwt, user)
						});
						
						this.props.clickToRedirect('userProfile');
						
						chrome.storage.local.set({ notification: true })
						
						this.setState({ isAuth: true });
					}
				}

				this.setState({ isLoading: false });
			})
			.catch(err => {
				console.log('err', err);

				this.setState({ isLoading: false });
			});	
	};
	
	// Validate password with regular expression function
	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		
		var digit = /^(.*[0-9]+.*)$/;
		var upper = /^(.*[A-Z]+.*)$/;
		var lower = /^(.*[a-z]+.*)$/;

		if (value && !digit.test(value)) {
			callback('Password must contain one digit');
		}

		if (value && !upper.test(value)) {
			callback('Password must contain one uppercase letter');
		}

		if (value && !lower.test(value)) {
			callback('Password must contain one lowercase letter');
		}

		if (value && value.length <= 8) {
			callback('Password must be 8 digit');
		}

		if (value && this.state.confirmDirty) {
			this.formRef.validateFields(['confirm'], { force: true });
		}

		callback();
	};

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};
	
	render() {		
		return (
			// <ReactShadowRoot>
			// 	<style>{ loginStyle }</style>			
				// <div className={'trailMain'}>
				<div className='trailMain'>
					<div className="tr_wrapper">
						<img className="logo_login" src={require('../images/icon129.png')} alt="login-img" />
						<div className="tr_title">Welcome to the Trailit.</div>
						<div className="tr_subtitle">
							Enter your details to login. If you have not login details than
							<a className="tr_link fw_400" target="_blank" href="http://169.61.16.14/?signUp=true">
								Signup Now
							</a>
						</div>
						{this.state.errors && <p className="tr_error">{this.state.errors}</p>}
						<div className="tr_label">Signin</div>
						<Form 
							ref={ this.formRef } 
							name="control-ref"
							onFinish={ this.onClickToSubmit }
							onFinishFailed={ this.onFinishFailed }	
						>	
							<Form.Item 
								name="email" 
								rules={[{
									// type: 'email',
									// message: 'Please enter valid email!',
								},
								{
									required: true,
									message: 'Please enter your email!',
								}]}
							>
								{/* {getFieldDecorator('email', {
									rules: [
									{
										type: 'email',
										message: 'Please enter valid email!',
									},
									{
										required: true,
										message: 'Please enter your email!',
									},
									],
								})(<Input placeholder="Enter your email" className="tr_input" />)} */}
								<Input placeholder="Enter your email" className="tr_input" />
							</Form.Item>
							<Form.Item 
								name="password" 
								rules={[{
									required: true,
									min: 3,
									message: 'Please input your password!',
								}]}
							>
								{/* {getFieldDecorator('password', {
									rules: [
										{
											required: true,
											message: 'Please input your password!',
										}
									],
								})(<Input type="password" placeholder="Password" className="tr_input" />)} */}
								<Input type="password" placeholder="Password" className="tr_input" />
							</Form.Item>
							<Form.Item className="last_fg">
								<a className="tr_link flex_grow_1" href="javascript:;">
									Forgot password?
								</a>
								<Button 
									disabled={ this.state.isLoading } 
									type="primary" 
									htmlType="submit" 
									className="tr_button"
								>
									Log in now
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			// </ReactShadowRoot>
		);
	}
}

export default Login;
