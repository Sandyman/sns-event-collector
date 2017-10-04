const AWS = require('aws-sdk');

const sns = new AWS.SNS();

/**
 * Takes an SNS topic ARN as parameter, and returns a function that
 * takes an eventCollector and a callback function as parameters.
 * @param topicArn
 */
const createLogger = (topicArn) => {
    if (!topicArn) {
        console.log('Warning! No SNS topic ARN provided.');
        return (eventCollector, callback) => {
            if (callback) return callback(null, 'OK');
        }
    }

    return (eventCollector, callback) => {
        const params = {
            Message: JSON.stringify(eventCollector.getEvent()),
            TopicArn: topicArn,
        };
        // eslint-disable-next-line consistent-return
        return sns.publish(params, err => {
            if (err) console.log(`Oops. Something went wrong:\n${err}`);

            if (callback) return callback(null, 'OK');
        });
    };
};

module.exports = createLogger;
