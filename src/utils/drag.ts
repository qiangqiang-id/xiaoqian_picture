/**
 * 传输参数
 * */
export interface IDragExecutor {
  init?: (oldEvent: MouseEvent) => void;
  move?: (newEvent: MouseEvent) => void;
  end?: (e: MouseEvent) => void;
}

/**
 * 封装drag事件
 **/
export const dragAction = (oldEvent: MouseEvent, executors: IDragExecutor) => {
  executors.init && executors.init(oldEvent);

  const startMove = (newEvent: MouseEvent) => {
    executors.move && executors.move(newEvent);
  };

  const endMove = (e: MouseEvent) => {
    executors.end && executors.end(e);
    document.removeEventListener('mousemove', startMove);
    document.removeEventListener('mouseup', endMove);
  };

  document.addEventListener('mousemove', startMove);
  document.addEventListener('mouseup', endMove);
};
