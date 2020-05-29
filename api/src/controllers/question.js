// async function createQuestion(session, question) {
//   try {
//     const result = await session.run(
//       `
//       MERGE (question:Question { address: $address })
//       ON CREATE SET question.nonce = $nonce, question.token = $token, question.nonceCreated = TIMESTAMP()
//       ON MATCH SET question.nonce = $nonce, question.token = $token, question.nonceCreated = TIMESTAMP()
//       RETURN question { .token , .nonce, .address } AS question`,
//       {
//         token: question.token,
//       }
//     );

//     const singleRecord = result.records[0];
//     return singleRecord.get(0);
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

async function createUpdateQuestion(session, tx, question) {
  try {
    // 1. Find the transction with hash AND question with name
    // 2. Does the tx have a question relationship?
    // 3. Create/update the question
    // 4. Create relationship between question and transaction
    // console.log(tx);
    // console.log(question);
    // return;
    const result = await session.run(
      `
      MERGE (t:Transaction { hash: $hash })
      MERGE (t)-[r:QUESTION_IN]->(q:Question { name: $name })
      ON CREATE SET  q.name = $name, q.timestamp = datetime($timestamp), q.id = apoc.create.uuid()
      RETURN q { .name, .timestamp, .id } AS q`,
      {
        hash: tx.hash,
        timestamp: new Date(tx.timestamp * 1000).toISOString(),
        name: question.name,
      }
    );

    const singleRecord = result.records[0];
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function createQuestion(session, tx) {
  try {
    const result = await session.run(
      `
      MERGE (q:Question { hash: $hash })
      ON CREATE SET  q.name = $name, q.timestamp = datetime($timestamp)
      ON MATCH SET q.name = $name, q.timestamp = datetime($timestamp)
      RETURN q { .hash , .name, .timestamp } AS q`,
      {
        hash: tx.hash,
        timestamp: new Date(tx.timestamp * 1000).toISOString(),
        name: tx.question.name,
      }
    );

    const singleRecord = result.records[0];
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function createAnswer(session, tx, answerName) {
  try {
    const result = await session.run(
      `
      MATCH (q:Question { hash: $hash } )
      MERGE (q)-[r:CHOICE_FOR]->(a:Answer { name: $answerName })
      RETURN a.name, type(r), q.name`,
      {
        answerName: answerName,
        hash: tx.hash,
      }
    );

    return true;
    // const singleRecord = result.records;

    // return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function createQuestionUserRelationship(session, question, address) {
  console.log(question);
  console.log(address);
  try {
    const result = await session.run(
      `MATCH 
      (question:Question {question: $question}), 
      (user:User {address: $address}) 
      create (question)<-[:USER_QUESTION]-(user)`,
      { question, address }
    );
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  createUpdateQuestion,
  createQuestion,
  createAnswer,
  createQuestionUserRelationship,
};
