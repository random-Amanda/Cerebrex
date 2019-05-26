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
    apiKey: "AIzaSyAxQ7xo6_YDwYLYHqjSgy4kVhcchM_25TM",
    authDomain: "cerebrex-c0a9a.firebaseapp.com",
    databaseURL: "https://cerebrex-c0a9a.firebaseio.com",
    projectId: "cerebrex-c0a9a",
    storageBucket: "cerebrex-c0a9a.appspot.com",
    messagingSenderId: "581559446579"
};


firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function writemetdata(metdata) {

    // for (var j=0; j <=metdata.length-1;j++){
    //     var index=[0,1,2,3,4,7,11,12,19,20]
    //     metdata[j].splice(21,15);
    //     for (var i=index.length-1; i >=0;i--){
    //         metdata[j].splice(index[i],1);
    //     }
    //     metdata[j].join(",");
    // }

    firebase.database().ref('/met').set({
        metdata: metdata[2]
    });

}

function raw(client, onResult) {
    return client
        .createSession({status: "active"})
        .then(() => client.subscribe({streams: ["met"]}))
        .then(subs => {
            if (!subs[0].met) throw new Error("failed to subscribe");

            const headers = subs[0].met.cols.slice();
            headers.unshift("seq", "time");
            headers.headers = true;

            let n = 0;
            const onmet = data => {
                if (n === 0) onResult(headers);
                onResult([n, data.time].concat(data.met));
                n++;
            };
            client.on("met", onmet);

            return () =>
                client
                    .inspectApi()
                    .then(() => client.unsubscribe({streams: ["met"]}))
                    .then(() => client.updateSession({status: "close"}))
                    .then(() => client.removeListener("met", onmet))
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
        .then(() => raw(client, rawData => console.log(rawData)))
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
            console.log(dataArray);
        });
}

module.exports = raw;