import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

export interface DressColorsStateModel {
  colors: string[];
  loading: boolean;
}

export class AddColor {
  static readonly type = 'Add Color';
  constructor(public payload: string) {}
}

export class RemoveColor {
  static readonly type = 'Remove Color';
  constructor(public payload: string) {}
}

@State<DressColorsStateModel>({
  name: 'dressColors',
  defaults: {
    colors: ['IVORY', 'WHITE'],
    loading: false
  }
})
export class DressColorsState {
  constructor(private store: Store) {
  }

  @Selector()
  static getAllColors(state: DressColorsStateModel) {
    return state.colors;
  }

  @Selector()
  static isLoading(state: DressColorsStateModel) {
    return state.loading;
  }

  @Action(AddColor)
  addColor({getState, setState}: StateContext<DressColorsStateModel>, {payload}: AddColor) {
    const state = getState();
    const newColor = payload.toUpperCase();

    if (!newColor || state.colors.includes(newColor)) {
      return;
    }

    setState({
      colors: [...state.colors, newColor],
      loading: false
    });
  }

  @Action(RemoveColor)
  removeColor({getState, setState}: StateContext<DressColorsStateModel>, {payload}: RemoveColor) {
    const state = getState();
    setState({
      colors: state.colors.filter(name => name !== payload),
      loading: false
    });
  }
}
