import 'reflect-metadata';
import * as request from 'request-promise-native'

export interface Channel {
    id: string;
    name: string;
    totalMessages: number;
    lastActionTimestamp: number;
}

export interface Message {
    [key: string]: any,
}

function callWithCatchError(
        target: CloudWSAPI,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<any>,
    ): TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value;
    descriptor.value = async function (
        this: CloudWSAPI,
    ) {
        try {
            return await originalMethod.apply(this, arguments);
        } catch (e) {
            if (e.error) {
                throw new ResponseError(e.error.name, e.error.message);
            }
            throw e;
        }
    };
    return descriptor;
}

export class ResponseError extends Error {
    info: string;
    constructor(name: string, info: string) {
        super(name);
        this.info = info;
    }

    toString() {
        return `${super.toString()}\nInfo: ${this.info}`;
    }
}

export default class CloudWSAPI {
    private cloudWSUrl = 'https://cloudws.io';
    token: string;
    constructor(token: string) {
        this.token = token;
    }

    @callWithCatchError
    async createChannel(channelName: string): Promise<Channel> {
        return request(`${this.cloudWSUrl}/api/channel`, {
            method: 'POST',
            json: true,
            headers: {
                token: this.token,
            },
            body: {
                name: channelName,
            }
        });
    }

    @callWithCatchError
    async getAllChannels(): Promise<Channel> {
        return request(`${this.cloudWSUrl}/api/channel`, {
            method: 'GET',
            json: true,
            headers: {
                token: this.token,
            },
        });
    }

    @callWithCatchError
    async sendMessage(channelName: string, message: Message): Promise<undefined> {
        return request(`${this.cloudWSUrl}/api/channel/${channelName}/message`, {
            method: 'POST',
            json: true,
            headers: {
                token: this.token,
            },
            body: message,
        });
    }

    @callWithCatchError
    async deleteChannel(channelName: string): Promise<undefined> {
        return request(`${this.cloudWSUrl}/api/channel/${channelName}`, {
            method: 'DELETE',
            json: true,
            headers: {
                token: this.token,
            },
        });
    }
}
