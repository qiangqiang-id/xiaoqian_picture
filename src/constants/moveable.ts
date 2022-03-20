export const DEFAULT_RENDER_DIRECTIONS = ['n', 'nw', 'ne', 's', 'se', 'sw', 'e', 'w'];

export const GROUP_RENDER_DIRECTIONS = ['nw', 'ne', 'sw', 'se'];

export const DIRECTIONS_ENUM = ((directions: any = {}) => {
  directions[(directions['nw'] = '-1,-1')] = 'nw';
  directions[(directions['n'] = '0,-1')] = 'n';
  directions[(directions['ne'] = '1,-1')] = 'ne';
  directions[(directions['e'] = '1,0')] = 'e';
  directions[(directions['se'] = '1,1')] = 'se';
  directions[(directions['s'] = '0,1')] = 's';
  directions[(directions['sw'] = '-1,1')] = 'sw';
  directions[(directions['w'] = '-1,0')] = 'w';
  return directions;
})();
