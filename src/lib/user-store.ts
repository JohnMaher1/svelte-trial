import type { Subscriber } from "svelte/store";

const createSession = (accessToken: string) => {
    const subscribers = new Set<Subscriber<string>>();

    const subscribe = (subscriber: Subscriber<string>) => {
        subscribers.add(subscriber);
    };

    const update = (updater: (accessToken: string) => string) => {
        accessToken = updater(accessToken);
        subscribers.forEach((subscriber) => subscriber(accessToken));
    };

    return {
        subscribe,
        update,
    };
};

export const discordToken = createSession('');
