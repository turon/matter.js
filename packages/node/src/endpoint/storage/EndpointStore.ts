import { Val } from "#behavior/state/Val.js";
import { Datasource } from "#behavior/state/managed/Datasource.js";
import { Endpoint } from "#endpoint/Endpoint.js";
import { DatasourceStore } from "#endpoint/storage/DatasourceStore.js";
import { Construction, ImplementationError, StorageContext, SupportedStorageTypes } from "#general";

const NUMBER_KEY = "__number__";

/**
 * Persistence backing for an {@link Endpoint}.
 *
 * This is the API {@link Endpoint} uses for reading and writing non-volatile values.
 */
export class EndpointStore {
    #storage: StorageContext;
    #initialValues = {} as Record<string, Val.Struct>;
    #number: number | undefined;
    #construction: Construction<EndpointStore>;

    #childStorage: StorageContext;
    #childStores = {} as Record<string, EndpointStore>;

    #knownBehaviors = new Set<string>();

    /**
     * Description used in diagnostic messages.
     */
    toString() {
        return `storage:${this.#storage.thisContexts.join(".")}`;
    }

    get construction() {
        return this.#construction;
    }

    /**
     * Currently persisted values, keyed by {@link Behavior.id} then property name.
     */
    get initialValues() {
        return this.#initialValues;
    }

    get number() {
        this.#construction.assert();

        return this.#number;
    }

    set number(number: number | undefined) {
        this.#construction.assert();

        if (this.#number !== number) {
            this.#number = number;
        }
    }

    constructor(storage: StorageContext, load = true) {
        this.#storage = storage;
        this.#childStorage = storage.createContext("parts");

        this.#construction = Construction(this, () => {
            // Load is false when the store was not pre-loaded, which means it does not yet exist on disk and we can
            // avoid async I/O
            if (!load) {
                return;
            }

            return this.#load();
        });
    }

    async #load() {
        this.#knownBehaviors = new Set(await this.#storage.contexts());

        for (const behaviorId of this.#knownBehaviors) {
            const behaviorValues = (this.#initialValues[behaviorId] = {} as Val.Struct);
            const behaviorStorage = this.#storage.createContext(behaviorId);

            for (const key of await behaviorStorage.keys()) {
                behaviorValues[key] = await behaviorStorage.get(key);
            }
        }

        const number = await this.#storage.get(NUMBER_KEY, -1);
        if (number !== -1) {
            this.#number = number;
        }

        await this.#loadSubparts();
    }

    /**
     * Obtain a {@link Datasource.Store} for a behavior.
     */
    storeForBehavior(behaviorId: string): Datasource.Store {
        this.#construction.assert();

        return DatasourceStore(this, behaviorId);
    }

    childStoreFor(endpoint: Endpoint): EndpointStore {
        if (!endpoint.lifecycle.hasId) {
            throw new ImplementationError("Cannot access endpoint storage because endpoint has no assigned ID");
        }
        return this.#storeForPartId(endpoint.id);
    }

    #storeForPartId(partId: string) {
        this.#construction.assert();

        let store = this.#childStores[partId];
        if (store === undefined) {
            store = this.#childStores[partId] = new EndpointStore(this.#childStorage.createContext(partId), false);
        }

        return store;
    }

    async saveNumber() {
        await this.#construction;

        await this.#storage.set(NUMBER_KEY, this.number);
    }

    /**
     * Patch values.  Keyed by {@link Behavior.id} then property name.
     *
     * See {@link Datasource.Store.set} for the patch semantics the individual structs use.
     */
    async set(values: Record<string, undefined | Val.Struct>) {
        await this.#construction;

        for (const behaviorId in values) {
            const behaviorValues = values[behaviorId];
            const behaviorStorage = this.#storage.createContext(behaviorId);

            if (behaviorValues === undefined) {
                if (this.#knownBehaviors.has(behaviorId)) {
                    await behaviorStorage.clearAll();
                    this.#knownBehaviors.delete(behaviorId);
                }
                continue;
            }

            if (!this.#knownBehaviors.has(behaviorId)) {
                this.#knownBehaviors.add(behaviorId);
            }

            for (const key in behaviorValues) {
                const value = behaviorValues[key];
                if (value === undefined) {
                    await behaviorStorage.delete(key);
                } else {
                    await behaviorStorage.set(key, behaviorValues[key] as SupportedStorageTypes);
                }
            }
        }
    }

    /**
     * Remove all persisted information for the {@link Endpoint}
     */
    async delete() {
        await this.#construction;

        await this.#storage.clearAll();
    }

    async #loadSubparts() {
        const knownParts = await this.#childStorage.contexts();
        for (const partId of knownParts) {
            await this.#loadKnownChildStores(partId);
        }
    }

    async #loadKnownChildStores(partId: string) {
        const endpointStore = new EndpointStore(this.#childStorage.createContext(partId));
        this.#childStores[partId] = endpointStore;
        await endpointStore.construction;
    }
}