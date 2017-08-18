import { Injectable } from '@angular/core';
import { oratioTranslations } from './Translations';

const placeholderRegExp: RegExp = /\{[^}]*}/g;

@Injectable()
export class I18nService {

  public translate(key: string, params?: (string | number)[] | Object): string {
    if (oratioTranslations[key]) {
      const value: string = oratioTranslations[key];
      return this.replaceParameters(value, params);
    }
    return key;
  }

  private replaceParameters(value: string, params: (string | number)[] | Object = {}): string {
    return value.replace(placeholderRegExp, function (placeholder: string) {
      const key: string = placeholder.slice(1, -1);
      return key in params ? params[key] : placeholder;
    });
  }
}
