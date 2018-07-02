import {
  isTermsAndConditions,
  isMarketingRelated,
  isOptOut,
  determineOperation,
} from '../src/index';

test('Should detect terms-and-conditions related terms', () => {
  expect(isTermsAndConditions('test-terms')).toBeTruthy;
  expect(isTermsAndConditions('test-policy')).toBeTruthy;
  expect(isTermsAndConditions('test-privacy')).toBeTruthy;
  expect(isTermsAndConditions('test-123')).toBeFalsy;
  expect(isTermsAndConditions(123)).toBeFalsy;
  expect(isTermsAndConditions(['terms'])).toBeFalsy;
});

test('Should detect marketing related terms', () => {
  expect(isMarketingRelated('test-marketing')).toBeTruthy;
  expect(isMarketingRelated('test-receive')).toBeTruthy;
  expect(isMarketingRelated('test-send me')).toBeTruthy;
  expect(isMarketingRelated('test-email')).toBeTruthy;
  expect(isMarketingRelated('test-sms')).toBeTruthy;
  expect(isMarketingRelated('test-news')).toBeTruthy;
  expect(isMarketingRelated('test-updates')).toBeTruthy;
  expect(isMarketingRelated('test-123')).toBeFalsy;
  expect(isMarketingRelated(123)).toBeFalsy;
  expect(isMarketingRelated(['terms'])).toBeFalsy;
});

test('Should detect opt-out related terms', () => {
  expect(isOptOut('do not')).toBeTruthy;
  expect(isOptOut('don\'t')).toBeTruthy;
  expect(isOptOut('test-123')).toBeFalsy;
  expect(isOptOut(123)).toBeFalsy;
  expect(isOptOut(['terms'])).toBeFalsy;
});

test('Should determine the operation type', () => {
  expect(determineOperation('test-terms')).toEqual({ action: 'checked', category: 'terms and conditions' });
  expect(determineOperation('test-terms-do not')).toEqual({ action: 'unchecked', category: 'terms and conditions' });
  expect(determineOperation('test-email')).toEqual({ action: 'unchecked', category: 'marketing' });
  expect(determineOperation('test-email-do not')).toEqual({ action: 'checked', category: 'marketing' });
  expect(determineOperation('test-123')).toEqual({ action: 'ignored', category: 'unrelated/unknown' });
  expect(determineOperation(123)).toBe(null);
  expect(determineOperation(['terms'])).toBe(null);
});
