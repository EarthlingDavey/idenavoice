import Link from 'next/link';
const querystring = require('querystring');
import { TitleWrapper, Wrapper, ContentWrapper } from './AskRowStyles';

import BigHeading from '../atoms/BigHeading';
import Button from '../atoms/Button';
import { ButtonStyles, ButtonGroupStyles } from '../atoms/ButtonStyles';
import CheckboxInput from '../atoms/CheckboxInput';
import { CheckboxInputStyles } from '../atoms/CheckboxInputStyles';
import Textarea from '../atoms/Textarea';
import Questions from '../molecules/Questions';

export default function AskRow(props) {
  return (
    <Wrapper id="answer">
      <ContentWrapper hasQuestions={true}>
        <Questions></Questions>
      </ContentWrapper>
      <TitleWrapper>
        <BigHeading>
          OR AN<span aria-hidden="true"></span>SWER{' '}
          <span aria-hidden="true"></span>SOME
        </BigHeading>
      </TitleWrapper>
    </Wrapper>
  );
}
