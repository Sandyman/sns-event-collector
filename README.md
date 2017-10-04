# SNS Event Collector

This package works in conjunction with evanderkoogh's `event-collector`, but was developed separately. 

The function takes as parameter a Topic ARN for SNS, and returns a function that accepts an event-collector and an optional callback function.

### Example

```javascript
const eventCollector = require('event-collector');
const snsEventCollector = require('sns-event-collector')(process.env.TOPIC_ARN);

snsEventCollector(eventCollector, () => {});
```


