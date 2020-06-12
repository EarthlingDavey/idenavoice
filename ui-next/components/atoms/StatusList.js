import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TimeAgo from 'react-timeago';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
const formatter = buildFormatter(englishStrings);

const SERVER_STATUS_QUERY = gql`
  query serverStatus {
    serverStatus {
      code
      message
      name
      timestamp
      links {
        text
        href
      }
    }
  }
`;

function StatusListLinks(props) {
  return (
    <>
      {' - '}
      {props.links.map((l, i) => {
        return (
          <a key={i} href={l.href}>
            {l.text}
          </a>
        );
      })}
    </>
  );
}

function mergeObjectsInUnique(array, property) {
  const newArray = new Map();
  array.forEach((item) => {
    const propertyValue = item[property];
    newArray.has(propertyValue)
      ? newArray.set(propertyValue, { ...newArray.get(propertyValue), ...item })
      : newArray.set(propertyValue, item);
  });
  return Array.from(newArray.values());
}

export function StatusList(props) {
  const { ...result } = useQuery(SERVER_STATUS_QUERY, {
    variables: {},
    pollInterval: 35000,
  });

  const data = result.data;

  if (!data) {
    return <p>Loading</p>;
  }

  let services = [
    {
      name: 'frontend',
      code: 200,
      message: 'ok - loaded just now',
      links: [
        {
          text:
            process.env.deployUrl === 'http://localhost'
              ? 'running locally'
              : 'deployed from GitHub',
          href: process.env.deployUrl,
        },
      ],
    },
    {
      name: 'api',
      code: 200,
      message: 'unknown - waiting',
    },
    {
      name: 'backend',
      code: 200,
      message: 'unknown - waiting',
    },
    {
      name: 'database',
      code: 200,
      message: 'unknown - waiting',
    },
    {
      name: 'node',
      code: 200,
      message: 'unknown - waiting',
    },
  ];

  if (data && data.serverStatus) {
    const mergedArray = [...services, ...data.serverStatus];

    services = mergeObjectsInUnique(mergedArray, 'name');
  }

  return (
    <ul>
      {services.map((s, i) => {
        return (
          <li key={i}>
            {s.name}: {s.message}
            {s.links && <StatusListLinks links={s.links}></StatusListLinks>}
            {s.timestamp && (
              <>
                {' '}
                <TimeAgo date={s.timestamp * 1000} formatter={formatter} />{' '}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default StatusList;
