async function getTagAction(session, tagId, address, name) {
  try {
    const result = await session.run(
      `
      MATCH (t:Tag { id: $tagId })
      MATCH (u:User {address: $address})
      MATCH (t)<-[r:ACTION_ON_TAG]-(a:Action { name: $name } )-[r2:USER_ACTION]->(u)
      RETURN a { .name, .qty } AS a`,
      { tagId: tagId, address, name }
    );

    const singleRecord = result.records[0];
    if (!singleRecord) {
      return false;
    }
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function creatUpdateTagAction(session, tagId, address, name, qty) {
  console.log({ tagId, address, name, qty });
  try {
    const result = await session.run(
      `
      MATCH (t:Tag { id: $tagId }), (u:User {address: $address})
      MERGE (t)<-[r:ACTION_ON_TAG]-(a:Action { name: $name, qty: $qty })-[r2:USER_ACTION]->(u)
      RETURN a { .name, .qty } AS a`,
      { tagId: tagId, address, name, qty }
    );

    const singleRecord = result.records[0];
    if (!singleRecord) {
      return false;
    }
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function mergeActionOnTagAndQuestion(
  session,
  name,
  tagId,
  questionId,
  address
) {
  // console.log({ tagId, address, name, qty });
  try {
    const result = await session.run(
      `

      MATCH 
        (t:Tag {id: $tagId})<-[r:TAG_FOR_QUESTION]-(q:Question {id: $questionId}),
        (u:User {address: $address})
      MERGE 
        (t)<-[r2:ACTION_ON_TAG]-
        (a:Action)-[r3:USER_ACTION]->
        (u)<-[rTemp:USER_ACTION]-(a)-[r4:ACTION_ON_QUESTION]->(q)
      ON CREATE SET a.name = $name, a.qty= $qty
      ON MATCH SET a.name = $name, a.qty= $qty
      WITH a, u

      MATCH (a)-[rel:USER_ACTION]->(u)
      WITH a, collect(rel) AS rels
      WHERE size(rels) > 1
      UNWIND tail(rels) as t
      DELETE t

      RETURN a { .name, .qty } AS a`,
      { tagId: tagId, questionId, address, name, qty: 1 }
    );

    const singleRecord = result.records[0];
    if (!singleRecord) {
      return false;
    }
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function removeActionOnTagAndQuestion(
  session,
  name,
  tagId,
  questionId,
  address
) {
  // console.log({ tagId, address, name, qty });
  try {
    const result = await session.run(
      `
      MATCH 
        (t:Tag {id: $tagId})<-[r:TAG_FOR_QUESTION]-(q:Question {id: $questionId}),
        (u:User {address: $address})<-[rTemp:USER_ACTION]-(a:Action)-[r4:ACTION_ON_QUESTION]->(q)
      MATCH (t)<-[r2:ACTION_ON_TAG]-
        (a)-[r3:USER_ACTION]->(u)
      DETACH DELETE a
      `,
      { tagId: tagId, questionId, address, name, qty: 1 }
    );

    const singleRecord = result.records[0];
    if (!singleRecord) {
      return false;
    }
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function removeTagActions(session, address) {
  try {
    const result = await session.run(
      `
      MATCH (t:Tag)<-[r:ACTION_ON_TAG]-(a:Action)-[r2:USER_ACTION]->(u:User {address: $address})
      DETACH DELETE a`,
      { address }
    );

    const singleRecord = result.records[0];
    if (!singleRecord) {
      return false;
    }
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function batchCreateTagActions(session, address, actions) {
  try {
    const result = await session.run(
      `
      UNWIND $actions AS a
      MATCH (t:Tag { id: a.tagId }), (u:User {address: $address})
      CREATE (t)<-[r:ACTION_ON_TAG]-(newAction:Action { name: a.name, qty: a.qty })-[r2:USER_ACTION]->(u)
      RETURN a { .name, .qty } AS x
      `,
      { address, actions }
    );

    console.log(result.records);

    const dbActions = result.records.map((record) => record.get(0));

    // console.log(dbActions);
    if (!dbActions) {
      return false;
    }
    return dbActions;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getTagAction,
  creatUpdateTagAction,
  mergeActionOnTagAndQuestion,
  removeActionOnTagAndQuestion,
  removeTagActions,
  batchCreateTagActions,
};
