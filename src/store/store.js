import {createStore} from "vuex";

const store = createStore({
    state: {
        generators: [],
        effects: [],
        numGenerators: 0,
        numEffects: 0
    },
    mutations: {
        addGenerator(state, generator) {
            state.generators.push(generator);
        },
        addEffect(state, effect) {
            state.effects.push(effect);
        },
        setGenerators(state, generators) {
            state.generators = generators;
        },
        setEffects(state, effects) {
            state.effects = effects;
        },
        updateGeneratorWeight(state, payload) {
            // find the generator with the given plugin name and update its weight
            const plugin = payload.name;
            const weight = payload.weight;
            const generator = state.generators.find(generator => generator.name === plugin);
            generator.weight = weight;
        },
        updateEffectWeight(state, payload) {
            // find the effect with the given plugin name and update its weight
            const plugin = payload.name;
            const weight = payload.weight;
            const effect = state.effects.find(effect => effect.name === plugin);
            effect.weight = weight;
        },
        setNumGenerators(state, numGenerators) {
            state.numGenerators = numGenerators;
        },
        setNumEffects(state, numEffects) {
            state.numEffects = numEffects;
        }
    },
    actions: {
        async loadGeneratorsFromFile({commit}, file) {
            // user uploads a csv file with generator data. it will be of the form
            // name, weight
            // the weight is optional and will default to 0.5
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                const generators = reader.result.split("\n").map(line => {
                    const [name, weight] = line.split(",");
                    return {
                        name: name.trim(),
                        weight: weight ? parseFloat(weight) : 0.5
                    };
                });
                const filteredGenerators = generators.filter(node => node.name);
                commit("setGenerators", filteredGenerators);
            };
            store.dispatch("saveToLocalStorage").then(() => {
                console.log("Saved to local storage");
            });
        },
        async loadEffectsFromFile({commit}, file) {
            // user uploads a csv file with effect data. it will be of the form
            // name, weight
            // the weight is optional and will default to 0.5
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                const effects = reader.result.split("\n").map(line => {
                    const [name, weight] = line.split(",");
                    return {
                        name: name.trim(),
                        weight: weight ? parseFloat(weight) : 0.5
                    };
                });
                const filteredEffects = effects.filter(node => node.name);
                commit("setEffects", filteredEffects);
            };
            store.dispatch("saveToLocalStorage").then(() => {
                console.log("Saved to local storage");
            });
        },
        async downloadGenerators({state}) {
            const csvContent = state.generators.map(generator => `${generator.name}, ${generator.weight}`).join("\n");
            const blob = new Blob([csvContent], {type: "text/csv"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            // get just the date, no time
            const dateString = new Date().toISOString().split("T")[0].replace(/:/g, "-");
            a.download = "generators-" + dateString + ".csv";
            a.click();
        },
        async downloadEffects({state}) {
            const csvContent = state.effects.map(effect => `${effect.name}, ${effect.weight}`).join("\n");
            const blob = new Blob([csvContent], {type: "text/csv"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const dateString = new Date().toISOString().split("T")[0].replace(/:/g, "-");
            a.download = "effects-" + dateString + ".csv";
            a.click();
        },
        async saveToLocalStorage({state}) {
            localStorage.setItem("generators", JSON.stringify(state.generators));
            localStorage.setItem("effects", JSON.stringify(state.effects));
            localStorage.setItem("numGenerators", state.numGenerators);
            localStorage.setItem("numEffects", state.numEffects);
        },
        async loadFromLocalStorage({commit}) {
            const generators = JSON.parse(localStorage.getItem("generators")) || [];
            const effects = JSON.parse(localStorage.getItem("effects")) || [];
            const numGenerators = parseInt(localStorage.getItem("numGenerators")) || 0;
            const numEffects = parseInt(localStorage.getItem("numEffects")) || 0;
            commit("setGenerators", generators);
            commit("setEffects", effects);
            commit("setNumGenerators", numGenerators);
            commit("setNumEffects", numEffects);
        }
    }
});

setInterval(() => {
    store.dispatch("saveToLocalStorage").then(() => {
        console.log("Saved to local storage");
    });
}, 1000);

export default store;