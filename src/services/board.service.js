import { storageService } from './async-storage.service'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addTask,
    addBoard,
    addBox
}

const board = {
    "_id": "b101",
    "title": "my first board",
    "archivedAt": null,
    "createdAt": Date.now(),
    // "createdBy": {
    //     "_id": "u101",
    //     "fullname": "Abi Abambi",
    //     "imgUrl": "http://some-img"
    // }
    "createdBy": {},
    "style": {},
    // label should look like this
    // {
    //     "id": "l101",
    //     "title": "Done",
    //     "color": "#61bd4f"
    // }

    "labels": [],
    "members": [],
    "boxes": [
        {
            "id": "b101",
            "title": "first box",
            "archivedAt": null,
            "tasks": [
                //basic task
                {
                    "id": "c101",
                    "title": "write code",
                },
                //image task
                {
                    "id": "c102",
                    "title": "feed cat",
                    "imageUrl": "http/gazibozibo.com",
                    "attachments": [],
                    "isDueDate": null,
                },
            ]
        }, {
            "id": "b102",
            "title": "descriptions",
            "archivedAt": null,
            "tasks": [{
                "id": "c104",
                "title": "Help me",
                "status": "in-progress",
                "description": "description",
                "comments": [
                    {
                        "id": "ZdPnm",
                        "txt": "i like to write gazibo",
                        "createdAt": 1590999817436.0,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    }
                ],
                "checklists": [
                    {
                        "id": "YEhmF",
                        "title": "Checklist",
                        "todos": [
                            {
                                "id": "212jX",
                                "title": "To Do 1",
                                "isDone": false
                            }
                        ]
                    }
                ],
                "memberIds": ["u101"],
                "labelIds": ["l101", "l102"],
                "createdAt": 1590999730348,
                "dueDate": 16156215211,
                "byMember": {
                    "_id": "u101",
                    "username": "Tal",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                },
                "style": {
                    "bgColor": "#26de81"
                }
            }]
        }

    ]

}



async function addBox(boardId,box){
    let board = await getById(boardId)
    board.boxes.push(box)
    return save(board)
}

async function addTask(boardId, task, boxId) {
    let board = await getById(boardId)
    let box = board.boxes.find(box => box.id === boxId)
    box.tasks.push(task)
    return save(board)
}



function query() {
    
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/car/${carId}`)
}

async function remove(boardId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    await storageService.remove(STORAGE_KEY, boardId)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }

    return savedBoard
}

async function addBoard(ev) {
    ev.preventDefault()
    let newBoard = board
    newBoard._id =''
    const {value} = ev.target[0]
    
    console.log(value)
    newBoard.title=value
    save(newBoard)
}


// TEST DATA
// storageService.post(STORAGE_KEY, board)













