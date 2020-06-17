import React from 'react';

import Link from 'next/link';
const querystring = require('querystring');
import { TitleWrapper, Wrapper, ContentWrapper } from './AskRowStyles';
import { InternalLinkStyles } from '../atoms/InternalLinkStyles';

import BigHeading from '../atoms/BigHeading';

export default class AboutRow extends React.Component {
  render() {
    return (
      <Wrapper wrap={`true`} id="about">
        <TitleWrapper>
          <BigHeading align="center">ABOUT THIS</BigHeading>
        </TitleWrapper>
        <ContentWrapper width="50%">
          <h3>Idena</h3>
          <p>
            Idena is a proof-of-person blockchain. All users take part in
            periodic validation sessions to prove that they're a human and not a
            bot.
          </p>
          <p>
            Users don't supply any personal information, they remain
            pseudo-anonymous, similar to Bitcoin or Ethereum.
          </p>
          <p>
            <InternalLinkStyles external={true} href="https://idena.io">
              idena.io
            </InternalLinkStyles>
          </p>
          <h3>Voting</h3>
          <p>
            The Idena network enables fair democratic voting. This can be
            executed in many ways. This website is an accessible way for people
            to ask questions and answer them.
          </p>
          <p>
            Questions and votes are all on the public Idena block chain. Votes
            can be cast and results can be read, saved, and shown anywhere.
            They're effectively uncensorable.
          </p>
          {/* <div className="lower">
            <a href="https://idena.io">idena.io</a>
          </div> */}
        </ContentWrapper>

        <ContentWrapper width="50%">
          <h3>How to</h3>
          <p>
            You'll need the Official Idena wallet, and have at least Newbie
            status. Asking and answering are similar procedures...
          </p>
          <ul>
            <li>
              Click <strong> DO IT</strong> or an answer to a question
            </li>
            <li>
              The Idena app will open prompting you to send a transaction of
              0DNA.
            </li>
            <li>
              Your tx comment contains your Q or A in a computer readable
              format.
            </li>
            <li>
              It is irreversible operation... it is about to be submitted to the
              blockchain. A small fee will apply.
            </li>
            <li>Your action will show on the website soon.</li>
            <li>
              This website has not been fully tested. Please post any bugs to
              #davey on Idena discord.
            </li>
          </ul>
          <h3>Next for idenavoice.com</h3>
          <ul>
            <li>Listen to feedback and fix bugs</li>
            <li>Open source some code</li>
            <li>Review the Q &amp; A data format with other developers</li>
          </ul>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
