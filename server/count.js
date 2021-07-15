/**
 * React Dmarc Sift. DAG's 'Count' node implementation
 */
'use strict';

// Entry point for DAG node
module.exports = function (got) {
  const inData = got.in;
  const messages = inData.data.map(({ key, value }) => {
    try {
      return { key, value: JSON.parse(value) };
    }
    catch (err) {
      console.error('email-sift-web: count.js: something went wrong with input:', e);
      return null;
    }
  }).filter(i => i);

  const getMondayDate = (dayOfWeek) => {
    if (dayOfWeek === 1) return new Date();
    const date = new Date()
    date.setHours(-24 * (dayOfWeek - 1))
    return date
  }

  // while this version is a bit more verbose, we use a O(n) version instead of O(2n)
  // for mapping and then reducing
  const calculateTotalWordCount = (messages) => messages.reduce((acc, message) => {
    const wordCount = message.value.wordCount
    return acc + wordCount
  }, 0)

  const currentDate = new Date()
  const dayOfWeek = currentDate.getDay() || 7
  const mondayDate = getMondayDate(dayOfWeek)
  const currentDateString = currentDate.toLocaleDateString()

  const dailyMessages = messages
    .filter(({value: {date}}) => new Date(date).toLocaleDateString()  === currentDateString)
  const weeklyMessages = messages 
  .filter(({value: {date}}) => new Date(date)  >= mondayDate)


  console.log('email-sift-web: count.js: running...');

  return [
    { name: 'counts', key: 'MESSAGES', value: messages.length },
    { name: 'counts', key: 'WORDS', value: calculateTotalWordCount(messages) },
    { name: 'counts', key: 'WORDS-DAILY', value: calculateTotalWordCount(dailyMessages) },
    { name: 'counts', key: 'WORDS-WEEKLY', value: calculateTotalWordCount(weeklyMessages) },
  ];
};
