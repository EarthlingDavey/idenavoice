const { toUtf8, fromUtf8 } = require('ethereumjs-util');
var JSONParse = require('json-parse-safe');

const { createQuestion, createAnswer } = require('../controllers/question');

const questionPrefix = 'JSON-LD:Question:';
const questionHex = fromUtf8(questionPrefix);

function isQuestion(payload) {
  return payload.startsWith(questionHex);
}

async function parseQuestion(payload) {
  var str = toUtf8(payload);
  // console.log(str);

  var json = str.slice(questionPrefix.length);
  console.log(json);

  var obj = JSONParse(json);
  if (obj.error) {
    return;
  }
  // console.log(obj);

  const { name, suggestedAnswer } = obj.value;

  if (!name || typeof name !== 'string') {
    return;
  }

  const question = {
    name,
    suggestedAnswer: [],
  };

  if (
    suggestedAnswer &&
    suggestedAnswer.itemListElement.length !== 0 &&
    Array.isArray(suggestedAnswer.itemListElement)
  ) {
    for (var i in suggestedAnswer.itemListElement) {
      const item = suggestedAnswer.itemListElement[i];
      if (typeof item === 'string') {
        question.suggestedAnswer.push(item);
      }
    }
  }
  return question;
}

module.exports = {
  isQuestion,
  parseQuestion,
};
