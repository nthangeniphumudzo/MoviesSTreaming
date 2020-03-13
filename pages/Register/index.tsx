import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './styles.scss';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  //Cascader,
  Select,
  Checkbox,
  Button,
  //AutoComplete,
} from 'antd';

const { Option } = Select;
//const AutoCompleteOption = AutoComplete.Option;

function RegistrationForm(props) {
  const [istate, setIstate] = useState({
    confirmDirty: false,
    autoCompleteResult: [],
  });

  function handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  function handleConfirmBlur(e) {
    const { value } = e.target;
    setIstate({ ...istate, confirmDirty: istate.confirmDirty || !!value });
  }

  function compareToFirstPassword(value, callback) {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  function validateToNextPassword(value, callback) {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  const { getFieldDecorator } = props.form;
  // const { autoCompleteResult } = state;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '+27',
  })(
    <Select style={{ width: 70 }}>
      <Option value="+27">+27</Option>
      <Option value="96">+87</Option>
    </Select>
  );

  return (
    <div className="center">
      <Form
        {...formItemLayout}
        onSubmit={() => {
          handleSubmit;
        }}
        style={{
          width: '1000px',
          textAlign: 'center',
          paddingTop: '200px',
          paddingLeft: '200px',
          borderRadius: '7px',
          fontSize: 'large',
        }}
      >
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              FullNAme&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('FullNAme', {
            rules: [{ required: true, message: 'Please input your fullname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="danger" htmlType="submit">
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create()(RegistrationForm);
