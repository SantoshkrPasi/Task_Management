const taskContainer=document.querySelector('.task_container');
let globalStorage=[];
const newcard=({
  id,
  imageUrl,
  taskTitle,
  taskType,
  taskDescription,
})=> `<div class="col-md-6 col-lg-4" id="${id}">
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-1">
        <button type="button" class="btn btn-outline-info"><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button" class="btn btn-outline-danger" id="${id}" onclick="deleteCard.apply(this,arguments)"> <i class="fa-solid fa-trash-can"></i></button>
      </div>

      <img src="${imageUrl}" class="card-img-top" alt="img">

      <div class="card-body">
        <h5 class="card-title">${taskTitle}</h5>
        <p class="card-text">${taskDescription}</p>
        <span class="badge bg-primary">${taskType}</span>
      </div>
      <div class="card-footer text-body-secondary d-flex justify-content-end">
        <button type="button" class="btn btn-outline-primary">Open Task</button>
      </div>
    </div>
  </div>`;

  const loadInitialTaskCards = () =>
  {
    // Aceess Local Storage
    const getInitialData = localStorage.getItem("Tasky");
    if(!getInitialData) return;

    // convert stringified object to object
    const{cards} = JSON.parse(getInitialData);
    cards.map((cardObject)=>{
     const createnewcard = newcard(cardObject);
     taskContainer.insertAdjacentHTML('beforeend', createnewcard);
     globalStorage.push(cardObject);
    });
  };

const saveChanges=()=>{
    const taskData={
    id:`${Date.now()}`,
    imageUrl:  document.getElementById('imageurl').value,
    taskTitle: document.getElementById('tasktitle').value,
    taskType:  document.getElementById('tasktype').value,
    taskDescription: document.getElementById('taskdescription').value,
    }
    console.log(taskData);

    const createnewcard = newcard(taskData);
    taskContainer.insertAdjacentHTML('beforeend', createnewcard);
    globalStorage.push(taskData);
    localStorage.setItem("Tasky",JSON.stringify({cards:globalStorage}));    
    
};

const deleteCard = (Event) =>{
  event = window.Event;
  const targetID = Event.target.id;

  const newUpdatedArray=globalStorage.filter(
    (cardObject) => cardObject.id !== targetID
  );

  newUpdatedArray.map((cardObject)=>{ const createnewcard = newcard(cardObject);
    taskContainer.insertAdjacentHTML('beforeend', createnewcard);
  })
  globalStorage=newUpdatedArray;
};