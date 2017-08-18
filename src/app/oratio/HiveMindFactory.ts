import { HiveMindBuilder, IHiveMind } from '@oratio/oratio';
import { Injectable } from '@angular/core';
import { HelpNeuron } from './general/HelpNeuron';
import { WikipediaNeuron } from './general/WikipediaNeuron';
import { EasterEggNeuron } from './general/EasterEggNeuron';
import { NavigationNeuron } from './general/NavigationNeuron';

@Injectable()
export class AppHiveMind {

  private _mind: IHiveMind;

  constructor(private navigationNeuron: NavigationNeuron) {
    this._mind = HiveMindBuilder.createEmpty()
      .registerCoreModules()
      .registerMathModules()
      .registerMathJsModules()
      .register([new HelpNeuron(), new WikipediaNeuron(), new EasterEggNeuron(), navigationNeuron])
      .build();
  }

  get mind(): IHiveMind {
    return this._mind;
  }
}
