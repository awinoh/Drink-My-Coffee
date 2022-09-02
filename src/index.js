let cardinfo;
function cardRender(card){
    cardinfo = card;
    cardTitleTag = document.querySelector('#card-title'),
    cardImageTag = document.querySelector('#card-image'),
    cardHelpfulTag = document.querySelector('#helpful-count'),
    cardListTag = document.querySelector('#description-list'),
    cardDescriptionFormTag = document.querySelector('#description-form'),
    cardHelpfulButtonTag = document.querySelector('#helpful-button'),
    cardDescriptionInputTag = document.querySelector('#description'),
    
    
    cardTitleTag.textContent = card.title;
    cardImageTag.src = card.image;
    cardHelpfulTag.helpfulContent = `${card.helpful} helpful`;

    while(cardListTag.hasChildNodes()){
        cardListTag.removeChild(cardListTag.lastChild)}

        card.description.forEach(description => {
            let descriptionTag = document.createElement('li');
            descriptionTag.textContent = description.content;
            cardListTag.appendChild(descriptionTag)
        }); 

        cardHelpfulButtonTag.addEventListener('click', (env) => {
            card.helpful += 1;
            cardHelpfulTag.textContent = `${card.helpful} Helpful`
            
        }) 
        
        cardDescriptionFormTag.addEventListener('submit', (env)=>{
            const descriptionInput = document.querySelector('#description')
            env.preventDefault();
            let descriptionTag = document.createElement('li');
            descriptionTag.textContent = cardDescriptionInputTag.value;
            cardListTag.appendChild(descriptionTag);

            const newDescription={
                id: card.description.length+1,
                imageId: 1,
                content: cardDescriptionInputTag.value
            }
            card.description.push(newDescription);

            fetch('https://localhost:3000/images/1',{
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(card)
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(`Error: ${err}`));

            fetch('http://localhost:3000/description/',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newDescription)
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(`Error: ${err}`));

            cardDescriptionFormTag.reset();
        });
    };
    function fetchData(path=1){
        url=`http://localhost:3000/images/${path}`;
        fetch(url)
        .then(response => response.json())
        .then(data => cardRender(data))
        .catch(err => console.log(`Error: ${err}`));
    };

    function init(){
        fetchData();
    };

    init()
