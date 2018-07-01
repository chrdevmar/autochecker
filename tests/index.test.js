import {
  isTermsAndConditions,
  isMarketingRelated,
} from '../src/index';

test('Detect terms and conditions', () => {
  expect(isTermsAndConditions('test-terms')).toBeTruthy;
  expect(isTermsAndConditions('test-policy')).toBeTruthy;
  expect(isTermsAndConditions('test-privacy')).toBeTruthy;
  expect(isTermsAndConditions('test-123')).toBeFalsy;
  expect(isTermsAndConditions(123)).toBeFalsy;
  expect(isTermsAndConditions(['terms'])).toBeFalsy;
});

test('Detect marketing related terms', () => {
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
