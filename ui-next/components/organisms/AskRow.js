import React from 'react';

import Link from 'next/link';
const querystring = require('querystring');
import { notifyWallet } from '../../lib/wallet';

import { TitleWrapper, Wrapper, ContentWrapper } from './AskRowStyles';

import BigHeading from '../atoms/BigHeading';
import ButtonQuestion from '../atoms/ButtonQuestion';
import { ButtonStyles } from '../atoms/ButtonStyles';
import CheckboxInput from '../atoms/CheckboxInput';
import { CheckboxInputStyles } from '../atoms/CheckboxInputStyles';
import Select from '../atoms/Select';
import { SelectStyles } from '../atoms/SelectStyles';
import Textarea from '../atoms/Textarea';

const qTypes = [
  {
    label: 'Yes / No poll',
    value: 'ynp',
  },
  {
    label: 'Yes / No / Maybe',
    value: 'ynmp',
  },
  {
    label: 'Advanced',
    value: 'adv',
    disabled: true,
  },
  {
    label: 'TBC',
    value: 'tbc1',
    disabled: true,
  },
  {
    label: 'TBC',
    value: 'tbc2',
    disabled: true,
  },
];

let toasts = {};

export default class AskRow extends React.Component {
  state = { question: '', qType: 'ynp', hasWallet: true };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    if (type === 'checkbox') {
      this.setState({ [name]: e.target.checked });
      return;
    }
    this.setState({ [name]: value });
  };

  handleClick = () => {
    if (!this.state.hasWallet) {
      return false;
    }
    toasts = notifyWallet(toasts);
  };

  button() {
    if (!this.state.hasWallet) {
      return {
        url: 'https://idena.io',
        text: 'idena.io',
        target: '_blank',
      };
    }

    let itemListElement = ['Yes', 'No'];
    if (this.state.qType === 'ynmp') {
      itemListElement = ['Yes', 'No', 'Maybe'];
    }

    const schemaFoQuestion = {
      name: this.state.question,
      suggestedAnswer: {
        '@type': 'ItemList',
        itemListElement,
      },
    };

    // {"t":"q","v":{"b":"Do you like cats more than dogs?","p":"ynp"}}

    const queryObject = {
      address: '0x21ac9c3ac3e9415dc82f461e94728835f170a1f4',
      amount: '0',
      comment: 'JSON-LD:Question:' + JSON.stringify(schemaFoQuestion),
    };

    const query = querystring.encode(queryObject);
    const dnaUrl = 'dna://send/v1?' + query;

    return { url: dnaUrl, text: 'DO IT' };
  }

  render() {
    const button = this.button();

    return (
      <Wrapper id="ask">
        <TitleWrapper>
          <BigHeading>
            ASK A<span aria-hidden="true"></span> QUES
            <span aria-hidden="true"></span>TION
          </BigHeading>
        </TitleWrapper>
        <ContentWrapper
          ButtonStyles={ButtonStyles}
          CheckboxInputStyles={CheckboxInputStyles}
          SelectStyles={SelectStyles}
        >
          <Textarea
            handleChange={this.handleChange}
            value={this.state.question}
            name="question"
            placeholder="Type your question here"
          ></Textarea>
          <div className="lower">
            <Select
              name="qType"
              value={this.state.type}
              handleChange={this.handleChange}
              value={this.state.qType}
              options={qTypes}
            />

            <CheckboxInput
              name="hasWallet"
              checked={this.state.hasWallet}
              handleChange={this.handleChange}
            >
              I have an Idena wallet
            </CheckboxInput>
            <ButtonQuestion
              handleClick={this.handleClick}
              question={this.state.question}
              target={button.target ? button.target : null}
              href={button.url}
            >
              <span>{button.text}</span>
            </ButtonQuestion>
          </div>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
