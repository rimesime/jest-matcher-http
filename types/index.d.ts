export {};

declare global {
    namespace jest {
        interface Matchers<R> {
            toReturnHttpCode(status: number): R;
            toReturnHttpHeader(headerField: string, headerValue: string): R;
        }
    }
}
