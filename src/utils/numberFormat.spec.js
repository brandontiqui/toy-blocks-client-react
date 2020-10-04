import {getCurrencyFormattedNumber, isInt, scrubFormatting, getFormattedNumber, padLeadingZeroes} from './numberFormat';

describe('Number Formatter', () => {
  describe('getCurrencyFormattedNumber', () => {
    it('returns $5.50 when passed 5.5', () => {
      expect(getCurrencyFormattedNumber(5.5)).toEqual('$5.50');
    });
  });

  describe('isInt', () => {
    it('returns true when passed 0', () => {
      expect(isInt(0)).toEqual(true);
    });

    it('returns false when passed an empty string', () => {
      expect(isInt('')).toEqual(false);
    });

    it('returns true when passed int as a string', () => {
      expect(isInt('5')).toEqual(true);
    });
  });

  describe('scrubFormatting', () => {
    it('strips commas and decimals', () => {
      expect(scrubFormatting('1,234.56')).toEqual('123456');
    });
  });

  describe('getFormattedNumber', () => {
    it('returns 0 if passed 0', () => {
      expect(getFormattedNumber(0)).toEqual(0);
    });

    it('returns empty string if passed empty string', () => {
      expect(getFormattedNumber('')).toEqual('');
    });
  });

  describe('padLeadingZeroes', () => {
    it('returns 009 if passed 9', () => {
      expect(padLeadingZeroes(9)).toEqual('009');
    });

    it('returns 099 if passed 99', () => {
      expect(padLeadingZeroes(99)).toEqual('099');
    });

    it('returns 101 if passed 101', () => {
      expect(padLeadingZeroes(101)).toEqual('101');
    });
  });
});
