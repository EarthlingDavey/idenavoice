import Link from 'next/link';
import { TitleWrapper, Wrapper, ContentWrapper } from './AskRowStyles';

import BigHeading from '../atoms/BigHeading';
import Questions from '../molecules/Questions';

export default function AnswerRow(props) {
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
