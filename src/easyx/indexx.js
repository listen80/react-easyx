import React from 'react';

// 使用类封装状态和处理函数，避免全局污染
class StateManager {
  constructor() {
    // 定义初始状态
    this.state = {};
    this.handles = [];
  }

  /**
   * 合并新对象到当前状态
   * @param {Object} o - 需要合并到状态的对象
   */
  merge = (o) => {
    Object.assign(this.state, o);
  }

  /**
   * 分发状态更新并触发所有处理函数
   * @param {Object} o - 需要合并到状态的对象
   */
  dispatch = (o) => {
    this.merge(o);
    this.handles.forEach((d) => d());
  }

  /**
   * 获取当前状态
   * @returns {Object} 当前状态对象
   */
  getState = () => {
    return this.state;
  }

  /**
   * 注册状态更新处理函数
   * @param {Function} handler - 状态更新时要执行的函数
   */
  subscribe(handler) {
    this.handles.push(handler);
    return () => {
      const index = this.handles.indexOf(handler);
      if (index !== -1) {
        this.handles.splice(index, 1);
      }
    };
  }
}

const stateManager = new StateManager();

/**
 * 创建一个 React 组件，该组件会在状态更新时重新渲染
 * @param {React.ComponentType} o - 要包装的组件
 * @returns {React.Component} 包装后的组件
 */
const easyX = (o) => class Component extends React.Component {
  constructor(props) {
    super(props);
    // 订阅状态更新
    const self = this
    this.unsubscribe = stateManager.subscribe(() => {
      console.log(this)
      self.setState(stateManager.getState());
    });
  }

  componentWillUnmount() {
    // 组件卸载时取消订阅
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return React.createElement(o, { ...stateManager.getState(), ...this.props });
  }
};

const { dispatch, merge, getState } = stateManager
export { dispatch, merge, getState, easyX };
