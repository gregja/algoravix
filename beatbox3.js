myBeatBox = function () {
    var instruments = [];
    var rythmSounds = {};
    var bankSounds = {};

    function dataBank() {
        var sounds = [];
        sounds.push({name:'bass', seq4:'1,0,1,0', seq8:'1,0,1,0,0,0,0,0', mute:'on', file:'bass1/18091__daven__16-sb-bass-hit-c.wav'});
        sounds.push({name:'snare', seq4:'0,1,0,1', seq8:'0,1,0,1,0,1,0,0.5', mute:'off', file:'808/CH.WAV'});
        sounds.push({name:'clap', seq4:'0,0,0,0.5', seq8:'1,0,0,0,0,0,0.2,0', mute:'off', file:'808/CP.WAV'});
        sounds.push({name:'subbass', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'bass1/18090__daven__15-sb-bass-hit-c.wav'});
        sounds.push({name:'phaser', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'bass1/18094__daven__19-sb-bass-hit-f.wav'});
        sounds.push({name:'123', seq4:'0,0,0,0', seq8:'0,1,0,1,0,0,0,0', mute:'on', file:'erk/000_123.wav'});
        sounds.push({name:'jvbass-1', seq4:'1,0,0.1,0', seq8:'1,0,0,.1,0,0,0,0', mute:'off', file:'jvbass/001_02.wav'});
        sounds.push({name:'jvbass-2', seq4:'0,1,0,0', seq8:'0,1,0,0,0,.5,0,0', mute:'off', file:'jvbass/002_03.wav'});
        sounds.push({name:'jvbass-3', seq4:'0,0,1,0', seq8:'0,0,1,1,0,0,0,0', mute:'off', file:'jvbass/003_04.wav'});
        sounds.push({name:'jvbass-4', seq4:'0,0,0,1', seq8:'.5,0,0,1,0,0,0,0', mute:'off', file:'jvbass/004_05.wav'});
        sounds.push({name:'jvbass-5', seq4:'0,0,0,0', seq8:'0,1,0,0.5,0,0,1,0', mute:'off', file:'jvbass/005_06.wav'});
        sounds.push({name:'jvbass-6', seq4:'0,0,0,0', seq8:'0.1,0,1,0.5,0,0,0,0.5', mute:'off', file:'jvbass/006_07.wav'});
        sounds.push({name:'jvbass-7', seq4:'0,0,0,0', seq8:'0,0,0,0,0,0,0,0', mute:'off', file:'jvbass/007_08.wav'});
        sounds.push({name:'jvbass-8', seq4:'0,0,0,0', seq8:'0,0,0,0,0,0,0,0', mute:'off', file:'jvbass/008_09.wav'});
        sounds.push({name:'jvbass-9', seq4:'0,0,0,0', seq8:'0,0,0,0,0,0,0,0', mute:'off', file:'jvbass/009_10.wav'});
        sounds.push({name:'jvbass-10', seq4:'0,0,0,0', seq8:'0,0,0,0,0,0,0,0', mute:'off', file:'jvbass/010_11.wav'});
        return sounds;
    }

    function initSounds(datas, type_seq=4) {
        var beatbox_div = document.getElementById('beatbox');
        beatbox_div.innerHTML = '';
        var mute_value, tmp_seq;
        for (var xi=0, ximax=datas.length; xi<ximax ; xi++) {
            var tmp_ins = datas[xi];
            if (tmp_ins.mute == 'on') {
                mute_value = '';
            } else {
                mute_value = 'checked';
            }
            if (type_seq == 8) {
                tmp_seq = tmp_ins.seq8;
            } else {
                tmp_seq = tmp_ins.seq4;
            }
            var tpl_instrument = `<label>
            <textarea 
                data-beatbox-instr="${tmp_ins.name}" 
                data-beatbox-sound="${tmp_ins.file}"
                data-beatbox-mute="${tmp_ins.mute}"
                >${tmp_seq}</textarea>&nbsp;&nbsp;${tmp_ins.name}
        </label>&nbsp;<input type="checkbox" data-beatbox-mutetoggle="${tmp_ins.name}" ${mute_value}>
        <br>`
            beatbox_div.innerHTML += tpl_instrument;
        }
    }
    
    function prepareBeatbox(path) {
        var i, imax;
        var beatboxes = document.querySelectorAll('[data-beatbox-instr]');
        for (i=0, imax=beatboxes.length; i<imax ; i++) {
            beatboxes[i].addEventListener('keyup', updateInstrument, false);

            var soundname =  beatboxes[i].getAttribute('data-beatbox-instr');

            instruments.push(soundname);

            if (beatboxes[i].getAttribute('data-beatbox-mute') == 'off') {
                rythmSounds[soundname] = beatboxes[i].value.split(',');
            } else {
                rythmSounds[soundname] = [];                
            }

            var tmpsound = beatboxes[i].getAttribute('data-beatbox-sound');
            var soundfile = path+tmpsound;

            loadSample(soundfile, soundname, function (buffer){});  
        }
        var togglemutes = document.querySelectorAll('[data-beatbox-mutetoggle]');
        for (i=0, imax=togglemutes.length; i<imax ; i++) {
            togglemutes[i].addEventListener('change', muteInstrument, false);            
        }         
    }

    function loadSample(url, soundname, callback){
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function(){
            var audioData = request.response;
            con.decodeAudioData(audioData, function(buffer) {
                bankSounds[soundname] = buffer; 
                //console.log('load ', soundname);
            });
        };
        request.send();
    }
    
    function updateInstrument(evt) {
        if (this.dataset['beatboxMute'] == 'off') {
            var tmpinst = this.dataset['beatboxInstr'];
            rythmSounds[tmpinst] = this.value.split(',');
        }
    }

    function muteInstrument(evt) {
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

    var start_seq = 4;
    initSounds(dataBank(), start_seq);
    
    // Sounds downloaded from the project : https://github.com/tidalcycles/Dirt-Samples
    var path_sounds = '../sounds/';
    // if you don't want to download sound files locally, you can use this path :
    //  var path_sounds = "https://cdn.rawgit.com/tidalcycles/Dirt-Samples/a7f0b277/"
    prepareBeatbox(path_sounds);
        
    var con = new (window.AudioContext || window.webkitAudioContext)();

    var step = -1;
    var interval = 0.125;
    var tempo = 180; // BPM (beats per minute)
    var quarterNoteTime = 60 / tempo; // 0.5
    var alarm_clock = false;  // réveil

    setInterval(function(){
        var now = con.currentTime;
        var max_future_time = now + (quarterNoteTime * 1.5);
        if (alarm_clock && alarm_clock > now) { // already scheduled up to this point
            now = alarm_clock;
        }
        while (now <= max_future_time){        
            for (var xi=0, ximax = instruments.length; xi < ximax; xi++) {
                var sound_seq = rythmSounds[instruments[xi]];
                var note = sound_seq[step % sound_seq.length]; 
                if (note == 1){
                    playSound(bankSounds[instruments[xi]], now);
                } else {
                    if (note && note > Math.random()){
                        playSound(bankSounds[instruments[xi]], now);
                    }
                }
            }
            step +=1; 
            now += interval;
        }
        alarm_clock = now;
    }, quarterNoteTime * 1000);

};


