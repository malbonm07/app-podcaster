export function miliseconds(hrs,min,sec){
    return((hrs*60*60+min*60+sec)*1000);
}

export function savePodcasts(podcasts) {
    let date = new Date();
    let day = miliseconds(24,0,0);
    const data = {
      podcasts,
      expire: date.getTime() + day
    }
    localStorage.setItem('pods', JSON.stringify(data));
}

export function isEmptyOrExpired() {
    const data = JSON.parse(localStorage.getItem('pods')) || undefined;
    const date = new Date();
    if(!data) {
      return true;
    }
    return data && date.getTime() > data.expire ? true : false;
}