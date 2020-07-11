import React, { PropTypes } from "react";
import { Form, Icon, Input, Button, Checkbox, Modal, message } from "antd";
import { connect } from "dva";

import styles from "./login.less";
import one from "../../assets/number-one.png";
import two from "../../assets/number-two.png";
import three from "../../assets/number-three.png";

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  componentDidMount() {
    //after render run
    this.inputRef.input.focus();
  }
  inputRef = undefined;
  componentDidUpdate() {
    setTimeout(() => this.loginSuccess(), 2000);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //form的属性不一定要全部在state中, 这里就可以拿到form 的所有 values
      if (!err) {
        this.onLoading(values);
      }
    });
  };
  onLoading = (values) => {
    this.setState({
      onLoading: true,
    });
    console.log("============login========", values);
    this.props.dispatch({
      type: "login/onLogin",
      payload: values,
    });
  };
  onUserNameChange = (e) => {
    let username = e.target.value;
    username = username.trim();
    this.setState({
      username,
    });
  };
  onPasswordChange = (e) => {
    //手动实现 form.field 以及 this.data.field
    let password = e.target.value;
    password = password.trim();
    this.setState({
      password,
    });
    this.props.form.setFieldsValue({
      password,
    });
  };

  loginSuccess() {
    if (this.props.isLogin && !this.props.hasError) {
      window.jump();
    } else if (this.props.hasError) {
      message.destroy();
      Modal.warning({
        title: "登录失败",
        content: this.props.errorMsg,
        okText: "确定",
        onOk: this.handleOk,
      });
      this.props.dispatch({
        type: "login/clearMsg",
      });
    }
  }
  clearPassword = () => {
    this.setState({
      password: "",
    });
    this.props.form.setFieldsValue({
      password: "",
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginContainer}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <div className={styles.loginTitle}>
            <img src={one} />
            <img src={two} />
            <img src={three} />
          </div>

          <FormItem style={{ width: "37%", margin: "0 auto" }}>
            <label className={styles.formLabel}>用户名</label>

            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入正确的用户名！" }],
            })(
              <Input
                ref={(c) => (this.inputRef = c)}
                suffix={
                  this.state.username ? (
                    <Icon type="check" className={styles.userNameIcon} />
                  ) : null
                }
                onChange={this.onUserNameChange}
              />
            )}
          </FormItem>
          <FormItem style={{ width: "37%", margin: "0 auto" }}>
            <label className={styles.formLabel}>登录密码</label>
            {getFieldDecorator("password", {
              initialValue: this.state.password,
              rules: [{ required: true, message: "请输入正确的密码！" }],
            })(
              <Input
                type="password"
                // value={this.state.password}
                suffix={
                  this.state.password ? (
                    <Icon
                      type="close-circle"
                      className={styles.closeIcon}
                      onClick={this.clearPassword}
                    />
                  ) : null
                }
                onChange={this.onPasswordChange}
              />
            )}
          </FormItem>
          <FormItem style={{ width: "37%", margin: "0 auto" }}>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true,
            })(<Checkbox style={{ color: "#fff" }}>记住密码</Checkbox>)}

            <div className={styles.submitContain}>
              <Button
                loading={this.props.loading}
                type="primary"
                htmlType="submit"
                className={styles.submitBtn}
              >
                登 录
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  // {routing: {…}, @@dva: 0, index: {…}, loading: {…}}
  // @@dva: 0
  // index:
  // initModule: {}
  // stateShow: false
  // __proto__: Object
  // loading:
  // effects: {}
  // global: false
  // models: {}
  // __proto__: Object
  // routing:
  // location: null
  // __proto__: Object
  // __proto__: Object

  console.log("login:", state);
  return { ...state.login };
}

const mapPropsLogin = Form.create()(Login);

export default connect(mapStateToProps)(mapPropsLogin);
