import Skilift from "@rbxts/skilift";

/**
 * Increments the value of a specific key in the given data object by a specified amount.
 *
 * @template T - A type that extends an object with string keys and number values.
 * @param data - The data object containing the key-value pairs.
 * @param params - A tuple containing the key (id) and the amount to increment.
 * @returns A new data object with the updated value for the specified key.
 */
const increment = <T extends { [id: string]: number }>(data: T, params: [id: string, amount: number]) => {
	const [id, amount] = params;

	const newData = { ...data, [id]: (data[id] ?? 0) + amount };

	return newData;
};

/**
 * A class that manages a tally store, which is a key-value store where the values are numbers.
 *
 * @template T - A type that extends an object with string keys and number values.
 */
class TallyStore<T extends Record<string, number>> {
	private store;
	private session;

	/**
	 * Creates an instance of TallyStore.
	 *
	 * @param name - The name of the store.
	 * @param updated - A callback function that is called when the data is updated.
	 * @param options - An object containing the default data and optional pull delay.
	 * @param options.defaultData - The default data for the store.
	 * @param options.pullDelay - The delay in seconds between data pulls (default is 1 hour).
	 */
	constructor(
		name: string,
		updated: (data: T) => void,
		{
			defaultData,
			pullDelay = 60 * 60,
		}: {
			defaultData: T;
			pullDelay?: number;
		},
	) {
		this.store = Skilift.store<T>({
			name,
			default_data: () => defaultData,
			migrations: [],
			pull_delay: pullDelay, // 1 hour
		});

		this.session = this.store.load("default_key");

		this.session.updated(updated);

		Skilift.action.normal(increment<T>);
	}

	/**
	 * Increments the value of the specified key by the given amount.
	 *
	 * @param id - The key whose value is to be incremented.
	 * @param amount - The amount by which to increment the value.
	 */
	public increment(id: string, amount: number) {
		this.session.patch(increment<T>, [id, amount]);
	}

	/**
	 * Stops the session and saves the last data stored.
	 */
	public stop() {
		this.session.stop();
	}
}

export default TallyStore