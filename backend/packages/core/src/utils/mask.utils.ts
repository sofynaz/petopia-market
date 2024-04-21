class Mask {
  /**
   * add mask between in start and end, like +9XXXXXXXXX58, ai******51@gmail.com
   */
  private addMask(value: string, start: number, end: number, mask: string) {
    end = Math.abs(end);
    start = Math.abs(start);

    const maskLength = value.length - start - end;
    return value.slice(0, start) + mask.repeat(maskLength) + value.slice(-end);
  }

  /**
   * you can hide some part of phone, like +9XXXXXXXXX58
   */
  phoneMask(value: string): string {
    return this.addMask(value, 3, 4, 'X');
  }

  /**
   * you can hide some part of email, like ai******51@gmail.com
   */
  emailMask(value: string) {
    return this.addMask(value, 2, 12, '*');
  }
}

export const mask = new Mask();
