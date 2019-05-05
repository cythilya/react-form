import React, { Component } from 'react';
import styled from 'styled-components';

export default class RenderCount extends Component<void> {
  renders = 0;

  render() {
    return <Circle>{++this.renders}</Circle>;
  }
}

const size = 30;
const Circle = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  width: ${size}px;
  height: ${size}px;
  font-style: normal;
  text-align: center;
  line-height: ${size}px;
  border-radius: ${size / 2}px;
  border: 1px solid #ddd;
  background: #eee;
`;
