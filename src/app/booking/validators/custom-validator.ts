import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
  static ValidateName(control: AbstractControl) {
    const value = control.value as string;
    if (value.includes('test')) {
      return {
        invalidName: true,
      };
    }
    return null;
  }

  static ValidateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(char)) {
        return {
          invalidSpecialChar: true,
        };
      }
      return null;
    };
  }

  static ValidateDate(control: FormGroup) {
    const checkinDate: any = control.get('checkinDate')?.value;
    const checkoutDate: any = control.get('checkoutDate')?.value;


    const timeDiff = checkinDate - checkoutDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff > 0) {
      control.get('checkoutDate')?.setErrors({
        invalidDate: true,
      })
      return {
        invalidDate: true,
      }
    }
    return null;
  }
}
