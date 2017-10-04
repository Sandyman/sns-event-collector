const AWS = require('aws-sdk');

const sns = new AWS.SNS();

/**
 * Takes an SNS topic ARN as parameter, and returns a function that
 * takes an eventCollector and a callback function as parameters.
 * @param topicArn
 */
const createLogger = (topicArn) => (eventCollector, callback) => {
    const msg = eventCollector.getEvent();

    // Fail silently when no ARN is configured
    if (!topicArn) {
        console.log('No LOG_TOPIC_ARN defined');
        return callback(null, 'OK');
    }

    const params = {
        Message: JSON.stringify(msg),
        TopicArn: topicArn,
    };
    // eslint-disable-next-line consistent-return
    return sns.publish(params, err => {
        if (err) console.log(`Oops. Something went wrong:\n${err}`);

        if (callback) return callback(null, 'OK');
    });
};

module.exports = createLogger;
