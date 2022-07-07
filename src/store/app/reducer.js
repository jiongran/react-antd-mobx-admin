import { clone } from '@/utils';
import * as actionTypes from "./actionTypes";

const initApp = {
  a1:'a1',
  a2:{ a3:'a3' }
}

export default function reducer(state = initApp, action) {
  const { type, app } = action;
  switch (type) {
    case actionTypes.ADDAPP: {
        const _action = clone(app)
        delete _action.type
      return {...state, ..._action};
    }
    default: {
      return state;
    }
  }
}
