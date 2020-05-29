async function createUpdateAnswer(session, questionId, answer) {
  try {
    // console.log(tx);
    // console.log(questionId);
    // console.log(answer);
    // return;
    const result = await session.run(
      `
      MERGE (q:Question { id: $questionId })
      MERGE (q)-[r:ANSWER_FOR]->(c:Answer { name: $name })
      ON CREATE SET  c.name = $name
      RETURN c { .name } AS c`,
      {
        questionId: questionId,
        name: answer,
      }
    );

    const singleRecord = result.records[0];
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function createTxChoseAnswerRelationship(session, tx, chooseAction) {
  try {
    console.log(tx);
    console.log(chooseAction);

    const result = await session.run(
      `
      MATCH (parentTx:Transaction { hash: $parentHash })-[r:QUESTION_IN]->(q:Question)-[r2:ANSWER_FOR]->(c:Answer { name: $name })
      MERGE (c)<-[r3:TX_CHOSE]-(tx:Transaction { hash: $txHash })
      ON CREATE SET r3.timestamp = datetime($relTimestamp), r3.old = false
      ON MATCH SET r3.timestamp = datetime($relTimestamp) , r3.old = false
      RETURN r3 { .timestamp, .old } AS r3`,
      {
        parentHash: chooseAction.parentHash,
        name: chooseAction.answer,
        txHash: tx.hash,
        relTimestamp: new Date(tx.timestamp * 1000).toISOString(),
      }
    );

    const singleRecord = result.records[0];
    console.log(singleRecord);
    return;
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function detachOldTxChoseAnswerRelationship(session, tx, chooseAction) {
  try {
    const result = await session.run(
      `
      MATCH (parentTx:Transaction { hash: $parentHash })-[r:QUESTION_IN]->(q:Question)-[r2:ANSWER_FOR]->(c:Answer)<-[r4:TX_CHOSE]-(tx:Transaction)-[:USER_TX]->(u { address: $address })
      // get the most recent purchase_date
      WITH max(r4.timestamp) AS timestamp

      MATCH (parentTx:Transaction { hash: $parentHash })-[r:QUESTION_IN]->(q:Question)-[r2:ANSWER_FOR]->(c:Answer)<-[r4:TX_CHOSE]-(tx:Transaction)-[:USER_TX]->(u { address: $address })
      SET (
        CASE
        WHEN ( NOT (r4.timestamp = timestamp) ) THEN r4 END 
      ).old = true

      WITH r4.timestamp AS timestamp
      
      MATCH (parentTx:Transaction { hash: $parentHash })-[r:QUESTION_IN]->(q:Question)-[r2:ANSWER_FOR]->(c:Answer)<-[r4:TX_CHOSE]-(tx:Transaction)-[:USER_TX]->(u { address: $address })
      WHERE  r4.old = false
      RETURN r4 { .timestamp, .old } AS r4
      `,
      {
        parentHash: chooseAction.parentHash,
        name: chooseAction.answer,
        txHash: tx.hash,
        address: tx.from,
      }
    );

    const singleRecord = result.records[0];
    console.log(singleRecord.get(0));
    return;
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  createUpdateAnswer,
  createTxChoseAnswerRelationship,
  detachOldTxChoseAnswerRelationship,
};
