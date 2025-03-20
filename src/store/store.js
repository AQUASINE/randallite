import {createStore} from "vuex";

const store = createStore({
    state: {
        generators: [],
        effects: [],
        generatorWeights: {},
        effectWeights: {},
        numGenerators: 0,
        numEffects: 0,
        maxPoints: 100,
        websocket: null
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
        setGeneratorWeights(state, weights) {
            state.generatorWeights = weights;
        },
        setEffectWeights(state, weights) {
            state.effectWeights = weights;
        },
        setEffects(state, effects) {
            state.effects = effects;
        },
        updateGeneratorWeight(state, payload) {
            // find the generator with the given plugin name and update its weight
            const plugin = payload.name;
            const weight = payload.weight;
            state.generatorWeights[plugin] = weight;
        },
        updateEffectWeight(state, payload) {
            // find the effect with the given plugin name and update its weight
            const plugin = payload.name;
            const weight = payload.weight;
            state.effectWeights[plugin] = weight;
        },
        setNumGenerators(state, numGenerators) {
            state.numGenerators = numGenerators;
        },
        setNumEffects(state, numEffects) {
            state.numEffects = numEffects;
        },
        setMaxPoints(state, maxPoints) {
            state.maxPoints = maxPoints
        },
        setWebSocket(state, websocket) {
            state.websocket = websocket;
        }
    },
    actions: {
        async connectWebSocket({ commit, dispatch }) {
            const socket = new WebSocket("ws://localhost:8765");

            socket.onopen = () => {
                console.log("WebSocket connected.");
                commit("setWebSocket", socket);
            };

            socket.onmessage = (event) => {
                console.log("Received message from server: ", event.data);
                try {
                    const pluginData = JSON.parse(event.data);
                    if (pluginData["Effects.csv"]) {
                        store.dispatch("loadEffectsFromCSV", pluginData["Effects.csv"]);
                    }
                    if (pluginData["Generators.csv"]) {
                        store.dispatch("loadGeneratorsFromCSV", pluginData["Generators.csv"]);
                    }
                } catch (error) {
                    console.error("Error parsing WebSocket message:", error);
                }
            };

            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            socket.onclose = () => {
                console.warn("WebSocket closed. Reconnecting in 5 seconds...");
                setTimeout(() => {
                    store.dispatch("connectWebSocket");
                }, 5000);
            };
        },
        async loadGeneratorsFromCSV({commit}, csv) {
            console.log("Loading generators from CSV");
            const lines = csv.split("\n");
            const generators = csv.split("\n").map(line => {
                const [name, weight] = line.split(",");
                return name.trim();
            }).filter(node => node);

            const weights = {};
            lines.forEach(line => {
                const [name, weight] = line.split(",");
                weights[name.trim()] = weight ? parseFloat(weight) : 0.5;
            });

            console.log("Filtered generators:", generators);

            commit("setGenerators", generators);
            commit("setGeneratorWeights", weights);
        },
        async loadGeneratorsFromFile({commit}, file) {
            // user uploads a csv file with generator data. it will be of the form
            // name, weight
            // the weight is optional and will default to 0.5
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                store.dispatch("loadGeneratorsFromCSV", reader.result);
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
                store.dispatch("loadEffectsFromCSV", reader.result);
            };
            store.dispatch("saveToLocalStorage").then(() => {
                console.log("Saved to local storage");
            });
        },
        async loadEffectsFromCSV({commit}, csv) {
            console.log("Loading effects from CSV");
            const effects = csv.split("\n").map(line => {
                const [name, weight] = line.split(",");
                return name.trim();
            }).filter(node => node);

            const weights = {};
            csv.split("\n").forEach(line => {
                const [name, weight] = line.split(",");
                weights[name.trim()] = weight ? parseFloat(weight) : 0.5;
            });
            console.log("Filtered effects:", effects);

            commit("setEffects", effects);
            commit("setEffectWeights", weights);
        },
        async downloadGenerators({state}) {
            const csvContent = state.generators.map(generator => `${generator}, ${state.generatorWeights[generator]}`).join("\n");
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
            const csvContent = state.effects.map(effect => `${effect}, ${state.effectWeights[effect]}`).join("\n");
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
            localStorage.setItem("generatorWeights", JSON.stringify(state.generatorWeights));
            localStorage.setItem("effects", JSON.stringify(state.effects));
            localStorage.setItem("effectWeights", JSON.stringify(state.effectWeights));
            localStorage.setItem("numGenerators", state.numGenerators);
            localStorage.setItem("maxPoints", state.maxPoints);
            localStorage.setItem("numEffects", state.numEffects);
        },
        async loadFromLocalStorage({commit}) {
            const generators = JSON.parse(localStorage.getItem("generators")) || [];
            const effects = JSON.parse(localStorage.getItem("effects")) || [];
            const generatorWeights = JSON.parse(localStorage.getItem("generatorWeights")) || {};
            const effectWeights = JSON.parse(localStorage.getItem("effectWeights")) || {};
            const numGenerators = parseInt(localStorage.getItem("numGenerators")) || 0;
            const numEffects = parseInt(localStorage.getItem("numEffects")) || 0;
            const maxPoints = parseInt(localStorage.getItem("maxPoints")) || 100;
            commit("setGenerators", generators);
            commit("setEffects", effects);
            commit("setNumGenerators", numGenerators);
            commit("setNumEffects", numEffects);
            commit("setGeneratorWeights", generatorWeights);
            commit("setEffectWeights", effectWeights);
            commit("setMaxPoints", maxPoints);
        },
        async updateMaxPoints({commit}, maxPoints) {
            commit("setMaxPoints", maxPoints);
            localStorage.setItem("maxPoints", maxPoints);
        }
    }
});

setInterval(() => {
    store.dispatch("saveToLocalStorage").then(() => {
        console.log("Saved to local storage");
    });
}, 10000);

export default store;