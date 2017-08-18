import { HiveMindBuilder, IHiveMind } from '@oratio/oratio';
import { Injectable } from '@angular/core';
import { HelpNeuron } from './general/HelpNeuron';
import { WikipediaNeuron } from './general/WikipediaNeuron';

@Injectable()
export class AppHiveMind {

  private _mind: IHiveMind;

  constructor() {
    this._mind = HiveMindBuilder.createEmpty()
      .registerCoreModules()
      .registerMathModules()
      .registerMathJsModules()
      .register([new HelpNeuron(), new WikipediaNeuron()])
      .build();
  }

  get mind(): IHiveMind {
    return this._mind;
  }
}
