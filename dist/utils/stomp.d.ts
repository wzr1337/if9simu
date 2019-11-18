export interface IHeaders {
    [header: string]: string;
}
export declare type TCommand = "CONNECT" | "DISCONNECT" | "SUBSCRIBE" | "SEND" | "MESSAGE" | "ACK";
export interface IStompFrame {
    command: TCommand;
    headers: IHeaders;
    body?: any;
}
export declare class StompFrame {
    static version: string;
    /**
     * Creates a STOMP frame from JavaScript Object
     *
     * @static
     * @param {IStompFrame} obj the message in object form
     * @returns {string} the message frame
     * @memberof StompFrame
     */
    static toFrame(obj: IStompFrame): string;
    /**
     * Creates an object from STOMP message fram
     *
     * @static
     * @param {string} frame the input frame received via the socket
     * @returns {IStompFrame} the STOMP message as a javascript object
     * @memberof StompFrame
     */
    static fromFrame(frame: string): IStompFrame;
}
