var imgArr = [
    {
        url: './img/n1/1.png',
        id: 1,
        previous: false
    },
    {
        url: './img/n1/2.png',
        id: 2, 
        previous: false
    },
    {
        url: './img/n1/3.png',
        id: 3,
        previous:false
    },
    {
        url: './img/n1/4.png',
        id: 4,
        previous:false
    },
    {
        url: './img/n1/5.png',
        id: 5,
        previous:false
    },
    {
        url: './img/n1/6.png',
        id: 6,
        previous:true
    },
    {
        url: './img/n1/7.png',
        id: 7,
        previous:false
    },
    {
        url: './img/n1/8.png',
        id: 8,
        previous:false
    },
    {
        url: './img/n1/9.png',
        id: 9,
        previous:false
    },
    {
        url: './img/n1/10.png',
        id: 10,
        previous:false
    },
    {
        url: './img/n1/11.png',
        id: 11,
        previous:false
    },
    {
        url: './img/n1/12.png',
        id: 12,
        previous:false
    },
    {
        url: './img/n1/13.png',
        id: 13,
        previous:false
    },
    {
        url: './img/n1/14.png',
        id: 14,
        previous:false
    },
    {
        url: './img/n1/15.png',
        id: 15,
        previous:false
    },
    {
        url: './img/n1/16.png',
        id: 16,
        previous:false
    },
    {
        url: './img/n1/17.png',
        id: 17,
        previous:false
    },
    {
        url: './img/n1/18.png',
        id: 18,
        previous:false
    },
    {
        url: './img/n1/19.png',
        id: 19,
        previous:false
    },
    {
        url: './img/n1/20.png',
        id: 20,
        previous:false
    },
    {
        url: './img/n1/21.png',
        id: 21,
        previous:false
    },
    {
        url: './img/n1/22.png',
        id: 22,
        previous:false
    },
    {
        url: './img/n1/23.png',
        id: 23,
        previous:false
    },
    {
        url: './img/n1/24.png',
        id: 24,
        previous:false
    },
    {
        url: './img/n1/25.png',
        id: 25,
        previous:false
    },
    {
        url: './img/n1/26.png',
        id: 26,
        previous:false
    },
    {
        url: './img/n1/27.png',
        id: 27,
        previous:false
    },
    {
        url: './img/n1/28.png',
        id: 28,
        previous:false
    },
    {
        url: './img/n1/29.png',
        id: 29,
        previous:false
    },
    {
        url: './img/n1/30.png',
        id: 30,
        previous:false
    },
    {
        url: './img/n1/31.png',
        id: 31,
        previous:false
    },
    {
        url: './img/n1/32.png',
        id: 32,
        previous:false
    },
    {
        url: './img/n1/33.png',
        id: 33,
        previous:false
    },
    {
        url: './img/n1/34.png',
        id: 34,
        previous:false
    },
    {
        url: './img/n1/35.png',
        id: 35,
        previous:false
    },
    {
        url: './img/n1/36.png',
        id: 36,
        previous:false
    }
];

let currentImg = imgArr[0];
let hit = 0;
let misses = 0;
let index = 0;
let timeInterval;
let realResult = [];

document.getElementsByClassName('landingPage')[0].style["display"] = 'flex';
document.getElementsByClassName('testPage')[0].style["display"] = 'none';
document.getElementsByClassName('no')[0].setAttribute('disabled','' );
document.getElementsByClassName('yes')[0].setAttribute('disabled','' );
document.getElementsByClassName('right-hero2')[0].style["display"] = 'none';

document.getElementById('export_button').addEventListener('click', () => {
    htmlToExcel('xlsx');
})

const htmlToExcel = (type) => {
    var data = document.getElementById('maintable');

    var file = XLSX.utils.table_to_book(data, {sheet: 'sheet1'});

    XLSX.write(file, {bookType: type, bookSST: true, type: 'base64'});

    XLSX.writeFile(file, 'file.' + type);
}


const ImgTimer = () => {
    if(index === imgArr.length) {
        clearInterval(timeInterval);
        document.getElementsByClassName('right-hero2')[0].style["display"] = 'block';
        document.getElementsByClassName('right-hero')[0].style["display"] = 'none';
        document.getElementsByClassName('testPage')[0].style["display"] = 'none';
        document.getElementsByClassName('landingPage')[0].style["display"] = 'flex';
        document.getElementById('counter').style['display'] = 'none';
        document.getElementById('final').innerHTML = `Total Hit: ${hit}, Total Misses: ${imgArr.length-hit}`;

        document.getElementById('expected').innerHTML = imgArr.map((imgt) => 
        `<tr><td>${imgt.id}</td><td>${imgt.previous ? 'Yes' : 'No'}</td><td>${imgt.isPrevious ? 'Yes' : 'No'}</td></tr>`).join('');
    }
    timeInterval = setTimeout(() => {
        if(index !== imgArr.length) {
            index = index+1;
            document.getElementById('imgCounter').innerHTML = `Image number: <strong> ${index+1}</strong>`;
        }
        if(index>0) {
            document.getElementsByClassName('no')[0].removeAttribute('disabled');
            document.getElementsByClassName('yes')[0].removeAttribute('disabled');
        }
        let real = currentImg;
        real.isPrevious = 'NA';
        realResult.push(currentImg);
        currentImg = imgArr[index];
        document.getElementsByTagName('img')[0].src = currentImg ? currentImg.url : '';
        document.getElementById('counter').innerHTML = `Hit: ${hit}, Misses: ${misses}`
        ImgTimer();
    }, 4000);
}

const SelectedYes = () => {
    clearInterval(timeInterval);

    let real = currentImg;
    if(index > 0) {
        real.isPrevious = true;
        realResult.push(currentImg);
    }

    if(currentImg.previous) {
        hit = hit+1;
    } else {
        
        misses = misses+1;
        console.log('misses1:', misses, currentImg);
    }
    if(currentImg.id === imgArr.length) {
        document.getElementsByClassName('right-hero2')[0].style["display"] = 'block';
        document.getElementsByClassName('right-hero')[0].style["display"] = 'none';
        document.getElementsByClassName('testPage')[0].style["display"] = 'none';
        document.getElementsByClassName('landingPage')[0].style["display"] = 'flex';
        document.getElementById('counter').style['display'] = 'none';
        document.getElementById('final').innerHTML = `Total Hit: ${hit}, Total Misses: ${imgArr.length-hit}`;

        document.getElementById('expected').innerHTML = imgArr.map((imgt) => 
        `<tr><td>${imgt.id}</td><td>${imgt.previous ? 'Yes' : 'No'}</td><td>${imgt.isPrevious === 'NA' ? 'NA' : imgt.isPrevious ? 'Yes' : 'No'}</td></tr>`).join('');
    }
    document.getElementsByClassName('no')[0].removeAttribute('disabled');
    document.getElementsByClassName('yes')[0].removeAttribute('disabled');
    if(index !== imgArr.length) {
        index = index+1;
        document.getElementById('imgCounter').innerHTML = `Image number: <strong> ${index+1}</strong>`;
        currentImg = imgArr[index-1];
        ImgTimer();
    }
    document.getElementsByTagName('img')[0].src = currentImg.url;
    document.getElementById('counter').innerHTML = `Hit: ${hit}, Misses: ${misses}`
}

const SelectedNo = () => {
    clearInterval(timeInterval);
    let real = currentImg;
    if(index > 0) {
        real.isPrevious = false;
        realResult.push(currentImg);
    }
    
    if(!currentImg.previous) {
        hit = hit+1;
    } else {
        misses = misses+1;
        console.log('misses2:', misses);
    }
    if(currentImg.id === imgArr.length+1) {
        document.getElementsByClassName('right-hero2')[0].style["display"] = 'block';
        document.getElementsByClassName('right-hero')[0].style["display"] = 'none';
    }
    
    if(currentImg.id === imgArr.length) {
        document.getElementsByClassName('right-hero2')[0].style["display"] = 'block';
        document.getElementsByClassName('right-hero')[0].style["display"] = 'none';
        document.getElementsByClassName('testPage')[0].style["display"] = 'none';
        document.getElementsByClassName('landingPage')[0].style["display"] = 'flex';
        document.getElementById('counter').style['display'] = 'none';
        document.getElementById('final').innerHTML = `Total Hit: ${hit}, Total Misses: ${imgArr.length-hit}`;

        document.getElementById('expected').innerHTML = imgArr.map((imgt) => 
        // if(imgt.previous === imgt.isPrevious) {
            
        // }
        `<tr><td>${imgt.id}</td><td>${imgt.previous ? 'Yes' : 'No'}</td><td>${imgt.isPrevious ? 'Yes' : 'No'}</td></tr>`).join('');
    }
    if(index !== imgArr.length) {
        index = index+1;
        document.getElementById('imgCounter').innerHTML = `Image number: <strong> ${index+1}</strong>`;
        currentImg = imgArr[index-1];
        ImgTimer();
    }
    document.getElementsByTagName('img')[0].src = currentImg.url;
    document.getElementById('counter').innerHTML = `Hit: ${hit}, Misses: ${misses}`
}

const SelectedStart = () => {
    document.getElementsByClassName('landingPage')[0].style["display"] = 'none';
    document.getElementsByClassName('testPage')[0].style["display"] = 'block';
    document.getElementById('counter').innerHTML = `Hit: ${hit}, Misses: ${misses}`
    ImgTimer();
}

document.getElementsByClassName('yes')[0].addEventListener('click', SelectedYes);
document.getElementsByClassName('no')[0].addEventListener('click', SelectedNo);
document.getElementsByClassName('start')[0].addEventListener('click', SelectedStart);