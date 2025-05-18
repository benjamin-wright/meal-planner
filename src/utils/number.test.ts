import { describe, expect, it } from "vitest";
import { fixJSRounding } from "./number";

describe("number utils", () => {
  describe("fixJSRounding", () => {
    it("should return 0 for 0", () => {
      expect(fixJSRounding(0)).toBe(0);
    });

    it("should return the same number for positive numbers", () => {
      expect(fixJSRounding(1)).toBe(1);
      expect(fixJSRounding(123.456)).toBe(123.456);
    });

    it("should return the same number for negative numbers", () => {
      expect(fixJSRounding(-1)).toBe(-1);
      expect(fixJSRounding(-123.456)).toBe(-123.456);
    });

    it("should return the same number for very small numbers", () => {
      expect(fixJSRounding(0.0000001)).toBe(0.0000001);
      expect(fixJSRounding(-0.0000001)).toBe(-0.0000001);
    });

    it("should return the same number for very large numbers", () => {
      expect(fixJSRounding(1000000)).toBe(1000000);
      expect(fixJSRounding(1000000)).toBe(1000000);
    });

    it("should round down small significant digits", () => {
      expect(fixJSRounding(0.3000000000001)).toBe(0.3);
    });

    it("should round up small significant digits", () => {
      expect(fixJSRounding(0.09999999999999)).toBe(0.1);
    });

    it("should handle numbers with more than 10 decimal places", () => {
      const value = 0.123456789012345;
      expect(fixJSRounding(value)).toBeCloseTo(0.123456789012345, 16);
    });
  });
});