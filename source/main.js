const molly = require('./module/Molly');
const uikit = require('./module/UIkit');

window.state = new device.state({
    state: 'stop',
}); let interval;

/*--────────────────────────────────────────────────────────────────────────────────────--*/

function game(){

    const h = Math.floor(window.innerHeight / 12);
    const w = Math.floor(window.innerWidth / 12);
    const arr = new Array(h*w); arr.fill(0);
    const el = _$('[active]');

    for( let y=0; y<h; y++ ){ for( let x=0; x<w; x++ ){
         let actived = 0, pos = x + y * w;

        for( let k=-1; k<=1; k++ ){ for( let l=-1; l<=1; l++ ){
        
            if( k==0 && l==0 ) continue; 

            const posX = x+l, posY = y+k;
            const i = posX + posY * w;

            if( posX < 0 || posY < 0 ) continue;
            if( posX >=w || posY >=h ) continue;
            
            try {
                if( el[i].getAttribute('active') == 'true' ) 
                    actived++; 
            } catch(e) {}

        }}

        if( el[pos].getAttribute('active') == 'true' ){
                 if( actived < 2 ) arr[pos]=false;
            else if( actived > 3 ) arr[pos]=false;
            else                   arr[pos]=true;
        } else {
                 if( actived ==3 ) arr[pos]=true;
            else if( actived < 2 ) arr[pos]=false;
            else                   arr[pos]=false;
        }

    }}

    arr.map((x,i)=>{ el[i].setAttribute('active',x) })

}

/*--────────────────────────────────────────────────────────────────────────────────────--*/

window.state.observeField('state',(prev,act)=>{

    if( act == 'reset' ) {
        _$('[active]').map(x=>x.setAttribute('active',false));
        window.state.set({ state: 'stop' });
    } else if( act == 'stop' ){
        clearInterval(interval);
    } else if( act == 'play' ) {
        interval = setInterval(game,100);
    }

})