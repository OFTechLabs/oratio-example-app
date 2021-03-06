import { CoreHiveMindModule, HiveMindBuilder, IHiveMind, MathHiveMindModule } from '@oratio/oratio';
import { Injectable } from '@angular/core';
import { HelpNeuron } from './general/HelpNeuron';
import { WikipediaNeuron } from './general/WikipediaNeuron';
import { EasterEggNeuron } from './general/EasterEggNeuron';
import { NavigationNeuron } from './general/NavigationNeuron';
import { ToggleCheckboxNeuron } from './general/ToggleCheckboxNeuron';
import { ClearNeuron } from './general/ClearNeuron';

@Injectable()
export class AppHiveMind {

  private _mind: IHiveMind;

  constructor(private navigationNeuron: NavigationNeuron, private toggleCheckboxNeuron: ToggleCheckboxNeuron, clearNeuron: ClearNeuron) {
    this._mind = HiveMindBuilder.createEmpty()
      .registerModule(CoreHiveMindModule.CORE_HIVE_MIND_MODULE)
      .registerModule(MathHiveMindModule.MATH_HIVE_MIND_MODULE)
      .registerNeurons([
        new HelpNeuron(),
        new WikipediaNeuron(),
        new EasterEggNeuron(),
        navigationNeuron,
        toggleCheckboxNeuron,
        clearNeuron
      ])
      .build();
  }

  get mind(): IHiveMind {
    return this._mind;
  }
}
