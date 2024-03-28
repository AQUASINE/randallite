import {createStore} from "vuex";

const store = createStore({
    state: {
        generators: [],
        effects: []
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
        },
        async downloadGenerators({state}) {
            const csvContent = state.generators.map(generator => `${generator.name}, ${generator.weight}`).join("\n");
            const blob = new Blob([csvContent], {type: "text/csv"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "generators-" + Date.now() + ".csv";
            a.click();
        },
        async downloadEffects({state}) {
            const csvContent = state.effects.map(effect => `${effect.name}, ${effect.weight}`).join("\n");
            const blob = new Blob([csvContent], {type: "text/csv"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "effects-" + Date.now() + ".csv";
            a.click();
        }
    }
});

export default store;