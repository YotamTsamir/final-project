const board = {
"_id":"b101",
"title":"my first board",
"archivedAt":null,
"createdAt":Date.now(),
// "createdBy": {
//     "_id": "u101",
//     "fullname": "Abi Abambi",
//     "imgUrl": "http://some-img"
// }
"createdBy":{},
"style":{},
// label should look like this
// {
//     "id": "l101",
//     "title": "Done",
//     "color": "#61bd4f"
// }

"labels":[],
"members":[],
"boxes":[
    {
    "id":"b101",
    "title":"first box",
    "archivedAt":null,
    "tasks":[
        //basic task
        {
            "id":"c101",
            "title":"write code",
        },
        //image task
        {
            "id":"c102",
            "title":"feed cat",
            "imageUrl":"http/gazibozibo.com",
            "attachments":[],
            "isDueDate":null,
        },
        ]
    },{
        "id":"b102",
        "title":"descriptions",
        "archivedAt":null,
        "tasks":{
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
        }
    }

]

}