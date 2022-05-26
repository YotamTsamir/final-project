import { storageService } from './async-storage.service'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addTask,
    addBoard,
    addBox,
    getDefaultBgs,
    
    addBox,
    editBoxTitle,
    editTaskTitle,
    getLabelById,
    addLabelToTask,
    editTaskDesc
}

const BOARD = {
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

    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        },
        {
            "id": "l103",
            "title": "In progress",
            "color": "red"
        },
        {
            "id": "l102",
            "title": "shlaga",
            "color": "#212121"
        }
    ],
    "members": [],
    "boxes": [
        {
            "id": "b101",
            "title": "Bugs",
            "archivedAt": null,
            "tasks": [
                //basic task
                {
                    "id": "c101",
                    "title": "Div wont render",
                    "description": "Dont forget to update Yotam",
                    "comments": []
                },
                //image task
                {
                    "id": "c102",
                    "title": "feed cat",
                    "imageUrl": "http/gazibozibo.com",
                    "attachments": [],
                    "isDueDate": null,
                    "description": "",
                    "comments": []

                },
            ]
        }, {
            "id": "b102",
            "title": "In Progress",
            "archivedAt": null,
            "tasks": [{
                "id": "c104",
                "title": "Task Details",
                "status": "in-progress",
                "description": "",
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
                        "comments": [],
                        "description": "",
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

function addLabelToTask(task,labelId,board){
    task.labelIds.push(labelId)
    return save(board)
}

function getLabelById(labelId, board) {
    const label = board.labels.find(label => label.id === labelId)
    return label
}


const defaultBgs = {
    image:[
        "https://img.freepik.com/free-vector/gradient-background-vector-spring-colors_53876-117271.jpg?w=360",
        "https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95d2d9f93.png",
        "https://hdwallpaperim.com/wp-content/uploads/2017/08/24/103834-simple_background-748x421.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/000/378/561/small/geometric-pastel-01.jpg",
        "https://thumbs.dreamstime.com/b/blue-white-simple-background-162530250.jpg",
        "https://thumbs.dreamstime.com/b/vintage-style-brick-wall-textured-simple-background-wallpaper-pattern-vintage-style-brick-wall-textured-simple-background-175877314.jpg",
        "https://hdwallpaperim.com/wp-content/uploads/2017/08/24/100192-simple_background-748x421.jpg",
        "https://wallup.net/wp-content/uploads/2018/09/25/632758-simple_background-blue_background-hexagon.jpg",
    ],
    color: [
        "#FF5733",
        "#EF8D12",
        "#D3F330",
        "#8EF130",
        "#30F1B2",
        "#30F1EC",
        "#3081F1",
        "#6B73E1",
        "#906BE1",
        "#4500DD",
        "#A736D8",
        "#CE36D8",
        "#D836CC",
    ]
}




// async function addBox(boardId, box) {
async function editBoxTitle(boardId, box, newTitle) {
    let board = await getById(boardId)
    let currBox = board.boxes.find(currBox => currBox.id === box.id)
    currBox.title = newTitle
    // console.log(box.title)
    return save(board)
}
async function editTaskTitle(boardId, box, task, newTitle) {
    let board = await getById(boardId)
    let currBox = board.boxes.find(currBox => currBox.id === box.id)
    let currTask = currBox.tasks.find(currTask => currTask.id === task.id)
    currTask.title = newTitle
    return save(board)
}
async function editTaskDesc(boardId, box, task, newDesc) {
    console.log('SH>>AGA');
    let board = await getById(boardId)
    let boxIdx = board.boxes.findIndex(currBox => currBox.id === box.id)
    let taskIdx = board.boxes[boxIdx].tasks.findIndex(currTask => currTask.id === task.id)
    board.boxes[boxIdx].tasks[taskIdx].description = newDesc
    console.log(board.boxes[boxIdx].tasks[taskIdx].description)
    return save(board)
}

async function addBox(boardId, box) {
    let board = await getById(boardId)
    console.log(board)
    board.boxes.push(box)
    return save(board)
}

async function addTask(boardId, task, boxId) {
    let board = await getById(boardId)
    let box = board.boxes.find(box => box.id === boxId)
    box.tasks.push(task)
    return save(board)
}



async function query() {
    const boards = await storageService.query(STORAGE_KEY)
    return boards
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

async function addBoard(board) {
    let newBoard = _createBoard(board)
    return save(newBoard)
}

function getDefaultBgs(){
    return defaultBgs
}

function _createBoard(userBoard) {
    return {
        "_id": "",
        "title": userBoard.title,
        "archivedAt": null,
        "createdAt": Date.now(),
        "createdBy": {},
        "style": userBoard.style,
        "labels": [  {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        },
        {
            "id": "l103",
            "title": "In progress",
            "color": "red"
        },
        {
            "id": "l102",
            "title": "shlaga",
            "color": "#212121"
        }],
        "members": [],
        "boxes": [],
    }
}

// localStorage.clear()

// TEST DATA
// storageService.post(STORAGE_KEY, BOARD)













