/*
 * Raw data
 * ********
 *
 * Here we do some fairly simple stuff; no combining multiple streams or
 * anything fancy, just take the raw data from the API annd return it
 *
 * We also support markers, which you can add by pressing keys
 *
 */
const Cortex = require("../lib/cortex");
var firebase = require("firebase");

var firebaseConfig = {
    apiKey: "AIzaSyBVDUsf-fbF4tLiUKjRgxkey_FggO8Hv4A",
    authDomain: "cerebrex-101.firebaseapp.com",
    databaseURL: "https://cerebrex-101.firebaseio.com",
    projectId: "cerebrex-101",
    storageBucket: "cerebrex-101.appspot.com",
    messagingSenderId: "110739418428"
};


firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function writeMETdata(METdata) {
    console.log(METdata[3]);
    firebase.database().ref('/met/str').set({
        eegdata: METdata[3]
    });
}

function writeEEGdata(EEGdata) {
    var array = EEGdata.slice(5, 19);
    //console.log(array.join());
    firebase.database().ref('/eeg').set({
        eegdata: array.join(",")
    });
}

function raw(client, oneegResult, onmetResult) {
    return client
        .createSession({status: "active"})
        .then(() => client.subscribe({streams: ["eeg", "met"]}))
        .then(subs => {
            if (!subs[0].eeg) throw new Error("failed to subscribe to raw eeg");
            if (!subs[1].met) throw new Error("failed to subscribe to met");

            const headers = subs[0].eeg.cols.slice();
            headers.unshift("seq", "time");
            headers.headers = true;
            const metheaders = subs[1].met.cols.slice();
            metheaders.unshift("seq", "time");
            metheaders.headers = true;


            let n = 0;
            const onEeg = data => {
                if (n === 0) oneegResult(headers);
                oneegResult([n, data.time].concat(data.eeg));
                n++;
            };
            let m = 0;
            const onMet = data => {
                if (m === 0) onmetResult(metheaders);
                onmetResult([m, data.time].concat(data.met));
                m++;
            };
            client.on("eeg", onEeg);
            client.on("met", onMet);

            return () =>
                client
                    .inspectApi()
                    .then(() => client.unsubscribe({streams: ["eeg", "met"]}))
                    .then(() => client.updateSession({status: "close"}))
                    .then(() => client.removeListener("eeg", onEeg))
                    .then(() => client.removeListener("met", onMet))
        });
}

if (require.main === module) {
    process.on("unhandledRejection", err => {
        throw err;
    });

    const readline = require("readline");
    const stdin = process.stdin;
    readline.emitKeypressEvents(stdin);
    if (stdin.isTTY) stdin.setRawMode(true);

    const verbose = process.env.LOG_LEVEL || 1;
    const options = {verbose};
    const client = new Cortex(options);
    // these values need to fill to run example
    const auth = {
        username: "prashanb",
        password: "Basti123",
        client_id: "BP9CKBpyiA0RbZqAXe7uEiDRju9m4N02e3KPWBlz",
        client_secret: "n8ymWHCgndLBSYbIn2XShGLyb6WIc8I6dBMVRb84ZFsOciVjX3KZWsgFSgPCmbkxfmMRlVtmk6NmmjjvO7H8FYvCLH4Wt3nQ2hXi4QTsO4YjSneJra6jGpTwxgPha1dx",
        debit: 1 // first time you run example debit should > 0
    };

    var dataArray = ["mehani"];
    dataArray.id = "dataArrayId";

    client.ready
        .then(() => client.init(auth))
        //.then(() => raw(client, rawData => writeEEGdata(rawData)))
        .then(() => raw(client, raweegData => writeEEGdata(raweegData), rawmetData => writeMETdata(rawmetData)))
        .then(finish => {
            console.warn(
                "Streaming raw data as CSV. Press any key to add a marker or escape to stop."
            );

            return new Promise(resolve => {
                stdin.on("keypress", (char, key) => {
                    const time = new Date();
                    const {ctrl, alt, meta, name} = key;
                    if (!ctrl && !alt && !meta && name.match(/^[a-z0-9]$/)) {
                        client
                            .injectMarker({label: "key", value: name, time})
                            .then(() => {
                                const ftime = `${time.toLocaleTimeString()}.${time.getMilliseconds()}`;
                                console.warn(`Added marker ${name} at time ${ftime}`);
                            });
                    } else if (name === "escape" || (ctrl && name === "c")) {
                        stdin.removeAllListeners("keypress");
                        stdin.pause();
                        resolve(finish());
                    }
                });
            });
        })
        .then(() => client.close())
        .then(() => {

            console.warn("Finished!");
        });
}

module.exports = raw;