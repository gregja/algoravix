myBeatBox = function () {
    "use strict";
    var instruments = [];
    var rythmSounds = {};
    var bankSounds = {};
    var mute_all = true;
    var beatboxes = [];
    var start_seq = 4;

    // Sounds downloaded from the project : https://github.com/tidalcycles/Dirt-Samples
    //var path_sounds = '../sounds/';
    var path_sounds = {
        tidal: 'sounds/dirtsamples/', //  'https://cdn.rawgit.com/tidalcycles/Dirt-Samples/a7f0b277/',
        pipe: 'sounds/pipesounds/'
    };
    // if you don't want to download sound files locally, you can use this path :
    //  var path_sounds = "https://cdn.rawgit.com/tidalcycles/Dirt-Samples/a7f0b277/"

    var con = new (window.AudioContext || window.webkitAudioContext)();

    var step = -1;
    var interval = 0.125;
    var tempo = 180; // BPM (beats per minute)
    var quarterNoteTime = 60 / tempo; // 0.5
    var alarm_clock = false;  // réveil

    var liste = String(`pipe_beg_01.wav
pipe_choir_02.wav
pipe_choir_03.wav
pipe_choir_04.wav
pipe_disto_01.wav
pipe_disto_05.wav
pipe_o01.wav
pipe_o02.wav
pipe_percu04.wav
pipe_percu05.wav
pipe_voice04.wav
pipe_weird02.wav
pipe_weird05.wav`).split("\n");
console.log(liste);

    function dataBank() {
        var sounds = [];
        // sounds from the project : https://github.com/tidalcycles/Dirt-Samples
        sounds.push({name:'snare', seq4:'0,1,0,.5', seq8:'0,1,0,1,0,1,0,0.5', mute:'off', file:'808/CH.WAV', origin:"tidal"});
        sounds.push({name:'clap', seq4:'0,0,0.5,0', seq8:'1,0,0,0,0,0,0.2,0', mute:'off', file:'808/CP.WAV', origin:"tidal"});
        sounds.push({name:'jvbass-1', seq4:'1,0,0.1,0', seq8:'1,0,0,.1,0,0,0,0', mute:'off', file:'jvbass/001_02.wav', origin:"tidal"});
        sounds.push({name:'jvbass-2', seq4:'0,1,0,0', seq8:'0,1,0,0,0,.5,0,0', mute:'off', file:'jvbass/002_03.wav', origin:"tidal"});
        sounds.push({name:'jvbass-3', seq4:'0,0,1,0', seq8:'0,0,1,1,0,0,0,0', mute:'off', file:'jvbass/003_04.wav', origin:"tidal"});
        sounds.push({name:'jvbass-4', seq4:'0,0,0,1', seq8:'.5,0,0,1,0,0,0,0', mute:'off', file:'jvbass/004_05.wav', origin:"tidal"});
        sounds.push({name:'jvbass-5', seq4:'0,0,0,0', seq8:'0,1,0,0.5,0,0,1,0', mute:'off', file:'jvbass/005_06.wav', origin:"tidal"});
        sounds.push({name:'jvbass-6', seq4:'0,0,0,0', seq8:'0.1,0,1,0.5,0,0,0,0.5', mute:'off', file:'jvbass/006_07.wav', origin:"tidal"});
        sounds.push({name:'jvbass-7', seq4:'0,0,0,0', seq8:'0,0,0,0,0,0,0,0', mute:'off', file:'jvbass/007_08.wav', origin:"tidal"});
        sounds.push({name:'jvbass-8', seq4:'0,0,0,0', seq8:'0,0,0,0,0,0,0,0', mute:'off', file:'jvbass/008_09.wav', origin:"tidal"});
        sounds.push({name:'jvbass-9', seq4:'0,0,0,0', seq8:'0,0,0,0,0,0,0,0', mute:'off', file:'jvbass/009_10.wav', origin:"tidal"});
        sounds.push({name:'jvbass-10', seq4:'0,0,0,0', seq8:'0,0,0,0,0,0,0,0', mute:'off', file:'jvbass/010_11.wav', origin:"tidal"});
        // sounds from the project : https://github.com/gregja/sounds4creativeProjects
        /*
        sounds.push({name:'pipe_weird02', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'pipe_weird02.wav', origin:"pipe"});
        sounds.push({name:'pipe_weird03', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'pipe_weird03.wav', origin:"pipe"});
        sounds.push({name:'pipe_weird04', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'pipe_weird04.wav', origin:"pipe"});
        sounds.push({name:'pipe_weird05', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'pipe_weird05.wav', origin:"pipe"});
        sounds.push({name:'pipe_weird06', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'pipe_weird06.wav', origin:"pipe"});
        sounds.push({name:'pipe_voice01', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'pipe_voice01.wav', origin:"pipe"});
        sounds.push({name:'pipe_voice02', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'pipe_voice02.wav', origin:"pipe"});
        sounds.push({name:'pipe_voice03', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'pipe_voice03.wav', origin:"pipe"});
        sounds.push({name:'pipe_voice04', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'pipe_voice04.wav', origin:"pipe"});
*/
        liste.forEach(item => {
            sounds.push({name:item, seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:item, origin:"pipe"});
        })

        return sounds;
    }

    function initSounds(datas, type_seq=4) {
        var mute_area = "<label>Mute <input type=\"checkbox\" data-beatbox-muteall /></label><br><br>";

        var beatbox_div = document.getElementById('beatbox');
        beatbox_div.innerHTML = mute_area;

        var mute_value, tmp_seq;
        for (let xi=0, ximax=datas.length; xi<ximax ; xi++) {
            let item = datas[xi];
            if (item.mute == 'on') {
                mute_value = '';
            } else {
                mute_value = 'checked';
            }
            if (type_seq == 8) {
                tmp_seq = item.seq8;
            } else {
                tmp_seq = item.seq4;
            }
            var tpl_instrument = `<label>
            <textarea
                data-beatbox-instr="${item.name}"
                data-beatbox-sound="${item.file}"
                data-beatbox-mute="${item.mute}"
                data-beatbox-origin="${item.origin}"
                >${tmp_seq}</textarea>&nbsp;&nbsp;${item.name}
        </label>&nbsp;<input type="checkbox" data-beatbox-mutetoggle="${item.name}" ${mute_value}>
        <br>`;
            beatbox_div.innerHTML += tpl_instrument;
        }
    }

    function prepareBeatbox() {
        var toggle_checkbox = document.querySelector('[data-beatbox-muteall]');
        if (toggle_checkbox == undefined) {
            console.warn('toggle checkbox not found');
        } else {
            if (mute_all) {
                toggle_checkbox.checked = true;
            }
            toggle_checkbox.addEventListener('change', (evt)=>{
                evt.preventDefault();
                mute_all = !mute_all;
            }, false)
        }

        beatboxes = document.querySelectorAll('[data-beatbox-instr]');
        for (let i=0, imax=beatboxes.length; i<imax ; i++) {
            let item = beatboxes[i];
            item.addEventListener('keyup', updateInstrument, false);

            let soundname =  item.getAttribute('data-beatbox-instr');

            instruments.push(soundname);

            if (item.getAttribute('data-beatbox-mute') == 'off') {
                rythmSounds[soundname] = item.value.split(',');
            } else {
                rythmSounds[soundname] = [];
            }

            let tmpsound = item.getAttribute('data-beatbox-sound');
            let path = path_sounds[item.getAttribute('data-beatbox-origin')];
            let soundfile = path+tmpsound;

            loadSample(soundfile, soundname, function (buffer){});
        }

        var togglemutes = document.querySelectorAll('[data-beatbox-mutetoggle]');
        for (let i=0, imax=togglemutes.length; i<imax ; i++) {
            togglemutes[i].addEventListener('change', muteInstrument, false);
        }
    }

    function loadSample(url, soundname, callback){
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function(){
            let audioData = request.response;
            con.decodeAudioData(audioData, function(buffer) {
                bankSounds[soundname] = buffer;
                //console.log('load ', soundname);
            });
        };
        request.send();
    }

    function updateInstrument(evt) {
        evt.preventDefault();
        if (this.dataset['beatboxMute'] == 'off') {
            let item = this.dataset['beatboxInstr'];
            rythmSounds[item] = this.value.split(',');
        }
    }

    function muteInstrument(evt) {
        evt.preventDefault();
        var tmpinst = this.dataset['beatboxMutetoggle'];
        var target_param = `[data-beatbox-instr="${tmpinst}"]`;
        var target_item  = document.querySelector(target_param);
        if (!this.checked) {
            //console.log('mute on '+tmpinst);
            rythmSounds[tmpinst] = [];
            target_item.dataset['beatboxMute'] = 'on';
        } else {
            //console.log('mute off '+tmpinst);
            rythmSounds[tmpinst] = target_item.value.split(',');
            target_item.dataset['beatboxMute'] = 'off';
        }
    }

    function playSound(buffer, time){
        var player = con.createBufferSource();
        player.buffer = buffer;
        player.loop = false;
        player.connect(con.destination);
        player.start(time);
    }



    initSounds(dataBank(), start_seq);
    prepareBeatbox();

    setInterval(function(){
        var now = con.currentTime;
        var max_future_time = now + (quarterNoteTime * 1.5);
        if (alarm_clock && alarm_clock > now) { // already scheduled up to this point
            now = alarm_clock;
        }
        while (now <= max_future_time){
            for (let xi=0, ximax = instruments.length; xi < ximax; xi++) {
                let sound_seq = rythmSounds[instruments[xi]];
                let note = sound_seq[step % sound_seq.length];
                if (!mute_all) {
                    if (note == 1) {
                        playSound(bankSounds[instruments[xi]], now);
                    } else {
                        if (note && note > Math.random()) {
                            playSound(bankSounds[instruments[xi]], now);
                        }
                    }
                }
            }
            step +=1;
            now += interval;
        }
        alarm_clock = now;
    }, quarterNoteTime * 1000);

};
