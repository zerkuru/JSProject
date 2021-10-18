const { capitalizeStr } = require('../script');

describe('Testing script.js', () => {
  describe('testing capitalizeStr() func', () => {
    it('should return Qwerty when arg is qWeRtY', () => {
      expect(capitalizeStr('qWeRtY')).toBe('Qwerty');
    });

    it('should return Qwerty Qwerty when arg is qWeRtY qWeRtY', () => {
      expect(capitalizeStr('qWeRtY qWeRtY')).toBe('Qwerty Qwerty');
    });

    it('should return Qwerty-Qwerty when arg is qWeRtY-qWeRtY', () => {
      expect(capitalizeStr('qWeRtY-qWeRtY')).toBe('Qwerty-Qwerty');
    });

    it('should return null if not arg', () => {
      expect(capitalizeStr()).toBeNull();
    })
  })
});