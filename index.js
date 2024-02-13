const randomHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
const optionsArr = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad', 'quad']

fetch(`https://www.thecolorapi.com/scheme?hex=${randomHex}&format=json&mode=${optionsArr[Math.floor(Math.random()*optionsArr.length)]}&count=5`)
    .then(res => res.json())
    .then(data => {
        
        document.getElementById('select-mode').value = optionsArr[Math.floor(Math.random()*optionsArr.length)]
        document.getElementById('color-seed').value = `#${randomHex}`
        
        renderColors(data)
    })
    
document.getElementById('form').addEventListener('submit', function(e){
    
    e.preventDefault()
    const colorSeed = document.getElementById('color-seed').value.slice(1)
    const mode = document.getElementById('select-mode').value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorSeed}&format=json&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            renderColors(data)
        })
})

document.getElementById('color-palette-container').addEventListener('click', function(e){
    copyClipboard(e.target.dataset, e.target.id)
})

function renderColors(data){
    const divsArray = Array.from(document.querySelectorAll('.color'))
    const codeArray = Array.from(document.querySelectorAll('.code'))
    const codeContainerArray = Array.from(document.querySelectorAll('.code-container'))
    let colorsArr = []
            
    colorsArr = data.colors
    const hexValues = colorsArr.map(color => color.hex)
            
    for(let i = 0; i < hexValues.length; i++){
        divsArray[i].style.backgroundColor = `${hexValues[i].value}`
        codeArray[i].textContent = `${hexValues[i].value}`
        giveData(divsArray[i], codeContainerArray[i], codeArray[i], hexValues[i].value)
    }
}

function giveData(div, container, code, value){
    div.setAttribute('data-color', value)
    container.setAttribute('data-color', value)
    code.setAttribute('data-color', value)
}

function copyClipboard(dataset, id){
    
    const element = document.getElementById(id)
    
    if(element.tagName === "DIV"){
        const pElement = element.querySelector(".code")
        pElement.textContent = "Sent to clipboard!"
        
        setTimeout(() => {
            pElement.textContent = dataset.color
        }, 1000)
        
    }else if(element.tagName === "P"){
        element.textContent = "Sent to clipboard!"
        
        setTimeout(() => {
            element.textContent = dataset.color
        }, 1000)
    }
    
    navigator.clipboard.writeText(dataset.color)
}