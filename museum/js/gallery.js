function makeImage(n){
    let imgTemplate = document.querySelector('#img-template').content.cloneNode(true);
    let img = imgTemplate.querySelector('img');
    img.src = `assets/img/galery/galery${n}.jpg`;
    img.alt = `galery${n}`;
    return imgTemplate;
}

let container = document.querySelector('.gallery-inner-wrapper')
let images = []
for (let i=1; i<=15; i++){
    images.push(makeImage(i))
}
images.sort(() => Math.random() - 0.5);
images.map((el) => {container.append(el)})