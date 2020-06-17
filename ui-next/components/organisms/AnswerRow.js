import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { TitleWrapper, Wrapper, ContentWrapper } from './AskRowStyles';

import BigHeading from '../atoms/BigHeading';
import Questions from '../molecules/Questions';

const GET_TAGS = gql`
  query GET_TAGS {
    Tag(orderBy: voteCountCache_desc, first: 3) {
      id
      name
    }
  }
`;

export default function AnswerRow(props) {
  const { data, loading, error } = useQuery(GET_TAGS, {
    variables: {},
    // pollInterval: 3500,
  });

  return (
    <Wrapper id="answer">
      <ContentWrapper hasQuestions={true}>
        {!loading && <Questions tags={data.Tag}></Questions>}
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
