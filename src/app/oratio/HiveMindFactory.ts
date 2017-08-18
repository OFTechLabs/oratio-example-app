import { HiveMindBuilder, IHiveMind } from '@oratio/oratio';
import { Injectable } from '@angular/core';

@Injectable()
export class AppHiveMind {

  private _mind: IHiveMind;

  constructor() {
    this._mind = HiveMindBuilder.createEmpty()
      .registerCoreModules()
      .registerMathModules()
      .registerMathJsModules()
      .build();
  }

  get mind(): IHiveMind {
    return this._mind;
  }
}
