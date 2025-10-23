const {
  getTimestamp,
  post_options,
  get_options,
  image_options,
  iridium_options,
  md5
} = require('../utils');
const crypto = require('crypto');

describe('utils.js functions', () => {
  test('getTimestamp should convert hh:mm:ss to total seconds', () => {
    expect(getTimestamp('00:00:00')).toBe(0);
    expect(getTimestamp('00:01:00')).toBe(60);
    expect(getTimestamp('01:00:00')).toBe(3600);
    expect(getTimestamp('01:01:01')).toBe(3661);
  });

  test('post_options should return proper URL and method', () => {
    const opts = post_options('foo?', { key: 'value' });
    expect(opts.method).toBe('POST');
    expect(opts.url).toMatch(/^https:\/\/www\.heavens-above\.com\/foo\?/);
    expect(opts.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
  });

  test('get_options should return proper GET options', () => {
    const opts = get_options('bar?');
    expect(opts.method).toBe('GET');
    expect(opts.url).toMatch(/^https:\/\/www\.heavens-above\.com\/bar\?/);
  });

  test('image_options should use GET and return target url', () => {
    const target = 'https://www.heavens-above.com/someimage.jpg';
    const opts = image_options(target);
    expect(opts.method).toBe('GET');
    expect(opts.url).toBe(target);
  });

  test('iridium_options should use GET and contain required headers', () => {
    const target = 'https://www.heavens-above.com/iridium';
    const opts = iridium_options(target);
    expect(opts.method).toBe('GET');
    expect(opts.headers['User-Agent']).toMatch(/Mozilla/);
  });

  test('md5 should produce correct hash', () => {
    const expected = crypto.createHash('md5').update('abc').digest('hex');
    expect(md5('abc')).toBe(expected);
  });
});
