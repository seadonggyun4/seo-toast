// event/triggerEvent.ts

type TriggerOptions = {
  bubbles?: boolean;
  composed?: boolean;
  cancelable?: boolean;
  /**
   * payload를 이벤트 인스턴스에 부착하려면 사용.
   * (Event subclass로 생성되며 e.label / e.value / e.attach 로 접근)
   */
  attach?: unknown;
};

// 오버로드: payload 없는 경우
export function triggerEvent(
  el: Element,
  eventName: string
): Event;

// 오버로드: payload 있는 경우
export function triggerEvent<T = unknown>(
  el: Element,
  eventName: string,
  label: string,
  value?: T,
  options?: TriggerOptions
): Event;

/**
 * payload가 없으면 최소한의 비용으로 plain Event 사용.
 * payload가 있으면 Event subclass를 즉시 정의해서 type-safe한 payload를 부착.
 */
export function triggerEvent<T = unknown>(
  el: Element,
  eventName: string,
  label?: string,
  value?: T,
  options: TriggerOptions = {}
): Event {
  const { bubbles = true, composed = true, cancelable = false, attach } = options;

  // payload가 전혀 없으면 plain Event
  if (label === undefined && value === undefined && attach === undefined) {
    const ev = new Event(eventName, { bubbles, composed, cancelable });
    el.dispatchEvent(ev);
    return ev;
  }

  // exactOptionalPropertyTypes 대응:
  // 필드를 옵셔널(?)이 아닌 'T | undefined'로 선언하여 undefined 대입을 허용
  class PayloadEvent extends Event {
    static readonly eventName: string = eventName;
    readonly label: string | undefined;
    readonly value: T | undefined;
    readonly attach: unknown | undefined;

    constructor() {
      super(eventName, { bubbles, composed, cancelable });
      this.label = label;
      this.value = value;
      this.attach = attach;
    }
  }

  const ev = new PayloadEvent();
  el.dispatchEvent(ev);
  return ev;
}
