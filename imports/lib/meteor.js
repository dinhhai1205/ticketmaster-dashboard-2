import { Meteor } from 'meteor/meteor';

/**
 * @name A wrapped Meteor.call with Promise, use for Sagas purpose
 * @param methodName
 * @param args
 * @return {Promise<unknown>}
 */
export const call = (methodName, args = {}) => (
  new Promise((resolve, reject) => {
    Meteor.call(methodName, { ...args }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
);

export const subscribe = (methodName, ...args) => (
  new Promise((resolve, reject) => {
    const sub = Meteor.subscribe(methodName, ...args, {
      onReady() {
        resolve(sub);
      },
      onError(err) {
        reject(err);
      },
    });
  })
);