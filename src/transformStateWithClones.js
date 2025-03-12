'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };

  function transformState(initialState, action) {
    let transormedState = { ...initialState };

    if (action.type === 'addProperties') {
      transormedState = { ...transormedState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete transormedState[key]);
    } else if (action.type === 'clear') {
      return {};
    }

    return transormedState;
  }

  return actions.map((action) => {
    currentState = transformState(currentState, action);

    return currentState;
  });
}

module.exports = transformStateWithClones;
