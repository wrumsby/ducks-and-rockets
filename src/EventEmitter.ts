export type CallbackFn<T> = (payload: T) => void;

export interface EventEmitter<T> {
    on: (event: string, callback: CallbackFn<T>) => void;
    fire: (event: string) => void;
}