# Tally Store

This library provides an efficient way to create global counters that are automatically updated across all services.

For example, it could be used to show the number of a type of pet or car collected.

It makes use of [Skilift](https://alicesaidhi.github.io/skilift/) under the hood, which is a datastore library without session locking.

## Quick Start

```ts
type Pet = "dog" | "cat" | "rat";

type PetTally = { [P in Pet]?: number };

// create a tally store
const pets = new TallyStore<PetTally>(
	"PetTally",
	(data) => {
		// do something with the data, like showing in a pet index
	},
	{
		defaultData: {},
	},
);

// increment the amount of dogs collected by 1
pets.increment("dog", 1);
```

## 📦 Installation

[Take me to the NPM package →](https://www.npmjs.com/package/@rbxts/tally-store)

```bash
npm install @rbxts/tally-store
```

## 🪪 License

Tally Store is available under the MIT license. See the [LICENSE.md](LICENSE.md) file for more info.
