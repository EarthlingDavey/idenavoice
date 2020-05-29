async function getUserByToken(session, token) {
  // console.log('token: ' + token);
  try {
    // 300000ms is 5 mins
    const result = await session.run(
      `MATCH (user:User {token: $token}) 
      WHERE user.nonceCreated >= ( TIMESTAMP() - 300000 )
      RETURN 
        user.token AS token ,
        user.nonce AS nonce , 
        user.address AS address ,
        apoc.temporal.format(user.nonceCreated , "dd MMMM yyyy HH:mm") AS nonceCreated
       `,
      { token }
    );

    if (!result.records[0]) {
      console.log('user not found ');
      return false;
    }
    const singleRecord = result.records[0];

    return singleRecord.toObject();
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function createUser(session, user) {
  try {
    const result = await session.run(
      `
      MERGE (user:User { address: $address })
      ON CREATE SET user.nonce = $nonce, user.token = $token, user.nonceCreated = TIMESTAMP()
      ON MATCH SET user.nonce = $nonce, user.token = $token, user.nonceCreated = TIMESTAMP()
      RETURN user { .token , .nonce, .address } AS user`,
      { token: user.token, nonce: user.nonce, address: user.address }
    );

    const singleRecord = result.records[0];
    return singleRecord.get(0);
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getUserByToken,
  createUser,
};
