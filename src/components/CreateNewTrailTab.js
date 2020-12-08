import React from 'react';
import { Form, Input, Button } from 'antd';
import Icon from '@ant-design/icons';
import $ from 'jquery';
import { createTrailId } from '../common/axios';

const chrome = window.chrome;

class CreateNewTrailTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trail_name: '',
            loading: false
        };
    };
        
    clickToAddTrails = (values) => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
                this.setState({loading: true});
                chrome.storage.local.get(["trail_web_user_tour", "userData"], async function (items) {
                    const result = await createTrailId(items.userData._id, values.trail_name);
                    if(result.status == 200) {
                        this.setState({trail_name: '', loading: false});
                        this.props.onChange(false);
                        chrome.storage.local.set({trail_id: result.data.response[0].trail_id})
                    }
                }.bind(this))
        //     }
        // });
    }
    
    render () {        
        return(
            <React.Fragment>
                <Form name="normal_login" className="tr_new_trail_create_form">
                    <Form.Item
                        name="trail_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Trail Name',
                            }
                        ]}
                    >
                        <Input
                            placeholder="Enter Trail Name"
                            className="tr_input"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.clickToAddTrails} className="tr_button" loading={this.state.loading}>
                            Add Trail
                        </Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        )
    }
}

export default CreateNewTrailTab;